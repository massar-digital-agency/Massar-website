#!/usr/bin/env node

/**
 * Google Fonts Subsetter
 *
 * Downloads font families from Google Fonts, subsets them to Latin and Arabic
 * unicode ranges only, and generates self-hosted @font-face CSS.
 *
 * Usage:  node scripts/subset-fonts.mjs
 * Env:    SKIP_DOWNLOAD=1  (skip re-downloading, only run subsetting)
 *         SKIP_SUBSET=1    (skip pyftsubset, download as-is)
 *
 * Dependencies:
 *   - Python 3 with fonttools and brotli packages
 *   - Node.js 18+
 *
 * Output:
 *   public/fonts/<FontName>/<weight>.woff2  — subsetted font files
 *   public/fonts/fonts.css                   — @font-face declarations
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync, readdirSync, statSync, createWriteStream } from 'node:fs'
import { get } from 'node:https'
import { execSync } from 'node:child_process'
import path from 'node:path'

const FONTS_DIR = path.resolve('public/fonts')
const CSS_OUTPUT = path.join(FONTS_DIR, 'fonts.css')

const FONT_CONFIGS = [
  {
    name: 'Inter',
    weights: [400, 500, 600, 700],
    cssUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
  {
    name: 'Manrope',
    weights: [400, 500, 600, 700, 800],
    cssUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
  },
  {
    name: 'IBM Plex Sans Arabic',
    weights: [400, 500, 600, 700],
    cssUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap',
  },
]

const KEEP_UNICODES = [
  'U+0020-007E',
  'U+00A0-00FF',
  'U+0100-017F',
  'U+0180-024F',
  'U+0250-02AF',
  'U+02B0-02FF',
  'U+0300-036F',
  'U+0600-06FF',
  'U+0750-077F',
  'U+08A0-08FF',
  'U+1E00-1EFF',
  'U+2000-206F',
  'U+2070-209F',
  'U+20A0-20CF',
  'U+2100-214F',
  'U+2150-218F',
  'U+2190-21FF',
  'U+2200-22FF',
  'U+2300-23FF',
  'U+25A0-25FF',
  'U+2600-26FF',
  'U+2700-27BF',
  'U+2C60-2C7F',
  'U+FB50-FDFF',
  'U+FE70-FEFF',
  'U+A720-A7FF',
  'U+AB30-AB6F',
  'U+1EE00-1EEFF',
].join(',')

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FontSubsetter/1.0)' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        return
      }
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    }).on('error', reject)
  })
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(destPath)
    get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; FontSubsetter/1.0)' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`))
        return
      }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    }).on('error', (err) => {
      file.close()
      reject(err)
    })
  })
}

function parseGoogleFontsCSS(css, familyName) {
  const fontFaces = []
  const blockRegex = /@font-face\s*\{([^}]+)\}/gi
  let match

  while ((match = blockRegex.exec(css)) !== null) {
    const block = match[1]
    const props = {}
    const propRegex = /(\S[\w-]*)\s*:\s*(.+?)\s*(?:;|$)/g
    let propMatch
    while ((propMatch = propRegex.exec(block)) !== null) {
      props[propMatch[1].trim()] = propMatch[2].trim().replace(/;$/, '')
    }

    if (props['font-family'] && props['font-family'].replace(/['"]/g, '') === familyName) {
      fontFaces.push({
        family: props['font-family'],
        style: props['font-style'] || 'normal',
        weight: parseInt(props['font-weight'] || '400', 10),
        src: props.src || '',
        unicodeRange: props['unicode-range'] || '',
      })
    }
  }
  return fontFaces
}

function urlToFilename(url) {
  const parsed = new URL(url)
  const pathParts = parsed.pathname.split('/')
  return pathParts[pathParts.length - 1]
}

function hasOverlapWithLatinArabic(unicodeRange) {
  if (!unicodeRange) return true

  const ranges = unicodeRange.split(',').map((r) => r.trim())

  const latinArabicRanges = [
    [0x0020, 0x024F],
    [0x02B0, 0x02FF],
    [0x0300, 0x036F],
    [0x0600, 0x06FF],
    [0x0750, 0x077F],
    [0x08A0, 0x08FF],
    [0x1E00, 0x1EFF],
    [0x2000, 0x206F],
    [0x2070, 0x20CF],
    [0x2100, 0x214F],
    [0x2190, 0x21FF],
    [0x2200, 0x22FF],
    [0x2300, 0x23FF],
    [0x25A0, 0x25FF],
    [0x2600, 0x26FF],
    [0x2700, 0x27BF],
    [0x2C60, 0x2C7F],
    [0xA720, 0xA7FF],
    [0xAB30, 0xAB6F],
    [0xFB50, 0xFDFF],
    [0xFE70, 0xFEFF],
    [0x1EE00, 0x1EEFF],
  ]

  function rangesOverlap(start1, end1, start2, end2) {
    return start1 <= end2 && end1 >= start2
  }

  for (const rangeStr of ranges) {
    const cleaned = rangeStr.replace(/U\+/gi, '')
    let start, end

    if (cleaned.includes('-')) {
      const parts = cleaned.split('-')
      start = parseInt(parts[0], 16)
      end = parseInt(parts[1], 16)
    } else {
      start = parseInt(cleaned, 16)
      end = start
    }

    for (const [laStart, laEnd] of latinArabicRanges) {
      if (rangesOverlap(start, end, laStart, laEnd)) {
        return true
      }
    }
  }

  return false
}

function getFontDirName(familyName) {
  return familyName.replace(/\s+/g, '')
}

function sanitizeFamilyName(name) {
  return name.replace(/['"]/g, '')
}

function findPyFtSubset() {
  const candidates = [
    'pyftsubset',
    path.join(process.env.HOME || '', '.local', 'bin', 'pyftsubset'),
    '/home/bruce/.local/bin/pyftsubset',
    '/usr/local/bin/pyftsubset',
  ]

  for (const cmd of candidates) {
    try {
      execSync(`command -v "${cmd}" 2>/dev/null`, { stdio: 'pipe', shell: true, encoding: 'utf8' })
      return cmd
    } catch {
      continue
    }
  }

  try {
    execSync('python3 -c "from fonttools.subset import main; print(1)" 2>/dev/null', { stdio: 'pipe', shell: true })
    return 'python3 -m fonttools subset'
  } catch {
    return null
  }
}

async function subsetFont(inputPath, outputPath) {
  const pyftsubsetCmd = findPyFtSubset()
  if (!pyftsubsetCmd) {
    console.warn('     ⚠️  pyftsubset not found. Install: pip install fonttools brotli')
    return false
  }

  const cmd = [
    `PATH="$HOME/.local/bin:$PATH" ${pyftsubsetCmd}`,
    `"${inputPath}"`,
    `--unicodes="${KEEP_UNICODES}"`,
    `--output-file="${outputPath}"`,
    '--flavor=woff2',
    '--drop-tables+=DSIG',
    '--drop-tables+=GPOS',
    '--drop-tables+=GSUB',
    '--ignore-missing-unicodes',
  ].join(' ')

  try {
    execSync(cmd, { stdio: 'pipe', shell: true, encoding: 'utf8' })
    return existsSync(outputPath) && statSync(outputPath).size > 0
  } catch (err) {
    const msg = err.stderr ? err.stderr.trim().substring(0, 300) : err.message.substring(0, 200)
    console.warn(`     ⚠️  Subsetting failed: ${msg}`)
    return false
  }
}

async function main() {
  console.log('🔤 Font Subsetting Script')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━\n')

  await mkdir(FONTS_DIR, { recursive: true })

  // Check pyftsubset availability
  const pyftsubsetAvailable = !!findPyFtSubset()
  if (!pyftsubsetAvailable && !process.env.SKIP_SUBSET) {
    console.log('⚠️  fonttools not found — will use downloaded fonts as-is (no subsetting)')
    console.log('   Install: pip install --break-system-packages fonttools brotli\n')
  } else if (pyftsubsetAvailable) {
    console.log('✓ fonttools found — will subset fonts\n')
  }

  const fontFamilies = []

  for (const config of FONT_CONFIGS) {
    const { name: familyName, weights, cssUrl } = config
    const fontDirName = getFontDirName(familyName)
    const fontDir = path.join(FONTS_DIR, fontDirName)

    console.log(`📍 Processing: ${familyName}`)
    console.log(`   Weights: ${weights.join(', ')}`)

    await mkdir(fontDir, { recursive: true })

    // Fetch Google Fonts CSS
    let css
    try {
      css = await fetchUrl(cssUrl)
    } catch (err) {
      console.error(`   ❌ Failed to fetch CSS: ${err.message}`)
      continue
    }

    // Parse and filter @font-face blocks
    const allFaces = parseGoogleFontsCSS(css, sanitizeFamilyName(familyName))
    const relevantFaces = allFaces.filter((f) => hasOverlapWithLatinArabic(f.unicodeRange))
    const workingFaces = relevantFaces.length > 0 ? relevantFaces : allFaces

    if (relevantFaces.length === 0) {
      console.log(`   Using all ${allFaces.length} blocks (none filtered)`)
    } else {
      console.log(`   Keeping ${relevantFaces.length}/${allFaces.length} Latin/Arabic blocks`)
    }

    // Collect unique download URLs
    const urlWeightMap = new Map()
    for (const face of workingFaces) {
      const urls = face.src.match(/url\(['"]?(.+?)['"]?\)/g)
      if (urls) {
        for (const urlMatch of urls) {
          const url = urlMatch.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
          const key = `${face.weight}-${url}`
          if (!urlWeightMap.has(key)) {
            urlWeightMap.set(key, { url, weight: face.weight, style: face.style, unicodeRange: face.unicodeRange })
          }
        }
      }
    }

    // Download font files
    const downloadedFiles = []
    const skipDownload = process.env.SKIP_DOWNLOAD === '1'

    for (const [, entry] of urlWeightMap) {
      const filename = urlToFilename(entry.url)
      const filepath = path.join(fontDir, filename)

      if (skipDownload && existsSync(filepath) && statSync(filepath).size > 0) {
        downloadedFiles.push(filepath)
        continue
      }

      try {
        process.stdout.write(`     ↓ ${filename}... `)
        await downloadFile(entry.url, filepath)
        const size = statSync(filepath).size
        process.stdout.write(`${(size / 1024).toFixed(1)} KB\n`)
        downloadedFiles.push(filepath)
      } catch (err) {
        process.stdout.write(`❌ ${err.message}\n`)
      }
    }

    console.log(`   Downloaded ${downloadedFiles.length} file(s)`)

    // Run subsetting
    const subsetDir = path.join(fontDir, 'subset')
    await mkdir(subsetDir, { recursive: true })

    const skipSubset = process.env.SKIP_SUBSET === '1' || !pyftsubsetAvailable

    for (const filepath of downloadedFiles) {
      const ext = path.extname(filepath)
      const basename = path.basename(filepath, ext)
      const subsetPath = path.join(subsetDir, `${basename}-subset.woff2`)

      if (existsSync(subsetPath) && statSync(subsetPath).size > 0) {
        continue
      }

      if (skipSubset) {
        continue
      }

      process.stdout.write(`     ✂ Subsetting: ${basename}... `)
      const success = await subsetFont(filepath, subsetPath)
      if (success) {
        const size = statSync(subsetPath).size
        process.stdout.write(`${(size / 1024).toFixed(1)} KB\n`)
      } else {
        process.stdout.write(`failed\n`)
      }
    }

    // Generate @font-face declarations — one per weight
    const seenWeights = new Set()
    const declarations = []

    for (const face of workingFaces) {
      if (seenWeights.has(face.weight)) continue
      seenWeights.add(face.weight)

      // Find subsetted file for this weight
      const urls = face.src.match(/url\(['"]?(.+?)['"]?\)/g)
      if (!urls) continue

      const firstUrl = urls[0].replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '')
      const origFilename = urlToFilename(firstUrl)
      const origExt = path.extname(origFilename)
      const origBasename = path.basename(origFilename, origExt)
      const subsetPath = path.join(subsetDir, `${origBasename}-subset.woff2`)

      let fontUrl
      if (existsSync(subsetPath) && statSync(subsetPath).size > 0) {
        fontUrl = `/fonts/${fontDirName}/subset/${origBasename}-subset.woff2`
      } else {
        // Fallback to directly downloaded file
        const origPath = path.join(fontDir, origFilename)
        if (existsSync(origPath) && statSync(origPath).size > 0) {
          fontUrl = `/fonts/${fontDirName}/${origFilename}`
        } else {
          continue
        }
      }

      declarations.push(`@font-face {
  font-family: '${sanitizeFamilyName(familyName)}';
  font-style: ${face.style};
  font-weight: ${face.weight};
  font-display: swap;
  src: url('${fontUrl}') format('woff2');
}`)
    }

    if (declarations.length > 0) {
      fontFamilies.push({ name: familyName, declarations })
      console.log(`   ✅ Generated ${declarations.length} @font-face block(s) for weights: ${[...seenWeights].sort((a, b) => a - b).join(', ')}`)
    } else {
      console.warn(`   ⚠️  No @font-face declarations generated`)
    }

    console.log('')
  }

  // Write fonts.css
  let cssContent = `/**
 * Self-hosted subsetted fonts
 *
 * Fonts are subsetted to Latin and Arabic unicode ranges only.
 * Generated by scripts/subset-fonts.mjs
 */

`

  for (const family of fontFamilies) {
    cssContent += `/* ${family.name} */\n`
    cssContent += family.declarations.join('\n\n')
    cssContent += '\n\n'
  }

  await writeFile(CSS_OUTPUT, cssContent, 'utf8')
  console.log(`📄 Generated: ${CSS_OUTPUT}`)

  // Print summary
  console.log('\n📊 Summary')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━')
  for (const config of FONT_CONFIGS) {
    const fontDirName = getFontDirName(config.name)
    const dir = path.join(FONTS_DIR, fontDirName, 'subset')
    let totalSize = 0
    let fileCount = 0
    if (existsSync(dir)) {
      const files = readdirSync(dir)
      for (const f of files) {
        if (!f.endsWith('.woff2')) continue
        const stat = statSync(path.join(dir, f))
        totalSize += stat.size
        fileCount++
        console.log(`   ${config.name}/${f}: ${(stat.size / 1024).toFixed(1)} KB`)
      }
    }
    if (fileCount > 0) {
      console.log(`   → Total: ${(totalSize / 1024).toFixed(1)} KB across ${fileCount} file(s)`)
    } else {
      // Count original files
      const origDir = path.join(FONTS_DIR, fontDirName)
      if (existsSync(origDir)) {
        const files = readdirSync(origDir).filter((f) => f.endsWith('.ttf') || f.endsWith('.woff2'))
        let origTotal = 0
        for (const f of files) {
          const stat = statSync(path.join(origDir, f))
          origTotal += stat.size
          fileCount++
          console.log(`   ${config.name}/${f}: ${(stat.size / 1024).toFixed(1)} KB (original)`)
        }
        if (fileCount > 0) {
          console.log(`   → Total: ${(origTotal / 1024).toFixed(1)} KB across ${fileCount} file(s)`)
        }
      }
    }
    console.log('')
  }

  console.log('✅ Font subsetting complete!')
}

main().catch((err) => {
  console.error('❌ Font subsetting failed:', err)
  process.exit(1)
})

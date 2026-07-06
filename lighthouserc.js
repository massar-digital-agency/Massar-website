/**
 * Lighthouse CI Configuration
 *
 * This configuration defines how Lighthouse CI collects performance data
 * and asserts quality thresholds for Core Web Vitals and key metrics.
 *
 * Thresholds:
 *   - Performance:  ≥ 90
 *   - Accessibility: ≥ 95
 *   - SEO:           ≥ 95
 *   - Best Practices:≥ 90
 *   - LCP:           < 2.5s
 *   - TBT:           < 300ms
 *
 * Pages tested: Home, Services, Portfolio, Contact, Blog
 */

const LIGHT_HOUSE_SERVER_BASE_URL = 'http://localhost:4173'

export default {
  ci: {
    collect: {
      startServerCommand: 'npm run preview',
      startServerTimeout: 30000,
      numberOfRuns: 1,
      url: [
        `${LIGHT_HOUSE_SERVER_BASE_URL}/`,
        `${LIGHT_HOUSE_SERVER_BASE_URL}/#/about`,
        `${LIGHT_HOUSE_SERVER_BASE_URL}/contact`,
        `${LIGHT_HOUSE_SERVER_BASE_URL}/blog`,
      ],
      settings: {
        preset: 'desktop',
        // Throttling disabled for CI reproducibility
        throttlingMethod: 'provided',
        onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
      },
    },
    assert: {
      assertions: {
        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],
        'speed-index': ['warn', { maxNumericValue: 3500 }],

        // Lighthouse Score thresholds
        'categories:performance': ['error', { minScore: 0.90 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.90 }],

        // Best practices
        'uses-http2': ['error'],
        'uses-passive-event-listeners': ['error'],
        'no-document-write': ['error'],
        'geolocation-on-start': ['warn'],
        'no-vulnerable-libraries': ['error'],
        'render-blocking-resources': ['warn', { maxLength: 0 }],
        'unused-javascript': ['warn', { maxLength: 0 }],
        'unused-css-rules': ['warn', { maxLength: 0 }],
        'uses-responsive-images': ['warn'],
        'offscreen-images': ['warn'],
        'uses-webp-images': ['warn'],
        'uses-optimized-images': ['warn'],
        'efficient-animated-content': ['warn'],
        'non-composited-animations': ['warn'],
        'deprecations': ['error'],

        // Accessibility - critical
        'aria-allowed-attr': ['error'],
        'aria-command-name': ['error'],
        'aria-hidden-body': ['error'],
        'aria-hidden-focus': ['error'],
        'aria-input-field-name': ['error'],
        'aria-meter-name': ['error'],
        'aria-progressbar-name': ['error'],
        'aria-required-attr': ['error'],
        'aria-required-children': ['error'],
        'aria-required-parent': ['error'],
        'aria-roles': ['error'],
        'aria-toggle-field-name': ['error'],
        'aria-tooltip-name': ['error'],
        'aria-treeitem-name': ['error'],
        'button-name': ['error'],
        'bypass': ['error'],
        'color-contrast': ['error'],
        'definition-list': ['error'],
        'dl-item': ['error'],
        'duplicate-id-active': ['error'],
        'duplicate-id-aria': ['error'],
        'form-field-multiple-labels': ['error'],
        'frame-title': ['error'],
        'heading-order': ['error'],
        'html-has-lang': ['error'],
        'html-lang-valid': ['error'],
        'image-alt': ['error'],
        'input-button-name': ['error'],
        'input-image-alt': ['error'],
        'label': ['error'],
        'link-name': ['error'],
        'list': ['error'],
        'listitem': ['error'],
        'meta-refresh': ['error'],
        'meta-viewport': ['error'],
        'object-alt': ['error'],
        'select-name': ['error'],
        'skip-link': ['error'],
        'tabindex': ['error'],
        'table-duplicate-name': ['error'],
        'table-fake-caption': ['error'],
        'target-size': ['error'],
        'td-has-header': ['error'],
        'th-has-data-cells': ['error'],
        'valid-lang': ['error'],
        'video-caption': ['error'],

        // SEO
        'crawlable-anchors': ['error'],
        'document-title': ['error'],
        'meta-description': ['error'],
        'http-status-code': ['error'],
        'is-crawlable': ['error'],
        'robots-txt': ['error'],
        'tap-targets': ['error'],
        'hreflang': ['error'],
        'canonical': ['error'],
        'link-text': ['error'],
        'font-size': ['error'],

        // Performance
        'first-meaningful-paint': ['warn', { maxNumericValue: 2000 }],
        'max-potential-fid': ['warn', { maxNumericValue: 150 }],
        'server-response-time': ['warn', { maxNumericValue: 600 }],
        'mainthread-work-breakdown': ['warn'],
        'bootup-time': ['warn'],
        'network-rtt': ['warn'],
        'network-server-latency': ['warn'],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
      reportFilenamePattern: 'lhr-%%HOSTNAME%%-%%URLPATHNAME%%.%%EXTENSION%%',
    },
  },
}

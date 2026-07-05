const CASE_STUDY_PREFIX = '#/case-studies/'
const ABOUT_PAGE_HASH = '#/about'
const LEGAL_PAGE_HASHES = ['#/privacy', '#/terms', '#/cookies']

export function isOnCaseStudyPage(): boolean {
  return window.location.hash.startsWith(CASE_STUDY_PREFIX)
}

export function isOnAboutPage(): boolean {
  return window.location.hash === ABOUT_PAGE_HASH
}

export function isOnLegalPage(): boolean {
  return LEGAL_PAGE_HASHES.includes(window.location.hash)
}

export function getActiveCaseStudySlug(): string | null {
  if (!isOnCaseStudyPage()) return null
  return window.location.hash.replace(CASE_STUDY_PREFIX, '')
}

export function navigateToCaseStudy(slug: string) {
  window.location.hash = `${CASE_STUDY_PREFIX}${slug}`
  window.scrollTo(0, 0)
}

export function navigateToAboutPage() {
  window.location.hash = ABOUT_PAGE_HASH
  window.scrollTo(0, 0)
}

export function navigateToLegalPage(page: 'privacy' | 'terms' | 'cookies') {
  window.location.hash = `#/${page}`
  window.scrollTo(0, 0)
}

export function navigateHome() {
  window.location.hash = ''
  window.scrollTo(0, 0)
}

export function navigateToSection(sectionId: string) {
  if (isOnCaseStudyPage() || isOnAboutPage() || isOnLegalPage()) {
    window.location.hash = ''
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  } else {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

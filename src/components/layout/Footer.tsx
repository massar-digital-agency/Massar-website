import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Mail, MapPin, Phone, Clock, Monitor, ShieldCheck, Zap } from 'lucide-react'
import { HoverSlideText } from '@/components/ui/HoverSlideText'
import { useNavigate } from 'react-router-dom'
import { navigateToSection, navigateToAboutPage } from '@/lib/navigate'
import { trackEvent } from '@/lib/analytics'
import Logo from '@/assets/images/Logo.svg'

const companyLinks = ['about', 'services', 'projects', 'pricing', 'contact'] as const

const resourceKeys = ['blog', 'faq', 'process'] as const

const legalKeys = ['privacy', 'terms', 'cookies'] as const

const socialNetworks = ['instagram', 'linkedin', 'tiktok'] as const

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-5 text-[13px] font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase">
        {heading}
      </h3>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  )
}

export function Footer() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const email = t('footer.email')
  const phone = t('footer.phone')

  const handleCompanyClick = (key: string) => () => {
    trackEvent('footer_link_click', { link_type: 'company', link_text: key })
    if (key === 'about') {
      navigateToAboutPage()
    } else {
      navigateToSection(key)
    }
  }

  const handleResourceClick = (key: string) => () => {
    trackEvent('footer_link_click', { link_type: 'resource', link_text: key })
    if (key === 'faq') navigateToSection('faq')
    else if (key === 'process') navigateToSection('process')
  }

  const socialUrl = (network: string): string => {
    const urls = t('footer.social', { returnObjects: true }) as Record<string, string>
    return urls[network] || '#'
  }

  const trackSocial = (network: string) => {
    trackEvent('outbound_click', { outbound_type: 'social', outbound_label: network })
  }

  const trackOutbound = (type: string, label: string) => {
    trackEvent('outbound_click', { outbound_type: type, outbound_label: label })
  }

  return (
    <footer className="border-t border-[#E4E4E7]">
      <Container>
        {/* ─── CTA Section ─── */}
        

        {/* ─── Main Footer Grid ─── */}
        <div className="grid gap-10 py-16 sm:py-20 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" onClick={() => trackEvent('logo_click', { location: 'footer' })} className="inline-flex items-center gap-2.5 mb-5">
              <img src={Logo} alt="Massar Digital Studio" loading="lazy" className="h-8 w-auto" />
              <span className="text-[16px] font-bold text-[#0A0A0A]">Massar</span>
            </a>
            <p className="text-[14px] leading-[1.75] text-[#71717A] max-w-[260px]">
              {t('footer.description')}
            </p>
          </div>

          {/* Company */}
          <FooterColumn heading={t('footer.companyHeading')}>
            {companyLinks.map((key) => (
              <button
                key={key}
                type="button"
                onClick={handleCompanyClick(key)}
                className="group text-[14px] text-[#71717A] w-fit text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
              >
                <HoverSlideText>{t(`nav.${key}`)}</HoverSlideText>
              </button>
            ))}
          </FooterColumn>

          {/* Resources */}
          <FooterColumn heading={t('footer.resourcesHeading')}>
              {resourceKeys.map((key) => {
                if (key === 'blog') {
                  return (
                    <a
                      key={key}
                      href="/blog"
                      onClick={() => trackEvent('footer_link_click', { link_type: 'resource', link_text: 'blog' })}
                      className="group text-[14px] text-[#71717A] w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
                    >
                      <HoverSlideText>{t('footer.blog')}</HoverSlideText>
                    </a>
                  )
                }
              return (
                <button
                  key={key}
                  type="button"
                  onClick={handleResourceClick(key)}
                  className="group text-[14px] text-[#71717A] w-fit text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
                >
                  <HoverSlideText>{t(`footer.${key}`)}</HoverSlideText>
                </button>
              )
            })}
          </FooterColumn>

          {/* Legal */}
          <FooterColumn heading={t('footer.legalHeading')}>
            {legalKeys.map((key) => (
              <a
                key={key}
                href={`/${key}`}
                onClick={(e) => {
                  e.preventDefault()
                  trackEvent('footer_link_click', { link_type: 'legal', link_text: key })
                  navigate(`/${key}`)
                }}
                className="group text-[14px] text-[#71717A] w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
              >
                <HoverSlideText>{t(`footer.${key}`)}</HoverSlideText>
              </a>
            ))}
          </FooterColumn>

          {/* Contact + Social combined */}
          <FooterColumn heading={t('footer.socialHeading')}>
            <div className="flex flex-col gap-3">
              {socialNetworks.map((network) => (
                <a
                  key={network}
                  href={socialUrl(network)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocial(network)}
                  className="group text-[14px] text-[#71717A] w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
                  aria-label={`${network.charAt(0).toUpperCase() + network.slice(1)} (opens in new tab)`}
                >
                  <HoverSlideText>{network.charAt(0).toUpperCase() + network.slice(1)}</HoverSlideText>
                </a>
              ))}
            </div>
            <div className="mt-6 border-t border-[#E4E4E7] pt-6 flex flex-col gap-3">
              <a
                href={`mailto:${email}`}
                onClick={() => trackOutbound('email', email)}
                className="flex items-center gap-2.5 text-[14px] text-[#71717A] transition-colors duration-200 hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{email}</span>
              </a>
              <a
                href={`tel:${phone}`}
                onClick={() => trackOutbound('phone', phone)}
                className="flex items-center gap-2.5 text-[14px] text-[#71717A] transition-colors duration-200 hover:text-[#0A0A0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span dir="ltr">{phone}</span>
              </a>
              <span className="flex items-center gap-2.5 text-[14px] text-[#71717A]">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t('footer.location')}</span>
              </span>
              <span className="flex items-center gap-2.5 text-[14px] text-[#71717A]">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t('footer.hours')}</span>
              </span>
            </div>
          </FooterColumn>
        </div>

        {/* ─── Dual CTA Row ─── */}
        

        {/* ─── Copyright + Trust ─── */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#E4E4E7] py-7 sm:flex-row">
          <p className="text-[13px] text-[#71717A]">
            &copy; {new Date().getFullYear()} Massar Digital Studio. {t('footer.rights')}.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-[#A1A1AA]">
            <span className="flex items-center gap-1.5">
              <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
              {t('footer.badges.responsive')}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#D4D4D8]" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {t('footer.badges.secure')}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#D4D4D8]" />
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" aria-hidden="true" />
              {t('footer.badges.performance')}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from '@/assets/images/Logo.svg'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-[#E4E4E7]">
      <Container>
        <div className="grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <a href="#" className="inline-flex items-center gap-2.5 mb-5">
              <img src={Logo} alt="" className="h-8 w-auto" />
              <span className="text-[16px] font-bold text-[#0A0A0A]">Massar</span>
            </a>
            <p className="text-[14px] leading-[1.75] text-[#71717A] max-w-[260px]">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-[13px] font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase">
              {t('footer.navigation')}
            </h4>
            <div className="flex flex-col gap-3">
              {['services', 'projects', 'about', 'contact'].map((key) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-[14px] text-[#71717A] transition-colors duration-200 hover:text-[#0A0A0A]"
                >
                  {t(`nav.${key}`)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[13px] font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase">
              {t('footer.contact')}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${t('footer.email')}`}
                className="flex items-center gap-2.5 text-[14px] text-[#71717A] transition-colors duration-200 hover:text-[#0A0A0A]"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>{t('footer.email')}</span>
              </a>
              <a
                href={`tel:${t('footer.phone')}`}
                className="flex items-center gap-2.5 text-[14px] text-[#71717A] transition-colors duration-200 hover:text-[#0A0A0A]"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span dir="ltr">{t('footer.phone')}</span>
              </a>
              <span className="flex items-center gap-2.5 text-[14px] text-[#71717A]">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{t('footer.location')}</span>
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[13px] font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase">
              {t('footer.followUs')}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/massar.digital.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-[#71717A] transition-colors duration-200 hover:text-[#0A0A0A]"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-[#71717A] transition-colors duration-200 hover:text-[#0A0A0A]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#E4E4E7] py-7 sm:flex-row">
          <p className="text-[13px] text-[#A1A1AA]">
            &copy; {new Date().getFullYear()} Massar Digital Studio. {t('footer.rights')}.
          </p>
        </div>
      </Container>
    </footer>
  )
}

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Mail, MapPin, Phone, Monitor, ShieldCheck, Zap, ArrowRight } from 'lucide-react'
import { HoverSlideText } from '@/components/ui/HoverSlideText'
import Logo from '@/assets/images/Logo.svg'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-[#E4E4E7]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 text-center rounded-2xl border border-[#E4E4E7] bg-white px-8 py-10 sm:px-12 sm:py-12"
        >
          <h3 className="text-[20px] font-bold text-[#0A0A0A] sm:text-[24px]">
            {t('footer.cta')}
          </h3>
          <p className="mt-3 text-[14px] text-[#71717A] sm:text-[15px]">
            {t('footer.ctaMicro')}
          </p>
          <div className="mt-6">
            <Button size="lg" href="#contact">
              {t('nav.cta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>

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
                  className="group text-[14px] text-[#71717A] w-fit"
                >
                  <HoverSlideText>{t(`nav.${key}`)}</HoverSlideText>
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
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t('footer.email')}</span>
              </a>
              <a
                href={`tel:${t('footer.phone')}`}
                className="flex items-center gap-2.5 text-[14px] text-[#71717A] transition-colors duration-200 hover:text-[#0A0A0A]"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span dir="ltr">{t('footer.phone')}</span>
              </a>
              <span className="flex items-center gap-2.5 text-[14px] text-[#71717A]">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
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
                className="group text-[14px] text-[#71717A] w-fit"
                aria-label="Instagram (opens in new tab)"
              >
                <HoverSlideText>Instagram</HoverSlideText>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-[14px] text-[#71717A] w-fit"
                aria-label="LinkedIn (opens in new tab)"
              >
                <HoverSlideText>LinkedIn</HoverSlideText>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[13px] font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase">
              {t('footer.trust')}
            </h4>
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-2.5 text-[14px] text-[#71717A]">
                <Monitor className="h-4 w-4 shrink-0 text-[#8B5CF6]" />
                {t('footer.badges.responsive')}
              </span>
              <span className="flex items-center gap-2.5 text-[14px] text-[#71717A]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                {t('footer.badges.secure')}
              </span>
              <span className="flex items-center gap-2.5 text-[14px] text-[#71717A]">
                <Zap className="h-4 w-4 shrink-0 text-amber-500" />
                {t('footer.badges.performance')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#E4E4E7] py-7 sm:flex-row">
          <p className="text-[13px] text-[#71717A]">
            &copy; {new Date().getFullYear()} Massar Digital Studio. {t('footer.rights')}.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-[#A1A1AA]">
            <span>15+ Projects</span>
            <span className="h-1 w-1 rounded-full bg-[#D4D4D8]" />
            <span>3+ Years</span>
            <span className="h-1 w-1 rounded-full bg-[#D4D4D8]" />
            <span>Algeria</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

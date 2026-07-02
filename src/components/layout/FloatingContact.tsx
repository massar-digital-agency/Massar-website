import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.37 5.07L2 22l5.18-1.46a9.86 9.86 0 0 0 4.86 1.27h.005c5.46 0 9.91-4.45 9.91-9.91C21.955 6.45 17.5 2 12.04 2zm0 18.06h-.004a8.2 8.2 0 0 1-4.176-1.142l-.299-.178-3.075.866.82-2.997-.194-.307a8.18 8.18 0 0 1-1.255-4.39c0-4.527 3.683-8.21 8.187-8.21 2.187 0 4.243.852 5.79 2.4a8.13 8.13 0 0 1 2.397 5.792c0 4.527-3.683 8.21-8.19 8.21z" />
    </svg>
  )
}

export function FloatingContact() {
  const { t } = useTranslation()
  const email = t('footer.email')
  const phone = t('footer.phone').replace(/[^\d]/g, '')

  const actions = [
    {
      key: 'whatsapp',
      href: `https://wa.me/${phone}`,
      external: true,
      icon: <WhatsAppIcon className="h-5 w-5" />,
      bg: 'bg-[#25D366]',
      label: 'Contact us on WhatsApp',
    },
    {
      key: 'email',
      href: `mailto:${email}`,
      external: false,
      icon: <Mail className="h-5 w-5" />,
      bg: 'bg-[#0A0A0A]',
      label: 'Send us an email',
    },
  ]

  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col items-center gap-3">
      {actions.map(({ key, href, external, icon, bg, label }, i) => (
        <motion.a
          key={key}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          onClick={() => trackEvent('outbound_click', { outbound_type: key, outbound_label: label })}
          aria-label={external ? `${label} (opens in new tab)` : label}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full text-white ${bg}`}
        >
          {icon}
        </motion.a>
      ))}
    </div>
  )
}

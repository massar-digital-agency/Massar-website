import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  buttonId: string
  panelId: string
  onRequestClose: () => void
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  buttonId,
  panelId,
  onRequestClose,
}: AccordionItemProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      if (isOpen) {
        onRequestClose()
        if (buttonRef.current) buttonRef.current.focus()
      }
      return
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const container = buttonRef.current?.closest('[data-accordion]')
      if (!container) return

      const buttons = Array.from(
        container.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]'),
      )
      const currentIndex = buttons.indexOf(buttonRef.current as HTMLButtonElement)
      if (currentIndex === -1) return

      let nextIndex: number
      if (e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % buttons.length
      } else {
        nextIndex = (currentIndex - 1 + buttons.length) % buttons.length
      }
      buttons[nextIndex].focus()
    }
  }

  return (
    <div className="border-b border-[#E4E4E7] last:border-b-0">
      <h3>
        <button
          ref={buttonRef}
          data-accordion-trigger
          type="button"
          id={buttonId}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center justify-between py-5 sm:py-6 text-start transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:rounded-lg"
        >
          <span className="pe-6 text-[15px] font-semibold text-[#0A0A0A] sm:text-[16px] group-hover:text-[#8B5CF6] transition-colors">
            {question}
          </span>
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E4E4E7] text-[#52525B] transition-all group-hover:border-[#8B5CF6] group-hover:text-[#8B5CF6]"
            aria-hidden="true"
          >
            {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          </span>
        </button>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              <p className="text-[15px] leading-[1.7] text-[#52525B]">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface AccordionProps {
  items: { question: string; answer: string }[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const closePanel = useCallback(() => {
    setOpenIndex(null)
  }, [])

  return (
    <div data-accordion>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          buttonId={`faq-button-${index}`}
          panelId={`faq-panel-${index}`}
          onRequestClose={closePanel}
        />
      ))}
    </div>
  )
}

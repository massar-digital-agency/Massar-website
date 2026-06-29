import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-[#E4E4E7] last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 sm:py-6 text-start transition-colors focus-visible:outline-none group"
        aria-expanded={isOpen}
      >
        <span className="pe-6 text-[15px] font-semibold text-[#0A0A0A] sm:text-[16px] group-hover:text-[#8B5CF6] transition-colors">
          {question}
        </span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E4E4E7] text-[#52525B] transition-all group-hover:border-[#8B5CF6] group-hover:text-[#8B5CF6]">
          {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[15px] leading-[1.7] text-[#52525B]">
              {answer}
            </p>
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

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}

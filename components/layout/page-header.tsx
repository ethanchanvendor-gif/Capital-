import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pb-8 border-b border-border mb-8"
    >
      <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
      {description && (
        <p className="text-text-secondary">{description}</p>
      )}
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import Link from 'next/link'
import { twJoin } from 'tailwind-merge'

export const Footer = () => {
  return (
    <footer
      className={twJoin(
        'mt-auto flex min-h-36 items-center justify-center bg-gradient-to-r from-red-500 via-indigo-500 to-blue-500 bg-clip-text text-xs font-semibold italic text-transparent md:text-base'
      )}
    >
      <Link href="https://github.com/ramazanix" target="_blank">
        &copy;ramazanix
      </Link>
    </footer>
  )
}

export const MFooter = () => {
  return (
    <motion.footer
      className={twJoin(
        'mt-auto flex min-h-24 items-center justify-center bg-gradient-to-r from-red-500 via-indigo-500 to-blue-500 bg-clip-text text-xs font-semibold italic text-transparent md:text-base'
      )}
      initial={{ marginBottom: 1, opacity: 0 }}
      animate={{ marginBottom: 56, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.7, ease: 'easeInOut' }}
    >
      <Link href="https://github.com/ramazanix" target="_blank">
        &copy;ramazanix
      </Link>
    </motion.footer>
  )
}

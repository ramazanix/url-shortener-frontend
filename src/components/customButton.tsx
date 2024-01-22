import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

enum BackgroundColorsStyles {
  red = 'bg-red-300/70 hover:bg-red-300 focus:ring-red-300',
  yellow = 'bg-yellow-300/70 hover:bg-yellow-300 focus:ring-yellow-300',
  green = 'bg-green-300/70 hover:bg-green-300 focus:ring-green-300',
  blue = 'bg-blue-300/70 hover:bg-blue-300 focus:ring-blue-300',
  purple = 'bg-indigo-300/70 hover:bg-indigo-300 focus:ring-indigo-300',
}

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string
  type: 'submit' | 'button' | 'reset'
  bgColor?: keyof typeof BackgroundColorsStyles
  className?: string
}

export const CustomButton: React.FC<ButtonProps> = ({
  text,
  bgColor = 'blue',
  type,
  className,
  disabled,
  onClick,
}) => {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        className={twMerge(
          'w-full rounded-lg px-5 py-2.5 font-medium text-gray-900/70 duration-200 focus:outline-none focus:ring-2',
          `${BackgroundColorsStyles[bgColor]}`,
          className
        )}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  )
}

export const MCustomButton: React.FC<ButtonProps> = ({
  text,
  bgColor = 'blue',
  type,
  className,
  disabled,
  onClick,
}) => {
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        disabled={disabled}
        type={type}
        className={twMerge(
          'w-full rounded-lg px-5 py-2.5 font-medium text-gray-900/70 duration-200 focus:outline-none focus:ring-2',
          `${BackgroundColorsStyles[bgColor]}`,
          className
        )}
        onClick={onClick}
      >
        {text}
      </motion.button>
    </>
  )
}

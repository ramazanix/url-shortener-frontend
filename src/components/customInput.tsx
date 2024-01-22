import { twJoin } from 'tailwind-merge'

enum BackgroundColorsStyles {
  red = 'focus:border-amber-50 focus:ring-red-400/90',
  yellow = 'focus:border-yellow-50 focus:ring-yellow-300/90',
  green = 'focus:border-emerald-50 focus:ring-emerald-300/90',
  blue = 'focus:border-blue-50 focus:ring-blue-400/90',
  purple = 'focus:border-indigo-50 focus:ring-indigo-400/90',
}

interface Props {
  id: string
  text: string
  maxLength: number
  value?: string
  placeholder?: string
  name?: string
  reference?: React.RefObject<HTMLInputElement>
  inputType?: 'text' | 'email' | 'password'
  required?: boolean
  color?: keyof typeof BackgroundColorsStyles
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput: React.FC<Props> = ({
  id,
  text,
  maxLength,
  placeholder,
  reference,
  handleChange,
  name = id,
  inputType = 'text',
  required = false,
  color = 'blue',
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className={twJoin(
          'mb-2 block font-medium',
          required && "after:ml-0.5 after:text-red-400 after:content-['*']"
        )}
      >
        {text}
      </label>
      <input
        type={inputType}
        id={id}
        name={name}
        ref={reference}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className={twJoin(
          'box-shadow block h-8 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-[inset_0_0_0px_1000px_rgb(249,250,251)] duration-300 focus:outline-none focus:ring md:h-10 lg:h-12',
          BackgroundColorsStyles[color]
        )}
        onChange={handleChange}
      ></input>
    </>
  )
}

export default CustomInput

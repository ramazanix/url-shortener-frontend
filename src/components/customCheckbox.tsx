import React from 'react'
import { twJoin } from 'tailwind-merge'

enum BackgroundColorsStyles {
  red = 'accent-red-500',
  yellow = 'accent-yellow-400',
  green = 'accent-emerald-600',
  blue = 'accent-blue-500',
  purple = 'accent-indigo-500',
}

interface Props {
  id: string
  ariaDescribedby?: string
  text: string
  onClick: React.MouseEventHandler
  bgColor?: keyof typeof BackgroundColorsStyles
}

export const CustomCheckbox: React.FC<Props> = ({
  id,
  ariaDescribedby,
  text,
  onClick,
  bgColor = 'red',
}) => {
  return (
    <>
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            type="checkbox"
            id={id}
            onClick={onClick}
            aria-describedby={ariaDescribedby ? ariaDescribedby : id}
            className={twJoin(
              'h-4 w-4 cursor-pointer rounded border border-gray-500 duration-200 focus:ring-0 focus:ring-offset-0',
              BackgroundColorsStyles[bgColor]
            )}
          />
        </div>
        <div className="-mb-1 ml-2 inline-flex align-top text-sm">
          <label htmlFor={id} className="text-gray-500">
            {text}
          </label>
        </div>
      </div>
    </>
  )
}

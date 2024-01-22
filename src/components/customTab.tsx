import { twJoin } from 'tailwind-merge'

interface Props {
  openedTab: number
  onChangeTab: (id: number) => void
}

export const CustomTab: React.FC<Props> = ({ openedTab, onChangeTab }) => {
  return (
    <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500">
      <ul className="-mb-px flex flex-nowrap">
        <li className="me-2">
          <a
            className={twJoin(
              'inline-block cursor-pointer rounded-t-lg border-b-2 p-4',
              openedTab === 0
                ? 'active border-indigo-600 text-indigo-600'
                : 'border-transparent hover:border-gray-300 hover:text-gray-600'
            )}
            onClick={(e) => {
              e.preventDefault()
              onChangeTab(0)
            }}
          >
            Default
          </a>
        </li>
        <li className="me-2">
          <a
            className={twJoin(
              'inline-block cursor-pointer rounded-t-lg border-b-2 p-4',
              openedTab === 1
                ? 'active border-indigo-600 text-indigo-600'
                : 'border-transparent hover:border-gray-300 hover:text-gray-600'
            )}
            onClick={(e) => {
              e.preventDefault()
              onChangeTab(1)
            }}
          >
            Custom
          </a>
        </li>
      </ul>
    </div>
  )
}

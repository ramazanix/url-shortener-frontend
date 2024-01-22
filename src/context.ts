import { createContext } from 'react'
import { IUser } from '@/app/types'

export const UserContext = createContext<{
  user: IUser | null
  userIsLoading: boolean
}>({
  user: null,
  userIsLoading: true,
})

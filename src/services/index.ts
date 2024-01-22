import UsersClient from '@/services/UsersClient'
import AuthClient from '@/services/AuthClient'
import UrlsClient from './UrlsClient'

export const authService = new AuthClient(
  `${process.env.NEXT_PUBLIC_API_URL}/auth`
)
export const usersService = new UsersClient(
  `${process.env.NEXT_PUBLIC_API_URL}/users`
)
export const urlsService = new UrlsClient(
  `${process.env.NEXT_PUBLIC_API_URL}/urls`
)

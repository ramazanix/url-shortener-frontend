import Cookies from 'js-cookie'
import { authService } from '@/services'

interface Props {
  username: string
  password: string
  rememberMe: boolean
}

export const useLogin = () => {
  const login = async (props: Props) => {
    const { username, password, rememberMe } = props
    const tokens = await authService.auth.login(username, password)
    const accessExpires = 1 / 48
    const refreshExpires = 15
    if (tokens.status === 'success') {
      if (rememberMe) {
        Cookies.set('accessToken', tokens.data.accessToken, {
          expires: accessExpires,
        })
        Cookies.set('refreshToken', tokens.data.refreshToken, {
          expires: refreshExpires,
        })
      } else {
        Cookies.set('accessToken', tokens.data.accessToken)
        Cookies.set('refreshToken', tokens.data.refreshToken)
      }
    }
    return tokens
  }

  return { login }
}

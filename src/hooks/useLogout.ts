import Cookies from 'js-cookie'
import { authService } from '@/services'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const router = useRouter()
  const logout = async () => {
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')
    if (accessToken && refreshToken) {
      await authService.auth.revokeAccessToken(accessToken)
      await authService.auth.revokeRefreshToken(refreshToken)
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      router.refresh()
    }
  }

  return { logout }
}

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { AuthTokens, IUser } from '@/app/types'
import { authService } from '@/services'
import { useRouter } from 'next/navigation'

export const useCurrentUser = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [tokens, setTokens] = useState<AuthTokens>({
    accessToken: Cookies.get('accessToken'),
    refreshToken: Cookies.get('refreshToken'),
  })
  const router = useRouter()
  const [userIsLoading, setUserIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (tokens.accessToken) {
      authService.auth
        .currentUser(tokens.accessToken)
        .then((userData) => {
          setUser(userData!)
          setUserIsLoading(false)
        })
        .catch((e) => {
          if (e.status === 422 || e.status === 401) {
            authService.auth
              .revokeAccessToken(tokens.accessToken!)
              .catch((e) => console.log(e))

            if (tokens.refreshToken) {
              authService.auth
                .refreshAccessToken(tokens.refreshToken)
                .then((accessToken) => {
                  Cookies.set('accessToken', accessToken?.accessToken)
                  setTokens({
                    ...tokens,
                    accessToken: accessToken?.accessToken,
                  })
                  router.refresh()
                })
                .catch(() => {
                  Cookies.remove('accessToken')
                  Cookies.remove('refreshToken')
                  router.refresh()
                })
            } else {
              Cookies.remove('accessToken')
              Cookies.remove('refreshToken')
              router.refresh()
            }
          }
        })
    } else {
      if (tokens.refreshToken) {
        authService.auth
          .refreshAccessToken(tokens.refreshToken)
          .then((accessToken) => {
            Cookies.set('accessToken', accessToken?.accessToken)
            setTokens({ ...tokens, accessToken: accessToken?.accessToken })
            router.refresh()
          })
          .catch(() => {
            Cookies.remove('accessToken')
            Cookies.remove('refreshToken')
            router.refresh()
          })
      } else {
        setUserIsLoading(false)
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        router.push('/login')
      }
    }
  }, [tokens, router])
  return { user, userIsLoading }
}

'use client'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { UserContext } from '@/context'

export default function MainTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, userIsLoading } = useCurrentUser()
  return (
    <UserContext.Provider value={{ user, userIsLoading }}>
      {children}
    </UserContext.Provider>
  )
}

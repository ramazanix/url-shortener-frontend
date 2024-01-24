'use client'

import { UserContext } from '@/context'
import Cookies from 'js-cookie'
import { useContext, useEffect, useState } from 'react'
import { urlsService, usersService } from '@/services'
import { parseDate } from '@/utils'
import { IUrlBase } from '@/app/types'
import { MFooter } from '@/components/footer'
import { AnimatePresence, motion } from 'framer-motion'
import { CustomButton } from '@/components/customButton'
import { useRouter } from 'next/navigation'
import { useLogout } from '@/hooks/useLogout'
import Link from 'next/link'

export default function UserPage({ params }: { params: { username: string } }) {
  const router = useRouter()
  const { user, userIsLoading } = useContext(UserContext)
  const [userUrls, setUserUrls] = useState<Array<IUrlBase>>([])
  const [deleteUrl, setDeleteUrl] = useState('')
  let data = userUrls.slice()
  const accessToken = Cookies.get('accessToken')
  const { logout } = useLogout()

  const handleLogout = () => {
    logout().then(() => router.push('/login'))
  }

  useEffect(() => {
    if (user?.username !== params.username) {
      router.replace(`/users/${user?.username}`)
    }
    async function fetchUrls() {
      await usersService.users
        .urls(accessToken!)
        .then((res) => {
          setUserUrls(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    fetchUrls()
  }, [accessToken, params.username, user?.username, deleteUrl, router])

  const handleRemoveUrl = async (shortName: string) => {
    await urlsService.urls.delete(shortName, accessToken!).then(() => {
      setDeleteUrl(shortName)
    })
  }

  return (
    <>
      <main className="flex justify-center pt-24">
        <motion.div
          className="absolute right-14 top-5 flex flex-row gap-6"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <CustomButton
            text="Main Page"
            type="button"
            className="w-fit"
            onClick={() => {
              router.push('/')
            }}
          />
          <CustomButton
            text="Logout"
            type="button"
            className="w-fit"
            onClick={handleLogout}
          />
        </motion.div>
        <AnimatePresence>
          {user && (
            <>
              {data.length !== 0 ? (
                <motion.table
                  className="table-auto border-collapse rounded-xl border border-slate-400 bg-indigo-300/60"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 1, ease: 'backInOut' }}
                >
                  <motion.caption
                    className="pointer-events-none caption-top pb-7 text-2xl font-semibold uppercase tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {user.username}
                  </motion.caption>
                  <thead>
                    <tr>
                      <th className="border border-slate-300">Short link</th>
                      <th className="border border-slate-300">Full link</th>
                      <th className="border border-slate-300">Creation time</th>
                      <th className="border border-slate-300"></th>
                      <th className="border border-slate-300"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {data.toReversed().map((val: IUrlBase, idx) => (
                        <motion.tr
                          key={idx}
                          exit={{
                            opacity: 0,
                            maxHeight: 0,
                            x: 100,
                          }}
                          transition={{ duration: 0.4 }}
                          layout
                        >
                          <motion.td className="border border-slate-300 p-3 text-center">
                            {`http://localhost:3000/l/${val.short_name}`}
                          </motion.td>
                          <motion.td className="border border-slate-300 p-3 text-center">
                            {val.full_name}
                          </motion.td>
                          <motion.td className="border border-slate-300 p-3 text-center">
                            {parseDate(val.created_at).toLocaleDateString()}{' '}
                            {parseDate(val.created_at).toLocaleTimeString()}
                          </motion.td>
                          <motion.td className="border border-slate-300 p-3 text-center">
                            <motion.button
                              type="button"
                              onClick={() => {
                                router.push(`/urls/${val.short_name}`)
                              }}
                              whileTap={{ scale: 0.8 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 17,
                              }}
                            >
                              ✏️
                            </motion.button>
                          </motion.td>
                          <motion.td className="border border-slate-300 p-3 text-center">
                            <motion.button
                              type="button"
                              onClick={async () => {
                                await handleRemoveUrl(val.short_name)
                              }}
                              whileTap={{ scale: 0.8 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 17,
                              }}
                            >
                              ❌
                            </motion.button>
                          </motion.td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </motion.table>
              ) : (
                <motion.div
                  className="flex flex-col items-center pt-24 text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span>No info about your links :(</span>
                  <span>
                    <Link
                      href={'/'}
                      className="underline underline-offset-2 transition ease-out hover:bg-black hover:text-white hover:no-underline"
                    >
                      Generate
                    </Link>{' '}
                    your first link
                  </span>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>
      <MFooter />
    </>
  )
}

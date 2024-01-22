'use client'

import { CustomButton, MCustomButton } from '../../components/customButton'
import { useState, useRef, useContext } from 'react'
import { CustomTab } from '../../components/customTab'
import CustomInput from '../../components/customInput'
import { rubikFont } from '@/fonts'
import { twJoin } from 'tailwind-merge'
import { motion, AnimatePresence } from 'framer-motion'
import { MFooter } from '../../components/footer'
import { UserContext } from '@/context'
import { useLogout } from '@/hooks/useLogout'
import { useRouter } from 'next/navigation'
import { urlsService } from '@/services'
import Cookies from 'js-cookie'

export default function Home() {
  const accessToken = Cookies.get('accessToken')
  const router = useRouter()
  const { user, userIsLoading } = useContext(UserContext)
  const [result, setResult] = useState('')
  const { logout } = useLogout()
  const [openedTab, setOpenedTab] = useState<number>(0)
  const urlInputRef = useRef<HTMLInputElement>(null)
  const slugInputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState('')

  const handleChangeTab = (id: number) => {
    setResult('')
    setOpenedTab(id)
  }

  const handleLogout = () => {
    logout().then(() => router.push('/login'))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setError('')

    let url = urlInputRef.current?.value
    let slug = slugInputRef.current?.value

    if (openedTab === 0) {
      await urlsService.urls.createDefault(url!, accessToken!).then((res) => {
        if (res.status === 'success') {
          setResult(`http://localhost:3000/l/${res.data.short_name}`)
        } else {
          if (res.statusCode === 400) {
            setError(res.data)
          }
        }
      })
    } else {
      await urlsService.urls
        .createCustom(url!, slug!, accessToken!)
        .then((res) => {
          if (res.status === 'success') {
            setResult(`http://localhost:3000/l/${res.data.short_name}`)
          } else {
            if (res.statusCode === 400) {
              setError(res.data)
            }
          }
        })
    }
  }

  return (
    <>
      {user && (
        <>
          <main className="flex flex-col items-center">
            <motion.div
              className="absolute right-14 top-5 flex flex-row gap-6"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <CustomButton
                text="Profile"
                type="button"
                className="w-fit"
                onClick={() => {
                  router.push(`users/${user.username}`)
                }}
              />
              <CustomButton
                text="Logout"
                type="button"
                className="w-fit"
                onClick={handleLogout}
              />
            </motion.div>
            <motion.div
              className={twJoin(
                'main-title bg-gradient-to-r from-emerald-500 via-blue-500 to-red-500 bg-clip-text px-2 text-center text-3xl font-semibold uppercase tracking-wide text-transparent md:text-5xl lg:text-6xl',
                rubikFont.className
              )}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: '4rem' }}
              transition={{ duration: 0.4, ease: 'circOut' }}
            >
              Cut Your URL
            </motion.div>
            <motion.div
              className="container mt-36 w-fit min-w-64 rounded-lg border-2 border-transparent bg-white shadow-2xl shadow-indigo-500/60 md:lg:mt-48"
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1],
                rotate: [0, 360],
              }}
              transition={{ delay: 0.4 }}
            >
              <div className="m-4 space-y-5 md:m-7 md:space-y-7 lg:m-10 lg:space-y-10">
                <div>
                  <span className="text-m -mt-2 flex justify-center pb-1 font-bold text-red-400">
                    {error}&nbsp;
                  </span>
                  <CustomTab
                    openedTab={openedTab}
                    onChangeTab={handleChangeTab}
                  />
                </div>

                <div className="text-lg md:text-3xl lg:w-96 lg:text-xl">
                  <CustomInput
                    reference={urlInputRef}
                    id="url"
                    text="URL"
                    placeholder="https://example.com"
                    maxLength={150}
                    color="purple"
                    required
                  />
                </div>

                <AnimatePresence>
                  {openedTab === 1 && (
                    <motion.div
                      key="tab"
                      className="text-lg md:text-3xl lg:w-96 lg:text-xl"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.8, ease: 'backInOut' }}
                    >
                      <CustomInput
                        reference={slugInputRef}
                        id="slug"
                        text="Slug"
                        placeholder="my-custom-link"
                        maxLength={20}
                        color="purple"
                        required
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {result && (
                    <motion.div
                      key={'result'}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -50 }}
                      transition={{ duration: 0.8, ease: 'backInOut' }}
                    >
                      Done!
                      <span className="pt-2">{result}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex justify-center">
                  <MCustomButton
                    text="Generate"
                    type="button"
                    bgColor="purple"
                    className="h-12 w-2/3 text-base font-bold md:mt-2 md:h-14 md:text-2xl lg:w-1/2 lg:text-xl"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </motion.div>
          </main>
          <MFooter />
        </>
      )}
    </>
  )
}

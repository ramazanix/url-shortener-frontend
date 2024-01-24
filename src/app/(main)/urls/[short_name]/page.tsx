'use client'

import { IUrl } from '@/app/types'
import { MCustomButton } from '@/components/customButton'
import CustomInput from '@/components/customInput'
import { urlsService } from '@/services'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export default function UrlPage({
  params,
}: {
  params: { short_name: string }
}) {
  const [urlOldSlug, setUrlOldSlug] = useState<string | null>(null)
  const router = useRouter()
  const { user, userIsLoading } = useCurrentUser()
  const accessToken = Cookies.get('accessToken')
  const [urlData, setUrlData] = useState<IUrl | null>(null)
  const [dataIsLoading, setDataIsLoading] = useState(true)
  const [error, setError] = useState('')

  const onSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlData({ ...urlData!, short_name: e.target.value })
  }

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlData({ ...urlData!, full_name: e.target.value })
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError('')

    await urlsService.urls
      .update(
        urlOldSlug!,
        urlData!.short_name,
        urlData!.full_name,
        accessToken!
      )
      .then((res) => {
        if (res.status === 'success') {
          router.push(`/users/${user?.username}`)
        } else {
          setError(res.data)
        }
      })
  }

  useEffect(() => {
    async function fetchUrlData() {
      await urlsService.urls
        .get(params.short_name)
        .then((res) => {
          setUrlData(res.data)
          setDataIsLoading(false)
          setUrlOldSlug(res.data.short_name)
        })
        .catch((e) => console.log(e))
    }

    fetchUrlData()
  }, [])

  return (
    <main className="flex select-none flex-col items-center justify-center">
      {urlData && !dataIsLoading && (
        <motion.div
          className="container mt-36 w-fit min-w-64 rounded-lg border-2 border-transparent bg-white shadow-2xl shadow-indigo-500/60 md:lg:mt-48"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: 1,
          }}
          transition={{ delay: 0.4, duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="m-4 space-y-5 md:m-7 md:space-y-7 lg:m-10 lg:space-y-10">
            <div>
              <span className="text-m -mt-2 flex justify-center pb-1 font-bold text-red-400">
                {error}&nbsp;
              </span>
            </div>
            <div className="text-lg md:text-3xl lg:w-96 lg:text-xl">
              <CustomInput
                id="slug"
                text="Slug"
                value={urlData.short_name}
                placeholder="my-custom-link"
                maxLength={20}
                color="purple"
                handleChange={onSlugChange}
              />
            </div>
            <div className="text-lg md:text-3xl lg:w-96 lg:text-xl">
              <CustomInput
                id="url"
                text="URL"
                value={urlData.full_name}
                placeholder="https://example.com"
                maxLength={150}
                color="purple"
                handleChange={onUrlChange}
              />
            </div>
            <div className="flex justify-center">
              <MCustomButton
                disabled={
                  urlData.short_name.length === 0 ||
                  urlData.full_name.length === 0
                }
                text="Update"
                type="button"
                bgColor="purple"
                className="h-12 w-2/3 text-base font-bold md:mt-2 md:h-14 md:text-2xl lg:w-1/2 lg:text-xl"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </motion.div>
      )}
    </main>
  )
}

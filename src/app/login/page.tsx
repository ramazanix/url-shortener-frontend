'use client'

import Link from 'next/link'
import CustomInput from '../../components/customInput'
import { CustomCheckbox } from '../../components/customCheckbox'
import { CustomButton } from '../../components/customButton'
import { useLogin } from '@/hooks/useLogin'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ParseFieldErrors } from '@/utils'
import { motion } from 'framer-motion'
import { MFooter } from '@/components/footer'

export default function LoginPage() {
  const backRef = useSearchParams().get('backRef')
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    form: '',
  })
  const { login } = useLogin()
  const router = useRouter()

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      username: e.target.value,
    })
    setErrors({
      ...errors,
      username: '',
    })
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      password: e.target.value,
    })
    setErrors({
      ...errors,
      password: '',
    })
  }

  const onRememberClick = () => {
    setUserData({
      ...userData,
      rememberMe: !userData.rememberMe,
    })
  }

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setErrors({
      ...errors,
      form: '',
    })

    login(userData).then((authTokens) => {
      if (authTokens.status === 'success') {
        if (backRef) {
          router.replace(backRef)
        } else {
          router.replace('/')
        }
        router.refresh()
      } else {
        if (authTokens.statusCode === 401) {
          setErrors({
            ...errors,
            form: authTokens.data,
          })
        } else if (authTokens.statusCode === 422) {
          let parsedErrors = ParseFieldErrors(authTokens.data)
          // @ts-ignore
          setErrors(parsedErrors)
        }
      }
    })
  }
  return (
    <>
      <main className="flex select-none flex-col items-center justify-center">
        <motion.div
          className="mt-44 w-full max-w-md rounded-lg bg-white p-0 shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
        >
          <div className="space-y-4 p-6">
            <div>
              <h1 className="flex justify-center text-xl font-bold leading-tight tracking-tight text-indigo-400/90 md:text-2xl">
                Login
              </h1>
              <span className="text-m flex justify-center pt-1 font-bold text-red-400">
                {errors.form}&nbsp;
              </span>
            </div>
            <form className="space-y-2">
              <CustomInput
                id={'username'}
                inputType={'text'}
                placeholder={'username'}
                text={'Username'}
                required={true}
                value={userData.username}
                handleChange={onUsernameChange}
                maxLength={20}
                color="purple"
              />
              <span className="text-sm text-red-400">
                {errors.username}&nbsp;
              </span>
              <CustomInput
                id={'password'}
                inputType={'password'}
                placeholder={'••••••••'}
                text={'Password'}
                required={true}
                value={userData.password}
                handleChange={onPasswordChange}
                maxLength={32}
                color="purple"
              />
              <span className="text-sm text-red-400">
                {errors.password}&nbsp;
              </span>
              <div className="flex items-center justify-between">
                <CustomCheckbox
                  id={'remember'}
                  text={'Remember me'}
                  onClick={onRememberClick}
                  bgColor="purple"
                />
              </div>
              <div className="pt-4">
                <CustomButton
                  text={'Sign in'}
                  type={'submit'}
                  onClick={handleLogin}
                  bgColor="purple"
                />
              </div>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{' '}
                <Link
                  href={'/register'}
                  className="text-primary-600 font-medium hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </main>
      <MFooter />
    </>
  )
}

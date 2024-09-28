'use client'

import { Box } from '@mui/material'
import { Header } from '@/components/main/Header'
import localFont from 'next/font/local'
import { UpperBlock } from '@/components/main/UpperBlock'
import { ReactLenis } from 'lenis/react'
import { BackgroundLogin } from '@/components/login/Background'
import { LoginForm } from '@/components/login/LoginForm'
const myFont = localFont({
  src: [
    {
      path: '../../fonts/RUTUBE_Font/RF_RUTUBE_Light.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../fonts/RUTUBE_Font/RF_RUTUBE_Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../fonts/RUTUBE_Font/RF_RUTUBE_Bold.ttf',
      weight: '900',
      style: 'normal'
    }
  ],
  display: 'swap'
})

export default function Home() {
  return (
    <Box className={myFont.className}>
      <ReactLenis root>
        <BackgroundLogin>
          <LoginForm></LoginForm>
        </BackgroundLogin>
      </ReactLenis>
    </Box>
  )
}

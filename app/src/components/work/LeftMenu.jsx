'use client'
import { Box } from '@mui/material'
import Dashboard from '@/images/icons/dashboard.png'
import LogoRutube from '@/images/logo/Logo_RUTUBE/Logo/PNG/Logo_RUTUBE_white_color.png'
import Home from '@/images/icons/home.png'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
export const LeftMenu = () => {
  const backColor = '#14191F'
  const bgColorMenu = '#1C232B'
  const borderRadius = 20
  return (
    <Box width={'14vw'} minHeight={'100dvh'} bgcolor={backColor}>
      <Box
        width={'100%'}
        height={'100%'}
        display={'flex'}
        color={'white'}
        bgcolor={bgColorMenu}
        flexDirection={'column'}
        gap={2}
        borderRadius={`0 ${borderRadius}px ${borderRadius}px 0`}
      >
        <Logo />
        <Menu />
      </Box>
    </Box>
  )
}
function Logo() {
  return (
    <Box
      height={120}
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      fontSize={'2rem'}
      sx={{ cursor: 'pointer' }}
    >
      <Box component={'img'} src={LogoRutube.src} width={'80%'}></Box>
    </Box>
  )
}

function Menu() {
  const [selected, setSelected] = useState(-1)

  const menuItems = [
    {
      icon: 'https://img.icons8.com/?size=100&id=83326&format=png&color=000000',
      href: '/work',
      text: 'Главная'
    },
    {
      icon: 'https://img.icons8.com/?size=100&id=83274&format=png&color=000000',
      href: '/work/edit',
      text: 'Редактировать'
    },
    {
      icon: 'https://img.icons8.com/?size=100&id=85050&format=png&color=000000',
      href: '/work/me',
      text: 'Профиль'
    },
    {
      icon: 'https://img.icons8.com/?size=100&id=82535&format=png&color=000000',
      href: '/work/settings',
      text: 'Настройки'
    }
  ]
  useEffect(() => {
    if (!window.location.href.split('/')[4]) {
      setSelected(0)
      return
    }
    let nowVal = '/work/' + window.location.href.split('/')[4]
    let index = menuItems.findIndex((val) => {
      return nowVal == val.href
    })
    setSelected(index)
  }, [])
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      fontSize={'1vw'}
    >
      {menuItems.map((e, i) => {
        return (
          <MenuItem
            key={i}
            id={i}
            selected={i == selected}
            setSelected={setSelected}
            icon={e.icon}
            href={e.href}
          >
            {e.text}
          </MenuItem>
        )
      })}
    </Box>
  )
}

function MenuItem({ id, icon, href, selected, children, setSelected }) {
  const router = useRouter()
  const selectColor = '#12CCED'
  const defaultColor = ''
  return (
    <Box
      width={'100%'}
      boxSizing={'border-box'}
      paddingX={5}
      paddingY={2}
      display={'flex'}
      justifyContent={'left'}
      alignItems={'center'}
      position={'relative'}
      gap={2}
      sx={{
        cursor: 'pointer',
        transition: 'all 400ms',
        ':hover': {
          backgroundColor: '#00000033'
        }
      }}
      onClick={() => {
        if (!selected) {
          setSelected(id)
          router.push(href)
        }
      }}
      bgcolor={selected ? '#00000044' : '000000'}
    >
      <Box
        left={0}
        position={'absolute'}
        width={10}
        height={'52px'}
        bgcolor={selected ? selectColor : '000000ff'}
        sx={{ cursor: 'pointer', transition: 'all 500ms' }}
      ></Box>
      <Box
        component={'img'}
        width={'1vw'}
        src={icon}
        color={'white'}
        sx={{ filter: 'invert(100%)' }}
      ></Box>
      {children}
    </Box>
  )
}

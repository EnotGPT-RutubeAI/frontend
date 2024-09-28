'use client'
import { Box } from '@mui/material'
import Image from 'next/image'
import LogoCircle from '@/images/logo/Logo_RUTUBE/Icons/Circle/PNG/Icon_RUTUBE_dark_color_circle.png'
import { useRouter } from 'next/navigation'

export const Header = () => {
  const router = useRouter()
  return (
    <Box
      position={'fixed'}
      zIndex={2}
      paddingTop={2}
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      fontSize={'2rem'}
      sx={{
        '@media (max-width: 1024px)': { fontSize: '1.5rem' }
      }}
    >
      <Box
        width={'90%'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={2}
        >
          <Box
            component={'img'}
            src={LogoCircle.src}
            width={50}
            height={50}
          ></Box>
          <Box>RUTUBE CUT</Box>
        </Box>
        <Box
          display={'flex'}
          gap={4}
          justifyContent={'end'}
          alignItems={'center'}
          fontWeight={200}
          fontSize={'0.6em'}
          color='#A0A0A0'
        >
          <Box
            display={'flex'}
            sx={{ '@media (max-width: 800px)': { display: 'none' } }}
            gap={4}
          >
            <Box>О приложении</Box>
            <Box>Особенности</Box>
            <Box>Примеры</Box>
          </Box>
          <Box
            color={'white'}
            paddingX={4}
            paddingY={1}
            border={1}
            borderRadius={3}
            fontSize={'1em'}
            onClick={() => {
              router.push('/login')
            }}
            sx={{ userSelect: 'none', cursor: 'pointer' }}
          >
            ВОЙТИ
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

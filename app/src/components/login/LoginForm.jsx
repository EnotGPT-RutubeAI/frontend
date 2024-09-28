import { Box, TextField } from '@mui/material'
import LogoCircle from '@/images/logo/Logo_RUTUBE/Icons/Circle/PNG/Icon_RUTUBE_dark_color_circle.png'
import { useRouter } from 'next/navigation'
export const LoginForm = () => {
  const router = useRouter()
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      position={'relative'}
      zIndex={2}
    >
      <Box
        width={'min(80dvh,80vw)'}
        border={1}
        borderRadius={'100px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'space-between'}
        paddingY={10}
        paddingX={10}
        color={'black'}
        gap={4}
        fontSize={'clamp(8px,0.4vw,72px)'}
        bgcolor={'white'}
        sx={{
          '@media (max-width: 950px)': {
            paddingX: 4,
            paddingY: 4,
            borderRadius: '30px'
          },
          '@media (max-height: 950px)': {
            paddingX: 4,
            paddingY: 4,
            borderRadius: '30px'
          }
        }}
      >
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Box
            component={'img'}
            width={200}
            src={LogoCircle.src}
            sx={{
              '@media (max-width: 950px)': { width: 100 },
              '@media (max-height: 950px)': { width: 100 }
            }}
          ></Box>
          <Box
            fontSize={'5em'}
            textAlign={'center'}
            sx={{ userSelect: 'none' }}
          >
            RUTUBE CUT
          </Box>
        </Box>
        <Box
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <Box
            width={'100%'}
            fontSize={'3em'}
            fontWeight={300}
            display={'flex'}
            flexDirection={'column'}
            gap={1}
          >
            <Box>Логин</Box>
            <Box
              component={'input'}
              width={'100%'}
              borderRadius={2}
              paddingX={3}
              paddingY={3}
              fontSize={'1em'}
              border={1}
            ></Box>
          </Box>
          <Box
            width={'100%'}
            fontSize={'3em'}
            fontWeight={300}
            display={'flex'}
            flexDirection={'column'}
            gap={1}
          >
            <Box>Пароль</Box>
            <Box
              component={'input'}
              type={'password'}
              width={'100%'}
              borderRadius={2}
              paddingX={3}
              paddingY={3}
              fontSize={'1em'}
              border={1}
            ></Box>
          </Box>
        </Box>
        <Box
          height={'10%'}
          width={'100%'}
          marginTop={'5dvh'}
          border={1}
          fontSize={'5em'}
          borderRadius={'200px'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          fontWeight={500}
          paddingY={2}
          onClick={() => {
            router.push('/work')
          }}
          sx={{
            userSelect: 'none',
            cursor: 'pointer',
            transition: 'all 300ms',
            '@media (max-width: 950px)': {
              marginTop: 0,
              paddingY: 1,
              fontSize: '3em'
            },
            '@media (max-height: 950px)': {
              marginTop: 0,
              paddingY: 1,
              fontSize: '3em'
            },
            ':hover': {
              border: 1,
              borderColor: '#100943',
              backgroundColor: '#100943',
              color: 'white'
            }
          }}
        >
          Продолжить
        </Box>
      </Box>
    </Box>
  )
}

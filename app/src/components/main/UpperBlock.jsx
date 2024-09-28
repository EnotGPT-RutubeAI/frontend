import { Box } from '@mui/material'
import Image from 'next/image'
import ArrowDown from '@/images/arrow_down.png'
import RutubeFilms from '@/images/RUTUBE_images/films.png'

export const UpperBlock = () => {
  return (
    <Box>
      <ArrowsUp />
      <Box
        paddingTop={2}
        width={'100%'}
        height={'100dvh'}
        minHeight={'600px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={'2rem'}
        position={'relative'}
        overflow={'hidden'}
      >
        <Box
          width={'90%'}
          border={0}
          display={'flex'}
          alignItems={'stretch'}
          paddingX={4}
          gap={'4vw'}
          sx={{ '@media (max-width: 800px)': { width: '100%' } }}
        >
          <BgBubble left={-1600} color={'#B5EAEA'} />
          <BgBubble right={-1600} top={-1000} color={'#F38BA0'} />
          <BgBubble left={'0%'} bottom={'-1500px'} color={'#EDF6E5'} />
          <LightStick />
          <TextBlock />
        </Box>
      </Box>
      <Box height={'100dvh'}></Box>
    </Box>
  )
}

function LightStick() {
  return (
    <Box width={'0.6vw'} position={'relative'}>
      <Box
        left={-50}
        top={'-25%'}
        position={'absolute'}
        width={'100px'}
        height={'150%'}
        borderRadius={100}
        bgcolor={'#B5EAEA'}
        sx={{ filter: 'blur(100px)', opacity: 0.6 }}
      ></Box>
      <Box
        width={'100%'}
        height={'100%'}
        borderRadius={100}
        bgcolor={'white'}
        boxShadow={`inset 0 0 0 0.2em #8cebff,
    inset 0 0 1em 0.3em #8cebff,
    inset 1em 1em 0.4em rgba(0, 0, 0, 0.6),
    0 0 0 0.2em #8cebff,
    0 0 1em 0.3em #8cebff`}
      ></Box>
    </Box>
  )
}

function BgBubble({ left, right, top, bottom, color }) {
  return (
    <Box
      zIndex={-1000}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
      width={3000}
      height={2000}
      borderRadius={'100%'}
      position={'absolute'}
      sx={{
        userSelect: 'none',
        background: `radial-gradient(circle, ${color}44 0%, ${color}00 50%);`,
        filter: 'blur(10000px)',
        opacity: 1
      }}
    ></Box>
  )
}

function TextBlock() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      fontSize={'5vw'}
      lineHeight={1.2}
      sx={{ '@media (max-width: 800px)': { fontSize: '6vw' } }}
    >
      <Box>Создание виральных</Box>
      <Box>клипов с использованием</Box>
      <Box>искуственного интеллекта</Box>
      <Box
        fontSize={'clamp(1rem, 10vw, 0.3em);'}
        fontWeight={300}
        paddingTop={'2vw'}
        paddingRight={'10vw'}
        color={'rgba(255, 255, 255, 0.6)'}
      >
        Это маленький текст с описанием всего проекта, он серый и выглядит
        наверное норм, хз вообще, заплатите денег, я устал верстать ыыы
      </Box>
    </Box>
  )
}

function ArrowsUp() {
  return (
    <Box
      width={'5vw'}
      position={'absolute'}
      right={'5vw'}
      height={'100dvh'}
      minHeight={'600px'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{ opacity: 0.1, '@media (max-width: 800px)': { right: '1vw' } }}
    >
      <Box
        height={'75%'}
        display={'flex'}
        flexDirection={'column'}
        sx={{
          '@keyframes appear': {
            '0%': { opacity: 0 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0 }
          }
        }}
      >
        <Arrow id={1} />
        <Arrow id={2} />
        <Arrow id={3} />
        <Arrow id={4} />
        <Arrow id={5} />
        <Arrow id={6} />
        <Arrow id={7} />
        <Arrow id={8} />
        <Arrow id={9} />
        <Arrow id={10} />
      </Box>
    </Box>
  )
}

function Arrow({ id }) {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      flex={1}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        opacity: 0,
        '@media (max-height: 800px)': { display: id > 8 ? 'none' : 'flex' },
        animationName: 'appear',
        animationDuration: '4s',
        animationDelay: `${id * 200}ms`,
        animationIterationCount: 'infinite'
      }}
    >
      <Box
        flex={1}
        component={'img'}
        width={'100%'}
        src={ArrowDown.src}
        sx={{ objectFit: 'contain' }}
      ></Box>
    </Box>
  )
}

import { Box, Slider } from '@mui/material'
import { Row } from '@/components/common/Row'
import { Column } from '@/components/common/Column'
import { Center } from '@/components/common/Center'
import { useEffect, useRef, useState } from 'react'
import { useContext, createContext } from 'react'

export function Overlay({ children, setVisible }) {
  return (
    <Center
      top={0}
      left={0}
      position={'absolute'}
      width={'100vw'}
      height={'100dvh'}
      zIndex={90}
    >
      <Box position={'relative'} zIndex={92}>
        {children}
      </Box>
      <Box
        position={'absolute'}
        width={'100%'}
        height={'100%'}
        bgcolor={'#00000088'}
        onClick={() => {
          setVisible(false)
        }}
      ></Box>
    </Center>
  )
}

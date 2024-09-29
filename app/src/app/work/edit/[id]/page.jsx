'use client'

import { Box, Slider } from '@mui/material'
import { Row } from '@/components/common/Row'
import { Column } from '@/components/common/Column'
import { Center } from '@/components/common/Center'
import { useEffect, useRef, useState } from 'react'
import { useContext, createContext } from 'react'
import { useQuery } from 'react-query'

import {
  Audio,
  Blocks,
  CirclesWithBar,
  DNA,
  Grid,
  Hourglass,
  InfinitySpin,
  MagnifyingGlass,
  Rings,
  Triangle
} from 'react-loader-spinner'
import { Player } from './components/Player'
import { RecommendedFragments } from './components/RecommendedFragments'
import { Timeline } from './components/Timeline'
import { SettingsFragment } from './components/SettingsFragment'
import { contextVideoPlayer } from './context/VideoPlayerContext'
import { VideoPlayerContext } from './context/VideoPlayerProvider'
import { Overlay } from '@/components/common/Overlay'

export default function Page({ params }) {
  const contextVP = useContext(contextVideoPlayer)
  return (
    <Row height={'100dvh'}>
      <Box
        position={'absolute'}
        display={contextVP.videoDurration == 0 ? 'block' : 'none'}
      >
        <Overlay>
          <Blocks></Blocks>
        </Overlay>
      </Box>
      <Column
        width={'12%'}
        maxWidth={'20%'}
        minWidth={'12%'}
        overflow={'auto'}
        sx={{ resize: 'horizontal' }}
      >
        <RecommendedFragments />
      </Column>
      <Column flex={8}>
        <Row
          width={'100%'}
          height={'60%'}
          minHeight={'60%'}
          maxHeight={'80%'}
          overflow={'auto'}
          sx={{ resize: 'vertical' }}
        >
          <Box
            width={'70%'}
            height={'100%'}
            maxWidth={'70%'}
            overflow={'auto'}
            sx={{ resize: 'horizontal' }}
          >
            <Player />
          </Box>
          <Box flex={3}>
            <SettingsFragment />
          </Box>
        </Row>
        <Row width={'100%'} flex={1}>
          <Timeline />
        </Row>
      </Column>
    </Row>
  )
}

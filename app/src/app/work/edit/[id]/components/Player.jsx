import { Box, Slider } from '@mui/material'
import { Row } from '@/components/common/Row'
import { Column } from '@/components/common/Column'
import { Center } from '@/components/common/Center'
import { useEffect, useRef, useState } from 'react'
import { useContext, createContext } from 'react'
import { Subtitles } from './Subtitles'
import { contextVideoPlayer } from '../context/VideoPlayerContext'

export function Player() {
  const videoRef = useRef()
  let contextVP = useContext(contextVideoPlayer)
  const handleKeyPress = (event) => {
    if (event.keyCode == 32) {
      console.log('dad')

      setPlay()
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  })
  useEffect(() => {
    if (contextVP.videoRef?.current) {
      if (contextVP.isPlaying) {
        contextVP.videoRef.current.play()
      } else {
        contextVP.videoRef.current.pause()
      }
    }
  }, [contextVP.isPlaying])

  useEffect(() => {
    contextVP.setVideoRef(videoRef)
    videoRef.current.volume = 0.2
    contextVP.setRightBorder(videoRef.current.duration)
  }, [])

  useEffect(() => {
    if (videoRef) {
      contextVP.setVideoDurration(videoRef.current.duration)
      if (contextVP.selectedFragment == null) {
        contextVP.setRightBorder(videoRef.current.duration)
      }
      if (contextVP.currentTime < contextVP.leftBorder) {
        videoRef.current.currentTime = contextVP.leftBorder
        contextVP.setCurrentTime(contextVP.leftBorder)
      } else contextVP.setCurrentTime(videoRef.current.currentTime)
      if (contextVP.currentTime > contextVP.rightBorder) {
        videoRef.current.currentTime = contextVP.rightBorder
        contextVP.setCurrentTime(contextVP.rightBorder)
        setPlay(false)
      } else contextVP.setCurrentTime(videoRef.current.currentTime)
    }
  })

  const setPlay = (val) => {
    if (contextVP.videoRef)
      if (val != undefined) {
        contextVP.setIsPlaying(val)
      } else {
        if (!contextVP.isPlaying) {
          if (contextVP.rightBorder == contextVP.currentTime) {
            contextVP.videoRef.current.currentTime = contextVP.leftBorder
          }
        }
        contextVP.setIsPlaying(!contextVP.isPlaying)
      }
  }
  return (
    <Box
      width={'100%'}
      height={'100%'}
      boxSizing={'border-box'}
      paddingX={0.5}
      paddingBottom={0.5}
    >
      <Box
        width={'100%'}
        height={'100%'}
        boxSizing={'border-box'}
        paddingY={'2vw'}
        bgcolor={'#1C232B'}
        borderRadius={'0 0 1vw 1vw'}
      >
        <Center height={'100%'} flexDirection={'column'} paddingY={2}>
          <Center width={'100%'} height={'100%'} position={'relative'}>
            <Subtitles />
            <video
              onTimeUpdate={() =>
                contextVP.setCurrentTime(videoRef.current.currentTime)
              }
              onLoadedMetadata={(e) => {
                contextVP.setVideoDurration(videoRef.current.duration)
              }}
              onPlay={() => {
                contextVP.setCurrentTime(videoRef.current.currentTime)
                if (!contextVP.isPlaying) {
                  setPlay(true)
                }
              }}
              onPause={() => {
                contextVP.setCurrentTime(videoRef.current.currentTime)

                if (contextVP.isPlaying) {
                  setPlay(false)
                }
              }}
              ref={videoRef}
              preload='metadata'
              width={'100%'}
              height={'100%'}
              src={contextVP.videoURL}
              disablePictureInPicture
            ></video>
          </Center>
          <Box paddingY={'0.5vw'} height={'6vw'} width={'100%'}>
            <Row justifyContent={'space-around'} height={'100%'}>
              <Box flex={1}></Box>
              <Center flex={1}>
                <Center height={'100%'}>
                  <ControllButton
                    icon='https://img.icons8.com/?size=100&id=397&format=png&color=ffffff'
                    iconPressed={
                      'https://img.icons8.com/?size=100&id=61012&format=png&color=ffffff'
                    }
                    func={setPlay}
                    activated={contextVP.isPlaying}
                  ></ControllButton>
                </Center>
              </Center>
              <Box flex={1}></Box>
            </Row>
          </Box>
        </Center>
      </Box>
    </Box>
  )
}

function ControllButton({ icon, iconPressed, func }) {
  let contextVP = useContext(contextVideoPlayer)
  return (
    <Box width={'1.4vw'} height={'1.4vw'}>
      <Box
        component={'img'}
        height={'100%'}
        src={contextVP.isPlaying ? iconPressed : icon}
        sx={{ aspectRatio: 1 }}
        onClick={() => {
          func()
        }}
      ></Box>
    </Box>
  )
}

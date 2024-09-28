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
  CirclesWithBar,
  DNA,
  Grid,
  Hourglass,
  InfinitySpin,
  MagnifyingGlass,
  Rings,
  Triangle
} from 'react-loader-spinner'

export function RenderWindow() {
  const countStages = 4
  const delay = 3500
  const [stage, setStage] = useState(0)
  useEffect(() => {
    let change = setTimeout(() => {
      if (stage < countStages) setStage(stage + 1)
    }, delay)
  }, [])
  useEffect(() => {
    setTimeout(() => {
      if (stage < countStages) setStage(stage + 1)
    }, delay)
  }, [stage])

  const listStages = [
    <Center flexDirection={'column'}>
      <MagnifyingGlass
        visible={true}
        height='80%'
        width='100%'
        ariaLabel='magnifying-glass-loading'
        wrapperStyle={{ height: '50dvh', width: '100%' }}
        wrapperClass='magnifying-glass-wrapper'
        glassColor='#c0efff'
        color='#e15b64'
      />
      <Box fontSize={'1.5em'} height='20%' color={'#ffffff66'}>
        Ищем главный объект...
      </Box>
    </Center>,
    <Center flexDirection={'column'}>
      <Triangle
        visible={true}
        height='80%'
        width='100%'
        ariaLabel='magnifying-glass-loading'
        wrapperStyle={{ height: '50dvh', width: '100%' }}
        wrapperClass='magnifying-glass-wrapper'
        glassColor='#c0efff'
        color='#e15b64'
      />
      <Box fontSize={'1.5em'} height='20%' color={'#ffffff66'}>
        Обрезаем видео...
      </Box>
    </Center>,
    <Center flexDirection={'column'}>
      <Audio
        visible={true}
        height='80%'
        width='100%'
        ariaLabel='magnifying-glass-loading'
        wrapperStyle={{ height: '50dvh', width: '100%' }}
        wrapperClass='magnifying-glass-wrapper'
        glassColor='#c0efff'
        color='#e15b64'
      />
      <Box fontSize={'1.5em'} height='20%' color={'#ffffff66'}>
        Добавляем аудио
      </Box>
    </Center>,
    <Center flexDirection={'column'}>
      <CirclesWithBar
        visible={true}
        height='80%'
        width='100%'
        ariaLabel='magnifying-glass-loading'
        wrapperStyle={{ height: '50dvh', width: '100%' }}
        wrapperClass='magnifying-glass-wrapper'
        glassColor='#c0efff'
        color='#e15b64'
      />
      <Box fontSize={'1.5em'} height='20%' color={'#ffffff66'}>
        Почти готово...
      </Box>
    </Center>
  ]

  function ResultVideo() {
    return (
      <Row width={'100%'} height={'100%'} boxSizing={'border-box'}>
        <Row width={'100%'} height={'100%'} paddingY={'1vw'}>
          <Box flex={1} width={'100%'} height={'100%'}>
            <Row height={'100%'}>
              <video
                src='/videos/final_video.mp4'
                style={{
                  objectFit: 'contain',
                  width: '90%'
                }}
                controls
              ></video>
            </Row>
          </Box>
          <Column
            flex={1}
            width={'100%'}
            height={'100%'}
            fontSize={'1em'}
            gap={'1vw'}
            justifyContent={'space-between'}
          >
            <Column gap={'1vw'}>
              <Box fontSize={'2em'}>Видео готово</Box>
              <Row justifyContent={'space-between'}>
                <Box>Название:</Box>
                <Box>GONE.Fludd.mp4</Box>
              </Row>
              <Row justifyContent={'space-between'}>
                <Box>Длительность:</Box>
                <Box>12 сек</Box>
              </Row>
              <Row justifyContent={'space-between'}>
                <Box>Моделиваны:</Box>
                <Box>Эмоции, голос, музыка</Box>
              </Row>
            </Column>
            <Center width={'100%'} paddingY={'1vw'} borderRadius={3} border={2}>
              Сохранить
            </Center>
          </Column>
        </Row>
      </Row>
    )
  }

  return (
    <Column
      padding={'min(2.5dvh,2.5vw)'}
      width={'min(90dvh,90vw)'}
      height={'min(80dvh,80vw)'}
      bgcolor={'#1C232B'}
      border={1}
      borderRadius={5}
      borderColor={'#686C72'}
      fontSize={'0.8vw'}
    >
      <Row
        width={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box fontSize={'2em'}>Рендеринг</Box>{' '}
        <Box
          borderRadius={100}
          width={'20px'}
          height={'20px'}
          bgcolor={countStages == stage ? 'lightgreen' : 'orange'}
          sx={{ transition: 'all 500ms' }}
        ></Box>
      </Row>

      <Box
        marginTop={'1vw'}
        width={'100%'}
        height={'2px'}
        borderRadius={10}
        bgcolor={'#ffffff55'}
      ></Box>
      {stage < countStages ? (
        <Center width={'100%'} height={'100%'}>
          <Center flexDirection={'column'}>{listStages.at(stage)}</Center>
        </Center>
      ) : (
        <ResultVideo></ResultVideo>
      )}
    </Column>
  )
}

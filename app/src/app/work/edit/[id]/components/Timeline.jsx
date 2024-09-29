import { Box, Slider } from '@mui/material'
import { Row } from '@/components/common/Row'
import { Column } from '@/components/common/Column'
import { Center } from '@/components/common/Center'
import { useEffect, useRef, useState } from 'react'
import { useContext, createContext } from 'react'
import { Subtitles } from './Subtitles'
import { contextVideoPlayer } from '../context/VideoPlayerContext'
import { HeatMap, HeatMapBySegments } from '../service/hotmap'

export function Timeline() {
  const getText2 = (value) => {
    const seconds = Math.floor(value)
    const secondsToShow = ('0' + (Math.floor(value) % 60)).slice(-2)
    const minutes = Math.floor(seconds / 60)
    const minutesToShow = ('0' + (Math.floor(seconds / 60) % 60)).slice(-2)
    const hours = Math.floor(minutes / 60)
    const hoursToShow = ('0' + (Math.floor(minutes / 60) % 24)).slice(-2)
    return `${minutesToShow}:${secondsToShow}`
  }
  const [gradient, setGradient] = useState('')
  const [gradient1, setGradient1] = useState('')
  const [gradient2, setGradient2] = useState('')
  let contextVP = useContext(contextVideoPlayer)
  let [sliderVal, setSliderVal] = useState(contextVP.currentTime)
  const countSplits = 10
  useEffect(() => {
    setGradient(
      HeatMapBySegments(
        contextVP.answerServer.subtitles,
        contextVP.answerServer.modelIvanaAudio,
        contextVP.videoDurration
      )
    )
    setGradient1(
      HeatMapBySegments(
        contextVP.answerServer.subtitles,
        contextVP.answerServer.modelIvanaVolume,
        contextVP.videoDurration
      )
    )
    setGradient2(
      HeatMapBySegments(
        contextVP.answerServer.subtitles,
        contextVP.answerServer.modelIvanaVideo,
        contextVP.videoDurration
      )
    )
  })
  /*
  function TimeGenerator() {
    let tmp = []
    for (let i = 0; i < countSplits; i++) {
      let leftAppend = contextVP.leftBorder - 5 > 0 ? 5 : 0
      let rightAppend =
        contextVP.rightBorder + 5 < contextVP.videoDurration ? 5 : 0
      const element = Math.round(
        ((contextVP.rightBorder -
          contextVP.leftBorder +
          leftAppend +
          rightAppend) *
          i) /
          countSplits
      )
      tmp.push(contextVP.leftBorder + element - leftAppend)
    }
    return tmp
  }
  */
  function TimeGenerator() {
    let tmp = []
    for (let i = 0; i < countSplits; i++) {
      const element = Math.round((contextVP.videoDurration / countSplits) * i)
      tmp.push(element)
    }
    return tmp
  }
  return (
    <Box
      width={'100%'}
      height={'100%'}
      boxSizing={'border-box'}
      paddingX={0.5}
      paddingTop={0.5}
    >
      <Box
        width={'100%'}
        height={'100%'}
        boxSizing={'border-box'}
        bgcolor={'#1C232B'}
        paddingX={3}
        paddingTop={3}
        borderRadius={'1vw  1vw 0 0'}
        fontSize={'1.5vw'}
      >
        {contextVP.videoDurration != null ? (
          <Column height={'100%'} position={'relative'} width={'100%'}>
            <Box
              position={'absolute'}
              left={
                (contextVP.leftBorder / contextVP.videoDurration) * 100 + '%'
              }
              width={
                ((contextVP.rightBorder - contextVP.leftBorder) /
                  contextVP.videoDurration) *
                  100 +
                '%'
              }
              height={'100%'}
              display={'flex'}
              justifyContent={'end'}
            >
              <Box
                height={'100%'}
                width={'100%'}
                sx={{
                  background:
                    'linear-gradient(180deg, rgba(189,244,255,0.05) 0%, rgba(255,255,255,0) 100%)'
                }}
              ></Box>
              <Box
                height={'2px'}
                position={'absolute'}
                width={'100%'}
                bgcolor={'lightgreen'}
              ></Box>
            </Box>

            <Row height={'30px'} fontSize={'0.5em'} color={'#ffffff77'}>
              {TimeGenerator().map((val, i) => {
                let leftBord = 0
                if (i == 0) leftBord = 1
                return (
                  <Box
                    key={i}
                    flex={1}
                    borderLeft={leftBord}
                    borderRight={1}
                    height={'10px'}
                    position={'relative'}
                  >
                    <Box
                      width={'fit-content'}
                      top={10}
                      position={'absolute'}
                      sx={{
                        transform: leftBord == 0 ? 'translateX(-50%)' : ''
                      }}
                    >
                      {getText2(val)}
                    </Box>
                    {i == countSplits - 1 ? (
                      <Box
                        width={'fit-content'}
                        top={10}
                        right={0}
                        position={'absolute'}
                        sx={{}}
                      >
                        {getText2(contextVP.videoDurration)}
                      </Box>
                    ) : (
                      <></>
                    )}
                  </Box>
                )
              })}
            </Row>
            <Row
              height={'30px'}
              position={'absolute'}
              width={'100%'}
              color={'#ffffff44'}
            >
              {[...Array(countSplits * 10)].map((x, i) => {
                let bLeft = 1
                if (i % countSplits == 0) bLeft = 0
                return (
                  <Box
                    key={i}
                    flex={1}
                    borderLeft={bLeft}
                    height={'5px'}
                    position={'relative'}
                  />
                )
              })}
            </Row>

            <Row>
              <Slider
                width={'100%'}
                min={
                  //contextVP.leftBorder - 5 > 0 ? contextVP.leftBorder - 5 : 0
                  0
                }
                step={0.01}
                value={contextVP.currentTime}
                onChange={(val, newVal) => {
                  contextVP.videoRef.current.currentTime = newVal
                  contextVP.setCurrentTime(newVal)
                }}
                max={
                  //contextVP.rightBorder + 5 < contextVP.videoDurration
                  //  ? contextVP.rightBorder + 5
                  //  : contextVP.videoDurration
                  contextVP.videoDurration
                }
              ></Slider>
            </Row>
            <Row
              flex={1}
              border={1}
              sx={{
                background: gradient,
                fontWeight: 900,
                textShadow: '0px 0px 20px black ;'
              }}
            >
              Аудио
            </Row>
            <Row
              flex={1}
              border={1}
              sx={{
                background: gradient1,
                fontWeight: 900,
                textShadow: '0px 0px 20px black ;'
              }}
            >
              Громкость
            </Row>
            <Row
              flex={1}
              border={1}
              sx={{
                background: gradient2,
                fontWeight: 900,
                textShadow: '0px 0px 20px black ;'
              }}
            >
              Кадры
            </Row>
          </Column>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  )
}

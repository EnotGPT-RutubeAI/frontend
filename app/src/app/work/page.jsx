'use client'
//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

//y0_AgAAAABkP7hbAATuwQAAAAERIW3fAAB0cOTe-5VAVJlp3pSLovljrB_mbQ
//t1.9euelZrKmJ2elpqMys6RypiJjs6UlO3rnpWazIyJz4uVysjPlZyVj5ealJjl8_ddel9I-e8SMy40_N3z9x0pXUj57xIzLjT8zef1656VmpCUjc2OzJnNjJSMm5iMjZvK7_zF656VmpCUjc2OzJnNjJSMm5iMjZvK.yvX8UUxpm8ZVzKRc04r96GFirDy3AwVN_nSDoJV7-oGq_XJS1zT8Rh1jYP3gSKbQhzgEKCi4XiUlZ3abvFXVAg
import styled from '@emotion/styled'
import { Box, Slider } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import 'video.js'
import { useQuery } from 'react-query'
import myData from '../../../public/test/example2.json'
const IOSSlider = styled(Slider)(({ theme }) => ({
  color: '#007bff',
  height: 5,
  padding: '0',
  '& .MuiSlider-thumb': {
    height: 0,
    width: 0
  },

  '& .MuiSlider-track': {
    border: 'none',
    height: 5
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    boxShadow: 'inset 0px 0px 4px -2px #000',
    backgroundColor: '#d0d0d0'
  }
}))

export default function WorkPage() {
  const [subtitles, setSubtitles] = useState(false)
  const [data, setData] = useState([])
  const video1 = useRef()
  const minDistance = 10

  const [videoLenght, setVideoLenght] = useState(100)
  const [value1, setValue1] = useState([20, 37])
  const [play, setPlay] = useState(false)
  const [timeVideo, setTimeVideo] = useState(0)

  const handleKeyPress = (event) => {
    if (event.keyCode == 32 && event.target == document.body) {
      event.preventDefault()
      handlePlay()
    } else if (event.key == ' ') {
      handlePlay()
    }
  }

  function handleData() {
    let list = []
    for (let i = 0; i < myData.text.segments.length; i++) {
      list.push({
        text: myData.text.segments[i].text,
        start: myData.text.segments[i].start,
        end: myData.text.segments[i].end
      })
    }
    setData(list)
  }

  function handlePlay() {
    setPlay(!play)
  }

  useEffect(() => {
    if (video1.current.currentTime == value1[1] / 1000 && play) {
      video1.current.currentTime = value1[0] / 1000
    }
    if (video1.current.paused) {
      if (play) video1.current.play()
      else video1.current.pause()
    } else {
      if (!play) video1.current.pause()
      else video1.current.play()
    }
  }, [play])
  useEffect(() => {
    setVideoLenght(Math.floor(video1.current.duration * 1000))
    setValue1([0, Math.floor(video1.current.duration * 1000)])
    handleData()
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      if (video1.current) {
        let timeCurr = Math.floor(video1.current.currentTime * 1000)

        if (timeCurr < value1[0]) {
          video1.current.currentTime = value1[0] / 1000
        }
        if (timeCurr >= value1[1]) {
          video1.current.currentTime = value1[1] / 1000
          setPlay(false)
        }

        setTimeVideo(timeCurr)
      }
    }, 10)

    return () => {
      clearInterval(interval)
    }
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  })

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
    }
  }

  const handleChange2 = (event, newValue, activeThumb) => {
    video1.current.currentTime = newValue / 1000
    setTimeVideo(newValue)
  }

  const getText = (value) => {
    const seconds = Math.floor(value / 1000)
    const secondsToShow = ('0' + (Math.floor(value / 1000) % 60)).slice(-2)
    const minutes = Math.floor(seconds / 60)
    const minutesToShow = ('0' + (Math.floor(seconds / 60) % 60)).slice(-2)
    const hours = Math.floor(minutes / 60)
    const hoursToShow = ('0' + (Math.floor(minutes / 60) % 24)).slice(-2)
    return `${hoursToShow}:${minutesToShow}:${secondsToShow}`
  }

  const getText2 = (value) => {
    const seconds = Math.floor(value)
    const secondsToShow = ('0' + (Math.floor(value) % 60)).slice(-2)
    const minutes = Math.floor(seconds / 60)
    const minutesToShow = ('0' + (Math.floor(seconds / 60) % 60)).slice(-2)
    const hours = Math.floor(minutes / 60)
    const hoursToShow = ('0' + (Math.floor(minutes / 60) % 24)).slice(-2)
    return `${minutesToShow}:${secondsToShow}`
  }

  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      paddingX={2}
    >
      <Box
        width={'95%'}
        paddingX={2}
        display={'flex'}
        gap={2}
        alignItems={'stretch'}
      >
        <Box width={'70%'}>
          <Box width={'100%'} position={'relative'}>
            <Box
              position={'absolute'}
              width={'100%'}
              height={'100%'}
              onClick={() => {
                handlePlay()
              }}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box
                component={'img'}
                width={'5%'}
                src={
                  'https://img.icons8.com/?size=100&id=fjx0LfGCNuZb&format=png&color=ffffff'
                }
                sx={{ transition: 'all 100ms', opacity: play ? 0 : 1 }}
              ></Box>
            </Box>
            <Box position={'absolute'} width={'100%'} bottom={0} height={20}>
              <IOSSlider
                valueLabelFormat={getText}
                value={timeVideo}
                max={videoLenght}
                onChange={handleChange2}
                valueLabelDisplay='auto'
              />
            </Box>
            <Box
              position={'absolute'}
              width={'100%'}
              bottom={'1.2vw'}
              height={20}
              textAlign={'center'}
              sx={{ transition: 'all 300ms', opacity: subtitles ? 1 : 0 }}
            >
              {data.map((elem, i) => {
                console.log(timeVideo / 1000)
                if (
                  elem.start <= timeVideo / 1000 &&
                  timeVideo / 1000 < elem.end
                )
                  return (
                    <Box
                      key={i}
                      fontWeight={900}
                      fontSize={'1vw'}
                      color='white'
                      sx={{ textShadow: '1px 1px 3px black;' }}
                    >
                      {elem.text}
                    </Box>
                  )
              })}
            </Box>
            <Box position={'relative'}>
              <video
                ref={video1}
                src='/videos/example2.mp4'
                type={'video/mp4'}
                preload='metadata'
                width={'100%'}
                onLoadedMetadata={(event) => {
                  setVideoLenght(Math.floor(video1.current.duration * 1000))
                  setValue1([0, Math.floor(video1.current.duration * 1000)])
                }}
              ></video>
            </Box>
          </Box>

          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={value1}
            max={videoLenght}
            onChange={handleChange1}
            valueLabelDisplay='auto'
            valueLabelFormat={getText}
            disableSwap
          />
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box>{getText(value1[0])}</Box>
            <Box>{getText(timeVideo)}</Box>
            <Box>{getText(value1[1])}</Box>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-around'}
            marginTop={3}
            gap={3}
            sx={{ '@media (max-width:1400px)': { gap: 1 } }}
          >
            <ButtonCommon
              icon={
                'https://img.icons8.com/?size=100&id=CIqJwH5fAvpd&format=png&color=ffffff'
              }
              text={'['}
              func={() => {
                setValue1([timeVideo, value1[1]])
              }}
            />
            <ButtonCommon
              icon={
                'https://img.icons8.com/?size=100&id=lQE4a9Nued26&format=png&color=ffffff'
              }
              text={']'}
              func={() => {
                setValue1([value1[0], timeVideo])
              }}
            />
            <Box color={subtitles ? 'green' : 'white'}>
              <ButtonCommon
                icon={
                  'https://img.icons8.com/?size=100&id=Tfo2MkBo0em0&format=png&color=ffffff'
                }
                text={'subtitles'}
                func={() => {
                  setSubtitles(!subtitles)
                }}
              />
            </Box>

            <ButtonCommon
              icon={
                'https://img.icons8.com/?size=100&id=37828&format=png&color=ffffff'
              }
            />
            <ButtonCommon
              icon={
                'https://img.icons8.com/?size=100&id=12494&format=png&color=ffffff'
              }
              func={() => {
                setValue1([0, Math.floor(video1.current.duration * 1000)])
              }}
            />
          </Box>
        </Box>
        <Box
          width={'30%'}
          maxHeight={'45vw'}
          border={1}
          padding={2}
          sx={{ overflowX: 'hidden', overflowY: 'scroll' }}
          display={'flex'}
          flexDirection={'column'}
          gap={2}
        >
          {data.map((elem, i) => {
            console.log(timeVideo / 1000)
            if (elem.start <= timeVideo / 1000 && timeVideo / 1000 < elem.end)
              return (
                <Box
                  key={i}
                  fontWeight={500}
                  fontSize={'0.85rem'}
                  color='white'
                  onClick={() => {
                    video1.current.currentTime = elem.start
                  }}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  gap={5}
                  sx={{ lineClamp: '2' }}
                  textOverflow={'ellipsis'}
                >
                  {elem.text}
                  <Box width={'150px'} textAlign={'right'} fontSize={'0.85rem'}>
                    <Box>{getText2(elem.start.toString())} </Box>
                    <Box>{getText2(elem.end.toString())}</Box>
                  </Box>
                </Box>
              )
            return (
              <Box
                key={i}
                fontWeight={500}
                fontSize={'0.85rem'}
                color='gray'
                onClick={() => {
                  video1.current.currentTime = elem.start
                }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={5}
                sx={{ lineClamp: '2' }}
                textOverflow={'ellipsis'}
              >
                {elem.text}
                <Box width={'150px'} textAlign={'right'} fontSize={'0.85rem'}>
                  <Box>{getText2(elem.start.toString())} </Box>
                  <Box>{getText2(elem.end.toString())}</Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

function ButtonCommon({ icon, text, func }) {
  return (
    <Box
      width={'100px'}
      height={'100px'}
      border={1}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      borderRadius={'10px'}
      bgcolor={'#1C232B'}
      onClick={() => {
        func()
      }}
      sx={{
        userSelect: 'none',
        cursor: 'pointer',
        '@media (max-width:1400px)': { width: '50px', height: '50px' }
      }}
    >
      {icon ? <Box component={'img'} width={'50px'} src={icon}></Box> : text}
    </Box>
  )
}

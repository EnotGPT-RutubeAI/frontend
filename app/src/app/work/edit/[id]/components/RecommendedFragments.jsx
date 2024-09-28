import exampleImage from '@/images/example/example3.jpg'

import { Box, Slider } from '@mui/material'
import { Row } from '@/components/common/Row'
import { Column } from '@/components/common/Column'
import { Center } from '@/components/common/Center'
import { useEffect, useRef, useState } from 'react'
import { useContext, createContext } from 'react'
import { Subtitles } from './Subtitles'
import { contextVideoPlayer } from '../context/VideoPlayerContext'
import {
  DeleteDublicates,
  FindTimestampEnd
} from '../service/find_timestamp_end'
import { useQuery } from 'react-query'

export function RecommendedFragments() {
  const contextVP = useContext(contextVideoPlayer)

  return (
    <Box
      width={'100%'}
      height={'100%'}
      boxSizing={'border-box'}
      paddingX={0.5}
      paddingLeft={1}
      fontSize={'0.7vw'}
    >
      <Column
        height={'100%'}
        bgcolor={'#1C232B'}
        borderRadius={'0 1vw 1vw 0'}
        overflow={'hidden'}
      >
        <Box padding={'1vw'} fontWeight={900} fontSize={'1.25em'}>
          Рекомендации
        </Box>
        <Box height={'1px'} width='100%' bgcolor='#ffffff44'></Box>
        <Row
          width={'100%'}
          height={'100%'}
          boxSizing={'border-box'}
          padding={'1vw'}
          overflow={'scroll'}
        >
          <Row width={'100%'} height={'100%'} flexWrap={'wrap'} gap={3}>
            {contextVP.answerServer.big_interesting_segments
              .sort((a, b) => {
                return a.timestamp[0] > b.timestamp[0] ? 1 : -1
              })
              .map((elem, i, arr) => {
                return FindTimestampEnd({
                  timestamp_start: elem.timestamp[0],
                  timestamp_end: elem.timestamp[1],
                  arr: arr,
                  all_arr: contextVP.answerServer.subtitles
                })
              })
              .map((elem, i, arr) => {
                if (i != 0) {
                  if (arr[i - 1].timestamp[1] == elem.timestamp[1]) {
                  } else
                    return (
                      <SuggestedVideo
                        selected={
                          contextVP.selectedFragment[0] == 'fragment' &&
                          contextVP.selectedFragment[1] == i
                        }
                        key={'sug' + i}
                        id={i}
                        img={exampleImage.src}
                        start={elem.timestamp[0]}
                        end={elem.timestamp[1]}
                        text={elem.text.slice(0, 20) + '...'}
                      />
                    )
                } else {
                  return (
                    <SuggestedVideo
                      selected={
                        contextVP.selectedFragment[0] == 'fragment' &&
                        contextVP.selectedFragment[1] == i
                      }
                      key={'sug' + i}
                      id={i}
                      img={exampleImage.src}
                      start={elem.timestamp[0]}
                      end={elem.timestamp[1]}
                      text={elem.text.slice(0, 20) + '...'}
                    />
                  )
                }
              })}
          </Row>
        </Row>
      </Column>
    </Box>
  )
}

function SuggestedVideo({ id = 0, text, start, end, selected }) {
  const [endFrag, setEndFrag] = useState(end)
  const [text_ff, setText_ff] = useState('')
  const [url, setURL] = useState('')

  let contextVP = useContext(contextVideoPlayer)

  useEffect(() => {
    fetch(
      'http://fileserver.enotgpt.ru/getFrameBySecond?audio_url=' +
        contextVP.videoURL +
        '&seconds=' +
        start,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => setURL(data.url))
      .catch((error) => console.error('Error:', error))
  }, [])
  const handleClick = () => {}
  return (
    <Column
      position={'relative'}
      width={'100%'}
      sx={{
        transition: 'all 500ms',
        transform: `scale(${selected ? '1.1' : 1}, ${selected ? '1.1' : 1})`
      }}
      onClick={() => {
        console.log(start, endFrag)
        let tmp = {
          name_video: '',
          format_video: 0,
          subtitlesColor: [255, 255, 255],
          subtitlesBgColor: [0, 0, 0],
          emoji: true,
          face: false
        }
        contextVP.setSettingsRender(tmp)
        if (
          contextVP.selectedFragment[0] == 'fragment' &&
          contextVP.selectedFragment[1] == id
        ) {
          contextVP.setLeftBorder(0)
          contextVP.setRightBorder(contextVP.videoDurration)
          contextVP.setSelectedFragment(['video', 0])

          return
        }
        if (contextVP.videoRef) {
          contextVP.videoRef.current.currentTime = start
          contextVP.setCurrentTime(start)
        }
        contextVP.setLeftBorder(start)
        contextVP.setRightBorder(endFrag)

        contextVP.setSelectedFragment(['fragment', id, text])
      }}
    >
      <Box
        width={'100%'}
        sx={{
          aspectRatio: '16/9'
        }}
      >
        <Box
          width={'100%'}
          component={'img'}
          src={url}
          sx={{ aspectRatio: '16/9', objectFit: 'cover' }}
        ></Box>
      </Box>
      <Box color={'#ffffffaa'}>{text}</Box>
    </Column>
  )
}

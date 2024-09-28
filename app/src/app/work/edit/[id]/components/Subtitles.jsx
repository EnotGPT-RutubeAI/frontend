import { Box, Slider } from '@mui/material'
import { Row } from '@/components/common/Row'
import { Column } from '@/components/common/Column'
import { Center } from '@/components/common/Center'
import { useEffect, useRef, useState } from 'react'
import { contextVideoPlayer } from '../context/VideoPlayerContext'
import { useContext, createContext } from 'react'
import subs from '../../../../../../public/example/subtitles/react.json'

export function Subtitles() {
  let contextVP = useContext(contextVideoPlayer)
  let [arr, setArr] = useState([])
  let textSubtitles = []
  let newArray = []
  useEffect(() => {
    textSubtitles = contextVP.answerServer.subtitles
    newArray = []
    let biba = textSubtitles.length
    for (let i = 0; i < biba; i++) {
      let elem = textSubtitles[i]

      let splited = textSubtitles[i]['text'].split(' ')
      let countWords = splited.length - 1
      let duration = elem['timestamp'][1] - elem['timestamp'][0]
      let oneWord = duration / countWords

      if (countWords > 1) {
        for (let j = 1; j < countWords + 1; j++) {
          if (
            j + 2 <= countWords &&
            (splited[j] + ' ' + splited[j + 1] + ' ' + splited[j + 2]).length <
              20
          ) {
            newArray.push({
              timestamp: [
                textSubtitles[i]['timestamp'][0] + oneWord * (j - 1),
                textSubtitles[i]['timestamp'][0] + oneWord * (j + 2)
              ],
              text: splited[j] + ' ' + splited[j + 1] + ' ' + splited[j + 2]
            })
            j += 2
            continue
          }
          if (
            j + 1 <= countWords &&
            (splited[j] + ' ' + splited[j + 1]).length < 20
          ) {
            newArray.push({
              timestamp: [
                textSubtitles[i]['timestamp'][0] + oneWord * (j - 1),
                textSubtitles[i]['timestamp'][0] + oneWord * (j + 1)
              ],
              text: splited[j] + ' ' + splited[j + 1]
            })
            j += 1
            continue
          }
          newArray.push({
            timestamp: [
              textSubtitles[i]['timestamp'][0] + oneWord * (j - 1),
              textSubtitles[i]['timestamp'][0] + oneWord * j
            ],
            text: splited[j]
          })
        }
      } else {
        newArray.push({
          timestamp: [
            textSubtitles[i]['timestamp'][0],
            textSubtitles[i]['timestamp'][1]
          ],
          text: splited[1]
        })
      }
    }
    contextVP.setSubtitleCutted(newArray)
    setArr(newArray)
  }, [])

  return (
    <Center width={'100%'} height={'100%'} position='absolute' zIndex={80}>
      <Box
        position={'absolute'}
        top={contextVP.subtitlePosition == 0 ? 0 : 'auto'}
        bottom={contextVP.subtitlePosition == 2 ? 0 : 'auto'}
        fontSize={'2em'}
        fontFamily={contextVP.subtitleFont}
        color={
          contextVP.subtitleColor.hex
            ? contextVP.subtitleColor.hex
            : contextVP.subtitleColor
        }
        bgcolor={
          contextVP.subtitleBackground.hex
            ? contextVP.subtitleBackground.hex
            : contextVP.subtitleBackground
        }
      >
        {arr.map((elem, i) => {
          if (elem['timestamp'][0] <= contextVP.currentTime + 0.1)
            if (elem['timestamp'][1] > contextVP.currentTime + 0.1) {
              return <Box paddingX={2}>{elem['text']}</Box>
            }
        })}
      </Box>
    </Center>
  )
}

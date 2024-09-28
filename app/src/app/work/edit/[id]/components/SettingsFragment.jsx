import videoInfo from '../../../../../../public/example/subtitles/react_llama.json'

import {
  Box,
  Checkbox,
  FormControlLabel,
  Select,
  Slider,
  TextField
} from '@mui/material'
import { Row } from '@/components/common/Row'
import { Column } from '@/components/common/Column'
import { Center } from '@/components/common/Center'
import { useEffect, useRef, useState } from 'react'
import { useContext, createContext } from 'react'
import { Subtitles } from './Subtitles'
import { contextVideoPlayer } from '../context/VideoPlayerContext'
import { Overlay } from '@/components/common/Overlay'
import UnstyledSelectIntroduction from '@/components/common/Select'
import { BlockPicker, SketchPicker } from 'react-color'
import { useMutation, useQuery } from 'react-query'
import { Bars, Blocks } from 'react-loader-spinner'
import { useRouter } from 'next/router'

export function SettingsFragment() {
  const contextVP = useContext(contextVideoPlayer)
  const [modal, setModal] = useState(false)

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
        bgcolor={'#1C232B'}
        borderRadius={'0 0 0 1vw'}
      >
        {contextVP.selectedFragment[0] == 'video' ? (
          <FragmentForVideo />
        ) : (
          <Viral></Viral>
        )}
        {modal ? (
          <Overlay setVisible={setModal}>
            <RenderWindow></RenderWindow>
          </Overlay>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  )
}

function Viral() {
  const contextVP = useContext(contextVideoPlayer)
  const router = useRouter()
  const [settings, setSettings] = useState(false)
  const postToLlamaOllama = async (data) => {
    const response = await fetch('http://llm.enotgpt.ru/llama_ollama', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to post data')
    }

    return await response.json()
  }
  const createVideo = async (videoData) => {
    const response = await fetch('http://videogenerator.enotgpt.ru/video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(videoData)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    router.push(response.json()['result'], '_blank')
    return response.json()
  }
  const { mutate, isLoading, error, data } = useMutation(postToLlamaOllama, {
    // Optional: onSuccess, onError, onSettled, etc.
    onSuccess: () => {
      console.log('Data posted successfully')
    },
    onError: (error) => {
      console.error('Error posting data:', error)
    }
  })

  const mutation = useMutation(createVideo, {
    // Optional: onSuccess, onError, onSettled, etc.
    onSuccess: () => {
      console.log('Data posted successfully')
    },
    onError: (error) => {
      console.error('Error posting data:', error)
    }
  })

  function getVideoRender(mutate1) {
    let tmp = {
      original_id: contextVP.answerServer.id_video,
      video: contextVP.videoURL,
      format_type: contextVP.settingsRender.format_video,
      short_timestamps_start: contextVP.leftBorder,
      short_timestamps_end: contextVP.rightBorder,
      subtitles: 1,
      headline: 'string',
      headline_color: 'string',
      subtitles_json: JSON.stringify(contextVP.subtitleCutted),
      subtitles_position: 0,
      subtitles_font: 'string',
      subtitles_color: 'string',
      subtitles_bg_color_r: 0,
      subtitles_bg_color_g: 0,
      subtitles_bg_color_b: 0,
      face_focusing: contextVP.settingsRender.face,
      music_file_type: -1,
      music: 'music',
      music_volume: 0,
      music_offset: 0,
      music_finish: 0
    }
    mutation.mutate(tmp)
  }

  useEffect(() => {
    mutate({
      data: [
        {
          role: 'user',
          content: `Ты отвечаешь за привлечение к контенту. Определи о чём контент, либо определи чем он вдохновляет. Дай оценку интересности от 0 до 10. Выдели тегами аналогичные темы. Текст: '${contextVP.selectedFragment[2]}'`
        }
      ]
    })
  }, [contextVP.selectedFragment])
  return (
    <Column justifyContent={'space-between'} height={'100%'}>
      {settings ? (
        <Overlay setVisible={() => setSettings(false)}>
          <SettingsForFragment setVisible={() => setSettings(false)} />
        </Overlay>
      ) : (
        <></>
      )}
      <Column>
        <Row>
          <Box padding={'1vw'} fontWeight={900}>
            Фрагмент
          </Box>
        </Row>
        <Box height={'1px'} width='100%' bgcolor='#ffffff44'></Box>
      </Column>
      <Box
        padding={2}
        border={1}
        sx={{ borderStyle: 'dotted' }}
        whiteSpace={'pre-line'}
      >
        {!isLoading && data ? (
          <Column justifyContent={'space-between'}>{data['response']}</Column>
        ) : (
          <Center>
            <Bars
              height='80'
              width='80'
              color='#4fa94d'
              ariaLabel='bars-loading'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
          </Center>
        )}
      </Box>
      <Row width={'100%'} justifyContent={'space-between'}>
        <Center
          paddingX={'1vw'}
          paddingY={'0.5vw'}
          width={'fit-content'}
          border={1}
          borderRadius={'0 0 0 1vw'}
          gap={'0.25vw'}
          onClick={() => {
            setSettings(true)
          }}
          flex={1}
          sx={{ cursor: 'pointer' }}
        >
          <Box
            width={'10%'}
            component={'img'}
            src={
              'https://img.icons8.com/?size=100&id=82535&format=png&color=ffffff'
            }
          ></Box>
          Настройки
        </Center>
        {mutation.isLoading ? (
          <Center
            flex={1}
            paddingX={'1vw'}
            paddingY={'0.5vw'}
            width={'fit-content'}
            border={1}
            borderRadius={'0 0 1vw 0'}
            gap={'0.25vw'}
            onClick={() => {
              getVideoRender()
            }}
          >
            <Box
              width={'10%'}
              component={'img'}
              src={
                'https://img.icons8.com/?size=100&id=86287&format=png&color=ffffff'
              }
            ></Box>
            Сохранить
          </Center>
        ) : (
          <Center
            flex={1}
            paddingX={'1vw'}
            paddingY={'0.5vw'}
            width={'fit-content'}
            border={1}
            borderRadius={'0 0 1vw 0'}
            gap={'0.25vw'}
            onClick={() => {}}
          >
            <Blocks width={30} height={30}></Blocks>
            Сохранение
          </Center>
        )}
      </Row>
    </Column>
  )
}

function SettingsForFragment({ setVisible }) {
  const contextVP = useContext(contextVideoPlayer)
  const [currFormat, setCurrFormat] = useState(0)
  const [selectedColor1, setSelectedColor1] = useState(0)
  const [selectedColor2, setSelectedColor2] = useState(5)
  const [face, setFace] = useState(false)
  const [emoji, setEmoji] = useState(true)
  const [nameVideo, setNameVideo] = useState('')
  const colors = ['white', 'pink', 'orange', 'lightgreen', 'lightblue', 'black']
  const colorsRGB = [
    [255, 255, 255],
    [255, 192, 203],
    [255, 165, 0],
    [144, 238, 144],
    [173, 216, 230],
    [0, 0, 0]
  ]
  const formatVideos = [
    {
      description: 'Полноразмерное видео по центру с черным фоном',
      format_type: 0,
      preview: 'https://i.imgur.com/uN1BnAx.png'
    },
    {
      description: 'Увеличенное по центру с черным фоном',
      format_type: 1,
      preview: 'https://i.imgur.com/qOg2SgW.png'
    },
    {
      description: 'Полноразмерное по центру с заблюренным фоном',
      format_type: 2,
      preview: 'https://i.imgur.com/ZlEjaqG.png'
    },
    {
      description: 'Увеличенное по центру с заблюренным фоном',
      format_type: 3,
      preview: 'https://i.imgur.com/l0pSP56.png'
    },
    {
      description: 'Центр горизонтального видео',
      format_type: 4,
      preview: 'https://i.imgur.com/yhaVas6.png'
    },
    {
      description: 'Видео сверху экрана, где снизу видео для захвата внимания',
      format_type: 5,
      preview: 'https://i.imgur.com/oxXWYZN.png'
    },
    {
      description: 'Видео снизу экрана, где сверху видео для захвата внимания',
      format_type: 6,
      preview: 'https://i.imgur.com/qjEj0ng.png'
    }
  ]
  return (
    <Column
      height={'90vh'}
      bgcolor={'white'}
      borderRadius={'1vw'}
      sx={{ aspectRatio: 3 / 2 }}
      padding={'1vw'}
      color={'black'}
      fontSize={'1vw'}
    >
      <Box fontSize={'1.25em'}>Настройки клипа</Box>
      <Box height={'1vw'}></Box>
      <Column>
        <Box>Название фрагмента</Box>
        <Row gap={'1vw'} paddingY={1}>
          <TextField
            value={nameVideo}
            onChange={(e) => setNameVideo(e.target.value)}
            id='outlined-basic'
            variant='outlined'
          />
        </Row>
      </Column>
      <Column>
        <Box>Вариант результата</Box>
        <Row paddingY={2} width={'100%'} gap={2}>
          {formatVideos.map((e, i) => {
            return (
              <Box
                border={e.format_type == currFormat ? 2 : 0}
                borderRadius={'0.2vw'}
                borderColor={'lightgreen'}
                flex={1}
                onClick={() => {
                  setCurrFormat(i)
                }}
                sx={{
                  transform: `scale(${
                    e.format_type == currFormat ? '1.1' : '1'
                  })`
                }}
              >
                <Box component={'img'} width={'100%'} src={e.preview}></Box>
              </Box>
            )
          })}
        </Row>
      </Column>
      <Row justifyContent={'space-between'}>
        <Box flex={1}>
          <Column>
            <Box>Шрифт субтитров</Box>
            <Row gap={'1vw'} paddingY={1}>
              <UnstyledSelectIntroduction></UnstyledSelectIntroduction>
            </Row>
          </Column>
          <Column>
            <Box>Цвет субтитров</Box>
            <Row gap={'1vw'} paddingY={1}>
              {colors.map((e, i) => {
                return (
                  <Box
                    border={1}
                    borderColor={'#00000044'}
                    height={'40px'}
                    width={'40px'}
                    bgcolor={e}
                    onClick={() => {
                      setSelectedColor1(i)
                    }}
                    borderRadius={'0.5vw'}
                    sx={{
                      transition: 'all 300ms',
                      boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2);',
                      transform: `scale(${i == selectedColor1 ? '1.2' : '1'})`
                    }}
                  ></Box>
                )
              })}
            </Row>
          </Column>
          <Column>
            <Box>Цвет фона субтитров</Box>
            <Row gap={'1vw'} paddingY={1}>
              {colors.map((e, i) => {
                return (
                  <Box
                    border={1}
                    borderColor={'#00000044'}
                    height={'40px'}
                    width={'40px'}
                    bgcolor={e}
                    onClick={() => {
                      setSelectedColor2(i)
                    }}
                    borderRadius={'0.5vw'}
                    sx={{
                      transition: 'all 300ms',
                      boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2);',
                      transform: `scale(${i == selectedColor2 ? '1.2' : '1'})`
                    }}
                  ></Box>
                )
              })}
            </Row>
          </Column>
        </Box>
        <Column flex={1} height={'100%'} gap={2}>
          <Row
            height={'100%'}
            justifyContent={'space-around'}
            alignItems={'center'}
            fontSize={'0.75em'}
          >
            <Column
              borderRadius={'1vw'}
              onClick={() => setFace(!face)}
              border={2}
              borderColor={face ? 'lightgreen' : '#00000022'}
              paddingX={2}
              sx={{
                aspectRatio: '1',
                boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2);',
                transition: 'all 300ms'
              }}
              justifyContent={'center'}
            >
              <Box
                height={'50%'}
                component={'img'}
                sx={{ objectFit: 'contain' }}
                src='https://img.icons8.com/?size=100&id=71QJhGFFlIlg&format=png&color=000000'
              ></Box>
              <Box>Отслеживание лиц</Box>
            </Column>
            <Column
              borderRadius={'1vw'}
              onClick={() => setEmoji(!emoji)}
              paddingX={2}
              border={2}
              borderColor={emoji ? 'lightgreen' : '#00000022'}
              sx={{
                transition: 'all 300ms',
                aspectRatio: '1',
                boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2);'
              }}
              justifyContent={'center'}
            >
              <Box
                height={'50%'}
                component={'img'}
                sx={{ objectFit: 'contain' }}
                src='https://img.icons8.com/?size=100&id=wt8PIfMaNgWW&format=png&color=000000'
              ></Box>
              <Box>Добавить эмодзи</Box>
            </Column>
          </Row>
          <Row width={'100%'} justifyContent={'end'}>
            <Center
              paddingX={'1vw'}
              height={'50px'}
              border={2}
              borderRadius={'0.5vw'}
              bgcolor={'green'}
              fontWeight={'900'}
              color={'white'}
              onClick={() => {
                let tmp = {
                  name_video: nameVideo,
                  format_video: currFormat,
                  subtitlesColor: colorsRGB[selectedColor1],
                  subtitlesBgColor: colorsRGB[selectedColor2],
                  emoji: emoji,
                  face: face
                }
                contextVP.setSettingsRender(tmp)
                setVisible(false)
              }}
            >
              Сохранить
            </Center>
          </Row>
        </Column>
      </Row>
    </Column>
  )
}

function FragmentForVideo() {
  const data = videoInfo
  const [colorPrimary, setColorPrimary] = useState('#ffffff')
  const [colorSecondary, setColorSecondary] = useState('#555555')
  const contextVP = useContext(contextVideoPlayer)
  return (
    <Column
      width={'100%'}
      height={'100%'}
      fontSize={'0.7vw'}
      paddingBottom={'1vw'}
    >
      <Column fontSize={'1.25em'} height={'100%'}>
        <Row>
          <Box padding={'1vw'} fontWeight={900}>
            Видео
          </Box>
        </Row>
        <Box height={'1px'} width='100%' bgcolor='#ffffff44'></Box>
        <Row paddingX={'1vw'} alignItems={'center'}>
          <Box
            bgcolor={'lightgreen'}
            width={'2px'}
            height={'60%'}
            borderRadius={10}
          ></Box>
          <Box
            paddingX={'1vw'}
            paddingY={'0.5vw'}
            marginY={'0.5vw'}
            sx={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 100%)'
            }}
          >
            {contextVP.answerServer.name_video}
          </Box>
        </Row>

        <Row paddingX={'1vw'} alignItems={'center'}>
          <Box
            bgcolor={'lightblue'}
            width={'2px'}
            height={'100%'}
            borderRadius={1}
          ></Box>
          <Box
            flex={1}
            paddingX={'1vw'}
            paddingY={'0.5vw'}
            fontSize={'0.8em'}
            textAlign={'justify'}
            lineHeight={1.5}
            fontWeight={500}
            sx={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)'
            }}
          >
            {contextVP.answerServer.description}
          </Box>
        </Row>
        <Row
          borderRadius={'1vw'}
          padding={'1vw'}
          justifyContent={'space-between'}
          fontSize={'0.7em'}
          flexWrap={'wrap'}
          boxSizing={'border-box'}
        >
          {contextVP.answerServer.tags.map((elem, i) => {
            return (
              <Center
                paddingX={'1vw'}
                paddingY={'0.4vw'}
                fontWeight={900}
                borderRadius={'0.2vw'}
                border={2}
                key={i}
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)'
                }}
              >
                {elem}
              </Center>
            )
          })}
        </Row>
        <Column
          marginX={'1vw'}
          flex={1}
          fontSize={'0.8em'}
          textAlign={'justify'}
          lineHeight={1.5}
          fontWeight={500}
          paddingY={'0.5vw'}
          paddingX={'1vw'}
          borderLeft={2}
          borderColor={'pink'}
          sx={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)'
          }}
          color={'white'}
        >
          <Box fontWeight={900}>Общие настройки для всех клипов</Box>
          <Column>
            <UnstyledSelectIntroduction />
            <Row
              height={'4vw'}
              gap={'1vw'}
              marginTop={'0.5vw'}
              fontSize={'2vw'}
            >
              <ColorPickerBlock
                color={contextVP.subtitleColor}
                setColor={contextVP.setSubtitleColor}
              />
              <ColorPickerBlock
                color={contextVP.subtitleBackground}
                setColor={contextVP.setSubtitleBackground}
              />

              <Column width={'1.2vw'} gap={'0.25vw'} justifyContent={'center'}>
                <SubtitleTextPositionButton
                  clickFunc={() => contextVP.setSubtitlePosition(0)}
                  selected={contextVP.subtitlePosition == 0}
                  src='https://img.icons8.com/?size=100&id=115974&format=png&color=ffffff'
                />
                <SubtitleTextPositionButton
                  selected={contextVP.subtitlePosition == 1}
                  clickFunc={() => contextVP.setSubtitlePosition(1)}
                  src='https://img.icons8.com/?size=100&id=115997&format=png&color=ffffff'
                />
                <SubtitleTextPositionButton
                  selected={contextVP.subtitlePosition == 2}
                  clickFunc={() => contextVP.setSubtitlePosition(2)}
                  src='https://img.icons8.com/?size=100&id=115995&format=png&color=ffffff'
                />
              </Column>
            </Row>
          </Column>
          <Row alignItems={'center'}>
            <Checkbox
              checked={contextVP.allPresetFindObject}
              onChange={(e) =>
                contextVP.setAllPresetFindObject(!contextVP.allPresetFindObject)
              }
              inputProps={{
                'aria-label': 'controlled'
              }}
            />
            <Box
              onClick={() => {
                contextVP.setAllPresetFindObject(!contextVP.allPresetFindObject)
              }}
              sx={{ cursor: 'pointer', userSelect: 'none' }}
            >
              Отслеживать главный объект
            </Box>
          </Row>
        </Column>
      </Column>
    </Column>
  )
}
function ColorPickerBlock({ color, setColor }) {
  const [showColor, setShowColor] = useState(false)

  return (
    <Center
      width={'3.5vw'}
      height={'3.5vw'}
      bgcolor={color.hex ? color.hex : color}
      onMouseOver={() => {
        setShowColor(true)
      }}
      onMouseOut={() => {
        setShowColor(false)
      }}
    >
      <Box
        position={'absolute'}
        zIndex={1000}
        sx={{ transform: 'translateY(60%)' }}
      >
        <ColorPicker color={color} setColor={setColor} show={showColor} />
      </Box>
    </Center>
  )
}
function ColorPicker({ color, setColor, show }) {
  return (
    <Box
      position={'relative'}
      sx={{
        translate: '300ms all',
        display: show ? 'block' : 'none',
        opacity: show ? 1 : 0
      }}
    >
      <BlockPicker
        color={color}
        onChange={(e) => {
          setColor(e)
        }}
      />
    </Box>
  )
}

function SubtitleTextStyleButton({ selected, sx }) {
  return (
    <Center
      border={selected ? 2 : 0}
      borderColor={'pink'}
      height={'100%'}
      bgcolor={'#00000033'}
      borderRadius={'0.5vw'}
      sx={sx}
    >
      A
    </Center>
  )
}
function SubtitleTextPositionButton({ selected, sx, src, clickFunc }) {
  return (
    <Center
      onClick={clickFunc}
      sx={{
        aspectRatio: '1',
        opacity: selected ? 1 : 0.2,
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      <Box component={'img'} src={src} width={'100%'} height={'100%'}></Box>
    </Center>
  )
}

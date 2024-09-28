'use client'
import { Center } from '@/components/common/Center'
import { Column } from '@/components/common/Column'
import { Row } from '@/components/common/Row'
import { Alert, Box, Snackbar } from '@mui/material'
import axios from 'axios'
import { useMutation } from 'react-query'
import { contextVideoPlayer } from '../work/edit/[id]/context/VideoPlayerContext'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bars } from 'react-loader-spinner'
import { TimestampsNoRepeats } from '../work/edit/[id]/service/find_timestamp_end'

const Upload = ({ mutat, children }) => {
  const id = 'id_moment'
  return (
    <label htmlFor={id} style={{ width: '100%', height: '100%' }}>
      {children}
      <Box
        component={'input'}
        type='file'
        id={id}
        style={{ display: 'none' }}
        onChange={(e) => mutat(e.target.files[0])}
      />
    </label>
  )
}
export default function Page() {
  const router = useRouter()
  const contextVP = useContext(contextVideoPlayer)
  const [open, setOpen] = useState(false)
  const { mutate, isLoading, error } = useMutation(
    async (file) => {
      const formData = new FormData()
      formData.append('file', file, file.name)

      const response = await axios.post(
        'http://fileserver.enotgpt.ru/video/upload_main_video',
        formData,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImV4cCI6NDMxODUwNjc0OH0.6w4Y8c85tLElOokP-7fLLK9ta_wI_1V2L6qlfzdtu-Q',
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response.data
    },
    {
      onSuccess: (data) => {
        console.log(data)
        let tmp = {
          id_video: data.file.id,
          name_video: data.response.llama.name,
          description: data.response.llama.description,
          tags: data.response.llama.tags,
          text: data.response.whisper.text,
          subtitles: data.response.whisper.chunks,

          modelIvanaAudio: data.response.modelivana.audio.map,
          modelIvanaVolume: data.response.modelivana.volume.deviations,
          modelIvanaVideo: data.response.modelivana.video,
          emotion_all_text: data.response.modelivana.audio.emotion_all_text,
          parameter_text_recog: data.response.modelivana.audio.parameter,
          big_interesting_segments: data.big_interesting_segments
        }
        contextVP.setAnswerServer(tmp)
        contextVP.setVideoURL(data.file.url)
        router.push('/work/edit/' + data.file.id)
      },
      onError: (error) => {
        setOpen(true)
      }
    }
  )

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity='error'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Произошла ошибка
        </Alert>
      </Snackbar>
      <Center width={'100%'} height={'100dvh'}>
        <Box
          height={'80vh'}
          border={1}
          bgcolor={'white'}
          borderRadius={'2vw'}
          sx={{
            aspectRatio: '1',
            boxShadow: '0px 5px 10px 1px rgba(34, 60, 80, 0.2);'
          }}
        >
          {!isLoading ? (
            <Column
              justifyContent='center'
              alignItems={'center'}
              height={'100%'}
              paddingX={'3vw'}
            >
              <Box
                width={'20%'}
                component={'img'}
                src='https://img.icons8.com/?size=100&id=111366&format=png&color=000000'
              ></Box>
              <Box
                color='#000000dd'
                fontSize={'2vw'}
                textAlign={'center'}
                fontWeight={'300'}
              >
                Загрузка видео
              </Box>
              <Box height={'3vw'}></Box>

              <Column
                height={'40%'}
                border={3}
                borderRadius={'1vw'}
                color={'black'}
                sx={{ borderStyle: 'dotted' }}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Upload mutat={mutate}>
                  <Center
                    width={'100%'}
                    height={'100%'}
                    paddingX={'10vw'}
                    flexDirection={'column'}
                  >
                    <Row>
                      <Box
                        component={'img'}
                        src='https://img.icons8.com/?size=100&id=ZI2N2LpZcXuZ&format=png&color=000000'
                      ></Box>
                    </Row>
                    <Box>Поддерживаемые файлы</Box>
                    <Box>(mov, mp4, avi)</Box>
                  </Center>
                </Upload>
              </Column>
            </Column>
          ) : (
            <Center height={'100%'} width={'100%'} flexDirection={'column'}>
              <Bars
                height='160'
                width='160'
                color='#4fa94d'
                ariaLabel='bars-loading'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
              />
              <Box color={'black'} marginTop={'5vw'} fontSize={'2em'}>
                Видео обрабатывается
              </Box>
            </Center>
          )}
        </Box>
      </Center>
    </>
  )
}

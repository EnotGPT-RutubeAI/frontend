'use client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { VideoPlayerContext } from './work/edit/[id]/context/VideoPlayerProvider'

const queryClient = new QueryClient()

export const Body = ({ children }) => {
  return (
    <VideoPlayerContext>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </VideoPlayerContext>
  )
}

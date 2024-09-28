import { LeftMenu } from '@/components/work/LeftMenu'
import { Box } from '@mui/material'

export default function LayoutWork({ children }) {
  return (
    <Box width={'100%'}>
      <Box display={'flex'}>
        {
          //<LeftMenu />
        }
        <Box flex={1} bgcolor={'#14191F'} minHeight={'100dvh'}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter() // -> Access Next.js Router here
  const { id } = router.query

  return <Box>Hello world</Box>
}

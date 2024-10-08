import localFont from 'next/font/local'
import './globals.css'
import { Body } from './body'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <Body> {children}</Body>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import Chatbot from '@/components/Chatbot'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { LanguageProvider } from '@/components/LanguageProvider'

export const metadata: Metadata = {
  title: 'The Peaceful Mind Method — Sleep Better & Feel Calm in 21 Days',
  description:
    'A simple 10-minute daily practice designed for adults 60+ to reduce stress, sleep deeply, and enjoy life again. The 3-Breath Anchor Method. 90-Day Peace Promise.',
  keywords: 'meditation for seniors, sleep better over 60, calm anxiety naturally, 3-breath anchor, peaceful mind, meditation for elderly',
  openGraph: {
    title: 'The Peaceful Mind Method',
    description: 'Sleep deeply. Feel calm. Enjoy life again. The 10-minute daily practice for adults 60+.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
          <Chatbot />
          <LanguageSwitcher />
        </LanguageProvider>
      </body>
    </html>
  )
}

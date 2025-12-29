import type { Metadata } from 'next'
import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google'

import './globals.css'

import { ReactNode } from 'react'

import { Toaster } from '@/components/shadcn/ui/sonner'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-sans',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'WEN',
  description: 'WEN is a minimal, context-aware link-in-bio web app.',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}

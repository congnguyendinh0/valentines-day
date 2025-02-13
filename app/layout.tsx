import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'valentine',
  description: 'A special Valentines Day website for my love',
  icons: {
    icon: [{ url: "/favicon.svg" }, new URL("/favicon.svg", "https://yourdomain.com")],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

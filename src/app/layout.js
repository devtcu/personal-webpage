import './globals.css';
import { jetbrainsMono } from './fonts';

export const metadata = {
  title: 'Devansh',
  description: 'Personal portfolio showcasing my projects and skills as a software developer.',
  icons: {
    icon: [
      { url: '/zap.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`bg-black ${jetbrainsMono.variable}`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="./parallax/star.gif" as="image" />
        <link rel="preload" href="./parallax/bird.webp" as="image" />
        <link rel="preload" href="./parallax/wave1.jpg" as="image" />
        <link rel="icon" href="/zap.svg" type="image/svg+xml" />
      </head>
      <body className={`font-jetbrains min-h-screen bg-black ${jetbrainsMono.variable}`}>{children}</body>
    </html>
  )
}

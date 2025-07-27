import './globals.css';
import { jetbrainsMono } from './fonts';

export const metadata = {
  title: 'Your Name - Portfolio',
  description: 'Portfolio of Your Name, a passionate software developer.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`bg-black ${jetbrainsMono.variable}`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/parallax/star.gif" as="image" />
        <link rel="preload" href="/parallax/bird.webp" as="image" />
        <link rel="preload" href="/parallax/wave1.jpg" as="image" />
      </head>
      <body className={`font-jetbrains min-h-screen bg-black ${jetbrainsMono.variable}`}>{children}</body>
    </html>
  )
}

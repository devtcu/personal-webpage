import { Html, Head, Main, NextScript } from 'next/document'
import publicPathScript from '../utils/publicPath'

export default function Document() {
  const prefix = process.env.NODE_ENV === 'production' ? '/personal-webpage' : '';
  
  return (
    <Html lang="en">
      <Head>
        {/* Preload critical assets with correct paths */}
        <link rel="preload" href={`${prefix}/parallax/star.gif`} as="image" />
        <link rel="preload" href={`${prefix}/parallax/bird.webp`} as="image" />
        <link rel="preload" href={`${prefix}/parallax/wave1.jpg`} as="image" />
      </Head>
      <body>
        {/* Script to fix asset paths for GitHub Pages */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.dataset.basePath = "${prefix}";
                ${publicPathScript}
              })();
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

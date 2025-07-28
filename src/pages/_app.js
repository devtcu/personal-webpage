import { useEffect } from 'react';

// Custom App component to set up asset paths
export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Client-side only
    if (typeof window !== 'undefined') {
      const repoName = process.env.REPO_NAME || 'personal-webpage';
      const isProduction = process.env.IS_PRODUCTION || process.env.NODE_ENV === 'production';
      
      if (isProduction) {
        // Set a global variable for asset paths
        window.__PUBLIC_PATH__ = `/${repoName}/`;
        
        // Fix paths for already loaded resources
        document.querySelectorAll('img[src^="/"], link[href^="/"][rel="preload"]').forEach(el => {
          const attr = el.tagName === 'IMG' ? 'src' : 'href';
          if (!el[attr].startsWith(`/${repoName}/`) && !el[attr].startsWith('http')) {
            el[attr] = `/${repoName}${el[attr]}`;
          }
        });
      }
    }
  }, []);

  return <Component {...pageProps} />;
}

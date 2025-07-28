// This file is used to configure the public path for assets
// It is included in the HTML via _document.js

const publicPathScript = `
  (function() {
    try {
      const repoName = '${process.env.REPO_NAME || 'personal-webpage'}';
      const isProduction = ${process.env.IS_PRODUCTION || process.env.NODE_ENV === 'production'};
      
      if (isProduction) {
        // Set correct public path for GitHub Pages deployment
        window.__PUBLIC_PATH__ = '/' + repoName + '/';
        
        // For dynamically loaded assets
        if (typeof window.__webpack_public_path__ !== 'undefined') {
          window.__webpack_public_path__ = window.__PUBLIC_PATH__;
        }
      }
    } catch (e) {
      console.error('Failed to set public path:', e);
    }
  })();
`;

export default publicPathScript;

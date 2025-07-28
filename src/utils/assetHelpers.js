/**
 * Helper function to get the correct asset path based on the environment
 * @param {string} path - The relative path to the asset
 * @returns {string} - The complete path to the asset
 */
export function getAssetPath(path) {
  // Normalize the path to ensure it starts with '/'
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  if (typeof window === 'undefined') {
    // Server-side: use environment variable
    const repoName = process.env.REPO_NAME || 'personal-webpage';
    const isProduction = process.env.IS_PRODUCTION || process.env.NODE_ENV === 'production';
    const basePath = isProduction ? `/${repoName}` : '';
    return `${basePath}${normalizedPath}`;
  } else {
    // Client-side: use the base path from window.__PUBLIC_PATH__ or dataset
    const basePath = window.__PUBLIC_PATH__ || 
                     document.documentElement.dataset.basePath || 
                     (process.env.NODE_ENV === 'production' ? '/personal-webpage' : '');
    return `${basePath}${normalizedPath}`;
  }
}

/**
 * Adds the correct base path to a CSS url reference
 * @param {string} path - The path to the asset
 * @returns {string} - CSS url string with the correct path
 */
export function cssUrl(path) {
  // For direct use in CSS
  return `url(${getAssetPath(path)})`;
}

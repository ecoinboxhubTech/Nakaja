import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/** Used by scripts/prerender.mjs to bake the real page HTML into dist/index.html at build time. */
export const render = () => renderToString(<App />)

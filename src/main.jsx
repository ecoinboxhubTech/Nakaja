import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
// Production builds are pre-rendered (see scripts/prerender.mjs), so hydrate; dev server renders from scratch.
if (root.hasChildNodes()) hydrateRoot(root, <App />)
else createRoot(root).render(<App />)

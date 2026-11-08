export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: {
      brand: { 50:'#fff0f8',100:'#ffe0f1',200:'#ffc2e2',300:'#ff94cc',400:'#f95bab',500:'#ec1c8c',600:'#d10f78',700:'#a80c61' },
      ink: { DEFAULT:'#16163a',800:'#1f1f4a',700:'#2b2b5c',500:'#5b5b7e',400:'#7d7d9c',200:'#e6e4f0',100:'#f3f1f9' },
      sky: { 100:'#e0f2ff',400:'#4aa8e8',500:'#2f8fd6' },
      sun: { 100:'#fff1d1',400:'#ffbd3d',500:'#f5a300' },
      mint: { 100:'#dcf7ea',500:'#22b27a' },
      violet: { 100:'#ece6ff',500:'#7a5af8' }
    },
    fontFamily: { sans: ['Plus Jakarta Sans','system-ui','sans-serif'] },
    boxShadow: { soft:'0 20px 50px -25px rgba(22,22,58,.25)', pink:'0 18px 40px -14px rgba(236,28,140,.55)' }
  } }
}

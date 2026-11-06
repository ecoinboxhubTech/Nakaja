export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { primary:'#14422d','primary-container':'#2d5a43',secondary:'#2c694e','secondary-container':'#b0f1cd',
      tertiary:'#731800','tertiary-container':'#992806','tertiary-fixed':'#ffdbd1',surface:'#fbf9f4','surface-low':'#f5f3ee',
      'surface-mid':'#f0eee9','surface-high':'#eae8e3','on-surface':'#1b1c19','on-variant':'#414943','primary-fixed':'#bceecf','inverse-primary':'#a1d1b4' },
    fontFamily: { sans: ['Plus Jakarta Sans','system-ui','sans-serif'], display: ['Fraunces','Georgia','serif'] }
  } }
}

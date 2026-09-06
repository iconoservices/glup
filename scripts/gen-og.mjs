import sharp from 'sharp';

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="18%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#1fa8ff" stop-opacity="0.28"/>
      <stop offset="60%" stop-color="#0b0f18" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0b0f18"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(92,140) scale(0.44)">
    <path d="M256 92C256 92 150 214 150 312a106 106 0 1 0 212 0C362 214 256 92 256 92Z" fill="#1fa8ff"/>
    <circle cx="330" cy="150" r="30" fill="#ffce3a"/>
  </g>
  <text x="96" y="400" font-family="Arial, Helvetica, sans-serif" font-size="110" font-weight="700" fill="#1fa8ff">Glup Juegos</text>
  <text x="99" y="472" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="#a6b1c2">Juegos para fiestas, parejas y grupos &#183; +18 &#183; gratis</text>
  <text x="99" y="542" font-family="Arial, Helvetica, sans-serif" font-size="29" fill="#6b7688">verdad o reto &#183; botella borracha &#183; yo nunca nunca &#183; dados er&#243;ticos</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('public/og.png generado');

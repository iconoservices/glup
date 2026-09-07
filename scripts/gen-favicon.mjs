import sharp from 'sharp';

// La gota de Glup (misma que el componente Logo), sobre el casi-negro de marca.
const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#0b0f18"/>
  <path d="M256 96C256 96 150 220 150 318a106 106 0 1 0 212 0C362 220 256 96 256 96Z" fill="#1fa8ff"/>
  <ellipse cx="210" cy="300" rx="26" ry="34" fill="#ffffff" fill-opacity="0.30"/>
  <circle cx="336" cy="150" r="34" fill="#ffce3a"/>
</svg>`;

const buf = Buffer.from(svg);
const sizes = [48, 96, 180, 192, 512];

for (const s of sizes) {
  const name = s === 180 ? 'apple-touch-icon-180x180.png' : `favicon-${s}x${s}.png`;
  await sharp(buf).resize(s, s).png().toFile(`public/${name}`);
  console.log(name);
}

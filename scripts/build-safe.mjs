// Build "seguro" para empaquetar y subir a tiendas de apps (Play Store):
// sin Tríos, sin Swinger, y en Verdad o Reto solo los niveles suaves.
// La web normal (npm run build) sigue teniendo todo el contenido.
import { spawnSync } from 'node:child_process';

const r = spawnSync('npx', ['vite-react-ssg', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, VITE_SAFE_BUILD: 'true' },
});

process.exit(r.status ?? 0);

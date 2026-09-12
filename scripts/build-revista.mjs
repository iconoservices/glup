// Build de la Revista sola, como sitio independiente (para su propio
// subdominio, ej. revista.vizioclub.online). Sin Hub, sin juegos: solo la
// lista de notas y cada artículo, en la raíz.
import { spawnSync } from 'node:child_process';

const r = spawnSync('npx', ['vite-react-ssg', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, VITE_REVISTA_BUILD: 'true' },
});

process.exit(r.status ?? 0);

import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';
import './styles/hub.css';
import './styles/blog.css';

// Si un import dinámico falla por un deploy nuevo (chunk viejo que ya no existe),
// recargamos para traer la versión fresca.
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', () => window.location.reload());
}

export const createRoot = ViteReactSSG({ routes });

import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './index.css';
import './styles/hub.css';
import './styles/blog.css';

export const createRoot = ViteReactSSG({ routes });

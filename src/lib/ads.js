// Anuncios de Adsterra — Glup Juegos + Revista.
//
// Pega aquí las claves de tus unidades de anuncio (Adsterra → Websites → Ad Units → Get Code).
// Mientras una clave esté vacía, ese espacio no se dibuja: no queda ninguna caja vacía en la página.
//
// Banner: del código copia la "key" de atOptions y el ancho/alto.
// Native Banner: del código copia la URL del script (src) y el id del contenedor (container-XXXX).
import { SAFE_BUILD } from './buildMode';

export const ADS = {
  // El build "seguro" es el que se sube a tiendas de apps: sin publicidad.
  enabled: !SAFE_BUILD,
  // Dominio del invoke.js del banner. Cámbialo si tu código de Adsterra usa otro
  // (por ejemplo www.highperformanceformat.com).
  bannerHost: 'www.highrevenueformat.com',
  banner: {
    mobile:  { key: '', width: 300, height: 250 },
    desktop: { key: '', width: 728, height: 90 },
  },
  native: { src: '', containerId: '' },
};

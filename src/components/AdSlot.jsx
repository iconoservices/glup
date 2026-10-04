import React, { useEffect, useRef } from 'react';
import { ADS } from '../lib/ads';

// Espacio publicitario de Adsterra. No dibuja nada (ni la etiqueta) hasta que hay una clave
// configurada en src/lib/ads.js. Se monta solo en el navegador: el HTML prerenderizado sale
// sin anuncios y no hay desajuste al hidratar.
//
//   <AdSlot />                  banner (300x250 en móvil, 728x90 en pantalla ancha)
//   <AdSlot kind="native" />    Native Banner (solo uno por página: su script busca el contenedor por id)
export default function AdSlot({ kind = 'banner' }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!ADS.enabled || !host) return undefined;

    let node = null;
    if (kind === 'native') {
      const { src, containerId } = ADS.native;
      if (!src || !containerId || document.getElementById(containerId)) return undefined;
      const box = document.createElement('div');
      box.id = containerId;
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = src;
      host.append(box, script);
      node = [box, script];
    } else {
      const wide = window.innerWidth >= 768;
      const cfg = wide ? ADS.banner.desktop : ADS.banner.mobile;
      if (!cfg || !cfg.key) return undefined;
      // Cada banner va en su propio iframe: atOptions es una variable global y dos banners en la
      // misma página se pisarían entre sí.
      const frame = document.createElement('iframe');
      frame.width = cfg.width;
      frame.height = cfg.height;
      frame.title = 'Publicidad';
      frame.scrolling = 'no';
      frame.loading = 'lazy';
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
      frame.style.cssText = 'border:0;max-width:100%;display:block;margin:0 auto;';
      frame.srcdoc = '<!doctype html><body style="margin:0">'
        + `<script>atOptions={"key":"${cfg.key}","format":"iframe","height":${cfg.height},"width":${cfg.width},"params":{}};</script>`
        + `<script src="https://${ADS.bannerHost}/${cfg.key}/invoke.js"></script></body>`;
      host.append(frame);
      node = [frame];
    }

    // La clase se maneja a mano (no con estado) para no re-renderizar dentro del efecto.
    host.classList.add('ad-slot--on');
    return () => {
      node.forEach((n) => n.remove());
      host.classList.remove('ad-slot--on');
    };
  }, [kind]);

  return <div ref={hostRef} className="ad-slot" />;
}

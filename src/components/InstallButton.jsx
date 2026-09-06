import React, { useState, useEffect } from 'react';
import { Download, Share, Plus } from 'lucide-react';

const isStandalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true);

const isIOS = () =>
  typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);

export default function InstallButton() {
  const [deferred, setDeferred] = useState(null);
  const [installed, setInstalled] = useState(() => isStandalone());
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setDeferred(e); };
    const onInstalled = () => { setInstalled(true); setDeferred(null); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed) {
    return (
      <div className="set-row" style={{ justifyContent: 'center', color: 'var(--text-dim)' }}>
        ✅ Glup! ya está instalada
      </div>
    );
  }

  const handleClick = async () => {
    if (deferred) {
      deferred.prompt();
      const { outcome } = await deferred.userChoice;
      if (outcome === 'accepted') setDeferred(null);
      return;
    }
    setShowIosHint((v) => !v);
  };

  return (
    <>
      <button className="btn btn--solid btn--block" style={{ marginBottom: '0.55rem' }} onClick={handleClick}>
        <Download size={18} /> Instalar Glup! en tu teléfono
      </button>

      {showIosHint && !deferred && (
        <div className="set-row" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--text-dim)' }}>
          {isIOS() ? (
            <>
              <span>En iPhone: toca <Share size={14} style={{ verticalAlign: 'middle' }} /> <b>Compartir</b> y luego <b>“Añadir a pantalla de inicio”</b>.</span>
            </>
          ) : (
            <>
              <span>En el menú <Plus size={14} style={{ verticalAlign: 'middle' }} /> del navegador, elige <b>“Instalar app”</b> o <b>“Añadir a pantalla de inicio”</b>.</span>
            </>
          )}
        </div>
      )}
    </>
  );
}

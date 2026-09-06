import React, { useState } from 'react';
import { Download, Share, Plus } from 'lucide-react';
import { useInstallPrompt, isIOS } from '../lib/useInstallPrompt';

export default function InstallButton() {
  const { canPrompt, installed, promptInstall } = useInstallPrompt();
  const [showHint, setShowHint] = useState(false);

  if (installed) {
    return (
      <div className="set-row" style={{ justifyContent: 'center', color: 'var(--text-dim)' }}>
        ✅ Glup! ya está instalada
      </div>
    );
  }

  const handleClick = () => {
    if (canPrompt) { promptInstall(); return; }
    setShowHint((v) => !v);
  };

  return (
    <>
      <button className="btn btn--solid btn--block" style={{ marginBottom: '0.55rem' }} onClick={handleClick}>
        <Download size={18} /> Instalar Glup! en tu teléfono
      </button>

      {showHint && !canPrompt && (
        <div className="set-row" style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
          {isIOS() ? (
            <span>En iPhone: toca <Share size={14} style={{ verticalAlign: 'middle' }} /> <b>Compartir</b> y luego <b>“Añadir a pantalla de inicio”</b>.</span>
          ) : (
            <span>En el menú <Plus size={14} style={{ verticalAlign: 'middle' }} /> del navegador, elige <b>“Instalar app”</b> o <b>“Añadir a pantalla de inicio”</b>.</span>
          )}
        </div>
      )}
    </>
  );
}

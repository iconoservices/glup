import React, { useState } from 'react';
import { Download, X } from 'lucide-react';
import { useInstallPrompt } from '../lib/useInstallPrompt';
import { loadSetting, saveSetting } from '../lib/storage';

// Banda de instalación en el inicio. Solo aparece si el navegador
// ofrece instalar y el usuario no la cerró antes.
export default function InstallBanner() {
  const { canPrompt, installed, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(() => loadSetting('installBannerDismissed', false));

  if (installed || dismissed || !canPrompt) return null;

  const close = () => { setDismissed(true); saveSetting('installBannerDismissed', true); };

  return (
    <div className="install-banner">
      <div className="install-banner__text">
        <strong>Instala Glup!</strong>
        <span>Juega sin abrir el navegador</span>
      </div>
      <button className="btn btn--solid" onClick={promptInstall}>
        <Download size={16} /> Instalar
      </button>
      <button className="icon-btn" onClick={close} aria-label="Cerrar"><X size={16} /></button>
    </div>
  );
}

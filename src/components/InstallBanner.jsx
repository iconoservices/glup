import React, { useState } from 'react';
import { Download, X, Share } from 'lucide-react';
import { useInstallPrompt, isIOS } from '../lib/useInstallPrompt';
import { loadSetting, saveSetting } from '../lib/storage';

// Banda de instalación en el inicio. Aparece si el navegador ofrece
// instalar (Android/Chrome) o si es iPhone; se puede cerrar y se recuerda.
export default function InstallBanner() {
  const { canPrompt, installed, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(() => loadSetting('installBannerDismissed', false));
  const [showIos, setShowIos] = useState(false);

  const ios = isIOS();
  if (installed || dismissed || (!canPrompt && !ios)) return null;

  const close = () => { setDismissed(true); saveSetting('installBannerDismissed', true); };
  const action = () => { if (canPrompt) promptInstall(); else setShowIos((v) => !v); };

  return (
    <div className="install-banner">
      <div className="install-banner__row">
        <div className="install-banner__text">
          <strong>Instala Glup!</strong>
          <span>Juega sin abrir el navegador</span>
        </div>
        <button className="btn btn--solid" onClick={action}>
          <Download size={16} /> Instalar
        </button>
        <button className="icon-btn" onClick={close} aria-label="Cerrar"><X size={16} /></button>
      </div>
      {showIos && (
        <p className="install-banner__ios">
          En iPhone: toca <Share size={14} style={{ verticalAlign: 'middle' }} /> <b>Compartir</b> abajo y luego <b>“Añadir a pantalla de inicio”</b>.
        </p>
      )}
    </div>
  );
}

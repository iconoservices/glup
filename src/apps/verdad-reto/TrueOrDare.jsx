import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import GameShell from '../../components/GameShell';
import { accentStyle } from '../../theme';
import { verdades, retos, castigosTrago } from '../../gameContent';

export default function TrueOrDare({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [isTruth, setIsTruth] = useState(true); // true = Verdad, false = Reto

    const handleAction = (type) => {
        let result = "";
        const verdadesActuales = verdades[intensity] || verdades.intermedio;
        const retosActuales = retos[intensity] || retos.intermedio;

        if (type === 'verdad') {
            result = verdadesActuales[Math.floor(Math.random() * verdadesActuales.length)];
            setIsTruth(true);
        } else {
            result = retosActuales[Math.floor(Math.random() * retosActuales.length)];
            if (isDrinkingMode && Math.random() < 0.3) {
                result += `\n\n PENITENCIA ALCOHÓLICA: ${castigosTrago[Math.floor(Math.random() * castigosTrago.length)]}`;
            }
            setIsTruth(false);
        }
        setCurrentPrompt(result);
    };

    const activeAccent = currentPrompt ? (isTruth ? 'pink' : 'yellow') : 'pink';

    return (
        <GameShell
            accent="pink"
            label="VERDAD O RETO"
            icon={<Flame size={18} />}
            drinking={isDrinkingMode}
            drinkingText="Modo Tragos está encendido"
            onBack={onBack}
        >
            <div className={`prompt${currentPrompt ? ' is-active' : ''}`} style={accentStyle(activeAccent)}>
                {!currentPrompt ? (
                    <p className="prompt__text prompt__text--idle">¿Listo para revelar tus secretos o atreverte al castigo?</p>
                ) : (
                    <>
                        <span className="prompt__tag">{isTruth ? 'VERDAD' : 'RETO'}</span>
                        <p className="prompt__text">{currentPrompt}</p>
                    </>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', width: '100%' }}>
                <button className="btn btn--outline btn--lg" style={accentStyle('pink')} onClick={() => handleAction('verdad')}>
                    VERDAD
                </button>
                <button className="btn btn--outline btn--lg" style={accentStyle('yellow')} onClick={() => handleAction('reto')}>
                    RETO
                </button>
            </div>
        </GameShell>
    );
}

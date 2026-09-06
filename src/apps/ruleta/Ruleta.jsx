import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import GameShell from '../../components/GameShell';
import { castigosRuleta, modificadoresTrago } from '../../gameContent';

export default function Ruleta({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
    const [spinning, setSpinning] = useState(false);
    const [resultado, setResultado] = useState(null);

    const handleSpin = () => {
        if (spinning) return;
        setSpinning(true);
        setResultado(null);

        setTimeout(() => {
            const lista = castigosRuleta[intensity] || castigosRuleta.intermedio;
            let text = lista[Math.floor(Math.random() * lista.length)];
            if (isDrinkingMode && Math.random() < 0.3) {
                text += `\n\n🍻 ${modificadoresTrago[Math.floor(Math.random() * modificadoresTrago.length)]}`;
            }
            setResultado(text);
            setSpinning(false);
        }, 1500);
    };

    return (
        <GameShell
            accent="violet"
            label="RULETA"
            icon={<Sparkles size={18} />}
            drinking={isDrinkingMode}
            onBack={onBack}
        >
            <button className={`big-tap${spinning ? ' is-busy' : ''}`} onClick={handleSpin} disabled={spinning}>
                {spinning ? 'GIRANDO...' : '¡GIRAR!'}
            </button>

            <div className={`prompt${resultado ? ' is-active' : ''}`}>
                <p className={`prompt__text${resultado ? '' : ' prompt__text--idle'}`}>
                    {resultado || 'Toca el círculo para ver a quién y qué le toca...'}
                </p>
            </div>
        </GameShell>
    );
}

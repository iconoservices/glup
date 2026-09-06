import React, { useState } from 'react';
import { GlassWater, RefreshCw } from 'lucide-react';
import GameShell from '../../components/GameShell';
import { confesiones } from '../../gameContent';

export default function YoNunca({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
    const [currentStatement, setCurrentStatement] = useState("Toca 'Siguiente' para empezar los castigos...");
    const [started, setStarted] = useState(false);

    const nextStatement = () => {
        const lista = confesiones[intensity] || confesiones.intermedio;
        setCurrentStatement(lista[Math.floor(Math.random() * lista.length)]);
        setStarted(true);
    };

    return (
        <GameShell
            accent="yellow"
            label="YO NUNCA NUNCA"
            icon={<GlassWater size={18} />}
            drinking={isDrinkingMode}
            onBack={onBack}
        >
            <div className={`prompt${started ? ' is-active' : ''}`}>
                <p className={`prompt__text${started ? '' : ' prompt__text--idle'}`} style={{ fontStyle: started ? 'italic' : 'normal' }}>
                    {started ? `"${currentStatement}"` : currentStatement}
                </p>
                {started && (
                    <p className="stage__hint">
                        {isDrinkingMode ? "El que lo haya hecho... ¡QUE BEBA SU TRAGO AHORA!" : "El que lo haya hecho debe cumplir un castigo del grupo."}
                    </p>
                )}
            </div>

            <button className="btn btn--outline btn--lg btn--pill" onClick={nextStatement}>
                <RefreshCw size={20} /> Siguiente
            </button>
        </GameShell>
    );
}

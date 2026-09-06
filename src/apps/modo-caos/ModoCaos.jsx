import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';
import GameShell from '../../components/GameShell';
import { accentStyle } from '../../theme';
import { modoCaos as todosModos } from '../../gameContent';

export default function ModoCaos({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
    const [resultado, setResultado] = useState(null);
    const [tipo, setTipo] = useState(null);

    const lanzar = () => {
        const nivel = todosModos[intensity] || todosModos.intermedio;
        const esTipo = Math.random() > 0.5 ? 'verdad' : 'reto';
        const lista = nivel[esTipo];
        let text = lista[Math.floor(Math.random() * lista.length)];
        if (isDrinkingMode && Math.random() < 0.25) {
            text += "\n\n🍻 ¡Si te niegas, fondo blanco!";
        }
        setTipo(esTipo);
        setResultado(text);
    };

    return (
        <GameShell
            accent="violet"
            label="MODO CAOS"
            icon={<Shuffle size={18} />}
            drinking={isDrinkingMode}
            onBack={onBack}
        >
            <p className="stage__hint">Mezcla de todos los juegos. ¡Nunca sabes qué te toca!</p>

            <div
                className={`prompt${resultado ? ' is-active' : ''}`}
                style={accentStyle(tipo === 'reto' ? 'yellow' : 'pink')}
            >
                {tipo && <span className="prompt__tag">{tipo.toUpperCase()}</span>}
                <p className={`prompt__text${resultado ? '' : ' prompt__text--idle'}`}>
                    {resultado || 'Pulsa el botón y el Modo Caos decide tu destino...'}
                </p>
            </div>

            <button className="btn btn--rainbow btn--lg btn--pill" onClick={lanzar}>
                🎲 ¡CAOS!
            </button>
        </GameShell>
    );
}

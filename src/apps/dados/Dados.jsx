import React, { useState } from 'react';
import { Dices } from 'lucide-react';
import GameShell from '../../components/GameShell';

const acciones = {
    suave: [
        "Canta una canción romántica a alguien del grupo.",
        "Intercambia una prenda de ropa accesorio con alguien.",
        "Da un abrazo inesperado a quien el grupo decida.",
        "Actúa como si fueras un actor de telenovela por 30 segundos.",
        "Susúrrale algo bonito al oído a la persona de tu izquierda.",
        "Masajea los hombros de alguien por 1 minuto."
    ],
    intermedio: [
        "Quítate una prenda de ropa. Tú decides cuál.",
        "Haz una mímica sensual que adivinen los demás.",
        "Besa en la mejilla a dos personas del grupo a la vez.",
        "Deja que alguien te dé un pequeno mordisco en el hombro.",
        "Recibe un masaje en la espalda de quien el dado señale.",
        "Soplale suavemente en la nuca a tu persona de la derecha."
    ],
    picante: [
        "Simula que estás en una escena de película erótica por 20 segundos.",
        "Deja que alguien dibuje con su dedo en tu espalda (sin ropa). Adivina qué era.",
        "Saca 1 cubito de hielo y hazlo recorrer el cuello de la persona a tu izquierda.",
        "Besa voluntariamente a alguien del grupo durante 5 segundos.",
        "Haz tu pose o cara más seductora posible y mantela 10 segundos.",
        "Enseña uno de los mensajes más comprometedores de tu WhatsApp."
    ]
};

const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export default function Dados({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
    const [resultado, setResultado] = useState(null);
    const [rolling, setRolling] = useState(false);
    const [diceNum, setDiceNum] = useState(null);

    const rollDice = () => {
        if (rolling) return;
        setRolling(true);
        setResultado(null);
        setDiceNum(null);

        setTimeout(() => {
            const num = Math.floor(Math.random() * 6) + 1;
            const lista = acciones[intensity] || acciones.intermedio;
            let text = lista[Math.floor(Math.random() * lista.length)];
            if (isDrinkingMode && Math.random() < 0.25) {
                text += "\n\n🍻 ¡Penitencia doble! Bebe si te niegas.";
            }
            setDiceNum(num);
            setResultado(text);
            setRolling(false);
        }, 1200);
    };

    return (
        <GameShell
            accent="pink"
            label="DADOS TRAVIESOS"
            icon={<Dices size={18} />}
            drinking={isDrinkingMode}
            onBack={onBack}
        >
            <button
                className={`giant${rolling ? ' is-busy' : ''}${diceNum ? ' is-done' : ''}`}
                onClick={rollDice}
                disabled={rolling}
            >
                {rolling || !diceNum ? '🎲' : diceFaces[diceNum - 1]}
            </button>

            <p className="stage__hint">{rolling ? 'Tirando...' : 'Toca el dado para lanzarlo'}</p>

            <div className={`prompt${resultado ? ' is-active' : ''}`}>
                <p className={`prompt__text${resultado ? '' : ' prompt__text--idle'}`}>
                    {resultado || 'Tu castigo aparecerá aquí...'}
                </p>
            </div>
        </GameShell>
    );
}

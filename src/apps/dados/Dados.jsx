import React, { useState, useRef } from 'react';
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

const PIPS = {
    1: [[50, 50]],
    2: [[28, 28], [72, 72]],
    3: [[28, 28], [50, 50], [72, 72]],
    4: [[28, 28], [72, 28], [28, 72], [72, 72]],
    5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
    6: [[28, 26], [28, 50], [28, 74], [72, 26], [72, 50], [72, 74]],
};

function DiceSVG({ n }) {
    return (
        <svg className="dice-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="6" y="6" width="88" height="88" rx="20" fill="#f4f1f7" />
            <rect x="6" y="6" width="88" height="88" rx="20" fill="var(--accent)" fillOpacity="0.12" />
            {(PIPS[n] || PIPS[1]).map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="9" fill="var(--accent)" />
            ))}
        </svg>
    );
}

const ROLL_MS = 1100;

export default function Dados({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
    const [resultado, setResultado] = useState(null);
    const [rolling, setRolling] = useState(false);
    const [diceNum, setDiceNum] = useState(1);
    const diceRef = useRef(null);

    const rollDice = () => {
        if (rolling || !diceRef.current) return;
        setRolling(true);
        setResultado(null);

        diceRef.current.animate(
            [
                { transform: 'rotate(0) scale(1)' },
                { transform: 'rotate(200deg) scale(1.12)', offset: 0.3 },
                { transform: 'rotate(430deg) scale(0.94)', offset: 0.6 },
                { transform: 'rotate(680deg) scale(1.06)', offset: 0.82 },
                { transform: 'rotate(720deg) scale(1)' },
            ],
            { duration: ROLL_MS, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', fill: 'forwards' }
        );

        // el número cambia rápido mientras "rueda"
        let ticks = 0;
        const iv = setInterval(() => {
            setDiceNum(Math.floor(Math.random() * 6) + 1);
            if (++ticks > 7) clearInterval(iv);
        }, 110);

        setTimeout(() => {
            clearInterval(iv);
            const num = Math.floor(Math.random() * 6) + 1;
            const lista = acciones[intensity] || acciones.intermedio;
            let text = lista[Math.floor(Math.random() * lista.length)];
            if (isDrinkingMode && Math.random() < 0.25) {
                text += "\n\n🍻 ¡Penitencia doble! Bebe si te niegas.";
            }
            setDiceNum(num);
            setResultado(text);
            setRolling(false);
        }, ROLL_MS);
    };

    return (
        <GameShell
            accent="pink"
            label="DADOS TRAVIESOS"
            icon={<Dices size={18} />}
            drinking={isDrinkingMode}
            onBack={onBack}
        >
            <button className="dice-stage" onClick={rollDice} disabled={rolling} aria-label="Lanzar el dado">
                <span className="dice-spin" ref={diceRef}><DiceSVG n={diceNum} /></span>
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

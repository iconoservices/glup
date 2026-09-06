import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import GameShell from '../../components/GameShell';

const castigosRuleta = {
    suave: [
        "Dale un masaje de 1 minuto a la persona de tu derecha.",
        "Mírense a los ojos fijamente sin reír por 30 segundos. El que pierda, cumple reto.",
        "Pide perdón de forma exagerada por algo absurdo que hayas hecho hoy.",
        "Acaricia suavemente el pelo de alguien a tu elección.",
        "Elogia a todos en la mesa con algo que realmente aprecies de ellos."
    ],
    intermedio: [
        "Sopla suavemente en la nuca de la persona a tu izquierda.",
        "Cambia de asiento con alguien y siéntate en sus piernas por 1 ronda.",
        "Deja que alguien del grupo te pase un hielo por el cuello.",
        "Manda un audio gemiendo suavemente a un grupo al azar.",
        "Intercambia una prenda de ropa con la persona que tienes enfrente."
    ],
    picante: [
        "Baila de forma provocativa para alguien durante 30 segundos (sin música).",
        "Dale un beso húmedo en el cuello a quien tú elijas.",
        "Desabróchate la camisa/blusa lentamente manteniendo contacto visual.",
        "Pasa tu lengua suavemente por los labios de la persona de tu izquierda.",
        "Déjate lamer crema o bebida de alguna parte de tu cuerpo que el grupo decida."
    ]
};

const modificadoresTrago = [
    "¡Y además tomas 2 chupitos si te niegas!",
    "Si te ríes haciéndolo, tomas 1.",
    "Bebe fondo blanco antes de cumplir."
];

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

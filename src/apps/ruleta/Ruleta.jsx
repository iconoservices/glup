import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Beer } from 'lucide-react';

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

        // Simular tiempo de giro
        setTimeout(() => {
            const lista = castigosRuleta[intensity] || castigosRuleta.intermedio;
            let text = lista[Math.floor(Math.random() * lista.length)];

            if (isDrinkingMode && Math.random() < 0.3) {
                const trago = modificadoresTrago[Math.floor(Math.random() * modificadoresTrago.length)];
                text += `\n\n 🍻 ${trago}`;
            }

            setResultado(text);
            setSpinning(false);
        }, 1500);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '2rem 1.5rem', background: '#0a0a0a', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={24} /> Volver
                </button>
                <span style={{ fontWeight: '600', color: '#ff00ff', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={20} /> RULETA
                </span>
                <div style={{ width: '24px' }}></div>
            </div>

            {isDrinkingMode && (
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#ff00ff', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <Beer size={16} /> Modo Tragos activado
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                <button
                    onClick={handleSpin}
                    disabled={spinning}
                    style={{
                        width: '200px', height: '200px', borderRadius: '50%', background: 'transparent',
                        border: `4px solid ${spinning ? '#a0a0a0' : '#ff00ff'}`, color: spinning ? '#a0a0a0' : '#ff00ff',
                        fontSize: '1.5rem', fontWeight: '800', cursor: spinning ? 'default' : 'pointer',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        textShadow: spinning ? 'none' : '0 0 10px rgba(255,0,255,0.8)',
                        boxShadow: spinning ? 'none' : '0 0 30px rgba(255,0,255,0.3) inset',
                        transition: 'all 0.3s ease', animation: spinning ? 'pulse 0.5s infinite' : 'none'
                    }}
                >
                    {spinning ? 'GIRANDO...' : '¡GIRAR!'}
                </button>

                <div style={{
                    minHeight: '120px', width: '100%', padding: '1.5rem', background: 'rgba(30,30,30,0.6)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', textAlign: 'center',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: resultado ? 1 : 0.3, transition: 'all 0.5s ease'
                }}>
                    <p style={{ fontSize: '1.3rem', fontWeight: '600', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                        {resultado || 'Toca el círculo para ver a quién y qué le toca...'}
                    </p>
                </div>
            </div>
        </div>
    );
}

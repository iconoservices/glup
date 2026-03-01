import React, { useState } from 'react';
import { Dices, ArrowLeft, Beer } from 'lucide-react';

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

    const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '2rem 1.5rem', background: '#0a0a0a', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={24} /> Volver
                </button>
                <span style={{ fontWeight: '600', color: '#ffa500', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Dices size={20} /> DADOS TRAVIESOS
                </span>
                <div style={{ width: '24px' }}></div>
            </div>

            {isDrinkingMode && (
                <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#ffa500', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <Beer size={16} /> Modo Tragos activado
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                {/* Dado visual */}
                <button
                    onClick={rollDice}
                    disabled={rolling}
                    style={{
                        fontSize: rolling ? '5rem' : '9rem', background: 'transparent', border: 'none',
                        cursor: 'pointer', lineHeight: 1, transition: 'all 0.3s',
                        animation: rolling ? 'pulse 0.3s infinite alternate' : 'none',
                        filter: diceNum ? 'drop-shadow(0 0 15px rgba(255,165,0,0.7))' : 'none'
                    }}
                >
                    {rolling ? '🎲' : diceNum ? diceFaces[diceNum - 1] : '🎲'}
                </button>

                <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>
                    {rolling ? 'Tirando...' : 'Toca el dado para lanzarlo'}
                </p>

                <div style={{
                    width: '100%', padding: '1.5rem', background: 'rgba(30,30,30,0.6)',
                    border: `1px solid ${resultado ? 'rgba(255,165,0,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '20px', textAlign: 'center', minHeight: '120px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: resultado ? '0 0 20px rgba(255,165,0,0.1) inset' : 'none',
                    transition: 'all 0.5s ease'
                }}>
                    <p style={{ fontSize: '1.3rem', fontWeight: '600', lineHeight: 1.5, whiteSpace: 'pre-line', color: resultado ? '#fff' : '#555' }}>
                        {resultado || 'Tu castigo aparecerá aquí...'}
                    </p>
                </div>
            </div>
        </div>
    );
}

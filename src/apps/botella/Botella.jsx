import React, { useState } from 'react';
import { Users } from 'lucide-react';
import GameShell from '../../components/GameShell';

const retosBottella = {
    suave: [
        "Dale un cumplido sincero a la persona elegida.",
        "Cuéntale un secreto gracioso al elegido.",
        "Dale la mano y sostenla 10 segundos.",
    ],
    intermedio: [
        "Dale un beso en la mejilla lentamente.",
        "Susúrrale algo atrevido al oído.",
        "Intercambia una prenda de ropa con el elegido.",
    ],
    picante: [
        "Besen en los labios durante 5 segundos.",
        "El elegido puede hacerte una pregunta íntima que debes contestar con total honestidad.",
        "Seduce al elegido con tu mejor mirada y toque durante 15 segundos.",
    ]
};

export default function Botella({ onBack, isDrinkingMode, intensity = 'intermedio', jugadores = [] }) {
    const [girando, setGirando] = useState(false);
    const [elegido, setElegido] = useState(null);
    const [reto, setReto] = useState(null);
    const [angulo, setAngulo] = useState(0);

    const girar = () => {
        if (girando || jugadores.length < 2) return;
        setGirando(true);
        setReto(null);

        const vueltasExtra = Math.floor(Math.random() * 5 + 3) * 360;
        const anguloFinal = angulo + vueltasExtra + Math.floor(Math.random() * 360);
        setAngulo(anguloFinal);

        setTimeout(() => {
            const elegidoIdx = Math.floor(Math.random() * jugadores.length);
            const lista = retosBottella[intensity] || retosBottella.intermedio;
            let textoReto = lista[Math.floor(Math.random() * lista.length)];
            if (isDrinkingMode && Math.random() < 0.3) textoReto += '\n\n🍻 ¡Si te niegas, bebe 2 shots!';
            setElegido(jugadores[elegidoIdx]);
            setReto(textoReto);
            setGirando(false);
        }, 1800);
    };

    return (
        <GameShell
            accent="blue"
            label="LA BOTELLA"
            icon={<span style={{ fontSize: '16px' }}>🍾</span>}
            drinking={isDrinkingMode}
            onBack={onBack}
            stage={jugadores.length >= 2}
        >
            {jugadores.length < 2 ? (
                <div className="empty">
                    <Users size={56} color="var(--text-faint)" />
                    <h2>Necesitas al menos 2 jugadores</h2>
                    <p>Ve a la pantalla de inicio y agrega jugadores antes de empezar.</p>
                    <button className="btn btn--outline btn--pill" style={{ marginTop: '0.5rem' }} onClick={onBack}>
                        Volver a agregar jugadores
                    </button>
                </div>
            ) : (
                <>
                    <div className="player-tokens">
                        {jugadores.map((j, i) => (
                            <span key={i} className={`player-token${j === elegido ? ' is-chosen' : ''}`}>{j}</span>
                        ))}
                    </div>

                    <button
                        onClick={girar}
                        disabled={girando}
                        style={{ background: 'transparent', border: 'none', cursor: girando ? 'default' : 'pointer', padding: 0 }}
                    >
                        <div
                            className={`bottle${girando ? ' is-spinning' : ''}`}
                            style={{ transform: `rotate(${angulo}deg)` }}
                        >🍾</div>
                    </button>

                    <p className="stage__hint">{girando ? 'Girando...' : 'Toca la botella para girarla'}</p>

                    {elegido && reto && (
                        <div className="prompt is-active">
                            <span className="prompt__tag">🎯 LE TOCA A: {elegido.toUpperCase()}</span>
                            <p className="prompt__text">{reto}</p>
                        </div>
                    )}
                </>
            )}
        </GameShell>
    );
}

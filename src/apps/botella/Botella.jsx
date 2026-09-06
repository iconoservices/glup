import React, { useState, useRef } from 'react';
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

const SPIN_MS = 2600;

function BottleSVG() {
    return (
        <svg className="bottle-svg" viewBox="0 0 200 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="6" y="12" width="118" height="40" rx="20" fill="var(--accent)" />
            <rect x="120" y="22" width="44" height="20" rx="8" fill="var(--accent)" />
            <rect x="162" y="17" width="16" height="30" rx="5" fill="var(--yellow)" />
            <ellipse cx="42" cy="24" rx="16" ry="7" fill="#fff" fillOpacity="0.28" />
        </svg>
    );
}

export default function Botella({ onBack, isDrinkingMode, intensity = 'intermedio', jugadores = [] }) {
    const [girando, setGirando] = useState(false);
    const [elegido, setElegido] = useState(null);
    const [reto, setReto] = useState(null);
    const anguloRef = useRef(0);
    const spinRef = useRef(null);

    const girar = () => {
        if (girando || jugadores.length < 2 || !spinRef.current) return;
        setGirando(true);
        setElegido(null);
        setReto(null);

        const desde = anguloRef.current;
        const hasta = desde + (Math.floor(Math.random() * 4) + 6) * 360 + Math.floor(Math.random() * 360);
        anguloRef.current = hasta;

        // Web Animations API: no depende de las transiciones CSS (que el modo
        // "menos movimiento" desactiva), así el giro se ve siempre.
        spinRef.current.animate(
            [{ transform: `rotate(${desde}deg)` }, { transform: `rotate(${hasta}deg)` }],
            { duration: SPIN_MS, easing: 'cubic-bezier(0.12, 0.8, 0.16, 1)', fill: 'forwards' }
        );

        setTimeout(() => {
            const elegidoIdx = Math.floor(Math.random() * jugadores.length);
            const lista = retosBottella[intensity] || retosBottella.intermedio;
            let textoReto = lista[Math.floor(Math.random() * lista.length)];
            if (isDrinkingMode && Math.random() < 0.3) textoReto += '\n\n🍻 ¡Si te niegas, bebe 2 shots!';
            setElegido(jugadores[elegidoIdx]);
            setReto(textoReto);
            setGirando(false);
        }, SPIN_MS);
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
                        className={`bottle-stage${girando ? ' is-spinning' : ''}`}
                        onClick={girar}
                        disabled={girando}
                        aria-label="Girar la botella"
                    >
                        <span className="bottle-ring" />
                        <span className="bottle-spin" ref={spinRef}>
                            <BottleSVG />
                        </span>
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

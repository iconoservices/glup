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

const SPIN_MS = 3200;

// La punta de la botella (tapa amarilla) apunta al Este (0°) sin rotar.
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

// Ángulo (en grados, 0 = Este, -90 = arriba) del jugador i de n.
const anguloJugador = (i, n) => -90 + (360 * i) / n;

export default function Botella({ onBack, isDrinkingMode, intensity = 'intermedio', jugadores = [] }) {
    const [girando, setGirando] = useState(false);
    const [elegido, setElegido] = useState(null);
    const [elegidoIdx, setElegidoIdx] = useState(null);
    const [reto, setReto] = useState(null);
    const anguloRef = useRef(0);
    const spinRef = useRef(null);

    const n = jugadores.length;

    const girar = () => {
        if (girando || n < 2 || !spinRef.current) return;
        setGirando(true);
        setElegido(null);
        setElegidoIdx(null);
        setReto(null);

        // 1) Elegimos primero a quién le toca.
        const winner = Math.floor(Math.random() * n);

        // 2) Calculamos el giro para que la punta caiga EXACTO sobre ese nombre.
        const objetivo = anguloJugador(winner, n);
        const desde = anguloRef.current;
        const vueltas = 4 + Math.floor(Math.random() * 3);
        const delta = (((objetivo - desde) % 360) + 360) % 360;
        const hasta = desde + vueltas * 360 + delta;
        anguloRef.current = hasta;

        // Web Animations API: no depende de las transiciones CSS (que el modo
        // "menos movimiento" desactiva), así el giro se ve siempre.
        spinRef.current.animate(
            [{ transform: `rotate(${desde}deg)` }, { transform: `rotate(${hasta}deg)` }],
            { duration: SPIN_MS, easing: 'cubic-bezier(0.15, 0.85, 0.15, 1)', fill: 'forwards' }
        );

        setTimeout(() => {
            const lista = retosBottella[intensity] || retosBottella.intermedio;
            let textoReto = lista[Math.floor(Math.random() * lista.length)];
            if (isDrinkingMode && Math.random() < 0.3) textoReto += '\n\n🍻 ¡Si te niegas, bebe 2 shots!';
            setElegido(jugadores[winner]);
            setElegidoIdx(winner);
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
            stage={n >= 2}
        >
            {n < 2 ? (
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
                    <button
                        className={`bottle-stage${girando ? ' is-spinning' : ''}`}
                        onClick={girar}
                        disabled={girando}
                        aria-label="Girar la botella"
                    >
                        <span className="bottle-ring" />

                        {jugadores.map((j, i) => {
                            const a = (anguloJugador(i, n) * Math.PI) / 180;
                            const x = 50 + 45 * Math.cos(a);
                            const y = 50 + 45 * Math.sin(a);
                            return (
                                <span
                                    key={i}
                                    className={`bottle-name${i === elegidoIdx ? ' is-chosen' : ''}`}
                                    style={{ left: `${x}%`, top: `${y}%` }}
                                >
                                    {j}
                                </span>
                            );
                        })}

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

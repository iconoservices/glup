import React, { useState } from 'react';
import { ArrowLeft, Beer, Users } from 'lucide-react';

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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '2rem 1.5rem', background: '#0a0a0a', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={24} /> Volver
                </button>
                <span style={{ fontWeight: '600', color: '#ff00ff', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🍾 LA BOTELLA
                </span>
                <div style={{ width: '24px' }}></div>
            </div>

            {jugadores.length < 2 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
                    <Users size={60} color="#555" />
                    <h2 style={{ color: '#a0a0a0', fontWeight: '300' }}>Necesitas al menos 2 jugadores</h2>
                    <p style={{ color: '#555', fontSize: '0.9rem' }}>Ve a la pantalla de inicio y agrega jugadores antes de empezar.</p>
                    <button onClick={onBack} style={{ marginTop: '1rem', padding: '0.8rem 2rem', background: 'transparent', border: '1px solid #ff00ff', color: '#ff00ff', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: '1rem' }}>
                        Volver a agregar jugadores
                    </button>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Jugadores en circulo */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        {jugadores.map((j, i) => (
                            <span key={i} style={{
                                padding: '4px 12px', background: j === elegido ? 'rgba(255,0,255,0.25)' : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${j === elegido ? '#ff00ff' : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '20px', fontSize: '0.85rem', color: j === elegido ? '#ff00ff' : '#a0a0a0',
                                transition: 'all 0.4s', fontWeight: j === elegido ? '700' : '400'
                            }}>
                                {j}
                            </span>
                        ))}
                    </div>

                    {/* Botella visual giratoria */}
                    <button onClick={girar} disabled={girando} style={{ background: 'transparent', border: 'none', cursor: girando ? 'default' : 'pointer', padding: 0 }}>
                        <div style={{
                            fontSize: '100px', lineHeight: 1,
                            transform: `rotate(${angulo}deg)`,
                            transition: girando ? 'transform 1.8s cubic-bezier(0.17, 0.67, 0.3, 0.97)' : 'none',
                            display: 'block', filter: `drop-shadow(0 0 20px rgba(255,0,255,0.5))`
                        }}>🍾</div>
                    </button>

                    <p style={{ color: '#555', fontSize: '0.85rem' }}>
                        {girando ? 'Girando...' : 'Toca la botella para girarla'}
                    </p>

                    {/* Resultado */}
                    {elegido && reto && (
                        <div style={{
                            width: '100%', padding: '1.5rem', background: 'rgba(30,30,30,0.6)',
                            border: '1px solid rgba(255,0,255,0.4)', borderRadius: '20px', textAlign: 'center',
                            boxShadow: '0 0 20px rgba(255,0,255,0.1) inset'
                        }}>
                            <p style={{ color: '#ff00ff', fontWeight: '800', fontSize: '0.9rem', letterSpacing: '3px', marginBottom: '0.75rem' }}>
                                🎯 LE TOCA A: {elegido.toUpperCase()}
                            </p>
                            <p style={{ fontSize: '1.2rem', fontWeight: '600', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{reto}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

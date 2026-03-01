import React, { useState } from 'react';
import { Shuffle, ArrowLeft, Beer } from 'lucide-react';

const todosModos = {
    suave: {
        verdad: [
            "¿Cuál es tu peor cita o experiencia romántica?",
            "¿Alguna vez has tenido un crush inconfesable en el trabajo?",
            "¿Has llorado por una película sin admitirlo delante de otros?",
        ],
        reto: [
            "Dale un abrazo de 10 segundos a quien el grupo elija.",
            "Haz tu mejor imitación de alguien famoso. 30 segundos.",
            "Canta los primeros 30 segundos de la última canción que escuchaste.",
        ]
    },
    intermedio: {
        verdad: [
            "¿Cuál es tu fantasía más recurrente?",
            "¿Has mandado fotos atrevidas? ¿A quién?",
            "¿Cuál es lo más atrevido que has hecho en público?",
        ],
        reto: [
            "Quítate una prenda de ropa. Tú decides cuál.",
            "Hazle un baile sensual a alguien durante 30 segundos.",
            "Da un beso en el cuello a quien el grupo elija.",
        ]
    },
    picante: {
        verdad: [
            "¿Has tenido sueños húmedos con alguien en esta habitación?",
            "Menciona tu fetiche más secreto sin tapujos.",
            "¿Estarías dispuesto a un trío con alguien del grupo?",
        ],
        reto: [
            "Simula una escena erótica durante 15 segundos.",
            "Deja que alguien te quite una prenda usando los dientes.",
            "Besa apasionadamente a quien la ruleta señale.",
        ]
    }
};

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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '2rem 1.5rem', background: '#0a0a0a', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={24} /> Volver
                </button>
                <span style={{ fontWeight: '600', color: '#bf5fff', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shuffle size={20} /> MODO CAOS
                </span>
                <div style={{ width: '24px' }}></div>
            </div>

            <p style={{ textAlign: 'center', color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Mezcla de todos los juegos. ¡Nunca sabes qué te toca!
            </p>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                <div style={{
                    width: '100%', minHeight: '200px', padding: '2rem', background: 'rgba(30,30,30,0.6)',
                    border: `2px solid ${tipo === 'verdad' ? '#ff00ff' : tipo === 'reto' ? '#ff4500' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '1rem', transition: 'all 0.4s ease',
                    boxShadow: tipo ? `0 0 30px ${tipo === 'verdad' ? 'rgba(255,0,255,0.15)' : 'rgba(255,69,0,0.15)'}` : 'none'
                }}>
                    {tipo && (
                        <span style={{ fontSize: '0.9rem', fontWeight: '800', letterSpacing: '4px', color: tipo === 'verdad' ? '#ff00ff' : '#ff4500' }}>
                            {tipo.toUpperCase()}
                        </span>
                    )}
                    <p style={{ fontSize: '1.5rem', fontWeight: '600', lineHeight: 1.4, color: resultado ? '#fff' : '#444', whiteSpace: 'pre-line' }}>
                        {resultado || 'Pulsa el botón y el Modo Caos decide tu destino...'}
                    </p>
                </div>

                <button
                    onClick={lanzar}
                    style={{
                        padding: '1.2rem 3.5rem', background: 'linear-gradient(135deg, rgba(191,95,255,0.3), rgba(255,0,255,0.3))',
                        border: '2px solid #bf5fff', color: '#fff', borderRadius: '30px',
                        fontSize: '1.3rem', fontWeight: '800', cursor: 'pointer', letterSpacing: '2px',
                        boxShadow: '0 0 25px rgba(191,95,255,0.4)', transition: 'all 0.3s ease'
                    }}
                >
                    🎲 ¡CAOS!
                </button>
            </div>
        </div>
    );
}

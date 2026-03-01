import React, { useState } from 'react';
import { Beer, ArrowLeft, RefreshCw } from 'lucide-react';

const retosPreparty = {
    suave: [
        "El que llegue último al juego hace el primer shot.",
        "Cada vez que alguien diga un nombre de otro jugador por error, toma 1 trago.",
        "Si miras el celular en los próximos 10 minutos, pagas ronda.",
        "El que ría primero en la siguiente ronda, bebe."
    ],
    intermedio: [
        "Shot en 3, 2, 1... ¡ahora todos!",
        "El que no pueda decir el abecedario al revés termina su bebida.",
        "Dos dedos de tu bebida si perdiste la última apuesta del día.",
        "El que haya llegado más tarde esta noche: fondo blanco."
    ],
    picante: [
        "Todos beben si alguien lo ha hecho en los últimos 3 días. ¡Confiésalo!",
        "Shot doble para quien haya enviado un mensaje borracho esta semana.",
        "El que no tenga historia comprometida esta noche, paga ronda completa.",
        "Bebe 3 veces si alguna vez has stalkeado el Instagram de un ex esta semana."
    ]
};

export default function PreParty({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
    const [reto, setReto] = useState(null);

    const nuevoReto = () => {
        const lista = retosPreparty[intensity] || retosPreparty.intermedio;
        setReto(lista[Math.floor(Math.random() * lista.length)]);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '2rem 1.5rem', background: '#0a0a0a', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={24} /> Volver
                </button>
                <span style={{ fontWeight: '600', color: '#ff9900', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Beer size={20} /> PRE-PARTY
                </span>
                <div style={{ width: '24px' }}></div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                <p style={{ textAlign: 'center', color: '#a0a0a0', fontSize: '0.9rem' }}>
                    Rompiendo el hielo con tragos de calentamiento. 🍺
                </p>

                <div style={{
                    width: '100%', minHeight: '180px', padding: '2rem', background: 'rgba(30,30,30,0.6)',
                    border: `1px solid ${reto ? 'rgba(255,153,0,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '24px', textAlign: 'center', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', boxShadow: reto ? '0 0 20px rgba(255,153,0,0.1) inset' : 'none',
                    transition: 'all 0.4s ease'
                }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: '600', lineHeight: 1.4, color: reto ? '#fff' : '#444' }}>
                        {reto || 'Toca para recibir tu reto de calentamiento...'}
                    </p>
                </div>

                <button
                    onClick={nuevoReto}
                    style={{
                        padding: '1rem 3rem', background: 'transparent', border: '2px solid #ff9900',
                        color: '#ff9900', borderRadius: '30px', fontSize: '1.1rem', fontWeight: '700',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                        boxShadow: '0 0 15px rgba(255,153,0,0.3)', transition: 'all 0.3s'
                    }}
                >
                    <RefreshCw size={20} /> {reto ? 'Siguiente' : '¡Arrancar!'}
                </button>
            </div>
        </div>
    );
}

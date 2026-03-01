import React, { useState } from 'react';
import { Clock, ArrowLeft, Beer } from 'lucide-react';

const preguntas = {
    suave: [
        "Di 3 cosas que amas de alguien en esta habitación.",
        "Nombra 3 canciones románticas in 5 segundos.",
        "Di el nombre de un actor o actriz con quien tendrías una cita ideal.",
        "3 cosas que buscas en una pareja. ¡Ya!",
        "Nombra 3 apodos cariñosos que usarías con tu pareja."
    ],
    intermedio: [
        "Describe tu ex en 3 palabras. Ya. Sin pensar.",
        "Di 3 partes del cuerpo que te resultan más atractivas.",
        "Nombra 3 lugares inusuales donde te gustaría tener una cita.",
        "3 confesiones sobre lo que te gusta en la intimidad.",
        "¿Qué harías si te quedas encerrado con alguien del grupo? 5 segundos."
    ],
    picante: [
        "Di 3 fantasías que nunca has confesado. Sin rodeos.",
        "Nombra 3 partes de tu cuerpo que más te gusta que te toquen.",
        "3 cosas que harías con alguien del grupo si tuvieras 5 minutos a solas.",
        "¿Posición favorita y por qué? 5 segundos. Go!",
        "¿A quién del grupo te llevarías a la cama? Sé honesto."
    ]
};

export default function CincoSegundos({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
    const [current, setCurrent] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [timeUp, setTimeUp] = useState(false);

    const start = () => {
        const lista = preguntas[intensity] || preguntas.intermedio;
        setCurrent(lista[Math.floor(Math.random() * lista.length)]);
        setTimeUp(false);
        setCountdown(5);

        let count = 5;
        const interval = setInterval(() => {
            count -= 1;
            if (count <= 0) {
                clearInterval(interval);
                setCountdown(0);
                setTimeUp(true);
            } else {
                setCountdown(count);
            }
        }, 1000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '2rem 1.5rem', background: '#0a0a0a', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={24} /> Volver
                </button>
                <span style={{ fontWeight: '600', color: '#fff700', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={20} /> 5 SEGUNDOS
                </span>
                <div style={{ width: '24px' }}></div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                {/* Countdown circle */}
                <div style={{
                    width: '140px', height: '140px', borderRadius: '50%', border: `4px solid ${timeUp ? '#ff4500' : countdown !== null ? '#fff700' : '#333'}`,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    boxShadow: countdown !== null ? `0 0 30px ${timeUp ? 'rgba(255,69,0,0.5)' : 'rgba(255,247,0,0.4)'}` : 'none',
                    transition: 'border-color 0.3s ease'
                }}>
                    <span style={{ fontSize: countdown !== null ? '5rem' : '2.5rem', fontWeight: '800', color: timeUp ? '#ff4500' : countdown !== null ? '#fff700' : '#333', transition: 'all 0.2s' }}>
                        {timeUp ? '💀' : countdown !== null ? countdown : '?'}
                    </span>
                </div>

                {/* Pregunta */}
                <div style={{
                    width: '100%', padding: '1.5rem', background: 'rgba(30,30,30,0.6)',
                    border: `1px solid ${current ? 'rgba(255,247,0,0.3)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: '20px', textAlign: 'center', minHeight: '120px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem'
                }}>
                    {current ? (
                        <>
                            <p style={{ fontSize: '1.4rem', fontWeight: '700', lineHeight: 1.4 }}>{current}</p>
                            {timeUp && (
                                <p style={{ color: '#ff4500', fontWeight: '700', fontSize: '1.1rem' }}>
                                    ⏰ ¡TIEMPO! {isDrinkingMode ? '¡Bebe 1 shot de castigo!' : '¡Cumple un castigo del grupo!'}
                                </p>
                            )}
                        </>
                    ) : (
                        <p style={{ color: '#555', fontSize: '1.1rem' }}>Pulsa INICIAR y responde antes de que se acabe el tiempo...</p>
                    )}
                </div>

                <button
                    onClick={start}
                    style={{
                        padding: '1rem 3rem', background: 'transparent', border: '2px solid #fff700',
                        color: '#fff700', borderRadius: '30px', fontSize: '1.2rem', fontWeight: '700',
                        cursor: 'pointer', boxShadow: '0 0 15px rgba(255,247,0,0.3)', transition: 'all 0.3s'
                    }}
                >
                    {current ? 'SIGUIENTE' : 'INICIAR'}
                </button>
            </div>
        </div>
    );
}

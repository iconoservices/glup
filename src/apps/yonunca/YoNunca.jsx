import React, { useState } from 'react';
import { GlassWater, ArrowLeft, Beer, RefreshCw } from 'lucide-react';

const confesiones = {
    suave: [
        "Yo nunca nunca he stalkeado a mi ex en redes sociales con un perfil falso.",
        "Yo nunca nunca he dicho 'te quiero' sin sentirlo realmente.",
        "Yo nunca nunca me he enamorado de un profesor(a).",
        "Yo nunca nunca he llorado por un berrinche ridículo en público."
    ],
    intermedio: [
        "Yo nunca nunca he mandado una foto subida de tono a la persona equivocada.",
        "Yo nunca nunca me he arrepentido de acostarme con alguien justo después.",
        "Yo nunca nunca he besado a alguien del mismo sexo en una fiesta.",
        "Yo nunca nunca he tenido un 'amigo(a) con derechos' secreto."
    ],
    picante: [
        "Yo nunca nunca he participado en un trío o más.",
        "Yo nunca nunca he grabado un video íntimo casero.",
        "Yo nunca nunca lo he hecho en un baño público de una discoteca o bar.",
        "Yo nunca nunca he usado comida (crema, fresas, helado) durante el sexo."
    ]
};

export default function YoNunca({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
    const [currentStatement, setCurrentStatement] = useState("Toca 'Siguiente' para empezar los castigos...");

    const nextStatement = () => {
        const lista = confesiones[intensity] || confesiones.intermedio;
        setCurrentStatement(lista[Math.floor(Math.random() * lista.length)]);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '2rem 1.5rem', background: '#0a0a0a', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={24} /> Volver
                </button>
                <span style={{ fontWeight: '600', color: '#00ffff', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GlassWater size={20} /> YO NUNCA NUNCA
                </span>
                <div style={{ width: '24px' }}></div>
            </div>

            {isDrinkingMode && (
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#00ffff', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <Beer size={16} /> Modo Tragos activado
                </div>
            )}

            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                background: 'rgba(30,30,30,0.6)', border: `1px solid rgba(0, 255, 255, 0.2)`, borderRadius: '20px',
                padding: '2rem', textAlign: 'center', boxShadow: '0 0 30px rgba(0, 255, 255, 0.1) inset'
            }}>
                <h2 style={{ fontSize: '1.8rem', color: '#00ffff', fontWeight: '800', marginBottom: '2rem', fontStyle: 'italic' }}>
                    "{currentStatement}"
                </h2>

                <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '2rem' }}>
                    {isDrinkingMode ? "El que lo haya hecho... ¡QUE BEBA SU TRAGO AHORA!" : "El que lo haya hecho debe cumplir un castigo del grupo."}
                </p>

                <button
                    onClick={nextStatement}
                    style={{
                        background: 'transparent', border: '1px solid #00ffff', color: '#00ffff', padding: '1rem 2.5rem',
                        borderRadius: '30px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease',
                        boxShadow: '0 0 10px rgba(0,255,255,0.3)'
                    }}
                >
                    <RefreshCw size={20} /> Siguiente
                </button>
            </div>
        </div>
    );
}

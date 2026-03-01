import React, { useState } from 'react';
import { Flame, ArrowLeft, Heart, RefreshCw, Beer } from 'lucide-react';

const verdades = {
    suave: [
        "¿Cuál es tu peor cita o experiencia romántica?",
        "¿Qué es lo primero en lo que te fijas de una persona?",
        "¿Alguna vez has tenido un crush (amor platónico) inconfesable?",
        "¿Cuál es el apodo más cursi que te han puesto?",
        "¿Crees en el amor a primera vista?"
    ],
    intermedio: [
        "¿Cual es tu fantasía más recurrente?",
        "¿Has fingido alguna vez dolor de cabeza para evitar intimidad?",
        "¿Qué es lo más avergonzoso que te ha pasado en la cama?",
        "Si tuvieras que calificar mi destreza del 1 al 10, ¿cuánto sería?",
        "¿Cuál es tu posición favorita?",
    ],
    picante: [
        "¿Has tenido sueños húmedos con alguien en esta habitación?",
        "¿Cuál es el lugar más prohibido o público donde lo has hecho?",
        "Menciona tu juguete íntimo o fetiche favorito sin rodeos.",
        "¿Alguna vez has enviado fotos indecentes? ¿A quién fue el último?",
        "¿Estarías dispuesto a un trío con alguien de este grupo llamado al azar?"
    ]
};

const retos = {
    suave: [
        "Dale un abrazo prolongado de 10 segundos a la persona a tu derecha.",
        "Elige a alguien del grupo para que te haga un masaje en los hombros.",
        "Mándale un mensaje de texto atrevido a un contacto que el grupo decida.",
        "Déjate dar de comer algo por otra persona con los ojos vendados."
    ],
    intermedio: [
        "Quítate una prenda de ropa (no calcetines ni zapatos).",
        "Hazle un baile sensual (lap dance) a tu compañero por 30 segundos.",
        "Dale un beso en el cuello y susúrrale algo a la persona a tu derecha.",
        "Muerde suavemente el lóbulo de la oreja de algún jugador."
    ],
    picante: [
        "Pasea un cubito de hielo (o algo frío) por el vientre o pecho de otra persona.",
        "Besa apasionadamente a la persona que tienes a tu izquierda durante 10 segundos.",
        "Deja que alguien te quite una prenda de ropa usando solo sus dientes.",
        "Simula tu mejor cara de placer/orgasmo durante 5 segundos."
    ]
};

const castigosTrago = [
    "¡Toma 1 shot de castigo doble!",
    "¡Reparte 2 tragos entre los demás o bebe fondo blanco!",
    "Mójate los labios con alcohol de la botella.",
];

export default function TrueOrDare({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [isTruth, setIsTruth] = useState(true); // true = Verdad, false = Reto

    const handleAction = (type) => {
        let result = "";

        const verdadesActuales = verdades[intensity] || verdades.intermedio;
        const retosActuales = retos[intensity] || retos.intermedio;

        if (type === 'verdad') {
            const idx = Math.floor(Math.random() * verdadesActuales.length);
            result = verdadesActuales[idx];
            setIsTruth(true);
        } else {
            const idx = Math.floor(Math.random() * retosActuales.length);
            result = retosActuales[idx];
            // If drinking mode is on, 30% chance to append a drinking punishment
            if (isDrinkingMode && Math.random() < 0.3) {
                const drinkIdx = Math.floor(Math.random() * castigosTrago.length);
                result += `\n\n PENITENCIA ALCOHÓLICA: ${castigosTrago[drinkIdx]}`;
            }
            setIsTruth(false);
        }
        setCurrentPrompt(result);
    };

    return (
        <div className="game-screen-container" style={{
            display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '2rem 1.5rem', background: '#0a0a0a', color: '#fff'
        }}>
            {/* Top Navbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={24} /> Volver
                </button>
                <span style={{ fontWeight: '600', color: '#ff00ff', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Flame size={20} /> VERDAD O RETO
                </span>
                <div style={{ width: '24px' }}></div> {/* Spacer */}
            </div>

            {isDrinkingMode && (
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#ff00ff', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <Beer size={16} /> Modo Tragos está encendido
                </div>
            )}

            {/* Main Game Card */}
            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                background: 'rgba(30,30,30,0.6)', border: `1px solid ${currentPrompt ? (isTruth ? '#ff00ff' : '#ff4500') : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '20px', padding: '2rem', textAlign: 'center', boxShadow: currentPrompt ? `0 0 30px ${isTruth ? 'rgba(255,0,255,0.2)' : 'rgba(255,69,0,0.2)'}` : 'none',
                transition: 'all 0.5s ease'
            }}>
                {!currentPrompt ? (
                    <h2 style={{ fontSize: '1.5rem', color: '#a0a0a0', fontWeight: '300' }}>¿Estás listo para revelar tus secretos o atreverte al castigo?</h2>
                ) : (
                    <div>
                        <div style={{ fontSize: '1rem', color: isTruth ? '#ff00ff' : '#ff4500', fontWeight: '800', letterSpacing: '4px', marginBottom: '1.5rem' }}>
                            {isTruth ? 'VERDAD' : 'RETO'}
                        </div>
                        <p style={{ fontSize: '1.5rem', lineHeight: '1.4', fontWeight: '600', whiteSpace: 'pre-line' }}>{currentPrompt}</p>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem', paddingBottom: '2rem' }}>
                <button
                    onClick={() => handleAction('verdad')}
                    style={{
                        background: 'transparent', border: '1px solid #ff00ff', color: '#ff00ff', padding: '1.25rem', borderRadius: '15px',
                        fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', textShadow: '0 0 5px rgba(255,0,255,0.5)'
                    }}
                    onMouseEnter={(e) => { e.target.style.background = 'rgba(255,0,255,0.1)'; }}
                    onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}
                >
                    VERDAD
                </button>

                <button
                    onClick={() => handleAction('reto')}
                    style={{
                        background: 'transparent', border: '1px solid #ff4500', color: '#ff4500', padding: '1.25rem', borderRadius: '15px',
                        fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', textShadow: '0 0 5px rgba(255,69,0,0.5)'
                    }}
                    onMouseEnter={(e) => { e.target.style.background = 'rgba(255,69,0,0.1)'; }}
                    onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}
                >
                    RETO
                </button>
            </div>
        </div>
    );
}

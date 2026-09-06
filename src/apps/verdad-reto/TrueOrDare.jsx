import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import GameShell from '../../components/GameShell';
import { accentStyle } from '../../theme';

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
            result = verdadesActuales[Math.floor(Math.random() * verdadesActuales.length)];
            setIsTruth(true);
        } else {
            result = retosActuales[Math.floor(Math.random() * retosActuales.length)];
            if (isDrinkingMode && Math.random() < 0.3) {
                result += `\n\n PENITENCIA ALCOHÓLICA: ${castigosTrago[Math.floor(Math.random() * castigosTrago.length)]}`;
            }
            setIsTruth(false);
        }
        setCurrentPrompt(result);
    };

    const activeAccent = currentPrompt ? (isTruth ? 'pink' : 'yellow') : 'pink';

    return (
        <GameShell
            accent="pink"
            label="VERDAD O RETO"
            icon={<Flame size={18} />}
            drinking={isDrinkingMode}
            drinkingText="Modo Tragos está encendido"
            onBack={onBack}
        >
            <div className={`prompt${currentPrompt ? ' is-active' : ''}`} style={accentStyle(activeAccent)}>
                {!currentPrompt ? (
                    <p className="prompt__text prompt__text--idle">¿Listo para revelar tus secretos o atreverte al castigo?</p>
                ) : (
                    <>
                        <span className="prompt__tag">{isTruth ? 'VERDAD' : 'RETO'}</span>
                        <p className="prompt__text">{currentPrompt}</p>
                    </>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', width: '100%' }}>
                <button className="btn btn--outline btn--lg" style={accentStyle('pink')} onClick={() => handleAction('verdad')}>
                    VERDAD
                </button>
                <button className="btn btn--outline btn--lg" style={accentStyle('yellow')} onClick={() => handleAction('reto')}>
                    RETO
                </button>
            </div>
        </GameShell>
    );
}

import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';
import GameShell from '../../components/GameShell';
import { accentStyle } from '../../theme';

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
        <GameShell
            accent="violet"
            label="MODO CAOS"
            icon={<Shuffle size={18} />}
            drinking={isDrinkingMode}
            onBack={onBack}
        >
            <p className="stage__hint">Mezcla de todos los juegos. ¡Nunca sabes qué te toca!</p>

            <div
                className={`prompt${resultado ? ' is-active' : ''}`}
                style={accentStyle(tipo === 'reto' ? 'yellow' : 'pink')}
            >
                {tipo && <span className="prompt__tag">{tipo.toUpperCase()}</span>}
                <p className={`prompt__text${resultado ? '' : ' prompt__text--idle'}`}>
                    {resultado || 'Pulsa el botón y el Modo Caos decide tu destino...'}
                </p>
            </div>

            <button className="btn btn--rainbow btn--lg btn--pill" onClick={lanzar}>
                🎲 ¡CAOS!
            </button>
        </GameShell>
    );
}

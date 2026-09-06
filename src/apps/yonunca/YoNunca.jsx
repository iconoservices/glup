import React, { useState } from 'react';
import { GlassWater, RefreshCw } from 'lucide-react';
import GameShell from '../../components/GameShell';

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
    const [started, setStarted] = useState(false);

    const nextStatement = () => {
        const lista = confesiones[intensity] || confesiones.intermedio;
        setCurrentStatement(lista[Math.floor(Math.random() * lista.length)]);
        setStarted(true);
    };

    return (
        <GameShell
            accent="yellow"
            label="YO NUNCA NUNCA"
            icon={<GlassWater size={18} />}
            drinking={isDrinkingMode}
            onBack={onBack}
        >
            <div className={`prompt${started ? ' is-active' : ''}`}>
                <p className={`prompt__text${started ? '' : ' prompt__text--idle'}`} style={{ fontStyle: started ? 'italic' : 'normal' }}>
                    {started ? `"${currentStatement}"` : currentStatement}
                </p>
                {started && (
                    <p className="stage__hint">
                        {isDrinkingMode ? "El que lo haya hecho... ¡QUE BEBA SU TRAGO AHORA!" : "El que lo haya hecho debe cumplir un castigo del grupo."}
                    </p>
                )}
            </div>

            <button className="btn btn--outline btn--lg btn--pill" onClick={nextStatement}>
                <RefreshCw size={20} /> Siguiente
            </button>
        </GameShell>
    );
}

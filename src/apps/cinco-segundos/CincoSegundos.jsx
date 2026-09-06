import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';
import GameShell from '../../components/GameShell';

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
    const timerRef = useRef(null);

    useEffect(() => () => clearInterval(timerRef.current), []);

    const start = () => {
        clearInterval(timerRef.current);
        const lista = preguntas[intensity] || preguntas.intermedio;
        setCurrent(lista[Math.floor(Math.random() * lista.length)]);
        setTimeUp(false);
        setCountdown(5);

        let count = 5;
        timerRef.current = setInterval(() => {
            count -= 1;
            if (count <= 0) {
                clearInterval(timerRef.current);
                setCountdown(0);
                setTimeUp(true);
            } else {
                setCountdown(count);
            }
        }, 1000);
    };

    const running = countdown !== null && !timeUp;

    return (
        <GameShell accent="red" label="5 SEGUNDOS" icon={<Clock size={18} />} onBack={onBack}>
            <div className={`timer-ring${running ? ' is-running' : ''}${timeUp ? ' is-up' : ''}`}>
                {timeUp ? '💀' : countdown !== null ? countdown : '?'}
            </div>

            <div className={`prompt${current ? ' is-active' : ''}`}>
                {current ? (
                    <>
                        <p className="prompt__text">{current}</p>
                        {timeUp && (
                            <p className="prompt__extra">
                                ⏰ ¡TIEMPO! {isDrinkingMode ? '¡Bebe 1 shot de castigo!' : '¡Cumple un castigo del grupo!'}
                            </p>
                        )}
                    </>
                ) : (
                    <p className="prompt__text prompt__text--idle">Pulsa INICIAR y responde antes de que se acabe el tiempo...</p>
                )}
            </div>

            <button className="btn btn--outline btn--lg btn--pill" onClick={start}>
                {current ? 'SIGUIENTE' : 'INICIAR'}
            </button>
        </GameShell>
    );
}

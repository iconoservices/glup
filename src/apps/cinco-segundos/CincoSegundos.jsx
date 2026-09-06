import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';
import GameShell from '../../components/GameShell';
import { preguntas5s as preguntas } from '../../gameContent';

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
        <GameShell accent="pink" label="5 SEGUNDOS" icon={<Clock size={18} />} onBack={onBack}>
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

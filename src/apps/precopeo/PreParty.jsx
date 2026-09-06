import React, { useState } from 'react';
import { Beer, RefreshCw } from 'lucide-react';
import GameShell from '../../components/GameShell';

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

export default function PreParty({ onBack, intensity = 'intermedio' }) {
    const [reto, setReto] = useState(null);

    const nuevoReto = () => {
        const lista = retosPreparty[intensity] || retosPreparty.intermedio;
        setReto(lista[Math.floor(Math.random() * lista.length)]);
    };

    return (
        <GameShell accent="yellow" label="PRE-PARTY" icon={<Beer size={18} />} onBack={onBack}>
            <p className="stage__hint">Rompiendo el hielo con tragos de calentamiento. 🍺</p>

            <div className={`prompt${reto ? ' is-active' : ''}`}>
                <p className={`prompt__text${reto ? '' : ' prompt__text--idle'}`}>
                    {reto || 'Toca para recibir tu reto de calentamiento...'}
                </p>
            </div>

            <button className="btn btn--outline btn--lg btn--pill" onClick={nuevoReto}>
                <RefreshCw size={20} /> {reto ? 'Siguiente' : '¡Arrancar!'}
            </button>
        </GameShell>
    );
}

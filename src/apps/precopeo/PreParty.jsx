import React, { useState } from 'react';
import { Beer, RefreshCw } from 'lucide-react';
import GameShell from '../../components/GameShell';
import { retosPreparty } from '../../gameContent';

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

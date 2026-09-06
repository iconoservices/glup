import React, { useState } from 'react';
import { PenTool, Plus, Trash2, RefreshCw } from 'lucide-react';
import GameShell from '../../components/GameShell';

export default function ReglasPropias({ onBack }) {
    const [reglas, setReglas] = useState([]);
    const [inputValor, setInputValor] = useState('');
    const [retoActual, setRetoActual] = useState(null);

    const agregarRegla = () => {
        const texto = inputValor.trim();
        if (!texto) return;
        setReglas([...reglas, texto]);
        setInputValor('');
    };

    const eliminarRegla = (idx) => {
        setReglas(reglas.filter((_, i) => i !== idx));
        if (retoActual === reglas[idx]) setRetoActual(null);
    };

    const lanzarReto = () => {
        if (reglas.length === 0) return;
        setRetoActual(reglas[Math.floor(Math.random() * reglas.length)]);
    };

    return (
        <GameShell accent="magenta" label="TUS REGLAS" icon={<PenTool size={18} />} onBack={onBack} stage={false}>
            {retoActual && (
                <div className="prompt is-active" style={{ marginBottom: '1.25rem', minHeight: 0 }}>
                    <span className="prompt__tag">RETO ACTIVO</span>
                    <p className="prompt__text">{retoActual}</p>
                </div>
            )}

            <div className="field">
                <input
                    className="input"
                    type="text"
                    value={inputValor}
                    onChange={(e) => setInputValor(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && agregarRegla()}
                    placeholder="Escribe un reto o regla personalizada..."
                />
                <button className="btn btn--solid" onClick={agregarRegla} aria-label="Agregar"><Plus size={22} /></button>
            </div>

            <div className="rules-list">
                {reglas.length === 0 ? (
                    <p className="chiplist__empty">Aún no has escrito ningún reto. ¡Escribe el primero arriba!</p>
                ) : (
                    reglas.map((r, i) => (
                        <div key={i} className="rule-item">
                            <span style={{ flex: 1 }}>{r}</span>
                            <button className="icon-btn" onClick={() => eliminarRegla(i)} aria-label="Eliminar"><Trash2 size={18} /></button>
                        </div>
                    ))
                )}
            </div>

            <button className="btn btn--outline btn--block btn--lg" onClick={lanzarReto} disabled={reglas.length === 0}>
                <RefreshCw size={20} /> Reto al Azar de Tu Lista
            </button>
        </GameShell>
    );
}

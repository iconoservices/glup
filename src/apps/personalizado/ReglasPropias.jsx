import React, { useState } from 'react';
import { PenTool, ArrowLeft, Plus, Trash2, RefreshCw } from 'lucide-react';

export default function ReglasPropias({ onBack, isDrinkingMode, intensity = 'intermedio' }) {
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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '2rem 1.5rem', background: '#0a0a0a', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={24} /> Volver
                </button>
                <span style={{ fontWeight: '600', color: '#ff00ff', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PenTool size={20} /> TUS REGLAS
                </span>
                <div style={{ width: '24px' }}></div>
            </div>

            {/* Reto Activo */}
            {retoActual && (
                <div style={{
                    padding: '1.5rem', background: 'rgba(255,0,255,0.1)', border: '1px solid rgba(255,0,255,0.4)',
                    borderRadius: '20px', marginBottom: '1.5rem', textAlign: 'center',
                    boxShadow: '0 0 20px rgba(255,0,255,0.1) inset'
                }}>
                    <p style={{ fontSize: '0.8rem', color: '#ff00ff', fontWeight: '700', letterSpacing: '3px', marginBottom: '0.5rem' }}>RETO ACTIVO</p>
                    <p style={{ fontSize: '1.3rem', fontWeight: '600', lineHeight: 1.4 }}>{retoActual}</p>
                </div>
            )}

            {/* Agregar regla */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    value={inputValor}
                    onChange={(e) => setInputValor(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && agregarRegla()}
                    placeholder="Escribe un reto o regla personalizada..."
                    style={{
                        flex: 1, padding: '0.9rem 1.25rem', background: 'rgba(30,30,30,0.8)',
                        border: '1px solid rgba(255,255,255,0.15)', borderRadius: '15px', color: '#fff',
                        fontSize: '0.95rem', outline: 'none', fontFamily: 'Outfit, sans-serif'
                    }}
                />
                <button onClick={agregarRegla} style={{
                    padding: '0.9rem 1rem', background: 'rgba(255,0,255,0.2)', border: '1px solid rgba(255,0,255,0.4)',
                    borderRadius: '15px', color: '#ff00ff', cursor: 'pointer', display: 'flex', alignItems: 'center'
                }}>
                    <Plus size={22} />
                </button>
            </div>

            {/* Lista de reglas */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', marginBottom: '1.5rem' }}>
                {reglas.length === 0 ? (
                    <p style={{ color: '#444', textAlign: 'center', marginTop: '2rem' }}>
                        Aún no has escrito ningún reto. ¡Escribe el primero arriba!
                    </p>
                ) : (
                    reglas.map((r, i) => (
                        <div key={i} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '1rem 1.25rem', background: 'rgba(30,30,30,0.6)',
                            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px'
                        }}>
                            <span style={{ fontSize: '0.95rem', flex: 1 }}>{r}</span>
                            <button onClick={() => eliminarRegla(i)} style={{ background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', marginLeft: '1rem' }}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Botón lanzar */}
            <button
                onClick={lanzarReto}
                disabled={reglas.length === 0}
                style={{
                    padding: '1rem', background: reglas.length > 0 ? 'rgba(255,0,255,0.2)' : 'rgba(30,30,30,0.3)',
                    border: `1px solid ${reglas.length > 0 ? '#ff00ff' : '#333'}`, color: reglas.length > 0 ? '#ff00ff' : '#555',
                    borderRadius: '15px', fontSize: '1.1rem', fontWeight: '700', cursor: reglas.length > 0 ? 'pointer' : 'default',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    boxShadow: reglas.length > 0 ? '0 0 15px rgba(255,0,255,0.2)' : 'none',
                    paddingBottom: '1.5rem', marginBottom: '0.5rem'
                }}
            >
                <RefreshCw size={20} /> Reto al Azar de Tu Lista
            </button>
        </div>
    );
}

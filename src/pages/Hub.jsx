import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Check, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import Logo from '../components/Logo';
import { stars, SITE_URL } from '../lib/ui';
import { websiteSchema, faqSchema } from '../lib/schema';
import { GAMES, CATEGORIES } from '../catalog';
import { SAFE_BUILD } from '../lib/buildMode';

const APPS = [
  {
    to: '/verdad-o-reto-18',
    kind: 'pink',
    glyph: '🔥',
    name: 'Verdad o Reto +18',
    badge: 'Beta',
    rating: '4.6',
    desc: 'Verdad o reto para adultos, con los nombres de tus amigos en cada reto.',
    bullets: SAFE_BUILD
      ? ['Niveles de suave a pareja', 'Verdades y retos con nombres', 'Retos personalizados', 'Marcador "Lo hice" / "Fallé"']
      : ['6 niveles: de suave a 4play', '144 verdades y retos', 'Retos personalizados con nombres', 'Marcador "Lo hice" / "Fallé"'],
    cta: 'Abrir Verdad o Reto',
  },
  {
    to: '/juegos-para-trios',
    kind: 'violet',
    glyph: '😈',
    name: 'Juegos para Tríos +18',
    badge: 'Nuevo',
    rating: '4.5',
    desc: 'Para tres: verdad o reto entre los tres, solo retos picantes y la botella.',
    bullets: ['Verdad o reto para tríos', 'Modo "solo retos" (quítate una prenda…)', 'La botella que apunta exacto', 'Niveles Picante y Extremo'],
    cta: 'Abrir Tríos',
    fuerte: true,
  },
  {
    to: '/fiestas-swinger',
    kind: 'teal',
    glyph: '🥂',
    name: 'Fiestas Swinger',
    badge: 'Nuevo',
    rating: '4.4',
    desc: 'Para eventos de varias parejas: rompehielos, verdad o reto entre parejas y la ruleta.',
    bullets: ['Rompehielos para parejas que se conocen', 'Verdad o reto que cruza a las parejas', 'La ruleta que empareja al azar', 'Reglas de consentimiento incluidas'],
    cta: 'Abrir Swinger',
    fuerte: true,
  },
  {
    to: '/glup',
    kind: 'blue',
    glyph: '🍸',
    name: 'Glup!',
    badge: 'Estable',
    rating: '4.8',
    desc: '9 juegos para beber, para parejas y para grupos. Elige uno y a jugar.',
    bullets: ['Botella borracha y ruleta de castigos', 'Yo Nunca Nunca y Pre-Party', 'Dados eróticos y verdad o reto', 'Modo Caos y reglas propias'],
    cta: 'Abrir Glup!',
  },
].filter((a) => !SAFE_BUILD || !a.fuerte);

const POPULAR = [
  { slug: 'botella-borracha-online', glyph: '🍾', name: 'Botella Borracha', tag: 'Grupos' },
  { slug: 'yo-nunca-nunca-online', glyph: '🍸', name: 'Yo Nunca Nunca', tag: 'Fiesta' },
  { slug: 'dados-eroticos', glyph: '🎲', name: 'Dados Eróticos', tag: 'Parejas' },
  { slug: 'ruleta-de-castigos', glyph: '🎯', name: 'Ruleta de Castigos', tag: 'Fiesta' },
  { slug: 'verdad-o-reto-para-parejas', glyph: '🔥', name: 'Verdad o Reto', tag: 'Picante' },
  { slug: 'modo-caos', glyph: '🌀', name: 'Modo Caos', tag: 'Grupos' },
];

const CAT_GLYPH = { fiesta: '🍻', parejas: '🔥', grupos: '😈' };
const NUM_APPS = { 2: 'Dos', 3: 'Tres', 4: 'Cuatro' };

const FAQ = [
  { q: '¿Los juegos son gratis?', a: 'Sí. Todos los juegos de Glup Juegos son gratis, sin cuenta y sin límites. No hay compras dentro de la app.' },
  { q: '¿Hay que descargar algo?', a: 'No. Todo funciona en el navegador del móvil o del ordenador. Abres la web y juegas al instante.' },
  { q: '¿Puedo instalarlo en el móvil?', a: 'Sí. Cada app (Glup! y Verdad o Reto +18) se puede instalar por separado desde el navegador y queda como un icono más, funcionando incluso sin conexión.' },
  { q: '¿Para cuántas personas son?', a: 'Desde 2 personas (juegos de pareja) hasta grupos grandes. La botella, la ruleta y el verdad o reto funcionan mejor con 3 o más.' },
  { q: '¿Es apto para menores?', a: 'No. Glup Juegos es contenido para mayores de 18 años: incluye juegos para beber y retos eróticos.' },
];

export default function Hub() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  useEffect(() => {
    document.documentElement.dataset.route = 'hub';
    return () => { delete document.documentElement.dataset.route; };
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/glup?q=${encodeURIComponent(q.trim())}` : '/glup');
  };

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Apps de Glup Juegos',
    itemListElement: APPS.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: a.name,
      url: SITE_URL + a.to,
    })),
  };

  return (
    <div className="hub">
      <Seo
        title="Glup Juegos — juegos para fiestas, parejas y grupos (+18)"
        description="Juegos para fiestas, para parejas y para grupos: verdad o reto +18, botella borracha, yo nunca nunca, dados eróticos y más. Gratis, online y sin descargar."
        path="/"
      />
      <JsonLd data={[websiteSchema(), itemList, faqSchema(FAQ)]} />

      <nav className="hub-nav">
        <Link to="/" className="hub-nav__brand"><Logo size={26} /> Glup Juegos</Link>
        <div className="hub-nav__links">
          <a href="#apps">Apps</a>
          <a href="#juegos">Juegos</a>
          <a href="#ocasion">Por ocasión</a>
          <Link to="/blog">Revista</Link>
        </div>
      </nav>

      <header className="hub-hero">
        <div className="hub-hero__col">
          <p className="hub-hero__eyebrow">Gratis · Sin descargar · +18</p>
          <h1 className="hub-hero__title">Todos los juegos para tu fiesta, tu pareja y tu grupo</h1>
          <p className="hub-hero__sub">
            {SAFE_BUILD
              ? 'Verdad o reto +18, botella borracha, yo nunca nunca, dados eróticos y más. Elige uno y juega en el navegador. Nada que instalar.'
              : 'Verdad o reto +18, juegos para tríos, fiestas swinger, botella borracha y más. Elige uno y juega en el navegador. Nada que instalar.'}
          </p>

          <form className="hub-search" onSubmit={onSearch}>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="¿A qué quieres jugar hoy?"
              aria-label="Buscar un juego"
            />
            <button type="submit"><Search size={16} /> Buscar</button>
          </form>

          <div className="hub-hero__tags">
            <span>+18</span><span>Para 2 o más</span><span>Se instala como app</span><span>Funciona sin conexión</span>
          </div>
        </div>

        <div className="hub-hero__art" aria-hidden="true">
          {SAFE_BUILD ? (
            <>
              <div className="hub-tile"><b>🔥</b><span>Verdad o Reto +18</span><small>De suave a pareja</small></div>
              <div className="hub-tile"><b>🍾</b><span>Botella Borracha</span><small>Gira y decide quién cumple</small></div>
              <div className="hub-tile"><b>🎲</b><span>Dados Eróticos</span><small>Acción + parte del cuerpo</small></div>
              <div className="hub-tile"><b>🍸</b><span>Yo Nunca Nunca</span><small>Confesiones sin filtro</small></div>
            </>
          ) : (
            <>
              <div className="hub-tile"><b>🔥</b><span>Verdad o Reto +18</span><small>6 niveles, de suave a 4play</small></div>
              <div className="hub-tile"><b>😈</b><span>Juegos para Tríos</span><small>Verdad o reto entre los tres</small></div>
              <div className="hub-tile"><b>🥂</b><span>Fiestas Swinger</span><small>Para varias parejas</small></div>
              <div className="hub-tile"><b>🍾</b><span>Botella Borracha</span><small>Gira y decide quién cumple</small></div>
            </>
          )}
        </div>
      </header>

      <section className="hub-sec" id="apps">
        <div className="hub-sec__head">
          <p className="hub-sec__kicker">{NUM_APPS[APPS.length]} apps</p>
          <h2 className="hub-sec__title">Un montón de juegos, en {NUM_APPS[APPS.length].toLowerCase()} apps</h2>
          <p className="hub-sec__lead">Cada una se abre y se instala por separado. Sin cuenta, sin anuncios entre partidas.</p>
        </div>

        <div className="hub-apps">
          {APPS.map((a) => (
            <Link key={a.to} to={a.to} className={`hub-app hub-app--${a.kind}`}>
              <div className="hub-app__top">
                <span className="hub-app__glyph">{a.glyph}</span>
                <span className="hub-app__name">{a.name}</span>
                <span className="hub-app__badge">{a.badge}</span>
              </div>
              <div className="hub-app__rating"><span className="stars">{stars(a.rating)}</span> {a.rating}</div>
              <p className="hub-app__desc">{a.desc}</p>
              <ul className="hub-app__list">
                {a.bullets.map((b) => (
                  <li key={b}><Check size={15} /> {b}</li>
                ))}
              </ul>
              <span className="hub-app__cta">{a.cta} <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="hub-sec" id="juegos">
        <div className="hub-sec__head">
          <p className="hub-sec__kicker">Los más jugados</p>
          <h2 className="hub-sec__title">Entra directo a un juego</h2>
        </div>
        <div className="hub-games">
          {POPULAR.map((g) => (
            <Link key={g.slug} to={`/glup/${g.slug}`} className="hub-game">
              <b>{g.glyph}</b>
              <span>{g.name}</span>
              <small>{g.tag}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="hub-sec" id="ocasion">
        <div className="hub-sec__head">
          <p className="hub-sec__kicker">Por ocasión</p>
          <h2 className="hub-sec__title">Elige según con quién estés</h2>
        </div>
        <div className="hub-cats">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to={`/glup/${c.id}`} className="hub-cat">
              <b>{CAT_GLYPH[c.id]}</b>
              <span>{c.label}</span>
              <small>{c.tagline}</small>
            </Link>
          ))}
        </div>
      </section>

      <div className="hub-revista">
        <div className="hub-revista__inner">
          <h2>Revista Glup</h2>
          <p>Guías y listas para jugar: los mejores juegos eróticos para parejas, juegos para la previa, verdad o reto y más. Cada nota lleva a un juego que abres al toque.</p>
          <Link to="/blog" className="hub-revista__cta">Leer la Revista</Link>
        </div>
      </div>

      <section className="hub-sec">
        <div className="hub-sec__head">
          <p className="hub-sec__kicker">Preguntas frecuentes</p>
          <h2 className="hub-sec__title">Lo que suele preguntarse</h2>
        </div>
        <div className="hub-faq">
          {FAQ.map((f) => (
            <div key={f.q} className="hub-faq__item">
              <p className="hub-faq__q">{f.q}</p>
              <p className="hub-faq__a">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="hub-foot">
        <div className="hub-foot__inner">
          <div className="hub-foot__links">
            <Link to="/verdad-o-reto-18">Verdad o Reto +18</Link>
            {!SAFE_BUILD && <Link to="/juegos-para-trios">Tríos +18</Link>}
            {!SAFE_BUILD && <Link to="/fiestas-swinger">Fiestas Swinger</Link>}
            <Link to="/glup">Glup!</Link>
            <Link to="/blog">Revista</Link>
            <Link to="/contenido">Todo el contenido</Link>
          </div>
          <p>+18 · Gratis · Sin descargar · Cada app se puede instalar por separado.</p>
        </div>
      </footer>
    </div>
  );
}

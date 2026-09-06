import React from 'react';
import { Navigate } from 'react-router-dom';
import App from './App';
import Hub from './pages/Hub';
import Contenido from './pages/Contenido';
import NotFound from './pages/NotFound';
import GlupShell from './components/GlupShell';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import GamePage from './pages/GamePage';
import Ajustes from './pages/Ajustes';
import VorShell from './apps-hub/vor18/VorShell';
import VorHome from './apps-hub/vor18/VorHome';
import VorPlay from './apps-hub/vor18/VorPlay';
import TriosShell from './apps-hub/trios/TriosShell';
import TriosHome from './apps-hub/trios/TriosHome';
import TriosPlay from './apps-hub/trios/TriosPlay';
import TriosBotella from './apps-hub/trios/TriosBotella';
import Blog from './pages/Blog';
import Article from './pages/Article';
import RouteError from './pages/RouteError';
import { GAMES, CATEGORIES } from './catalog';
import { POSTS } from './blog/loader';

export const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Hub /> },

      // ── Banco de contenido (todo en una ruta) ──
      { path: 'contenido', element: <Contenido /> },

      // ── Glup! (juegos) ──
      {
        path: 'glup',
        element: <GlupShell />,
        children: [
          { index: true, element: <Home /> },
          ...CATEGORIES.map((c) => ({ path: c.id, element: <CategoryPage catId={c.id} /> })),
          { path: 'ajustes', element: <Ajustes /> },
          {
            path: ':slug',
            element: <GamePage />,
            getStaticPaths: () => GAMES.map((g) => `/glup/${g.slug}`),
          },
        ],
      },

      // ── Verdad o Reto +18 ──
      {
        path: 'verdad-o-reto-18',
        element: <VorShell />,
        children: [
          { index: true, element: <VorHome /> },
          { path: 'jugar', element: <VorPlay /> },
          { path: 'contenido', element: <Navigate to="/contenido" replace /> },
        ],
      },

      // ── Juegos para Tríos +18 ──
      {
        path: 'juegos-para-trios',
        element: <TriosShell />,
        children: [
          { index: true, element: <TriosHome /> },
          { path: 'jugar', element: <TriosPlay /> },
          { path: 'botella', element: <TriosBotella /> },
          { path: 'contenido', element: <Navigate to="/contenido" replace /> },
        ],
      },

      // ── Revista / blog ──
      { path: 'blog', element: <Blog /> },
      {
        path: 'blog/:slug',
        element: <Article />,
        getStaticPaths: () => POSTS.map((p) => `/blog/${p.slug}`),
      },

      { path: '*', element: <NotFound /> },
    ],
  },
];

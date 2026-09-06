import React from 'react';
import App from './App';
import Hub from './pages/Hub';
import NotFound from './pages/NotFound';
import GlupShell from './components/GlupShell';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import GamePage from './pages/GamePage';
import Ajustes from './pages/Ajustes';
import VorShell from './apps-hub/vor18/VorShell';
import VorHome from './apps-hub/vor18/VorHome';
import VorPlay from './apps-hub/vor18/VorPlay';
import { GAMES, CATEGORIES } from './catalog';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Hub /> },

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
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
];

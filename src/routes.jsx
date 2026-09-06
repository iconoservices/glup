import React from 'react';
import App from './App';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import GamePage from './pages/GamePage';
import Ajustes from './pages/Ajustes';
import NotFound from './pages/NotFound';
import { GAMES, CATEGORIES } from './catalog';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      ...CATEGORIES.map((c) => ({
        path: c.id,
        element: <CategoryPage catId={c.id} />,
      })),
      { path: 'ajustes', element: <Ajustes /> },
      {
        path: ':slug',
        element: <GamePage />,
        getStaticPaths: () => GAMES.map((g) => `/${g.slug}`),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

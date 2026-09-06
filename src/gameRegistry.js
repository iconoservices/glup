import { lazy } from 'react';

// gameId → componente de la pantalla de juego (carga diferida)
export const GAME_COMPONENTS = {
  'verdad-reto': lazy(() => import('./apps/verdad-reto/TrueOrDare')),
  ruleta: lazy(() => import('./apps/ruleta/Ruleta')),
  dados: lazy(() => import('./apps/dados/Dados')),
  yonunca: lazy(() => import('./apps/yonunca/YoNunca')),
  '5segundos': lazy(() => import('./apps/cinco-segundos/CincoSegundos')),
  'mix-azar': lazy(() => import('./apps/modo-caos/ModoCaos')),
  precopeo: lazy(() => import('./apps/precopeo/PreParty')),
  personalizado: lazy(() => import('./apps/personalizado/ReglasPropias')),
  botella: lazy(() => import('./apps/botella/Botella')),
};

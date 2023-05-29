import { Suspense, lazy, ElementType } from 'react';

// To replace will real loading screen
const LoadingScreen = () => <p>Loading ...</p>;

const Loadable = (Component: ElementType) => (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
);

export const Training = Loadable(lazy(() => import('../pages/Training.page')));
export const Learning = Loadable(lazy(() => import('../pages/Learning.page')));
export const Multiplayer = Loadable(lazy(() => import('../pages/Multiplayer.page')));
export const LeaderBoard = Loadable(lazy(() => import('../pages/Leaderboard.page')));
export const Settings = Loadable(lazy(() => import('../pages/Settings.page')));
export const NotFound = Loadable(lazy(() => import('../pages/NotFound.page')));

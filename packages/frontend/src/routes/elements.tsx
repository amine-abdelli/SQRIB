import { Suspense, lazy, ElementType } from 'react';
import Loading from '../pages/Loading.page';

const Loadable = (Component: ElementType) => (props: any) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
);

export const Home = Loadable(lazy(() => import('../pages/Home.page')));
export const Training = Loadable(lazy(() => import('../pages/Training.page')));
export const Learning = Loadable(lazy(() => import('../pages/Learning.page')));
export const Multiplayer = Loadable(lazy(() => import('../pages/Multiplayer.page')));
export const LeaderBoard = Loadable(lazy(() => import('../pages/Leaderboard.page')));
export const Profile = Loadable(lazy(() => import('../pages/Profile.page')));
export const Settings = Loadable(lazy(() => import('../pages/Settings.page')));
export const NotFound = Loadable(lazy(() => import('../pages/NotFound.page')));

import { Suspense, lazy, ElementType } from 'react';
import Loading from '../pages/Loading.page';

const Loadable = (Component: ElementType) => (props: any) => (
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
);

/* Home */
export const Home = Loadable(lazy(() => import('../pages/Home.page')));
/* Training */
export const Training = Loadable(lazy(() => import('../pages/Training.page')));
/* Learning */
export const Learning = Loadable(lazy(() => import('../pages/Learning.page')));
/* Leaderboard */
export const LeaderBoard = Loadable(lazy(() => import('../pages/Leaderboard.page')));
/* Profile */
export const Profile = Loadable(lazy(() => import('../pages/Profile.page')));
/* Multiplayer */
export const Multiplayer = Loadable(lazy(() => import('../pages/Multiplayer.page')));
export const MultiplayerSelection = Loadable(lazy(() => import('../pages/Multiplayer/MultiplayerSelection.page')));
export const MultiplayerRoom = Loadable(lazy(() => import('../pages/Multiplayer/MultiplayerRoom.page')));
export const MultiplayerHome = Loadable(lazy(() => import('../pages/Multiplayer/MultiplayerHome.page')));
export const MultiplayerCreateSession = Loadable(lazy(() => import('../pages/Multiplayer/MultiplayerCreateSession.page')));
export const MultiplayerStaging = Loadable(lazy(() => import('../pages/Multiplayer/MultiplayerStaging.page')));
/* Edit profile */
export const EditProfile = Loadable(lazy(() => import('../pages/EditProfile.page')));
/* Settings */
export const Settings = Loadable(lazy(() => import('../pages/Settings.page')));
/* Not found */
export const NotFound = Loadable(lazy(() => import('../pages/NotFound.page')));

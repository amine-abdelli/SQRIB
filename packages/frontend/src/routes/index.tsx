import { useRoutes } from 'react-router-dom';
import {
  Learning,
  Training,
  Multiplayer,
  LeaderBoard,
  Settings,
  NotFound,
  Profile,
  Home,
  EditProfile,
  MultiplayerHome,
  MultiplayerRoom,
  MultiplayerSelection,
} from './elements';
import { MAIN_ROUTES } from './paths';
import { SocketProvider } from '../contexts/SocketContext';

export default function Router() {
  return useRoutes([
    { path: MAIN_ROUTES.HOME, element: <Home />, },
    { path: MAIN_ROUTES.TRAINING, element: <Training /> },
    { path: MAIN_ROUTES.LEARNING, element: <Learning /> },
    {
      path: MAIN_ROUTES.MULTIPLAYER,
      element:
        <SocketProvider>
          <Multiplayer />
        </SocketProvider>,
      children: [
        { path: MAIN_ROUTES.MULTIPLAYER_HOME, element: <MultiplayerHome />, index: true },
        { path: MAIN_ROUTES.MULTIPLAYER_SELECTION, element: <MultiplayerSelection /> },
        { path: MAIN_ROUTES.MULTIPLAYER_ROOM, element: <MultiplayerRoom /> },
      ]
    },
    { path: MAIN_ROUTES.LEADERBOARD, element: <LeaderBoard /> },
    { path: MAIN_ROUTES.SETTINGS, element: <Settings /> },
    { path: MAIN_ROUTES.PROFILE, element: <Profile /> },
    { path: MAIN_ROUTES.USER_PROFILE, element: <Profile /> },
    { path: MAIN_ROUTES.EDIT_PROFILE, element: <EditProfile /> },
    { path: '*', element: <NotFound /> },
    // {
    //   path: '/',
    //   children: [
    //     { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
    //     {
    //       path: 'login',
    //       element: (
    //         <GuestGuard>
    //           <LoginPage />
    //         </GuestGuard>
    //       ),
    //     },
    //   ],
    // },
    // {
    //   path: '/random-page',
    //   element: (
    //     <AuthGuard>
    //       <DashboardLayout />
    //     </AuthGuard>
    //   ),
    //   children: [
    //     { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
    //     { path: 'one', element: <PageOne /> },
    //     { path: 'two', element: <PageTwo /> },
    //     { path: 'three', element: <PageThree /> },
    //     {
    //       path: 'user',
    //       children: [
    //         { element: <Navigate to="/dashboard/user/four" replace />, index: true },
    //         { path: 'four', element: <PageFour /> },
    //         { path: 'five', element: <PageFive /> },
    //         { path: 'six', element: <PageSix /> },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   element: <CompactLayout />,
    //   children: [
    //      {
    //        path: '404',
    //        element: <Page404 />
    //      }
    //  ],
    // },
  ]);
}

import { useRoutes } from 'react-router-dom';
import {
  Learning,
  Training,
  Multiplayer,
  LeaderBoard,
  Settings,
  NotFound,
  Profile,
  Home
} from './elements';
import { MAIN_ROUTES } from './paths';
import { AuthGuard } from '../modules/Auth/AuthGuard/AuthGuard.component';

export default function Router() {
  return useRoutes([
    { path: MAIN_ROUTES.HOME, element: <Home />, },
    { path: MAIN_ROUTES.TRAINING, element: <Training /> },
    { path: MAIN_ROUTES.LEARNING, element: <Learning /> },
    {
      path: MAIN_ROUTES.MULTIPLAYER, element: <AuthGuard>
        <Multiplayer />
      </AuthGuard>
    },
    { path: MAIN_ROUTES.LEADERBOARD, element: <LeaderBoard /> },
    { path: MAIN_ROUTES.SETTINGS, element: <Settings /> },
    { path: MAIN_ROUTES.PROFILE, element: <Profile /> },
    { path: MAIN_ROUTES.PROFILE + '/:username', element: <Profile /> },
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

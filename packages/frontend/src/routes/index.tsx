import { Navigate, useRoutes } from 'react-router-dom';
import {
  Training,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <Training />
      ),
    },
    {
      path: '/page',
      children: [
        {
          path: '/one',
          element: <p>Page ONE</p>,
          index: true,
        },
      ],
    },
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
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

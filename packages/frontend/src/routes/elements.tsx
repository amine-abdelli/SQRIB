import { Suspense, lazy, ElementType } from 'react';

// To replace will real loading screen
const LoadingScreen = () => <p>Loading ...</p>;
const Loadable = (Component: ElementType) => (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
);

export const Training = Loadable(lazy(() => import('../pages/Training.page')));
// export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
// export const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
// export const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));

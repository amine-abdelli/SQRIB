import { useGetSelf } from '../../hooks/useGetSelf';

function withAuth(WrappedComponent: any) {
  function Auth(props: any) {
    const { isLoggedIn } = useGetSelf();
    return isLoggedIn ? <WrappedComponent {...props} /> : <p>Modify for another component</p>;
  }
  return Auth;
}

export default withAuth;

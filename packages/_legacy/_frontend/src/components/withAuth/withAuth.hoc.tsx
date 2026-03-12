import { useGetSelf } from '../../hooks/useGetSelf';
import Redirect from '../Redirect/Redirect.component';

function withAuth(WrappedComponent: any) {
  function Auth(props: any) {
    const { isLoggedIn } = useGetSelf();
    return isLoggedIn ? <WrappedComponent {...props} /> : <Redirect to="/" />;
  }
  return Auth;
}

export default withAuth;

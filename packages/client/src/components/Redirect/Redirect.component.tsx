import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { IRedirect } from './Redirect.props';

function Redirect({ to }: IRedirect) {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, []);
  return null;
}

export default Redirect;

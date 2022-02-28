import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';

function Home() {
  const router = useRouter();
  // Necessary 'cause of the way Next.js handles routes
  useEffect(() => {
    if (router.pathname !== '/') router.push('/');
  }, []);

  return (
    <div>
      Welcome
    </div>
  );
}

export default Home;

import { ReactNode, useEffect, useState } from 'react';

import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';

import Loading from '@components/Loading';

interface LayoutProps {
  children: ReactNode;
}

export default function AuthenticationLayout({ children }: LayoutProps) {
  const router = useRouter();
  const { dataLoaded, isAuthorized, getUserData } = useUI();

  const [showLoading, setShowLoading] = useState(
    dataLoaded && !isAuthorized ? false : true,
  );

  useEffect(() => {
    if (dataLoaded) {
      if (!isAuthorized) setTimeout(() => setShowLoading(false), 1000);
      else if (getUserData()) router.replace('/');
    }
  }, [isAuthorized, dataLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (showLoading)
    return (
      <article className="w-full">
        <Loading />
      </article>
    );

  return children;
}

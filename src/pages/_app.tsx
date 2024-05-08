import { FC, useEffect, useState } from 'react';

import { type AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { FormBuilderProvider } from '@contexts/formBuilder-context';
import { IngredientContextProvider } from '@contexts/ingredient-context';
import '../styles/tailwind.scss';

// const Noop: FC = ({ children }) => <>{children}</>;

function OBENSApp({ Component, pageProps }: AppProps): JSX.Element {
  const [pageLoading, setPageLoading] = useState(false);

  const router = useRouter();

  const Layout =
    (Component as any).Layout || (((children) => <>{children}</>) as FC);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  return (
    <>
      <Layout pageProps={pageProps}>
        <DndProvider backend={HTML5Backend}>
          <IngredientContextProvider>
            <FormBuilderProvider>
              {/* {pageLoading && <Loading />} */}
              <Component {...pageProps} key={router.route} />
            </FormBuilderProvider>
          </IngredientContextProvider>
        </DndProvider>
      </Layout>
    </>
  );
}

export default OBENSApp;

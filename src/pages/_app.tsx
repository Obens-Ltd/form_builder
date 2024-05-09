import { FC, useState } from 'react';

import { type AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { FormBuilderProvider } from '@contexts/formBuilder-context';
import '../styles/tailwind.scss';

function OBENSApp({ Component, pageProps }: AppProps): JSX.Element {
  const [pageLoading, setPageLoading] = useState(false);

  const router = useRouter();

  const Layout =
    (Component as any).Layout || (((children) => <>{children}</>) as FC);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <FormBuilderProvider>
          <Component {...pageProps} key={router.route} />
        </FormBuilderProvider>
      </DndProvider>
    </>
  );
}

export default OBENSApp;

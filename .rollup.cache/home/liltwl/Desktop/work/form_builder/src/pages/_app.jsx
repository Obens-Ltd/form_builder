import { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormBuilderProvider } from '@contexts/formBuilder-context';
import '../styles/tailwind.scss';
function OBENSApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    var _b = useState(false), pageLoading = _b[0], setPageLoading = _b[1];
    var router = useRouter();
    var Layout = Component.Layout || (function (children) { return <>{children}</>; });
    return (<>
      <DndProvider backend={HTML5Backend}>
        <FormBuilderProvider>
          <Component {...pageProps} key={router.route}/>
        </FormBuilderProvider>
      </DndProvider>
    </>);
}
export default OBENSApp;
//# sourceMappingURL=_app.jsx.map
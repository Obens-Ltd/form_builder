/* eslint-disable @next/next/no-img-element */
import { ReactNode, useEffect, useState } from 'react';

import cn from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
// import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { FiLink } from 'react-icons/fi';
import {
  IoLayersOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { Transition } from 'react-transition-group';

import ActiveLink from '@components/common/ActiveLink';
import ImageFallback from '@components/common/ImageFallback';
import Loading from '@components/Loading';
import Topbar from '@components/Topbar';

const MenuGroupTitle = ({
  barWidth,
  title,
}: {
  barWidth?: any;
  title?: any;
}) => (
  <div className="flex flex-row items-center justify-center w-full h-4 py-4 text-xs text-gray-400 gap-x-2">
    {barWidth === 80 ? (
      <div className="h-1 mb-1 border-b border-gray-400 w-[48px]"></div>
    ) : (
      <>
        {' '}
        <div className="w-full h-1 mb-1 border-b border-gray-400"></div>
        <p>{title}</p>
        <div className="w-full h-1 mb-1 border-b border-gray-400"></div>
      </>
    )}
  </div>
);

const duration = 300;
const sidebarStyle = {
  transition: `width  ${duration}ms`,
};
const overlayStyle = {
  transition: `opacity ${duration}ms`,
};

interface LayoutProps {
  children: ReactNode;
}

interface TransistionStyles {
  [x: string]: {
    [y: string]: number | string;
  };
}

const sidebarTransitionStyles: TransistionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 0.4 },
  exiting: { opacity: 0.4 },
  exited: { opacity: 0 },
};

const MenuItem = ({
  disabled = true,
  href = undefined,
  barWidth,
  title,
  icon,
  soon,
  onClick,
  subTitle,
  state,
}: {
  disabled?: boolean;
  href?: string;
  barWidth?: any;
  title?: any;
  icon?: IconType;
  soon?: any;
  onClick?: any;
  subTitle?: any;
  state?: any;
}) => {
  const Icon = icon;
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(barWidth === 80 ? true : false);
  }, [barWidth]);
  return (
    <>
      {disabled && (
        <ActiveLink
          strict={true}
          href={href || '#'}
          activeClassName="text-white w-full bg-[#2c7a7b] rounded-md"
          aClassName="w-full"
        >
          <span
            title={subTitle || ''}
            className="flex items-center justify-start w-full h-12 p-3 cursor-pointer transition-colors duration-300 hover:text-white"
            onClick={onClick}
          >
            <div className="w-5 h-5 p-0 m-0">
              {Icon && <Icon className="w-5 h-5 p-0 m-0" />}
            </div>
            <span
              className="flex ml-3 overflow-visible text-xs gap-x-2 whitespace-nowrap"
              style={{
                ...overlayStyle,
                opacity: active ? 0 : 1,
                display: barWidth === 80 ? 'none' : 'block',
                ...sidebarTransitionStyles[state],
              }}
            >
              {title}
              {soon && (
                <span className="flex items-center px-2 leading-none text-center text-white bg-yellow-400 rounded-lg text-[8px]">
                  SOON
                </span>
              )}
            </span>
          </span>
        </ActiveLink>
      )}
    </>
  );
};

function Sidebr({
  barWidth,
  setBarWidth,
}: {
  barWidth?: any;
  setBarWidth?: any;
}) {
  const router = useRouter();
  return (
    <Transition in={barWidth === 80} timeout={0}>
      {(state) => (
        <nav
          aria-label="sidebar"
          style={{
            width: barWidth + 'px',
            ...sidebarStyle,
            // ...sidebarTransitionStyles[state],
          }}
          className={`sticky top-0 max-h-screen min-h-screen flex-col items-center flex-none text-center text-gray-400  flex bg-[#03363d]`}
        >
          <div
            className="flex items-center justify-start w-full m-4 cursor-pointer h-11 px-[6px]"
            onClick={() => router.replace('/')}
          >
            <div className="flex flex-row items-end justify-start w-full m-4 gap-3  whitespace-nowrap">
              <ImageFallback
                style={{
                  transition: `all  ${duration}ms`,
                  maxWidth: barWidth === 80 ? 36 : 44,
                  width: barWidth === 80 ? 36 : 44,
                  height: barWidth === 80 ? 36 : 44,
                }}
                className="h-[44px]"
                src="/assets/images/obens-small.png"
                alt="OBENS Dashboard"
              />
              <div
                className="absolute flex flex-col items-start justify-start"
                style={{
                  transition: `all ${duration}ms`,
                  marginLeft: barWidth === 80 ? 0 : 55,
                  opacity: barWidth === 80 ? 0 : 1,
                  display: barWidth === 80 ? 'hidden' : 'flex',
                }}
              >
                <ImageFallback
                  className="p-0 m-0 h-[32px] justify-self-start"
                  src="/assets/images/logoObens.png"
                  alt="OBENS Dashboard"
                />
              </div>
            </div>
          </div>
          <div
            className={cn(
              'flex flex-col items-center justify-between w-full h-full px-4 gap-1',
              barWidth === 80 ? ' items-center' : ' items-start',
            )}
          >
            <div className="flex flex-col items-center justify-start w-full overflow-y-hiddin">
              <MenuGroupTitle title={'MANAGE'} barWidth={barWidth} />
              <MenuItem
                href="/traceability"
                subTitle="Traceability"
                title="Traçabilité"
                barWidth={barWidth}
                icon={FiLink}
              />
              <MenuItem
                // disabled={hasAuthorization('Admin')}
                href="/product-types"
                subTitle="Product types"
                title="Product types"
                icon={IoLayersOutline}
                barWidth={barWidth}
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full py-4 mt-auto">
              <MenuItem
                disabled={true}
                href={'/my-supplier'}
                title={'My Supplier'}
                subTitle="Profile"
                barWidth={barWidth}
                icon={IoPersonOutline}
              />
              <MenuItem
                onClick={() => {
                  console.log('Log out');
                }}
                title={'Log out'}
                subTitle="Log out"
                barWidth={barWidth}
                icon={IoLogOutOutline}
              />
            </div>
          </div>
        </nav>
      )}
    </Transition>
  );
}

export default function DefaultLayout({ children }: LayoutProps) {
  const router = useRouter();
  const [barWidth, setBarWidth] = useState(80);
  const [showLoading, setShowLoading] = useState(false);

  //   router.events.on('routeChangeStart', handleSidebar);
  //   router.events.on('routeChangeComplete', handleSidebar);
  //   router.events.on('routeChangeError', handleSidebar);
  // }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

  if (showLoading)
    return (
      <article className="w-full">
        <Loading />
      </article>
    );
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
      className="relative flex w-full min-h-screen antialiased text-gray-800 bg-white"
    >
      <div className="relative flex flex-no-wrap justify-between w-full bg-gray-100">
        <Sidebr barWidth={barWidth} setBarWidth={setBarWidth} />

        <div className="fixed bottom-0 right-0 z-0 flex flex-row justify-end w-full pointer-events-none">
          <ImageFallback
            draggable={false}
            src="/assets/images/bg-artifact.svg"
            alt="Background Artifact"
            style={{ transform: 'scaleX(-1)', height: '70vh' }}
          />
        </div>

        <div className="z-10 flex flex-col w-full min-h-screen">
          <Topbar barWidth={barWidth} setBarWidth={setBarWidth} />
          <main
            className={
              router?.pathname === '/supply-mapping'
                ? 'w-full px-6 mx-auto'
                : 'w-full px-6 mx-auto max-w-[1320px]'
            }
          >
            {router?.pathname !== '/supply-mapping' && (
              <div className="w-full h-12" />
            )}
            {children}
            {router?.pathname !== '/supply-mapping' && (
              <div className="w-full h-12" />
            )}
          </main>
          {/* {<BottomNav />} */}
        </div>
      </div>
    </motion.div>
  );
}

import { useUI } from '@contexts/ui.context';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { FaRegHandshake } from 'react-icons/fa';
import { FiServer } from 'react-icons/fi';
import {
  IoChatbubblesOutline,
  IoGridOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
} from 'react-icons/io5';
import { MdOutlinePaid } from 'react-icons/md';

import ActiveLink from '@components/common/ActiveLink';

export default function BottomNav() {
  const { hasAuthorization } = useUI();
  const { t } = useTranslation('menu');
  return (
    <div className="sticky bottom-0 z-50 items-end justify-center w-full h-16 max-w-full mt-auto bg-white border-t border-gray-200">
      <div
        className={cn(
          'items-center justify-center w-full h-full',
          hasAuthorization('SubClient')
            ? ' grid grid-cols-3'
            : ' grid grid-cols-6',
        )}
      >
        {!hasAuthorization('SubClient') && (
          <div className="relative items-center justify-center flex-1 h-full group">
            <ActiveLink
              strict={true}
              href="/"
              activeClassName="text-[#2c7a7b] bottom-nav-active"
            >
              <span className="flex flex-col items-center justify-center h-full px-1 pt-1 pb-1 cursor-pointer hover:text-[#2c7a7b] hover:bottom-nav-active transition-all duration-300">
                <IoGridOutline className="w-5 h-5 mx-auto fill-current mb-1.5" />
                <span className="text-xs leading-none">{t('Dashboard')}</span>
              </span>
            </ActiveLink>
          </div>
        )}

        {hasAuthorization('Supplier') === false &&
          hasAuthorization('Corp') === false &&
          !hasAuthorization('SubClient') && (
            <>
              <div className="relative items-center justify-center flex-1 h-full group">
                <ActiveLink
                  strict={true}
                  href="/suppliers"
                  activeClassName="text-[#2c7a7b] bottom-nav-active"
                >
                  <span className="flex flex-col items-center justify-center h-full px-1 pt-1 pb-1 cursor-pointer hover:text-[#2c7a7b] hover:bottom-nav-active transition-all duration-300">
                    <IoPersonAddOutline className="w-5 h-5 mx-auto fill-current mb-1.5" />
                    <span className="text-xs leading-none">
                      {t('Fournisseurs')}
                    </span>
                  </span>
                </ActiveLink>
              </div>
            </>
          )}
        {hasAuthorization('Supplier') && (
          <>
            <div className="relative items-center justify-center flex-1 h-full group">
              <ActiveLink
                strict={true}
                href="/suppliers"
                activeClassName="text-[#2c7a7b] bottom-nav-active"
              >
                <span className="flex flex-col items-center justify-center h-full px-1 pt-1 pb-1 cursor-pointer hover:text-[#2c7a7b] hover:bottom-nav-active transition-all duration-300">
                  <FiServer className="w-5 h-5 mx-auto  mb-1.5" />
                  <span className="text-xs leading-none">
                    {t('Cooperatives')}
                  </span>
                </span>
              </ActiveLink>
            </div>
          </>
        )}
        <div className="relative items-center justify-center flex-1 h-full group">
          <ActiveLink
            strict={true}
            href="/social-fund"
            activeClassName="text-[#2c7a7b] bottom-nav-active"
          >
            <span className="flex flex-col items-center justify-center h-full px-1 pt-1 pb-1 cursor-pointer hover:text-[#2c7a7b] hover:bottom-nav-active transition-all duration-300">
              <FaRegHandshake className="w-5 h-5 mx-auto fill-current mb-1.5" />
              <span className="text-xs leading-none">{t('Fonds social')}</span>
            </span>
          </ActiveLink>
        </div>

        <div className="relative items-center justify-center flex-1 h-full group">
          <ActiveLink
            strict={true}
            href="/living-wage"
            activeClassName="text-[#2c7a7b] bottom-nav-active"
          >
            <span className="relative flex flex-col items-center justify-center h-full px-1 pt-1 pb-1 cursor-pointer hover:text-[#2c7a7b] hover:bottom-nav-active transition-all duration-300">
              {/* <div className="relative w-6 h-0">
                <span className="absolute px-2 leading-none text-white bg-yellow-400 rounded-full -top-2 -right-8 text-[8px] py-0.5">
                  SOON
                </span>
              </div> */}
              <MdOutlinePaid className="w-5 h-5 mx-auto fill-current mb-1.5" />
              <span className="text-xs leading-none">{t('Living Wage')}</span>
            </span>
          </ActiveLink>
        </div>

        <div className="relative items-center justify-center flex-1 h-full group">
          <ActiveLink
            strict={true}
            href="/workers"
            activeClassName="text-[#2c7a7b] bottom-nav-active"
          >
            <span className="relative flex flex-col items-center justify-center h-full px-1 pt-1 pb-1 cursor-pointer hover:text-[#2c7a7b] hover:bottom-nav-active transition-all duration-300">
              <IoPeopleOutline className="w-5 h-5 mx-auto fill-current mb-1.5" />
              <span className="text-xs leading-none">
                {t('Worker Database')}
              </span>
            </span>
          </ActiveLink>
        </div>

        {!hasAuthorization('SubClient') && (
          <div className="relative items-center justify-center flex-1 h-full pr-5 group">
            <ActiveLink
              strict={true}
              href="/messages"
              activeClassName="text-[#2c7a7b] bottom-nav-active"
            >
              <span className="relative flex flex-col items-center justify-center h-full px-1 pt-1 pb-1 hover:text-[#2c7a7b] hover:bottom-nav-active transition-all duration-300">
                <div className="relative w-6 h-0">
                  <span className="absolute px-2 leading-none text-white bg-yellow-400 rounded-full -top-2 -right-8 text-[8px] py-0.5">
                    SOON
                  </span>
                </div>
                <IoChatbubblesOutline className="w-5 h-5 mx-auto fill-current mb-1.5" />
                <span className="text-xs leading-none">{t('Messages')}</span>
              </span>
            </ActiveLink>
          </div>
        )}
        {/*<div className="relative items-center justify-center flex-1 h-full group">
            <ActiveLink
              strict={true}
              href="/messages"
              activeClassName="text-[#2c7a7b] bottom-nav-active"
            >
              <span className="flex flex-col items-center justify-center h-full px-1 pt-1 pb-1 cursor-pointer hover:text-[#2c7a7b] hover:bottom-nav-active transition-all duration-300">
                <IoChatbubblesOutline className="w-5 h-5 mx-auto fill-current mb-1.5" />
                <span className="text-xs leading-none">Messages</span>
              </span>
            </ActiveLink>
          </div>*/}
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */

import { useForm } from 'react-hook-form';
import { GrLanguage } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { components, ControlProps } from 'react-select';

import ImageFallback from '@components/common/ImageFallback';
const Control = ({
  children,
  ...props
}: ControlProps<
  {
    label: string;
    value: string;
  },
  false
>) => {
  // @ts-ignore
  const { value } = props.selectProps;

  return (
    <components.Control {...props}>
      <div className="flex items-center justify-center pl-2">
        <GrLanguage className="w-4 h-4" />
      </div>
      {children}
    </components.Control>
  );
};

export default function Topbar({
  barWidth,
  setBarWidth,
}: {
  barWidth?: any;
  setBarWidth?: any;
}) {
  // const {
  //   isAuthorized,
  //   getAccountData,
  //   getUserData,
  //   toggleSidebar,
  //   hasAuthorization,
  // } = useUI();

  const languages = [
    {
      label: 'EN',
      value: 'en',
    },
    {
      label: 'FR',
      value: 'fr',
    },
    {
      label: 'AR',
      value: 'ar',
    },
  ];

  // const { language, isLanguageActive, setLanguage, setIsLanguageActive } =
  //   useLivingWage(); // TODO: you need to create a context for language

  // const { data } = useSWR(
  //   [`${process.env.NEXT_PUBLIC_API_ACCOUNT_ENDPOINT}/me`, getToken()],
  //   fetcher,
  // );
  // const [avatar, setAvatar] = useState(getAccountData()?.user?.avatar_url);

  // useEffect(() => {
  //   if (data) setAvatar(data[0]?.user?.avatar_url);
  // }, [data]);

  const { register } = useForm();

  return (
    <nav
      aria-label="topbar"
      className="sticky top-0 z-50 flex justify-between flex-none bg-white border border-t-0 border-l-0 border-gray-200 h-14"
    >
      <div className="absolute w-4 h-4 bg-[#03363d] top-14">
        <div className="sticky w-full h-full bg-gray-100 border-b border-r border-gray-100 rounded-tl-lg top-14" />
      </div>
      {/* <!-- add button --> */}
      <ul
        aria-label="topbar-left"
        className="flex items-center justify-center w-5 text-gray-400 border-r rounded-r-lg cursor-pointer h-14 bg-[#03363d] hover:text-white"
        onClick={() => {
          setBarWidth((prev: any) => {
            return prev === 80 ? 256 : 80;
          });
        }}
      >
        {/* <!-- add button --> */}
        <div className="relative flex items-center justify-center font-semibold  rounded-full outline-none transition-all duration-300 w-9 h-9  focus:outline-none">
          <span className="sr-only">View sidebar</span>
          <IoIosArrowBack
            className="w-4 h-4 mx-auto mr-1"
            style={{
              transform: barWidth === 80 ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 300ms ease-in-out',
            }}
          />
        </div>
      </ul>
      {/* <button
            type="button"
            onClick={toggleSidebar}
            className="relative flex items-center py-3 ml-5 font-semibold text-gray-400 bg-gray-100 rounded-full outline-none transition-all duration-300 w-9 h-9 hover:text-gray-600 focus:outline-none"
          >
            <span className="sr-only">View sidebar</span>
            <IoMenuOutline className="w-5 h-5 mx-auto" />
          </button> */}
      <ul aria-label="topbar-right" className="flex items-center pl-8 mr-5">
        {false && (
          <li className="relative hidden mr-3 md:block">
            <input
              title="Search Bar"
              aria-label="searchbar"
              role="search"
              className="w-4 py-2 pl-4 pr-8 text-xs placeholder-transparent border-transparent outline-none cursor-pointer transition-all duration-300 ease-in-out rounded-md focus:border-black focus:cursor-text focus:w-64 focus:placeholder-gray-500 focus:outline-none ring-transparent focus:ring-transparent"
              placeholder="Type to search..."
            />
            <i className="absolute top-0 right-0 flex items-center h-full pr-3 pointer-events-none">
              <IoSearchOutline className="w-5 h-5 mx-auto fill-current" />
            </i>
          </li>
        )}
        {
          // <div className=" bg-white">
          //   <CustomSelect
          //     id="date"
          //     className="z-50 h-full mr-3 text-gray-800 placeholder-gray-500 border-primary-500 w-30"
          //     defaultValue={languages.find((x) => x.value === language)}
          //     components={{ Control }}
          //     classNamePrefix="obens-select"
          //     options={languages}
          //     onChange={(val) => {
          //       localStorage.setItem('lang', val.value);
          //       // setLanguage(val.value);
          //     }}
          //   />
          //   {/* <MdLanguage className="w-5 h-5 mx-auto fill-current" /> */}
          // </div>
        }

        <div className="hidden h-full border-l border-gray-200 md:block" />

        {/* {isAuthorized && hasAuthorization('Admin') === false && (
          <ActiveLink
            strict={false}
            href={
              hasAuthorization('Client')
                ? '/my-client'
                : hasAuthorization('SubClient')
                ? '/'
                : 'my-supplier'
            }
            activeClassName="-"
          >
            <a className="flex flex-row items-center h-10 ml-6">
              <div className="flex flex-col mr-3 text-xs font-semibold text-left">
                <span>
                  {hasAuthorization('Client') && 'Acheteur Direct'}
                  {hasAuthorization('Supplier') && 'SUPPLIER ACCOUNT'}
                  {hasAuthorization('Corp') && 'COOPERATIVE ACCOUNT'}
                  {hasAuthorization('SubClient') && 'Client ACCOUNT'}
                </span>
                <span
                  className="font-normal leading-tight text-gray-500"
                  style={{ fontSize: '0.6rem' }}
                >
                  {getUserData()?.email || 'View your profile'}
                </span>
              </div>
              <Avatar
                className="bg-gray-100 border-2 rounded-full pointer-events-none border-primary-500 h-9 w-9"
                src={avatar}
              />
            </a>
          </ActiveLink>
        )} */}
        {
          <div className="flex flex-row items-center h-10 ml-6">
            <div className="flex flex-col mr-3 text-xs font-semibold text-right">
              <span className="capitalize">ADMIN ACCOUNT</span>
              <span
                className="font-normal leading-tight text-gray-500"
                style={{ fontSize: '0.6rem' }}
              >
                {'lilTWL'}
              </span>
            </div>
            <ImageFallback
              draggable="false"
              className="p-1 bg-gray-100 border-2 rounded-full pointer-events-none border-primary-500 h-9 w-9"
              src={'/assets/images/obens-small.png'}
              alt="Profile"
              role="none"
            />
          </div>
        }
      </ul>
    </nav>
  );
}

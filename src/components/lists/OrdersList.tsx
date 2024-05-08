/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import EmptyState from '@components/custom/EmptyState';
import ProductTypeSelectRequest from '@components/custom/select/ProductTypeSelectRequest';
import ErrorLoadingHandle from '@components/error/ErrorLoadingHandle';
import CreateQualityControlModal from '@components/modals/quality-control/CreateQualityControlModal';
import CreateSupplyTemplateModal from '@components/modals/supply-mapping/admin/CreateSupplyTemplateModal';
import { useUI } from '@contexts/ui.context';
import { Avatar } from '@mui/material';
import { getToken } from '@utils/auth-token';
import { fetcher } from '@utils/fetch.helper';
import { formatDate } from '@utils/format.helper';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { AiFillFilter, AiOutlineFilter } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import {
  IoAddOutline,
  IoArrowForwardOutline,
  IoReloadOutline,
} from 'react-icons/io5';
import useSWR from 'swr/immutable';

import AsyncLoading from '@components/AsyncLoading';
import SelectInput from '@components/inputs/SelectInput';

const motionSearch = {
  initial: {
    width: '0rem',
    borderColor: 'trensparent',
    overflow: 'hidden',
  },
  animate: {
    width: '9rem',
    borderColor: 'e5e7eb',
    transitionEnd: {
      overflow: 'visible',
    },
  },
};
const motionVariants = {
  initial: {
    height: '0rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '0rem',
    paddingBottom: '0rem',
    borderBottomWidth: '0px',
    borderColor: 'trensparent',
    overflow: 'hidden',
  },
  animate: {
    height: '11.8rem',
    paddingTop: '1rem',
    paddingBottom: '1.2rem',
    borderBottomWidth: '1px',
    borderColor: 'e5e7eb',
    transitionEnd: {
      overflow: 'visible',
    },
  },
};

export default function OrdersList({
  setOrderData,
  selectedOrderData,
  selectedTab,
  setSelectedTab,
  refetch,
  setCoops,
  quality,
}: {
  selectedOrderData: any;
  setOrderData: (val: string) => void;
  selectedTab?: any;
  setSelectedTab?: any;
  setCoops?: any;
  quality?: boolean;
  refetch?: () => void;
}) {
  const { hasAuthorization } = useUI();
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [openFilter, setOpenFiler] = useState(true);
  const [data, setData] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [ingredientsChoice, setIngrdientChoice] = useState('ALL');
  const [year, setYear] = useState('');
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      date: new Date().getFullYear().toString(),
      search: '',
    },
  });
  const {
    data: originalData,
    error,
    mutate,
    isValidating,
  } = useSWR(
    [
      ingredientsChoice != 'ALL' && watch('date') != 'ALL'
        ? `${
            process.env.NEXT_PUBLIC_API_ORDER_ENDPOINT
          }/fetch/me/${ingredientsChoice}?year=${watch('date')}`
        : ingredientsChoice != 'ALL' && watch('date') == 'ALL'
          ? `${process.env.NEXT_PUBLIC_API_ORDER_ENDPOINT}/fetch/me/${ingredientsChoice}`
          : ingredientsChoice == 'ALL' && watch('date') != 'ALL'
            ? `${process.env.NEXT_PUBLIC_API_ORDER_ENDPOINT}/fetch/me?year=${watch(
                'date',
              )}`
            : ingredientsChoice == 'ALL' && watch('date') == 'ALL'
              ? `${process.env.NEXT_PUBLIC_API_ORDER_ENDPOINT}/fetch/me`
              : '',
      getToken() || '',
    ],
    fetcher,
  );

  useEffect(() => {
    if (!error && originalData && originalData.length > 0) {
      originalData.sort((a: any, b: any) => {
        const a_date = Date.parse(a.date);
        const b_date = Date.parse(b.date);
        if (a_date === b_date)
          return Date.parse(b.created_at) - Date.parse(a.created_at);
        return b_date - a_date;
      });
    }
  }, [originalData, error, setOrderData]);

  // 'original data', originalData;
  useEffect(() => {
    if (!error && originalData && originalData.length > 0) {
      setData(originalData);
      setOrderData(originalData[selectedOrderIndex]);
      setCoops && setCoops(originalData[selectedOrderIndex]?.corps_ids);
    } else setOrderData(null);
    // if (setCoops && originalData) {
    // setCoops(originalData[0]?.corps_ids);
    // }
  }, [originalData, error, setOrderData, setCoops, selectedOrderIndex]);
  const { data: ingredientsData, mutate: mutateIngredients } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_API_PRODUCT_ENDPOINT}/product_type?size=100`,
      getToken() || '',
    ],
    fetcher,
  );

  const { control } = useForm({
    mode: 'onBlur',
    defaultValues: {
      logo_url: '',
      search: '',
      label: {
        logo_url: '',
        label: '',
        value: '',
      },
      value: {
        logo_url: '',
        label: '',
        value: '',
      },
    },
  });
  useEffect(() => {
    const date = watch('date');
    if (date == 'ALL') setYear('ALL');
    else setYear(date);
  }, [watch, watch('date')]);
  useEffect(() => {
    if (ingredientsData) {
      setIngredients(ingredientsData);
      setSelectedIngredient(ingredientsData[0]);

      setYear('');
      setValue('date', 'ALL');
    }
  }, [ingredientsData]);
  return (
    <>
      <div
        style={{ minHeight: '30rem' }}
        className="relative flex flex-col w-full max-h-screen overflow-hidden text-left bg-white border border-gray-200 rounded-md lg:rounded-r-none"
      >
        <div className="flex flex-row items-center justify-between w-full h-12 px-5 border-b border-gray-200">
          <h3 className="pt-4 pb-4 text-sm font-semibold leading-none text-heading">
            Orders list
          </h3>
          <div className="flex flex-row items-center justify-center cursor-pointer gap-3 transition-colors duration-150 text-primary-500">
            <AnimatePresence>
              <motion.div
                variants={motionSearch}
                initial="initial"
                animate={isSearchOpen ? 'animate' : ''}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                exit="exit"
                className="flex flex-col items-center justify-between w-full gap-2"
              >
                <div className="flex flex-row items-center justify-center py-4 gap-2">
                  <input
                    id={'search'}
                    type="text"
                    placeholder={'Search'}
                    className={cn(
                      'placeholder-gray-500 text-gray-800 border-gray-300 max-w-[140px] h-[33px] border px-3 py-3 bg-transparent rounded-lg text-sm focus:outline-none focus:border-primary-500 !resize-none disabled:bg-gray-200 disabled:cursor-not-allowed',
                    )}
                    {...register('search')}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            <IoIosSearch
              className="w-5 h-5 hover:text-primary-800"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <div
              onClick={() => !isValidating && mutate()}
              className="flex flex-row items-center justify-center cursor-pointer transition-colors duration-150 text-primary-500 hover:text-primary-800"
            >
              <IoReloadOutline
                className={cn(
                  isValidating && 'animate-spin cursor-not-allowed',
                  'w-5 h-5',
                )}
              />
            </div>
            <div onClick={() => setOpenFiler(!openFilter)}>
              {openFilter ? (
                <AiFillFilter
                  className={cn(
                    isValidating && ' cursor-not-allowed',
                    'w-5 h-5 hover:text-primary-800',
                  )}
                />
              ) : (
                <AiOutlineFilter
                  className={cn(
                    isValidating && ' cursor-not-allowed',
                    'w-5 h-5 hover:text-primary-800',
                  )}
                />
              )}
            </div>
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            variants={motionVariants}
            initial="initial"
            animate={openFilter ? 'animate' : ''}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            exit="exit"
            className="flex flex-col items-center justify-between w-full gap-1"
          >
            <div className="w-full">
              <label className="block pb-2 text-xs font-semibold text-gray-800">
                Ingredient
                {selectedIngredient && <span className="text-red-500">*</span>}
              </label>
              <Controller
                control={control}
                name="label"
                render={({ field: { onChange, value, ref } }) => (
                  <ProductTypeSelectRequest
                    ref={ref}
                    defaultValue={{
                      logo_url: '/assets/images/all.png',
                      label: 'ALL',
                      value: 'ALL',
                    }}
                    // defaultValue={ingredients && ingredients.length > 0 ? ingredients[0] : null}
                    dataList={[
                      {
                        image: { url: '/assets/images/all.png' },
                        name: 'ALL',
                        id: 'ALL',
                      },
                      ...ingredients,
                    ]}
                    onChange={(val: any) => {
                      setIngrdientChoice(val?.value);
                    }}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <label className="block pb-2 text-xs font-semibold text-gray-800">
                Year
              </label>
              <div className="bg-white">
                <SelectInput
                  id="date"
                  className="w-full"
                  defaultValue={{ label: 'ALL', value: 'ALL' }}
                  register={register('date')}
                  options={[
                    { label: 'ALL', value: 'ALL' },
                    ...Array.from({ length: 10 }, (_, i) => ({
                      label: new Date().getFullYear() - i,
                      value: new Date().getFullYear() - i,
                    })),
                  ]}
                  onChange={() => {}}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <ul className="flex flex-col flex-1 max-h-screen pb-2 overflow-auto border-gray-200">
          {isValidating && (
            <li style={{ minHeight: '40rem' }} className="flex w-full m-auto">
              <AsyncLoading />
            </li>
          )}
          <ErrorLoadingHandle
            error={error}
            noDataTitle="No orders available"
            noDataContent="You have no orders yet"
            noData={
              data?.length === 0 &&
              selectedOrderData &&
              selectedIngredient &&
              year.length === 0
            }
            isLoading={isValidating}
            reload={mutate}
          >
            {!isValidating &&
              selectedOrderData &&
              ((!error && data) || [])
                .filter((item) =>
                  item?.order
                    ?.toLowerCase()
                    .includes(watch('search').toLowerCase()),
                )
                ?.map((order, index) => (
                  <li
                    key={'order-' + index}
                    onClick={() => {
                      setSelectedOrderIndex(index);
                      setOrderData(order);
                      if (setCoops) setCoops(order?.corps_ids);
                    }}
                    className={cn(
                      'flex flex-col px-6 py-4 select-none transition duration-300 hover:bg-gray-50',
                      {
                        '!bg-primary-50 !bg-opacity-70 border-t border-b border-gray-200':
                          selectedOrderData?.id === order?.id,
                        'border-t-0': index === 0,
                      },
                    )}
                  >
                    <div className="flex items-start flex-1">
                      <Avatar
                        variant="square"
                        sx={{ width: 56, height: 56 }}
                        src={
                          order.stage === 'DELIVERED'
                            ? 'https://res.cloudinary.com/obens/image/upload/v1696245311/accep_pmbdr4.png'
                            : order.stage === 'IN_PROGRESS'
                              ? 'https://res.cloudinary.com/obens/image/upload/v1696245270/proce_vwdvpp.png'
                              : '/assets/images/request-icon.png'
                        }
                        alt="Order"
                        className="w-10 h-10 mr-4 border rounded-md"
                      />
                      <div className="flex flex-col  w-full h-10">
                        <div className="flex flex-row justify-between h-14">
                          <div className="flex flex-row h-14">
                            <div className="flex-1 pl-1 mr-8">
                              <div className="mb-1 text-sm font-medium">
                                <span className="line-clamp-1 ">
                                  {order.order ||
                                    order.product_type_id ||
                                    'Unknown product'}
                                </span>
                              </div>
                              <div className="pb-1 text-gray-500 text-[10px]">
                                {formatDate(order.date)}
                              </div>
                              <Avatar
                                sx={{ width: 24, height: 24 }}
                                src={order.product?.image?.url}
                                alt={order.product?.name || ''}
                                className="w-8 h-8 border border-gray-200 rounded-md"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between h-full">
                            <div className="cursor-pointer text-primary hover:text-primary-700 pt-0.5 transition-colors duration-300">
                              <IoArrowForwardOutline className="m-0" />
                            </div>
                            {!hasAuthorization('Corp') && quality && (
                              <div className="flex flex-row items-center justify-end w-full">
                                <div
                                  onClick={() => {
                                    setModalData(order);
                                    setIsModalAddOpen(true);
                                  }}
                                  className="text-blue-700 cursor-pointer text-[10px] hover:text-blue-900 hover:underline"
                                >
                                  <IoAddOutline className="inline-block w-3 h-3 mr-1" />
                                  Add register
                                </div>
                              </div>
                            )}
                            {/* <div className="flex flex-row items-center leading-none gap-2">
                          <Avatar
                            sx={{ width: 23, height: 23 }}
                            src={order.product?.image?.url}
                            alt={order.product?.name || ''}
                            className="w-8 h-8 border border-gray-200 rounded-md"
                          />
                        </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
          </ErrorLoadingHandle>
          <EmptyState
            title="No orders available"
            content="You have no orders yet"
            isEmpty={!isValidating && !error && (!data || data.length === 0)}
          />
        </ul>
      </div>
      {isModalAddOpen && quality && (
        <CreateQualityControlModal
          modalData={modalData}
          isModalOpen={isModalAddOpen}
          setIsModalOpen={setIsModalAddOpen}
          onSuccess={() => mutate() && refetch()}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      )}
    </>
  );
}

export function OrdersListQualityControl({
  setOrderData,
  selectedOrderData,
  selectedTab,
  setSelectedTab,
  refetch,
}: {
  selectedOrderData: any;
  setOrderData: (val: string) => void;
  setSelectedTab?: any;
  selectedTab?: any;
  refetch: () => void;
}) {
  const { hasAuthorization } = useUI();

  const [modalData, setModalData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [data, setData] = useState(null);

  const {
    data: originalData,
    error,
    mutate,
    isValidating,
  } = useSWR(
    [
      hasAuthorization('Admin')
        ? `${process.env.NEXT_PUBLIC_API_ORDER_ENDPOINT}/fetch/all`
        : `${process.env.NEXT_PUBLIC_API_ORDER_ENDPOINT}/fetch/me`,
      getToken() || '',
    ],
    fetcher,
  );

  useEffect(() => {
    if (!error && originalData && originalData.length > 0) {
      originalData.sort((a: any, b: any) => {
        const a_date = Date.parse(a.date);
        const b_date = Date.parse(b.date);

        if (a_date === b_date)
          return Date.parse(b.created_at) - Date.parse(a.created_at);
        return b_date - a_date;
      });
      setData(originalData);
      setOrderData(originalData[selectedOrderIndex]);
    } else setOrderData(null);
  }, [originalData, error, setOrderData, selectedOrderIndex]);

  return (
    <>
      <div
        style={{ minHeight: '30rem' }}
        className="relative flex flex-col w-full h-full overflow-hidden text-left bg-white border border-gray-200 rounded-md lg:rounded-r-none"
      >
        <div className="flex flex-row items-center justify-between w-full h-12 px-5 border-b border-gray-200">
          <h3 className="pt-4 pb-4 text-sm font-semibold leading-none text-heading">
            Orders list
          </h3>
          <div
            onClick={() => !isValidating && mutate()}
            className="flex flex-row items-center justify-center cursor-pointer transition-colors duration-150 text-primary-500 hover:text-primary-800"
          >
            <IoReloadOutline
              className={cn(
                isValidating && 'animate-spin cursor-not-allowed',
                'w-5 h-5',
              )}
            />
          </div>
        </div>

        <ul className="flex flex-col flex-1 pb-2 border-gray-200">
          {isValidating && (
            <li style={{ minHeight: '40rem' }} className="flex w-full m-auto">
              <AsyncLoading />
            </li>
          )}
          {!isValidating &&
            selectedOrderData &&
            ((!error && data) || []).map((order, index) => (
              <li
                key={'order-' + index}
                onClick={() => {
                  setSelectedOrderIndex(index);
                  setOrderData(order);
                  // if (setCoops) setCoops(order?.corps_ids);
                }}
                className={cn(
                  selectedOrderData.id == order.id &&
                    'bg-gray-100 border-b border-gray-200 ' +
                      (index !== 0 && 'border-t'),
                  'flex flex-col px-6 py-4 select-none transition duration-300 hover:bg-gray-50',
                )}
              >
                <div className="flex items-start flex-1">
                  <Avatar
                    variant="square"
                    sx={{ width: 56, height: 56 }}
                    src={
                      order.stage === 'DELIVERED'
                        ? 'https://res.cloudinary.com/obens/image/upload/v1696245311/accep_pmbdr4.png'
                        : order.stage === 'IN_PROGRESS'
                          ? 'https://res.cloudinary.com/obens/image/upload/v1696245270/proce_vwdvpp.png'
                          : '/assets/images/request-icon.png'
                    }
                    alt="Order"
                    className="w-10 h-10 mr-4 border rounded-md"
                  />
                  <div className="flex flex-col w-full h-10">
                    <div className="flex flex-row h-14">
                      <div className="flex-1 pl-1 mr-8 ">
                        <div className="mb-1 text-sm font-medium ">
                          <span className="w-full line-clamp-1">
                            {order.order ||
                              order.product_type_id ||
                              'Unknown product'}
                          </span>
                        </div>
                        <div className="text-gray-500 text-[10px]">
                          {formatDate(order.date)}
                        </div>
                        <Avatar
                          sx={{ width: 24, height: 24 }}
                          src={order.product?.image?.url}
                          alt={order.product?.name || ''}
                          className="w-8 h-8 border border-gray-200 rounded-md"
                        />
                      </div>

                      <div className="flex flex-col items-end justify-between h-full">
                        <div className="cursor-pointer text-primary hover:text-primary-700 pt-0.5 transition-colors duration-300">
                          <IoArrowForwardOutline className="m-0" />
                        </div>
                        {!hasAuthorization('Corp') && (
                          <div className="flex flex-row items-center justify-end w-full">
                            <div
                              onClick={() => {
                                setModalData(order);
                                setIsModalAddOpen(true);
                              }}
                              className="text-blue-700 cursor-pointer text-[10px] hover:text-blue-900 hover:underline"
                            >
                              <IoAddOutline className="inline-block w-3 h-3 mr-1" />
                              Add register
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}

          <EmptyState
            title="No orders available"
            content="You have no orders yet"
            isEmpty={!isValidating && !error && (!data || data.length === 0)}
          />
        </ul>
      </div>

      {isModalAddOpen && (
        <CreateQualityControlModal
          modalData={modalData}
          isModalOpen={isModalAddOpen}
          setIsModalOpen={setIsModalAddOpen}
          onSuccess={() => mutate() && refetch()}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      )}
    </>
  );
}

export function OrdersListSupplyMapping({
  setOrderData,
  selectedOrderData,
  selectedTab,
  setSelectedTab,
  isAlerts = false,
}: {
  selectedOrderData: any;
  setOrderData: (val: string) => void;
  selectedTab?: any;
  setSelectedTab?: any;
  isAlerts?: boolean;
}) {
  const { hasAuthorization } = useUI();

  const [modalData, setModalData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [data, setData] = useState(null);
  const {
    data: originalData,
    error,
    mutate,
    isValidating,
  } = useSWR(
    [
      hasAuthorization('Admin')
        ? `${process.env.NEXT_PUBLIC_API_ORDER_ENDPOINT}/fetch/all`
        : `${process.env.NEXT_PUBLIC_API_ORDER_ENDPOINT}/fetch/me`,
      getToken() || '',
    ],
    fetcher,
  );
  useEffect(() => {
    if (!error && originalData && originalData.length > 0) {
      originalData.sort(
        (a: any, b: any) => Date.parse(b.date) - Date.parse(a.date),
      );
      setData(originalData);

      setOrderData(originalData[0]);
    } else setOrderData(null);
  }, [originalData, error, setOrderData]);

  useEffect(() => {
    if (!error && data && data?.length > 0) setOrderData(data[0]);
    else setOrderData(null);
  }, [data, error, setOrderData]);

  return (
    <>
      <div
        style={{ minHeight: '30rem' }}
        className="relative flex flex-col w-full h-full overflow-hidden text-left bg-white border border-gray-200 rounded-md lg:rounded-r-none"
      >
        <div className="flex flex-row items-center justify-between w-full h-12 px-5 border-b border-gray-200">
          <h3 className="pt-4 pb-4 text-sm font-semibold leading-none text-heading">
            Orders list
          </h3>
          <div
            onClick={() => !isValidating && mutate()}
            className="flex flex-row items-center justify-center cursor-pointer transition-colors duration-150 text-primary-500 hover:text-primary-800"
          >
            <IoReloadOutline
              className={cn(
                isValidating && 'animate-spin cursor-not-allowed',
                'w-5 h-5',
              )}
            />
          </div>
        </div>

        <ul className="flex flex-col flex-1 pb-2 border-gray-200">
          {isValidating && (
            <li style={{ minHeight: '40rem' }} className="flex w-full m-auto">
              <AsyncLoading />
            </li>
          )}
          {!isValidating &&
            selectedOrderData &&
            ((!error && data) || []).map((order, index) => (
              <li
                key={'order-' + index}
                onClick={() => setOrderData(order)}
                className={cn(
                  selectedOrderData.id == order.id &&
                    'bg-gray-100 border-b border-gray-200 ' +
                      (index !== 0 && 'border-t'),
                  'flex flex-col px-6 py-4 select-none transition duration-300 hover:bg-gray-50',
                )}
              >
                <div className="flex items-start flex-1">
                  <Avatar
                    variant="square"
                    sx={{ width: 56, height: 56 }}
                    src={
                      order.stage === 'DELIVERED'
                        ? 'https://res.cloudinary.com/obens/image/upload/v1696245311/accep_pmbdr4.png'
                        : order.stage === 'IN_PROGRESS'
                          ? 'https://res.cloudinary.com/obens/image/upload/v1696245270/proce_vwdvpp.png'
                          : '/assets/images/request-icon.png'
                    }
                    alt="Order"
                    className="w-12 h-12 mr-4 border rounded-md"
                  />
                  <div className="flex flex-col w-full h-10">
                    <div className="flex flex-row h-14">
                      <div className="flex-1 pl-1 mr-8">
                        <div className="mb-1 text-sm font-medium">
                          <span className="w-full line-clamp-1">
                            {order.order ||
                              order.product_type_id ||
                              'Unknown product'}
                          </span>
                        </div>
                        <div className="text-gray-500 text-[10px]">
                          {formatDate(order.date)}
                        </div>
                        {isAlerts && (
                          <Avatar
                            sx={{ width: 24, height: 24 }}
                            src={order.product?.image?.url}
                            alt={order.product?.name || ''}
                            className="w-8 h-8 border border-gray-200 rounded-md"
                          />
                        )}
                      </div>
                      <div className="flex flex-col items-end justify-between h-full">
                        <div className="cursor-pointer text-primary hover:text-primary-700 pt-0.5 transition-colors duration-300">
                          <IoArrowForwardOutline className="m-0" />
                        </div>
                      </div>
                    </div>
                    {hasAuthorization('Client') === false &&
                      isAlerts === false && (
                        <div className="flex flex-row items-center justify-end w-full">
                          <div
                            onClick={() => {
                              setModalData(order);
                              setIsModalAddOpen(true);
                            }}
                            className="text-blue-700 cursor-pointer text-[10px] hover:text-blue-900 hover:underline"
                          >
                            <IoAddOutline className="inline-block w-3 h-3 mr-1" />
                            Add supply tier
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </li>
            ))}

          <EmptyState
            title="No orders available"
            content="You have no orders yet"
            isEmpty={!isValidating && !error && (!data || data.length === 0)}
          />
        </ul>
      </div>

      {isModalAddOpen && (
        <CreateSupplyTemplateModal
          orderData={modalData}
          isModalOpen={isModalAddOpen}
          setIsModalOpen={setIsModalAddOpen}
          onSuccess={() => mutate()}
          selectedTab={selectedTab}
        />
      )}
    </>
  );
}

import { useEffect, useRef, useState } from 'react';

import { Avatar, Button, Tooltip } from '@mui/material';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { AiFillFilter, AiOutlineFilter } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import {
  IoAddCircleOutline,
  IoArrowForwardOutline,
  IoPencilOutline,
  IoReloadOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import CustomSelect, { ControlProps, components } from 'react-select';
import { useToasts } from 'react-toast-notifications';
import useSWR from 'swr/immutable';

import AsyncLoading from '@components/AsyncLoading';
import CooperativeSelect from '@components/custom/select/CooperativeSelect';
import ProductTypeSelectRequest from '@components/custom/select/ProductTypeSelectRequest';
import ErrorLoadingHandle from '@components/error/ErrorLoadingHandle';
import ConfirmationModal from '@components/modals/ConfirmationModal';
import AddUpdateProductTypeModal from '@components/modals/harvest/AddUpdateLotModalAdmin';
import { useHarvest } from '@contexts/havest-context';
import { useUI } from '@contexts/ui.context';
import { getToken } from '@utils/auth-token';
import { fetcher } from '@utils/fetch.helper';
import { formatDate } from '@utils/format.helper';
import { selectStylesWithError } from '@utils/select.helper';

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
    height: '16rem',
    paddingTop: '1rem',
    paddingBottom: '1.2rem',
    borderBottomWidth: '1px',
    borderColor: 'e5e7eb',
    transitionEnd: {
      overflow: 'visible',
    },
  },
};
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
export const Control = ({
  children,
  ...props
}: ControlProps<
  {
    label: number;
    value: number;
    name?: string;
  },
  false
>) => {
  const { value } = props.selectProps;

  return (
    <components.Control {...props}>
      {(props.selectProps as any)?.name
        ? (props.selectProps as any)?.name
        : children}
    </components.Control>
  );
};

export const HarvestLotList = ({
  setSelectedLot,
  selectedLot,
  setSelectedCoopInParrent,
  setSelectedIngredientInParrent,
  mutateSingleLot,
  setSelectedLotIndex,
  setSelectedYear,
  setSelectedPage,
  page,
}: {
  setSelectedLot: any;
  selectedLot: any;
  setSelectedCoopInParrent?: (coop: any) => void;
  setSelectedIngredientInParrent?: any;
  page?: number;
  setSelectedLotIndex: (idx: number) => void;
  mutateSingleLot: () => void;
  setSelectedYear: (year: number) => void;
  setSelectedPage: (page: number) => void;
}) => {
  const [openFilter, setOpenFiler] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState(undefined);
  const [selectedCoop, setSelectedCoop] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectLot, setSelecteLot] = useState(undefined);
  const [coops, setCoops] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { hasAuthorization, getAccountData } = useUI();
  const [year, setYear] = useState(undefined);
  const { addToast } = useToasts();
  const dummyDiv = useRef<HTMLDivElement>(null);

  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      search: '',
      logo_url: '',
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

  const formData = watch();

  const {
    getMoreLots,
    resetCurrentLotList,
    isLoading,
    isLoadingMore,
    noMoreLots,
    currentlotList,
  } = useHarvest();

  const handleScroll = () => {
    const rect = dummyDiv?.current?.getBoundingClientRect();
    if (rect?.top < window.innerHeight && rect?.bottom >= 0) {
      getMoreLots();
    }
  };

  useEffect(() => {
    handleScroll(); // Check visibility when the component mounts

    const handleResize = () => {
      handleScroll(); // Check visibility on window resize
    };
    window.addEventListener('scroll', handleResize);
    return () => {
      window.removeEventListener('scroll', handleResize);
    };
  });

  const {
    data: orders,
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

  const { data: ingredientsData, mutate: mutateIngredients } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_API_PRODUCT_ENDPOINT}/product_type?size=100`,
      getToken() || '',
    ],
    fetcher,
  );
  const {
    data: coopsData,
    mutate: mutateCoops,
    isValidating: isValidating_,
    error: error_,
  } = useSWR(
    [
      selectedIngredient
        ? `${process.env.NEXT_PUBLIC_API_ACCOUNT_ENDPOINT}/corp/fetch/all/by/productId/${selectedIngredient}`
        : null,
      getToken() || '',
    ],
    fetcher,
  );

  useEffect(() => {
    ingredientsData?.sort(
      (a: any, b: any) => Date.parse(b.date) - Date.parse(a.date),
    );

    if (hasAuthorization('Corp') === true) return;

    if (ingredientsData && !selectedIngredient) setIngredients(ingredientsData);

    setCoops(coopsData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coopsData, ingredientsData]);

  useEffect(() => {
    if (hasAuthorization('Corp')) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_ACCOUNT_ENDPOINT}/corp/fetch/all/by/ids`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + (getToken() || ''),
          },
          body: JSON.stringify([getAccountData() && getAccountData().id] || []),
        },
      )
        .then(async (res) => {
          const data = [];

          const reader = res.body
            .pipeThrough(new TextDecoderStream())
            .getReader();
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            value
              .split('data:')
              .map((item) => item && JSON.parse(item))
              .forEach((item) => item && data.push(item));
          }
          return data;
        })
        .then((data) => {
          if (data.length > 0) {
            setIngredients(data[0].products);
            setSelectedCoop(data[0]);
            setSelectedCoopInParrent(data[0].id);
            setCoops(data);
          }
        });
    }
  }, [getAccountData, hasAuthorization, setSelectedCoopInParrent]);
  return (
    <div>
      <div
        style={{ minHeight: '40rem' }}
        className="relative flex flex-col w-full h-full overflow-hidden text-left bg-white border border-gray-200 rounded-md lg:rounded-r-none"
      >
        <div className="relative flex flex-row items-center justify-between w-full h-12 px-5 border-b border-gray-200">
          <h3 className="pt-4 pb-4 text-sm font-semibold leading-none text-heading">
            Lot list
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
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setValue('search', '');
              }}
            />
            <IoReloadOutline
              onClick={() =>
                !isValidating_ &&
                mutateCoops() &&
                mutateIngredients() &&
                mutateSingleLot()
              }
              className={cn(
                isValidating_ && 'animate-spin cursor-not-allowed',
                'w-5 h-5 hover:text-primary-800',
              )}
            />
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
            {hasAuthorization('Client') === false && (
              <div
                onClick={() => {
                  setSelecteLot(undefined);
                  if (!selectedIngredient) {
                    addToast(
                      <>
                        <br />
                        <p>
                          Please choose <strong>an ingredient.</strong>
                        </p>
                        <br />
                      </>,
                      { appearance: 'warning' },
                    );
                    setOpenFiler(true);
                    return;
                  } else if (
                    hasAuthorization('Corp') === false &&
                    !selectedCoop
                  ) {
                    addToast(
                      <>
                        <br />
                        <p>
                          Please choose <strong>a cooperative.</strong>
                        </p>
                        <br />
                      </>,
                      { appearance: 'warning' },
                    );
                    setOpenFiler(true);
                    return;
                  }
                  setIsModalOpen(!isModalOpen);
                }}
              >
                <IoAddCircleOutline
                  className={cn(
                    isValidating && ' cursor-not-allowed',
                    'w-5 h-5 hover:text-primary-800',
                  )}
                />
              </div>
            )}
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            variants={motionVariants}
            initial="initial"
            animate={openFilter ? 'animate' : ''}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            exit="exit"
            className="flex flex-col items-center justify-between w-full gap-2"
          >
            {/* Ingredient selector */}
            <div className="w-full">
              <label className="block pb-2 text-xs font-semibold text-gray-800">
                Ingredient {<span className="text-red-500">*</span>}
              </label>
              <Controller
                control={control}
                name="label"
                render={({ field: { onChange, value, ref } }) => (
                  <ProductTypeSelectRequest
                    ref={ref}
                    setSelectedIngredient={setSelectedIngredient}
                    defaultValue={selectedIngredient}
                    dataList={ingredients}
                    onChange={(val: any) => {
                      if (val.value !== selectedIngredient) {
                        onChange(val?.value || '');
                        if (!hasAuthorization('Corp')) {
                          setSelectedCoop(undefined);
                          setSelectedCoopInParrent(undefined);
                        }
                        resetCurrentLotList();
                        setSelectedIngredient(val?.value);
                        setSelectedIngredientInParrent(val?.value);
                        selectedLot && setSelectedLot(undefined);
                      }
                      // setAutoSelect(false);
                    }}
                  />
                )}
              />
            </div>
            {/* Cooperative selector */}
            <div className="w-full">
              <label className="block pb-2 text-xs font-semibold text-gray-800">
                Cooperatives {<span className="text-red-500">*</span>}
              </label>
              {hasAuthorization('Corp') ? (
                <Controller
                  control={control}
                  name="value"
                  render={({ field: { onChange, value, ref } }) => (
                    <CooperativeSelect
                      inref={ref}
                      extra={{
                        value: {
                          label: selectedCoop?.name,
                          value: selectedCoop?.id,
                          logo_url: selectedCoop?.imageUrl,
                        },
                      }}
                      isDisabled
                      onChange={() => {}}
                    />
                  )}
                />
              ) : (
                <Controller
                  control={control}
                  name="value"
                  render={({ field: { onChange, value, ref } }) => (
                    <CooperativeSelect
                      inref={ref}
                      extra={{
                        value:
                          coops
                            ?.map((coop) => ({
                              label: coop?.name,
                              value: coop?.id,
                              logo_url: coop?.imageUrl,
                            }))
                            ?.find((e) => e?.value === selectedCoop) || null,
                      }}
                      options={selectedIngredient ? coops : []}
                      onChange={(val: any) => {
                        onChange(val?.value || '');
                        if (val?.value) {
                          setSelectedCoop(val?.value);
                          setSelectedCoopInParrent(val?.value);
                        }
                      }}
                    />
                  )}
                />
              )}
            </div>
            {/* year selector */}
            <div className="w-full">
              <label className="block pb-2 text-xs font-semibold text-gray-800">
                Année d’achat {<span className="text-red-500">*</span>}
              </label>
              <Controller
                control={control}
                name="value"
                render={({ field: { onChange, value, ref } }) => (
                  <CustomSelect
                    ref={ref}
                    id="date"
                    placeholder="Choose a year"
                    classNamePrefix="obens-select"
                    styles={selectStylesWithError(error)}
                    components={{ Control }}
                    options={
                      selectedCoop !== null
                        ? [
                            ...Array.from({ length: 20 }, (_, i) => ({
                              label: new Date().getFullYear() - i,
                              value: new Date().getFullYear() - i,
                            })),
                          ]
                        : undefined
                    }
                    onChange={(val) => {
                      onChange(val?.value || '');
                      setSelectedYear(val?.value);
                      setYear(val?.value);
                      // reset();
                      // resetCurrentLotList();
                    }}
                  />
                )}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        {/* List of lots*/}
        <div
          className="flex flex-col flex-1 max-h-screen pb-2 overflow-auto border-gray-200"
          onScroll={handleScroll}
        >
          <ErrorLoadingHandle
            error={error || error_}
            noDataTitle="No orders available"
            noDataContent="You have no orders yet"
            noData={
              currentlotList?.length === 0 &&
              selectedCoop &&
              selectedIngredient &&
              year
            }
            isLoading={isLoading}
            reload={mutateSingleLot}
          >
            {currentlotList?.length > 0 &&
              selectedCoop &&
              selectedIngredient &&
              (currentlotList || [])
                .filter((item) =>
                  item?.ref
                    ?.toUpperCase()
                    ?.includes(formData?.search?.toUpperCase()),
                )
                ?.map((order, index) => (
                  <Tooltip
                    title={`${order?.ref || order?.id || 'Unknown product'} (${
                      order.date
                    })`}
                    key={index}
                  >
                    <li
                      key={'lot-' + index}
                      onClick={() => {
                        setSelectedLot(order);
                        setSelectedLotIndex(currentlotList.indexOf(order));
                      }}
                      className={cn(
                        'flex px-6 py-4 select-none justify-between transition duration-300 hover:bg-gray-50',
                        {
                          '!bg-primary-50 !bg-opacity-70 border-t border-b border-gray-200':
                            selectedLot?.id === order?.id,
                          'border-t-0': index === 0,
                        },
                      )}
                    >
                      <div className="flex items-start">
                        <Avatar
                          variant="square"
                          sx={{ width: 56, height: 56 }}
                          alt="Lot"
                          className="w-10 h-10 mr-4 border rounded-md"
                          src="https://res.cloudinary.com/ocp-tech-reversablecode/image/upload/v1639048864/obens/on9zvnfcyvhzgb9kgyih.png"
                        />
                        <div className="flex items-start flex-1">
                          <div className="flex flex-col w-full h-10">
                            <div className="flex flex-row h-14">
                              <div className="flex-1 pl-1 mr-8 ">
                                <div className="mb-1 text-sm font-medium">
                                  <span className="w-full break-all line-clamp-2">
                                    {(
                                      order?.ref ||
                                      order?.id ||
                                      'Unknown product'
                                    ).substring(0, 52)}
                                  </span>
                                </div>
                                <div className="text-gray-500 text-[10px]">
                                  {order?.description?.substring(0, 35)}
                                </div>
                                {(order?.ref || order?.id).length > 24 ===
                                  false && (
                                  <p className="pt-1 text-gray-500 text-[10px]">
                                    {formatDate(order.date)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Arrow */}
                      <div className="flex flex-col items-end justify-between h-full">
                        <div className=" cursor-pointer text-primary hover:text-primary-700 transition-colors duration-300">
                          <IoArrowForwardOutline className="m-0" />
                        </div>
                        {hasAuthorization('Client') === false && (
                          <>
                            <div className="flex flex-row items-end justify-center gap-2">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelecteLot(order);
                                  setIsModalOpen(true);
                                }}
                                className=" text-blue-400 rounded-full cursor-pointer hover:bg-gray-200 hover:text-blue-600 transition-colors duration-300"
                              >
                                <IoPencilOutline className="w-4 h-4" />
                              </div>
                              <div className=" text-red-400 rounded-full cursor-pointer hover:bg-gray-200 hover:text-red-600 transition-colors duration-300">
                                <IoTrashOutline
                                  className="w-4 h-4"
                                  onClick={() => {
                                    setSelectedLot(order);
                                    setIsDeleteModalOpen(true);
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </li>
                  </Tooltip>
                ))}
            {currentlotList?.length > 0 &&
              noMoreLots === false &&
              (isLoadingMore ? (
                <div className=" pt-5">
                  <AsyncLoading size={40} />
                </div>
              ) : (
                <>
                  {currentlotList?.length > 0 && (
                    <div
                      ref={dummyDiv}
                      className="flex items-center justify-center w-full"
                    >
                      <Button
                        className="w-full pb-2 border-gray-300 rounded-full center group"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedPage(page + 1);
                          getMoreLots();
                        }}
                      >
                        more lots
                      </Button>
                    </div>
                  )}
                </>
              ))}

            {!isLoading &&
              currentlotList?.length === 0 &&
              (!selectedIngredient || !selectedIngredient || !year) && (
                <p className="py-2 text-sm text-center">
                  Selected <strong>ingredient</strong> & <strong>coop</strong> &{' '}
                  <strong>year</strong> is empty.
                </p>
              )}
          </ErrorLoadingHandle>
        </div>
      </div>
      {isModalOpen && (
        <AddUpdateProductTypeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedCoop={selectedCoop}
          selectedLot={selectLot}
          selectedIngredient={selectedIngredient}
          onSuccess={() => {
            // reselect coop & ingredient?
            mutateSingleLot();
          }}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmationModal
          type={'Danger'}
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          title={'Deleting Lot'}
          message="Are you sure you want to delete this lot? This action cannot
          be undone."
          onConfirm={async () => {
            try {
              const resp = await fetch(
                `${process.env.NEXT_PUBLIC_API_TRACEABILITY_ENDPOINT}/lot/delete/${selectedLot?.id}`,
                {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getToken() || '',
                  },
                },
              );

              if (resp.status === 200) {
                addToast(
                  <>
                    <p className="pb-2 text-sm font-normal text-gray-600">
                      The lot has been deleted successfully.
                    </p>
                  </>,
                  { appearance: 'success' },
                );
                mutateSingleLot();
                setIsDeleteModalOpen(false);
              } else
                addToast(
                  <>
                    <p className="pb-2 text-sm font-normal text-gray-600">
                      An error occurred while deleting lot.
                    </p>
                  </>,
                  { appearance: 'error' },
                );
            } catch (error) {
              addToast(
                <>
                  <p className="pb-2 text-sm font-normal text-gray-600">
                    Something went wrong. Please try again later.
                  </p>
                </>,
                { appearance: 'error' },
              );
            }
          }}
        />
      )}
    </div>
  );
};

export default HarvestLotList;

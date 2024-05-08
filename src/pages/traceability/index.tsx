import { useState } from 'react';

import { Stack, Tooltip } from '@mui/material';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { AiFillFilter, AiOutlineFilter } from 'react-icons/ai';
import { IoIosSearch } from 'react-icons/io';
import { IoReloadOutline } from 'react-icons/io5';

import Breadcrumbs from '@components/common/Breadcrumbs';
import SelectInput from '@components/inputs/SelectInput';
import DefaultLayout from '@layouts/default.layout';

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

const OrdersListTraceability = () => {
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

  return (
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
            onClick={() => {}}
            className="flex flex-row items-center justify-center cursor-pointer transition-colors duration-150 text-primary-500 hover:text-primary-800"
          >
            <IoReloadOutline
              className={cn(
                // isValidating && 'animate-spin cursor-not-allowed',
                'w-5 h-5',
              )}
            />
          </div>
          <div onClick={() => setOpenFiler(!openFilter)}>
            {openFilter ? (
              <AiFillFilter
                className={cn(
                  // isValidating && ' cursor-not-allowed',
                  'w-5 h-5 hover:text-primary-800',
                )}
              />
            ) : (
              <AiOutlineFilter
                className={cn(
                  // isValidating && ' cursor-not-allowed',
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
            {/* <Controller
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
            /> */}
            <div className="bg-white">
              <SelectInput
                id="ingridyant"
                className="w-full"
                defaultValue={{ label: 'noop', value: 'noop' }}
                register={register('date')}
                options={[]}
                onChange={() => {}}
              />
            </div>
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
    </div>
  );
};

export default function Traceability() {
  const [orderData, setOrderData] = useState(null);
  const [coops, setCoops] = useState([]);

  return (
    <>
      <Head>
        <title>Quality control | OBENS Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-start justify-center w-full mx-auto text-center max-w-7xl">
        <div className="flex flex-row items-center justify-between w-full">
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="flex flex-col items-start justify-start text-left"
          >
            <h1 className="font-bold leading-none uppercase text-heading">
              <strong>Full Batch Traceability</strong>
            </h1>
            <Breadcrumbs label="Traceability" />
          </motion.div>
        </div>

        <Stack direction="row" sx={{ width: '100%' }} spacing={1} mt={3}>
          <Stack sx={{ width: '30%' }} spacing={1}>
            <OrdersListTraceability
            // setOrderData={setOrderData}
            // selectedOrderData={orderData}
            // setCoops={setCoops}
            />
            {/* {orderData && (
              <CommentsList orderData={orderData} supplierData={undefined} />
            )} */}
          </Stack>
          <Stack sx={{ width: '70%' }}>
            <div
              style={{ minHeight: '40rem' }}
              className="relative flex flex-col w-full h-full overflow-hidden text-left bg-white border border-gray-200 col-span-2 rounded-md lg:rounded-l-none"
            >
              <div className="flex flex-row items-center justify-between w-full h-12 border-b border-gray-200">
                {/* <CoopsTabs
                  defaultTab={
                    orderData?.supplier_data?.name ||
                    Suppdata?.[0]?.supplier ||
                    Suppdata?.[0]?.structureName
                  }
                  coopsIds={coopsIds}
                  coopsLotsNumbers={orderData?.lot_numbers}
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  setDataSelectedCoop={setDataSelectedCoop}
                /> */}
                <div className="flex justify-end">
                  <div className="flex w-full px-2 py-1 gap-x-2">
                    {/* {hasAuthorization('Admin') === true && (
                      <>
                        <Tooltip title="Sort">
                          <IconButton
                            onClick={() => setIsSortTraceabilityModalOpen(true)}
                          >
                            <VscSortPrecedence className="w-5 h-5 hover:text-primary-800 text-primary-500 -rotate-90" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )} */}

                    <Tooltip title="Refresh">
                      <button
                        onClick={() => {
                          // if (hasAuthorization('Corp') === false)
                          //   !isValidating && mutate();
                          // else !coopsIsValidating && mutateCoops();
                        }}
                        className="flex flex-row items-center justify-center px-2 cursor-pointer transition-colors duration-150 text-primary-500 hover:text-primary-800"
                      >
                        <IoReloadOutline
                          className={cn(
                            // (isValidating || coopsIsValidating) &&
                            //   'animate-spin cursor-not-allowed',
                            'w-5 h-5',
                          )}
                        />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div className="w-full p-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"></div>
            </div>
          </Stack>
        </Stack>

        <div className="w-full h-16 spacer" />
      </div>
    </>
  );
}

Traceability.Layout = DefaultLayout;

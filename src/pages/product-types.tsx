import { Fragment, useState } from 'react';

// import { useUI } from '@contexts/ui.context';
import { Menu, Transition } from '@headlessui/react';
import { Divider, IconButton, Tooltip } from '@mui/material';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { IoAddCircleOutline, IoReloadOutline } from 'react-icons/io5';
import {
  IoAddSharp,
  IoEllipsisHorizontalSharp,
  IoFlowerOutline,
  IoInformationCircleOutline,
  IoLeafOutline,
  IoMapOutline,
  IoPencilOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import { VscSortPrecedence } from 'react-icons/vsc';
// import useSWR from 'swr/immutable';

import Breadcrumbs from '@components/common/Breadcrumbs';
import ImageFallback from '@components/common/ImageFallback';
import CreateProductTypeModal from '@components/CreateProductTypeModal';
import MenuItemButton from '@components/inputs/MenuItemButton';
import { useIngredient } from '@contexts/ingredient-context';
import DefaultLayout from '@layouts/default.layout';
import { FormBuilder } from '@pages';

function TraceabilityTemplateList({
  ingredientData,
  fetchData,
}: {
  ingredientData: any;
  fetchData: any;
}) {
  // const { hasAuthorization } = useUI();
  const dict = {
    lot: 'Harvest Template', // => HARVEST_NUM
    supplyMappingTemplate: 'Supply Mapping Template',
    trace_defalut_template: 'Traceability Template', // =>
    template: 'Ingredient Processing Template',
  };

  const [modalData, setModalData] = useState({});
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalProcessOpen, setIsModalProcessOpen] = useState(false);
  const [modalDataState, setModalDataState] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditValuesModalOpen, setIsEditValuesModalOpen] = useState(false);
  const [isEditTemplateModalOpen, setIsEditTemplateModalOpen] = useState(false);
  const [isSortTraceabilityModalOpen, setIsSortTraceabilityModalOpen] =
    useState(false);

  const [showedData, setShowedData] = useState([]);

  console.log(ingredientData);

  return (
    <>
      <div
        style={{ minHeight: '30rem' }}
        className="relative flex flex-col w-full h-full text-left bg-white border border-gray-200 col-span-2 rounded-md"
      >
        <div className="flex flex-row items-center justify-between w-full px-6 py-3 text-xs border-b border-gray-200">
          <p>
            <strong>{dict[fetchData]}</strong>
          </p>
          {
            <>
              <div className="flex flex-row items-center justify-center cursor-pointer gap-3 transition-colors duration-150 text-primary-500">
                <Tooltip title="Add New Template">
                  <IconButton sx={{ p: 1 }}>
                    <IoAddCircleOutline
                      className={cn(
                        // isValidating && ' cursor-not-allowed',
                        'w-5 h-5 hover:text-primary-800 text-primary-500',
                      )}
                      onClick={() => {
                        setIsModalProcessOpen(true);
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sort">
                  <IconButton
                    onClick={() => setIsSortTraceabilityModalOpen(true)}
                    sx={{ p: 1 }}
                  >
                    <VscSortPrecedence
                      className={cn(
                        // isValidating && ' cursor-not-allowed',
                        'w-5 h-5 hover:text-primary-800 text-primary-500 -rotate-90',
                      )}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Refresh">
                  <IconButton sx={{ p: 1 }} onClick={() => {}}>
                    <IoReloadOutline
                      className={cn(
                        // isValidating && 'animate-spin cursor-not-allowed',
                        'w-5 h-5 hover:text-primary-800 text-primary-500',
                      )}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          }
        </div>
        <div className="w-full h-full p-4 grid grid-cols-4 gap-4">
          {/* {!isValidating && !error && showedData.length > 0 ? (
            showedData?.map((template) => ( */}
          <div
            // key={template?.id}
            className="relative flex flex-col items-center justify-start w-full h-full bg-white border border-gray-200 rounded-lg cursor-pointer transition-colors duration-150 group hover:bg-gray-100"
          >
            <ImageFallback
              src={
                'https://via.placeholder.com/150'
                // template?.image_url ? template.image_url : template.img_url
              }
              alt="test"
              className="object-cover w-full bg-white border-b border-gray-200 rounded-t-lg transition-colors duration-150 group-hover:bg-gray-100"
              style={{ minHeight: '10rem', maxHeight: '10rem' }}
            />
            <div className="flex flex-col items-center justify-center w-full h-full leading-none text-center">
              <p className="py-3 text-xs font-medium leading-none line-clamp-1">
                {/* {template.name || template?.actor} */}
              </p>
            </div>

            {/* {hasAuthorization('Admin') && (
                  <div className="absolute top-2 right-2">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full px-2 py-1 text-white bg-black transition duration-300 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none">
                          <IoEllipsisHorizontalSharp className="w-4 h-4" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        {fetchData !== 'supplyMappingTemplate' ? (
                          <Menu.Items className="absolute right-0 w-48 mt-0 bg-white shadow-lg origin-top-right divide-y divide-gray-100 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div
                              style={{ zIndex: '-1' }}
                              className="px-1 py-1 "
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-1 text-xs`}
                                    onClick={() => {
                                      setModalData(template);
                                      setIsModalEditOpen(true);
                                    }}
                                  >
                                    <IoPencilOutline className="w-4 h-3 mr-2" />
                                    <span>Edit Process</span>
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-1 text-xs`}
                                    onClick={() => {
                                      setModalData(template);
                                      setIsModalDeleteOpen(true);
                                    }}
                                  >
                                    <IoTrashBinOutline className="w-4 h-3 mr-2" />
                                    <span>Delete Process</span>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        ) : (
                          <Menu.Items className="absolute right-0 w-48 mt-0 bg-white shadow-lg origin-top-right divide-y divide-gray-100 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                              {hasAuthorization('Admin') && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active
                                          ? 'bg-primary-500 text-white'
                                          : 'text-gray-900'
                                      } group flex rounded-md items-center w-full px-2 py-1 text-xs`}
                                      onClick={() => {
                                        setModalDataState(template);
                                        setIsEditTemplateModalOpen(true);
                                      }}
                                    >
                                      <IoDocumentOutline className="w-4 h-3 mr-2" />
                                      <span>Edit Template</span>
                                    </button>
                                  )}
                                </Menu.Item>
                              )}
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-1 text-xs`}
                                    onClick={() => {
                                      setModalDataState(template);
                                      setIsEditValuesModalOpen(true);
                                    }}
                                  >
                                    <IoPencilOutline className="w-4 h-3 mr-2" />
                                    <span>Edit Values</span>
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-1 text-xs`}
                                    onClick={() => {
                                      setModalDataState(template);
                                      setIsDeleteModalOpen(true);
                                    }}
                                  >
                                    <IoTrashBinOutline className="w-4 h-3 mr-2" />
                                    <span>Delete Supply Tier</span>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        )}
                      </Transition>
                    </Menu>
                  </div>
                )} */}
          </div>
        </div>
      </div>
    </>
  );
}

const menuItems = [
  {
    text: 'Create New Process',
    icon: <IoAddSharp className="w-4 h-4 mr-2" />,
    // modal: setIsCreateProcessModalOpen,
  },
  {
    text: 'Create New Supply',
    icon: <IoAddSharp className="w-4 h-4 mr-2" />,
    // modal: setIsSupplyOpen,
  },
  {
    text: 'Edit',
    icon: <IoPencilOutline className="w-4 h-4 mr-2" />,
    // modal: setIsModalEditOpen,
  },
  {
    text: 'Delete',
    icon: <IoTrashOutline className="w-4 h-4 mr-2 text-red-500" />,
    // modal: setIsDeleteModalOpen,
  },
  {
    text: 'Harvest Template',
    icon: <IoFlowerOutline className="w-4 h-4 mr-2" />,
  },
  {
    text: 'Supply Mapping Template',
    icon: <IoMapOutline className="w-4 h-4 mr-2" />,
  },
  {
    text: 'Traceability Template',
    icon: <IoLeafOutline className="w-4 h-4 mr-2" />,
  },
];
const IngredientProcessModal = ({
  ingredient,
  setSelectedIngredient,
  selectedIngredient,
  showFormBuilder,
  setShowFormBuilder,
}: {
  ingredient: any;
  setSelectedIngredient: (val: any) => void;
  selectedIngredient: any;
  showFormBuilder: boolean;
  setShowFormBuilder: (val: any) => {};
}) => {
  return (
    <div
      onClick={() => {
        setSelectedIngredient(ingredient);
        // if (hasAuthorization('Client'))
        //   return router.push(
        //     '/suppliers/supplier-by-ingredient?id=' + ingredient.id,
        //   );
      }}
      className={cn(
        ingredient.id === selectedIngredient?.id
          ? 'border-primary-500 border-2 bg-gray-100'
          : 'border-gray-200',
        'relative flex flex-col items-center justify-start w-full bg-white border rounded-lg cursor-pointer group hover:bg-gray-100 transition-colors duration-150',
      )}
    >
      <ImageFallback
        src={'https://via.placeholder.com/150'}
        alt={'test'}
        className="object-cover w-full bg-white border-b border-gray-200 rounded-t-lg group-hover:bg-gray-100 transition-colors duration-150"
        style={{ minHeight: '9rem', maxHeight: '9rem' }}
      />
      <div className="flex flex-col items-center justify-center w-full h-full px-1 py-3 leading-none text-center">
        <p className="text-xs font-medium leading-none line-clamp-1">
          {ingredient?.name}
        </p>
      </div>

      {/* {hasAuthorization('Admin') && ( */}
      {true && (
        <div className="absolute w-full top-1">
          <Menu as="div" className="relative inline-block w-full text-left">
            <div className="flex flex-row justify-between w-full px-1 gap-1">
              <Tooltip
                title={
                  <p style={{ textAlign: 'center' }}>
                    Click to copy!
                    <br />
                    <strong>{'yooooo'}</strong>
                  </p>
                }
              >
                <button className="inline-flex justify-center w-full px-1 py-1 text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none transition duration-300">
                  <IoInformationCircleOutline className="w-4 h-4" />
                </button>
              </Tooltip>
              <Menu.Button className="inline-flex justify-center w-full px-1 py-1 text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none transition duration-300">
                <IoEllipsisHorizontalSharp className="w-4 h-4" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                style={{ zIndex: '100' }}
                className="absolute right-0 mt-0 bg-white shadow-lg z-100 w-55 origin-top-right divide-y divide-gray-100 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="px-1 py-1 z-100">
                  {menuItems.map((e, i) => {
                    return (
                      <>
                        <MenuItemButton
                          ingredient={ingredient}
                          setIsModalEditOpen={null}
                          setModalData={setShowFormBuilder}
                          text={e.text}
                          setFetchData={null}
                          key={i}
                        >
                          {e?.icon}
                        </MenuItemButton>
                        {i == 3 && (
                          <Divider
                            variant="middle"
                            orientation="horizontal"
                            sx={{
                              marginY: '5px',
                              fontSize: '12px',
                            }}
                            flexItem
                          >
                            Views
                          </Divider>
                        )}
                      </>
                    );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
    </div>
  );
};

const IngredientsList = ({
  // shouldRefetch,
  selectedIngredient,
  setSelectedIngredient,
  showFormBuilder,
  setShowFormBuilder,
  // setFetchData,
}: {
  selectedIngredient: any;
  setSelectedIngredient: (ingredient: any) => void;
  showFormBuilder: boolean;
  setShowFormBuilder: (val: any) => void;
}) => {
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const [showedData, setShowedData] = useState([]);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalProcessOpen, setIsModalProcessOpen] = useState(false);
  const [isSortTraceabilityModalOpen, setIsSortTraceabilityModalOpen] =
    useState(false);
  const [modalDataState, setModalDataState] = useState(null);
  const { ingredients, addIngredient } = useIngredient();

  // const { data, error, isValidating, mutate } = useSWR(
  //   shouldRefetch ? '/api/ingredients' : null,
  // );

  // useEffect(() => {
  //   if (data) {
  //     setSearchedData(data);
  //     setShowedData(data);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (search) {
  //     const filteredData = searchedData.filter((item) =>
  //       item.name.toLowerCase().includes(search.toLowerCase()),
  //     );
  //     setShowedData(filteredData);
  //   } else {
  //     setShowedData(searchedData);
  //   }
  // }, [search, searchedData]);

  return (
    <div
      style={{ minHeight: '35rem' }}
      className="relative flex flex-col w-full h-full text-left bg-white border border-gray-200 rounded-md"
    >
      <div className="flex flex-row items-center justify-between w-full px-6 py-3 text-xs border-b border-gray-200">
        <p>
          <strong>Ingredients</strong>
        </p>
      </div>
      <div className="w-full h-full p-4 grid grid-cols-2 gap-4">
        {ingredients.map((val, index) => (
          <IngredientProcessModal
            key={index}
            ingredient={val}
            selectedIngredient={selectedIngredient}
            setSelectedIngredient={setSelectedIngredient}
            showFormBuilder={showFormBuilder}
            setShowFormBuilder={setShowFormBuilder}
          />
        ))}
      </div>
    </div>
  );
};

export default function ProductTypes() {
  const [showCreateProductTypeModal, setShowCreateProductTypeModal] =
    useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [fetchData, setFetchData] = useState('template');
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const { ingredients, addIngredient } = useIngredient();

  const [showFormBuilder, setShowFormBuilder] = useState(null);

  console.log(showFormBuilder);

  return (
    <>
      <Head>
        <title>Ingredients | OBENS Dashboard</title>
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
              <strong>Ingredients</strong>
            </h1>
            <Breadcrumbs label="Ingredients" />
          </motion.div>

          <button
            onClick={() => setShowCreateProductTypeModal(true)}
            className="inline-flex items-start justify-start px-6 py-3 mt-4 rounded transition-all duration-300 sm:ml-3 sm:mt-0 bg-primary-600 hover:bg-primary-500 focus:outline-none shadow-primary-btn"
          >
            <p className="text-sm font-medium leading-none text-white">
              New Ingredient
            </p>
          </button>
        </div>

        {showFormBuilder === null ? (
          <section className="flex flex-row w-full mt-6 gap-6">
            <div className="flex flex-col items-start justify-start w-1/3 h-full gap-6">
              <IngredientsList
                // shouldRefetch={shouldRefetch}
                selectedIngredient={selectedIngredient}
                setSelectedIngredient={setSelectedIngredient}
                showFormBuilder={showFormBuilder}
                setShowFormBuilder={setShowFormBuilder}
                // setFetchData={setFetchData}
              />
            </div>
            <div
              className="flex flex-col items-start justify-start w-2/3 h-full col-span-2 gap-6"
              style={{ height: '100%' }}
            >
              <TraceabilityTemplateList
                fetchData={fetchData}
                ingredientData={selectedIngredient}
              />
            </div>
          </section>
        ) : (
          <FormBuilder
            setShowFormBuilder={setShowFormBuilder}
            showFormBuilder={showFormBuilder}
          />
        )}

        <div className="w-full h-16 spacer" />
        {showCreateProductTypeModal && (
          <CreateProductTypeModal
            isModalOpen={showCreateProductTypeModal}
            setIsModalOpen={setShowCreateProductTypeModal}
            onSuccess={(name: string) => {
              addIngredient(name);
              // setShouldRefetch(false);
              setShowCreateProductTypeModal(false);
            }}
          />
        )}
      </div>
    </>
  );
}

ProductTypes.Layout = DefaultLayout;

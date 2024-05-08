/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from 'react';

import ConfirmationModal from '@components/modals/ConfirmationModal';
import EditProductTypeModal from '@components/modals/EditProductTypeModal';
import CreateSupplyTemplateModal from '@components/modals/supply-mapping/admin/CreateSupplyTemplateModal';
import CreateProcessModalAdmin from '@components/modals/traceability/CreateProcessModalAdmin';
import OrderProcessModalAdmin from '@components/modals/traceability/OrderProcessModalAdmin';
import { useUI } from '@contexts/ui.context';
import { Menu, Transition } from '@headlessui/react';
import { Divider, Tooltip } from '@mui/material';
import { getToken } from '@utils/auth-token';
import classNames from 'classnames';
import { useRouter } from 'next/router';
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
// import useSWR from 'swr/immutable';

import ImageFallback from '@components/common/ImageFallback';
import { MenuItemButton } from '@components/inputs/MenuItemButton';

export default function IngredientsList({
  shouldRefetch,
  selectedIngredient,
  setSelectedIngredient,
  setFetchData,
}: {
  shouldRefetch: boolean;
  selectedIngredient: any;
  setSelectedIngredient: (ingredient: any) => void;
  setFetchData: any;
}) {
  const router = useRouter();
  const { hasAuthorization } = useUI();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isCreateProcessModalOpen, setIsCreateProcessModalOpen] =
    useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isModalSupplyOpen, setIsSupplyOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const menuItems = [
    {
      text: 'Create New Process',
      icon: <IoAddSharp className="w-4 h-4 mr-2" />,
      modal: setIsCreateProcessModalOpen,
    },
    {
      text: 'Create New Supply',
      icon: <IoAddSharp className="w-4 h-4 mr-2" />,
      modal: setIsSupplyOpen,
    },
    {
      text: 'Edit',
      icon: <IoPencilOutline className="w-4 h-4 mr-2" />,
      modal: setIsModalEditOpen,
    },
    {
      text: 'Delete',
      icon: <IoTrashOutline className="w-4 h-4 mr-2 text-red-500" />,
      modal: setIsDeleteModalOpen,
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

  // const { data, error, mutate } = useSWR(
  //   [
  //     hasAuthorization('Client')
  //       ? `${process.env.NEXT_PUBLIC_API_ORDER_ENDPOINT}/fetch/allowed/v2/products`
  //       : `${process.env.NEXT_PUBLIC_API_PRODUCT_ENDPOINT}/product_type`,
  //     getToken() || '',
  //   ],
  //   fetcher,
  //   {
  //     refreshInterval: 0,
  //   },
  // );
  // useEffect(() => {
  //   if (!error && data && data.length > 0) {
  //     setSelectedIngredient(data[0]);
  //   }
  // }, [data, error, setSelectedIngredient]);

  // useEffect(() => {
  //   if (shouldRefetch) {
  //     mutate();
  //     // console.count('refetch')
  //   }
  // }, [shouldRefetch, mutate]);

  return (
    <>
      <div
        style={{ minHeight: '35rem' }}
        className="relative flex flex-col w-full h-full text-left bg-white border border-gray-200 rounded-md"
      >
        <div className="flex flex-row items-center justify-between w-full px-6 py-3 text-xs border-b border-gray-200">
          <span className="font-semibold">Ingredients list</span>
        </div>
        <div className="w-full h-full p-4 grid grid-cols-2 gap-4">
          {/* {!error && !data && (
            <div className="w-full py-32 md:col-span-2 lg:col-span-3 xl:col-span-4">
              <AsyncLoading />
            </div>
          )} */}
          {!error &&
            Array.isArray(data) &&
            data.length > 0 &&
            data.map((ingredient: any, index: number) => (
              <>
                <div
                  key={index}
                  onClick={() => {
                    setSelectedIngredient(ingredient);
                    if (hasAuthorization('Client'))
                      return router.push(
                        '/suppliers/supplier-by-ingredient?id=' + ingredient.id,
                      );
                  }}
                  className={classNames(
                    ingredient.id === selectedIngredient?.id
                      ? 'border-primary-500 border-2 bg-gray-100'
                      : 'border-gray-200',
                    'relative flex flex-col items-center justify-start w-full bg-white border rounded-lg cursor-pointer group hover:bg-gray-100 transition-colors duration-150',
                  )}
                >
                  <ImageFallback
                    src={ingredient?.image?.url}
                    alt={ingredient.name}
                    className="object-cover w-full bg-white border-b border-gray-200 rounded-t-lg group-hover:bg-gray-100 transition-colors duration-150"
                    style={{ minHeight: '9rem', maxHeight: '9rem' }}
                  />
                  <div className="flex flex-col items-center justify-center w-full h-full px-1 py-3 leading-none text-center">
                    <p className="text-xs font-medium leading-none line-clamp-1">
                      {ingredient.name}
                    </p>
                  </div>

                  {hasAuthorization('Admin') && (
                    <div className="absolute w-full top-1">
                      <Menu
                        as="div"
                        className="relative inline-block w-full text-left"
                      >
                        <div className="flex flex-row justify-between w-full px-1 gap-1">
                          <Tooltip
                            title={
                              <p style={{ textAlign: 'center' }}>
                                Click to copy!
                                <br />
                                <strong>{ingredient?.id}</strong>
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
                                      setIsModalEditOpen={e?.modal || null}
                                      setModalData={setModalData}
                                      text={e.text}
                                      setFetchData={setFetchData || null}
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
              </>
            ))}
        </div>
      </div>

      {isModalEditOpen && (
        <EditProductTypeModal
          isModalOpen={isModalEditOpen}
          setIsModalOpen={setIsModalEditOpen}
          modalData={modalData}
          onSuccess={() => mutate()}
        />
      )}
      {isCreateProcessModalOpen && (
        <CreateProcessModalAdmin
          isModalOpen={isCreateProcessModalOpen}
          setIsModalOpen={setIsCreateProcessModalOpen}
          productTypeId={modalData?.id || ''}
          onSuccess={() => {}}
        />
      )}
      <OrderProcessModalAdmin
        setIsModalOpen={setIsProcessModalOpen}
        isModalOpen={isProcessModalOpen}
        modalData={modalData?.id || ''}
        onSuccess={() => {}}
      />
      {isModalSupplyOpen && (
        <CreateSupplyTemplateModal
          isModalOpen={isModalSupplyOpen}
          setIsModalOpen={setIsSupplyOpen}
          onSuccess={() => {}}
          id={modalData?.id}
        />
      )}
      {isDeleteModalOpen && (
        <>
          <ConfirmationModal
            type={'Danger'}
            isModalOpen={isDeleteModalOpen}
            setIsModalOpen={setIsDeleteModalOpen}
            title={'Delete ingredient'}
            message="Are you sure you want to delete this ingredient?"
            onConfirm={async () => {
              try {
                await fetch(
                  `${
                    process.env.NEXT_PUBLIC_API_PRODUCT_ENDPOINT
                  }/product_type/${modalData?.id || ''}`,
                  {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                      Authorization: 'Bearer ' + getToken(),
                    },
                  },
                );

                setIsDeleteModalOpen(false);
                mutate();
              } catch (error) {
                console.error(error);
              }
            }}
          />
        </>
      )}
    </>
  );
}

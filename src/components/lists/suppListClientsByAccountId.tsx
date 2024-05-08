/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import { Tooltip } from '@mui/material';
import cn from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { IoTrashOutline } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import CustomSelect from 'react-select';
import { useToasts } from 'react-toast-notifications';
import useSWR from 'swr/immutable';

import AsyncLoading from '@components/AsyncLoading';
import { Control, Option } from '@components/custom/select/CooperativeSelect';
import AddUserSupplierModal from '@components/modals/AddUserSupplierModal';
import BaseModalLayout from '@components/modals/BaseModalLayout';
import ConfirmationModal from '@components/modals/ConfirmationModal';
import CreateCoopModal from '@components/modals/CreateCoopModal';
import DeleteConfirmationModal from '@components/modals/DeleteConfirmationModal';
import { useUI } from '@contexts/ui.context';
import { getToken } from '@utils/auth-token';
import { fetcher } from '@utils/fetch.helper';

const AddProdToCoopModal = ({
  isModalOpen,
  setIsModalOpen,
  Products,
  coop,
  mutate,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  Products: any;
  coop: any;
  mutate: any;
}) => {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { control, handleSubmit, register } = useForm();

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_ACCOUNT_ENDPOINT}/corp/add-product/${coop?.id}/${selectedProduct?.value}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
          },
        },
      );

      if (resp.status === 200) {
        addToast(
          <>
            <p className="pb-2 text-sm font-normal text-gray-600">
              The new product has been created successfully.
            </p>
          </>,
          { appearance: 'success' },
        );
        mutate();
        setIsModalOpen(false);
      } else
        addToast(
          <>
            <p className="pb-2 text-sm font-normal text-gray-600">
              An error occurred while creating the product.
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

    setIsLoading(false);
  };

  return (
    <BaseModalLayout
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title="Add product to cooperative"
      description="Select a product to add to the cooperative"
      submitText="Add"
      onSubmit={handleSubmit(onSubmit)}
      loading={isLoading}
      SubmitDisabled={!selectedProduct}
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Controller
          control={control}
          name="value"
          render={({ field: { ref } }) => (
            <CustomSelect
              className="w-full"
              options={Products.filter(
                (val) =>
                  coop?.productIds?.find((v) => v === val.value) === undefined,
              )}
              ref={ref}
              id="Product-select"
              placeholder="Choose a product"
              value={selectedProduct}
              components={{ Option, Control }}
              // yeah..
              controlShouldRenderValue={true}
              onChange={(val: any) => {
                setSelectedProduct(val);
                // mutate();
              }}
            />
          )}
        />
      </div>
    </BaseModalLayout>
  );
};

export default function SuppListClientsByAccountId({
  ownerId,
  status,
  accountId,
  nbUsers,
  products,
  selectedProduct,
  showLinkedCoops = false,
  iscoopselected = false,
}: {
  ownerId: string;
  status: boolean;
  accountId: string;
  nbUsers: number;
  products?: any;
  selectedProduct: any;
  showLinkedCoops?: boolean;
  iscoopselected?: boolean;
}) {
  const { getUserData, hasAuthorization } = useUI();
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showCreateCoopModal, setShowCreateCoopModal] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserStatus, setSelectedUserStatus] = useState(false);
  const [selectedcoop, setSelectedcoop] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, error, mutate } = useSWR(
    [
      showLinkedCoops
        ? `${process.env.NEXT_PUBLIC_API_ACCOUNT_ENDPOINT}/corp/fetch/all/by/productId/${selectedProduct?.product_type_id}/${selectedProduct?.supplier_id}`
        : `${process.env.NEXT_PUBLIC_API_ACCOUNT_ENDPOINT}/users/${accountId}`,
      getToken() || '',
    ],
    fetcher,
  );
  return (
    <>
      <div className="w-full text-sm leading-none text-left text-gray-800 border-gray-200">
        <div className="w-full h-full">
          <div className="flex flex-col items-center justify-center w-full h-full pb-2">
            <header className="flex items-center w-full px-6 bg-white border-b border-gray-200">
              {/* {getUserData().id === ownerId && ( */}
              {((getUserData().id === ownerId && showLinkedCoops) ||
                hasAuthorization('Admin')) && (
                <div className="py-2 ml-auto">
                  <button
                    className="px-4 py-2 text-xs font-semibold leading-none text-blue-600 bg-transparent border border-blue-500 rounded transition-all duration-300 hover:bg-blue-500 hover:text-white hover:border-transparent shadow-sm-blue-btn"
                    onClick={() =>
                      showLinkedCoops
                        ? setShowCreateCoopModal(true)
                        : setShowAddUserModal(true)
                    }
                  >
                    {showLinkedCoops
                      ? 'Add a new cooperative'
                      : 'Add a new user'}
                  </button>
                </div>
              )}
            </header>

            {!error && !data && (
              <div
                style={{ minHeight: '20rem' }}
                className="flex w-full h-full m-auto"
              >
                <AsyncLoading />
              </div>
            )}

            {!error && data?.length > 0 && (
              <table className="min-w-full mb-auto bg-white">
                <thead>
                  <tr className="table-row w-full h-10  bg-white ">
                    {showLinkedCoops ? (
                      <th className="pl-12 text-sm font-semibold tracking-tight text-left text-gray-500  leading-4 whitespace-nowrap ">
                        Name
                      </th>
                    ) : (
                      <>
                        <th className="w-16 pl-6 text-sm font-semibold tracking-tight text-left text-gray-500 opacity-0 leading-4">
                          0
                        </th>
                      </>
                    )}
                    <th className="text-sm font-semibold tracking-tight text-left text-gray-500 max-w-10 leading-4 whitespace-nowrap">
                      Email
                    </th>
                    <th className="pr-10 text-sm font-semibold tracking-tight text-left text-gray-500 leading-4 whitespace-nowrap">
                      Creation date
                    </th>
                    {showLinkedCoops === false && (
                      <th className="w-24 pr-6 text-sm font-semibold tracking-tight text-left text-gray-500 leading-4 whitespace-nowrap">
                        Status
                      </th>
                    )}
                    {status &&
                      showLinkedCoops === false &&
                      getUserData().id === ownerId && (
                        <th className="text-sm font-semibold tracking-tight text-left text-gray-500 leading-4 whitespace-nowrap"></th>
                      )}
                  </tr>
                </thead>

                <tbody>
                  {data.map((item: any, index) => (
                    <tr
                      key={'suppliers-' + index}
                      className={cn(
                        'h-12 border-t hover:bg-gray-100 text-left ',
                      )}
                    >
                      {showLinkedCoops === false && (
                        <td className="pl-6 text-xs tracking-normal text-gray-800 leading-4">
                          {ownerId === item.user_id && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-yellow-400"
                              viewBox="0 0 512 512"
                            >
                              <path
                                d="M259.92 262.91L216.4 149.77a9 9 0 00-16.8 0l-43.52 113.14a9 9 0 01-5.17 5.17L37.77 311.6a9 9 0 000 16.8l113.14 43.52a9 9 0 015.17 5.17l43.52 113.14a9 9 0 0016.8 0l43.52-113.14a9 9 0 015.17-5.17l113.14-43.52a9 9 0 000-16.8l-113.14-43.52a9 9 0 01-5.17-5.17zM108 68L88 16 68 68 16 88l52 20 20 52 20-52 52-20-52-20zM426.67 117.33L400 48l-26.67 69.33L304 144l69.33 26.67L400 240l26.67-69.33L496 144l-69.33-26.67z"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"
                              />
                            </svg>
                          )}
                        </td>
                      )}
                      {showLinkedCoops && (
                        <td className="pl-12 text-xs tracking-normal text-gray-800 leading-4 md:whitespace-nowrap">
                          {item.name}
                        </td>
                      )}
                      <td className="w-64 pr-6 text-xs tracking-normal text-gray-80 leading-4 whitespace-nowrap">
                        {item.email ||
                          (item?.users?.length > 0
                            ? item.users[0].email
                            : item?.user?.email) ||
                          '-'}
                      </td>
                      <td className="w-40 pr-6 text-xs tracking-normal text-gray-800 leading-4 whitespace-nowrap">
                        {(item.created_at || item?.createdAt)?.split('T')[0]}
                      </td>
                      {showLinkedCoops === false && (
                        <td className="w-40 pr-6 text-xs tracking-normal text-gray-800 leading-4 whitespace-nowrap">
                          {item.status ? (
                            <span className="flex items-center justify-center w-full font-semibold leading-none text-green-500 bg-green-100 rounded-full py-1.5 text-[10px]">
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center justify-center w-full font-semibold leading-none text-red-500 bg-red-100 rounded-full py-1.5 text-[10px]">
                              Inactive
                            </span>
                          )}
                        </td>
                      )}

                      {showLinkedCoops === false && status && (
                        <td className="w-40 pr-6 text-xs tracking-normal leading-4 whitespace-nowrap">
                          {status &&
                            ((getUserData().id === ownerId &&
                              item.user_id !== ownerId) ||
                              hasAuthorization('Admin')) &&
                            (item.status ? (
                              <button
                                className="px-4 py-2 ml-3 text-xs font-semibold leading-none text-red-600 bg-transparent border border-red-500 rounded transition-all duration-300 hover:bg-red-500 hover:text-white hover:border-transparent shadow-sm-red-btn"
                                onClick={() => {
                                  setSelectedUserStatus(item.status);
                                  setSelectedUser(item.user_id);
                                }}
                              >
                                Disable user
                              </button>
                            ) : (
                              <button
                                className="px-4 py-2 ml-3 text-xs font-semibold leading-none bg-transparent border rounded transition-all duration-300 text-primary-600 border-primary-500 hover:bg-primary-500 hover:text-white hover:border-transparent shadow-sm-primary-btn"
                                onClick={() => {
                                  setSelectedUserStatus(item.status);
                                  setSelectedUser(item.user_id);
                                }}
                              >
                                Enable user
                              </button>
                            ))}
                        </td>
                      )}
                      {showLinkedCoops === true && hasAuthorization('Admin') && (
                        <td className="w-4 pr-4 text-xs tracking-normal leading-4 whitespace-nowrap">
                          <Tooltip title={'add product'} placement="top">
                            <button
                              onClick={() => {
                                setIsAddProductOpen(true);
                                setSelectedcoop(item);
                              }}
                              className="flex items-center justify-center w-6 h-6 rounded-full cursor-pointer hover:text-primary-600 transition-colors text-primary-600 duration-300 hover:bg-gray-200"
                            >
                              <MdAdd className="w-6 h-6 cursor-pointer text-primary-600" />
                            </button>
                          </Tooltip>
                        </td>
                      )}
                      {hasAuthorization('Client') === false && (
                        <td className="pr-3 tracking-normal w-7 leading-4 whitespace-nowrap">
                          <Tooltip title="Delete action">
                            <div className="text-red-400 rounded-full cursor-pointer p-1.5 transition-colors duration-300 hover:bg-red-50 hover:text-red-600">
                              <IoTrashOutline
                                className="w-5 h-5 "
                                onClick={() => {
                                  setIsDeleteModalOpen(true);
                                  setSelectedcoop(item);
                                }}
                              />
                            </div>
                          </Tooltip>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {!!selectedUser && (
        <ConfirmationModal
          type={selectedUserStatus ? 'Danger' : 'Info'}
          isModalOpen={!!selectedUser}
          setIsModalOpen={(val) => !val && setSelectedUser('')}
          title={selectedUserStatus ? 'Disable user' : 'Enable user'}
          message={
            selectedUserStatus
              ? 'Are you sure you want to disable this user?'
              : 'Are you sure you want to enable this user?'
          }
          onConfirm={async () => {
            try {
              await fetch(
                `${process.env.NEXT_PUBLIC_API_ACCOUNT_ENDPOINT}/status/user/${selectedUser}`,
                {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getToken(),
                  },
                },
              );

              mutate();
            } catch (error) {
              console.error(error);
            }
            setSelectedUser('');
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          title={'Deleting Action'}
          description="Are you sure you want to delete this action?"
          isLoading={isLoading}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={async () => {
            isLoading && setIsLoading(true);
            try {
              await fetch(
                `${process.env.NEXT_PUBLIC_API_ACCOUNT_ENDPOINT}/delete/${
                  showLinkedCoops ? 'coop' : 'user'
                }/${selectedcoop?.id || selectedcoop?.user_id}`,
                {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getToken() || '',
                  },
                },
              );
              setIsDeleteModalOpen(false);
              mutate();
            } catch (error) {
              console.error(error);
            }
            isLoading && setIsLoading(false);
          }}
        />
      )}
      {showAddUserModal && (
        <AddUserSupplierModal
          accountId={accountId}
          isModalOpen={showAddUserModal}
          setIsModalOpen={setShowAddUserModal}
          onSuccess={() => mutate()}
          iscoopselected={iscoopselected}
        />
      )}
      {showCreateCoopModal && (
        <CreateCoopModal
          isModalOpen={showCreateCoopModal}
          setIsModalOpen={setShowCreateCoopModal}
          selectedProduct={selectedProduct}
          onSuccess={() => mutate()}
          mutate_={() => {}}
        />
      )}
      {isAddProductOpen && (
        <AddProdToCoopModal
          isModalOpen={isAddProductOpen}
          setIsModalOpen={setIsAddProductOpen}
          Products={products}
          coop={selectedcoop}
          mutate={mutate}
        />
      )}
    </>
  );
}

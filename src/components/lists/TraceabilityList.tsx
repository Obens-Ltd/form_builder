/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';

import AdditionalProcessModalClient from '@components/modals/traceability/AdditionalProcessModalClient';
import DeleteProcessModal from '@components/modals/traceability/DeleteProcessModal';
import DetailProcessModal from '@components/modals/traceability/DetailProcessModal';
import EditProcessModal from '@components/modals/traceability/EditProcessModal';
import HarvestingModal from '@components/modals/traceability/HarvestingModal';
import RequestAdditionalModalClient from '@components/modals/traceability/RequestAdditionalModalClient';
import SortTraceabilityModal from '@components/modals/traceability/SortTraceabilityModal';
import { useUI } from '@contexts/ui.context';
import { IconButton, Tooltip } from '@mui/material';
import cn from 'classnames';
import {
  IoInformationCircleOutline,
  IoPencilOutline,
  IoReloadOutline,
  IoTrashBinOutline,
} from 'react-icons/io5';
import { VscSortPrecedence } from 'react-icons/vsc';

import AsyncLoading from '@components/AsyncLoading';
import CoopsTabs from '@components/common/CoopTabs';
import ImageFallback from '@components/common/ImageFallback';

export default function TraceabilityList({
  orderData,
  onRequestInfo,
  coopsIds,
}: {
  orderData: any;
  onRequestInfo?: () => void;
  coopsIds?: any;
}) {
  // const { hasAuthorization } = useUI();

  const [modalData, setModalData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [dataSelectedCoop, setDataSelectedCoop] = useState(null);

  const [selectedTab, setSelectedTab] = useState({
    id: 0,
    name: 'Batch traceability',
  });

  const [isSortTraceabilityModalOpen, setIsSortTraceabilityModalOpen] =
    useState(false);
  const [isRequestAdditionalModalOpen, setIsRequestAdditionalModalOpen] =
    useState(false);

  // const { data, error, mutate, isValidating } = useSWR(
  //   hasAuthorization('Corp') === false
  //     ? [
  //         `${process.env.NEXT_PUBLIC_API_TRACEABILITY_ENDPOINT}/values/fetch/by/order_id/${orderData?.id}`,
  //         getToken() || '',
  //       ]
  //     : null,
  //   fetcher,
  //   { revalidateOnFocus: true },
  // );
  // const {
  //   data: Suppdata,
  //   error: Supperror,
  //   mutate: SuppMutate,
  // } = useSWR(
  //   orderData
  //     ? [
  //         `${process.env.NEXT_PUBLIC_API_ACCOUNT_ENDPOINT}/supplier/fetch/all/by/ids`,
  //         getToken() || '',
  //         orderData?.supplier_id,
  //       ]
  //     : null,
  //   fetcherPostByIds,
  // );
  // const {
  //   data: coopsData,
  //   mutate: mutateCoops,
  //   error: coopsError,
  //   isValidating: coopsIsValidating,
  // } = useSWR(
  //   (selectedTab && selectedTab?.id !== 0) || hasAuthorization('Corp')
  //     ? [
  //         `${process.env.NEXT_PUBLIC_API_TRACEABILITY_ENDPOINT}/values/fetch/by/corpId/${selectedTab?.id}/${orderData?.id}`,
  //         getToken() || '',
  //       ]
  //     : null,
  //   fetcher,
  // );
  // useEffect(() => {
  //   if (!coopsError && !coopsIsValidating && coopsData) {
  //     setDataSelectedCoop(coopsData);
  //   }
  // }, [
  //   selectedTab?.id,
  //   orderData?.id,
  //   coopsError,
  //   coopsIsValidating,
  //   coopsData,
  // ]);
  return (
    <>
      <div
        style={{ minHeight: '40rem' }}
        className="relative flex flex-col w-full h-full overflow-hidden text-left bg-white border border-gray-200 col-span-2 rounded-md lg:rounded-l-none"
      >
        <div className="flex flex-row items-center justify-between w-full h-12 border-b border-gray-200">
          <CoopsTabs
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
          />
          <div className="flex justify-end">
            <div className="flex w-full px-2 py-1 gap-x-2">
              {hasAuthorization('Admin') === true && (
                <>
                  <Tooltip title="Sort">
                    <IconButton
                      onClick={() => setIsSortTraceabilityModalOpen(true)}
                    >
                      <VscSortPrecedence className="w-5 h-5 hover:text-primary-800 text-primary-500 -rotate-90" />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {hasAuthorization('Supplier') === false && (
                <Tooltip title="Additional informations">
                  <IconButton
                    onClick={() => setIsRequestAdditionalModalOpen(true)}
                  >
                    <IoInformationCircleOutline className="hover:text-primary-800 text-primary-500" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Refresh">
                <button
                  onClick={() => {
                    if (hasAuthorization('Corp') === false)
                      !isValidating && mutate();
                    else !coopsIsValidating && mutateCoops();
                  }}
                  className="flex flex-row items-center justify-center px-2 cursor-pointer transition-colors duration-150 text-primary-500 hover:text-primary-800"
                >
                  <IoReloadOutline
                    className={cn(
                      (isValidating || coopsIsValidating) &&
                        'animate-spin cursor-not-allowed',
                      'w-5 h-5',
                    )}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        {(isValidating || coopsIsValidating) && (
          <div className="py-20">
            <AsyncLoading />
          </div>
        )}

        {!isValidating && !coopsIsValidating && (
          <>
            {!error && selectedTab?.id === 0 && data && (
              <div className="w-full p-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {data
                  ?.sort((a, b) => a.num - b.num)
                  ?.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => {
                        setModalData(template);
                        setIsDetailsModalOpen(true);
                      }}
                      className="relative flex flex-col items-center justify-start w-full bg-white border border-gray-200 rounded-lg cursor-pointer transition-colors duration-150 group hover:bg-gray-100 traceability-list-item"
                    >
                      <ImageFallback
                        src={template?.trace_template?.image_url}
                        alt={template?.trace_template?.name}
                        className="object-contain w-full bg-white border-b border-gray-200 rounded-t-lg transition-colors duration-150 group-hover:bg-gray-100"
                        style={{ minHeight: '10rem', maxHeight: '10rem' }}
                      />
                      <div className="relative flex flex-col items-center justify-center w-full h-full leading-none text-center">
                        <div className="absolute -top-8 right-2">
                          {template?.status === 'IN_PROGRESS' && (
                            <div className="inline-flex justify-center w-full px-2 py-1 font-semibold text-white bg-yellow-500 rounded-lg text-[8px] focus:outline-none transition duration-300">
                              IN PROGRESS
                            </div>
                          )}
                          {template?.status === 'PLANNED' && (
                            <div className="inline-flex justify-center w-full px-2 py-1 font-semibold text-white bg-blue-500 rounded-lg text-[8px] focus:outline-none transition duration-300">
                              PLANNED
                            </div>
                          )}
                          {template?.status === 'COMPLETED' && (
                            <div className="inline-flex justify-center w-full px-2 py-1 font-semibold text-white rounded-lg bg-primary-500 text-[8px] focus:outline-none transition duration-300">
                              COMPLETED
                            </div>
                          )}
                        </div>

                        <p className="p-5 text-xs font-medium leading-none line-clamp-1">
                          {template?.trace_template?.name}
                        </p>
                      </div>

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalData(template);
                          setIsEditModalOpen(true);
                        }}
                        className="absolute top-2 right-2"
                      >
                        <div className="relative inline-block text-left">
                          {/* TODO: #API: CLIENT MUST NOT BE ABLE TO EDIT ... */}
                          {hasAuthorization('Client') == false && (
                            <div className="inline-flex justify-center w-full px-2 py-1 text-white bg-black transition duration-300 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none">
                              <IoPencilOutline className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                      {hasAuthorization('Client') === false && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalData(template);
                            setIsDeleteModalOpen(true);
                          }}
                          className="absolute top-10 right-2"
                        >
                          <div className="relative inline-block text-left">
                            <div className="inline-flex justify-center w-full px-2 py-1 text-white bg-black transition duration-300 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none">
                              <IoTrashBinOutline className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            <div className="w-full p-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {dataSelectedCoop && selectedTab && selectedTab.id !== 0 && (
                <HarvestingTemplate
                  orderId={orderData?.id}
                  coopId={selectedTab?.id?.toString()}
                />
              )}
              {dataSelectedCoop &&
                selectedTab?.id !== 0 &&
                dataSelectedCoop
                  ?.sort((a, b) => a.num - b.num)
                  ?.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => {
                        setModalData(template);
                        setIsDetailsModalOpen(true);
                      }}
                      className="relative flex flex-col items-center justify-start w-full bg-white border border-gray-200 rounded-lg cursor-pointer transition-colors duration-150 group hover:bg-gray-100 traceability-list-item"
                    >
                      <ImageFallback
                        src={template?.trace_template?.image_url}
                        alt={template?.trace_template?.name}
                        className="object-contain w-full bg-white border-b border-gray-200 rounded-t-lg transition-colors duration-150 group-hover:bg-gray-100"
                        style={{ minHeight: '10rem', maxHeight: '10rem' }}
                      />
                      <div className="relative flex flex-col items-center justify-center w-full h-full leading-none text-center">
                        <div className="absolute -top-8 right-2">
                          {template?.status === 'IN_PROGRESS' && (
                            <div className="inline-flex justify-center w-full px-2 py-1 font-semibold text-white bg-yellow-500 rounded-lg text-[8px] focus:outline-none transition duration-300">
                              IN PROGRESS
                            </div>
                          )}
                          {template?.status === 'PLANNED' && (
                            <div className="inline-flex justify-center w-full px-2 py-1 font-semibold text-white bg-blue-500 rounded-lg text-[8px] focus:outline-none transition duration-300">
                              PLANNED
                            </div>
                          )}
                          {template?.status === 'COMPLETED' && (
                            <div className="inline-flex justify-center w-full px-2 py-1 font-semibold text-white rounded-lg bg-primary-500 text-[8px] focus:outline-none transition duration-300">
                              COMPLETED
                            </div>
                          )}
                        </div>

                        <p className="p-5 text-xs font-medium leading-none line-clamp-1">
                          {template?.trace_template?.name}
                        </p>
                      </div>

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalData(template);
                          setIsEditModalOpen(true);
                        }}
                        className="absolute top-2 right-2"
                      >
                        <div className="relative inline-block text-left">
                          {/* TODO: #API: CLIENT MUST NOT BE ABLE TO EDIT ... */}
                          {hasAuthorization('Client') == false && (
                            <div className="inline-flex justify-center w-full px-2 py-1 text-white bg-black transition duration-300 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none">
                              <IoPencilOutline className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                      {hasAuthorization('Client') == false && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalData(template);
                            setIsDeleteModalOpen(true);
                          }}
                          className="absolute top-10 right-2"
                        >
                          <div className="relative inline-block text-left">
                            <div className="inline-flex justify-center w-full px-2 py-1 text-white bg-black transition duration-300 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none">
                              <IoTrashBinOutline className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>
      {isDetailsModalOpen && (
        <DetailProcessModal
          isModalOpen={isDetailsModalOpen}
          setIsModalOpen={setIsDetailsModalOpen}
          modalData={modalData}
          orderData={orderData}
        />
      )}

      {hasAuthorization('Client') === false && isEditModalOpen && (
        <EditProcessModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          modalData={modalData}
          onSuccess={() => mutate() && mutateCoops()}
        />
      )}
      {hasAuthorization('Client') === true && isEditModalOpen && (
        <AdditionalProcessModalClient
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          modalData={modalData}
          onSuccess={() => mutate() && mutateCoops()}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteProcessModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          modalData={modalData}
          onSuccess={() => mutate() && mutateCoops()}
        />
      )}

      {isRequestAdditionalModalOpen && (
        <RequestAdditionalModalClient
          orderData={orderData}
          isModalOpen={isRequestAdditionalModalOpen}
          setIsModalOpen={setIsRequestAdditionalModalOpen}
          onSuccess={onRequestInfo}
        />
      )}

      {isSortTraceabilityModalOpen && (
        <SortTraceabilityModal
          modalData={selectedTab?.id !== 0 ? dataSelectedCoop : data || []}
          isModalOpen={isSortTraceabilityModalOpen}
          setIsModalOpen={setIsSortTraceabilityModalOpen}
          onSuccess={() => mutate()}
          calledFrom={'TraceabilityList'}
        />
      )}

      <style global jsx>{`
        .traceability-list-item:last-child::before {
          display: none;
        }

        @media (min-width: 640px) and (max-width: 767px) {
          .traceability-list-item:nth-child(2n)::before {
            display: none;
          }
        }

        @media (min-width: 767px) and (max-width: 1279px) {
          .traceability-list-item:nth-child(3n)::before {
            display: none;
          }
        }

        @media (min-width: 1280px) {
          .traceability-list-item:nth-child(4n)::before {
            display: none;
          }
        }

        @media (max-width: 639px) {
          .traceability-list-item::before {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            border-top: 10px solid #03363d;
            border-bottom: 10px solid transparent;
            border-right: 10px solid transparent;
            border-left: 10px solid transparent;
            bottom: -29px;
          }
        }

        @media (min-width: 640px) {
          .traceability-list-item::before {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid transparent;
            border-left: 10px solid #03363d;
            right: -28px;
          }
        }
      `}</style>
    </>
  );
}

// This template is always shown first in the list
const HarvestingTemplate = (props: {
  orderId: string;
  coopId: string;
  status?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasAuthorization } = useUI();

  return (
    <div
      onClick={() => {
        setIsModalOpen(true);
      }}
      className="relative flex flex-col items-center justify-start w-full bg-white border border-gray-200 rounded-lg cursor-pointer transition-colors duration-150 group hover:bg-gray-100 traceability-list-item"
    >
      <ImageFallback
        src="https://res.cloudinary.com/ocp-tech-reversablecode/image/upload/v1639048864/obens/on9zvnfcyvhzgb9kgyih.png"
        alt={'Fruit crushing'}
        className="object-contain w-full bg-white border-b border-gray-200 rounded-t-lg transition-colors duration-150 group-hover:bg-gray-100"
        style={{ minHeight: '10rem', maxHeight: '10rem' }}
      />
      <div className="relative flex flex-col items-center justify-center w-full h-full leading-none text-center">
        <div className="absolute -top-8 right-2">
          {props?.status === 'IN_PROGRESS' && (
            <div className="inline-flex justify-center w-full px-2 py-1 font-semibold text-white bg-yellow-500 rounded-lg text-[8px] focus:outline-none transition duration-300">
              IN PROGRESS
            </div>
          )}
          {props?.status === 'PLANNED' && (
            <div className="inline-flex justify-center w-full px-2 py-1 font-semibold text-white bg-blue-500 rounded-lg text-[8px] focus:outline-none transition duration-300">
              PLANNED
            </div>
          )}
          {props?.status === 'COMPLETED' && (
            <div className="inline-flex justify-center w-full px-2 py-1 font-semibold text-white rounded-lg bg-primary-500 text-[8px] focus:outline-none transition duration-300">
              COMPLETED
            </div>
          )}
        </div>

        <p className="p-5 text-xs font-medium leading-none line-clamp-1">
          Harvest / Récolte
        </p>
      </div>
      {isModalOpen && (
        <HarvestingModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          orderId={props.orderId}
          coopId={props.coopId}
          // onSuccess={() => props.onSuccess()}
        />
      )}
    </div>
  );
};

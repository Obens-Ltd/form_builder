/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import {
  IoInformationCircleOutline,
  IoPencilOutline,
  IoTrashBinOutline,
} from 'react-icons/io5';
import { VscSortPrecedence } from 'react-icons/vsc';

import { RefreshButton } from '@components/buttons';
import ImageFallback from '@components/common/ImageFallback';
import ErrorLoadingHandle from '@components/error/ErrorLoadingHandle';
import AdditionalProcessModalClient from '@components/modals/traceability/AdditionalProcessModalClient';
import DeleteProcessModal from '@components/modals/traceability/DeleteProcessModal';
import DetailProcessModal from '@components/modals/traceability/DetailProcessModal';
import EditProcessModal from '@components/modals/traceability/EditProcessModal';
import SortTraceabilityModal from '@components/modals/traceability/SortTraceabilityModal';
import { useUI } from '@contexts/ui.context';

export default function TraceabilityList({
  selectedLot,
  setOpen,
  onRequestInfo,
  mutate,
  isValidating,
  error,
}: {
  selectedLot: any;
  onRequestInfo?: () => void;
  setOpen?: any;
  mutate?: any;
  isValidating?: any;
  error: any;
}) {
  const { hasAuthorization } = useUI();

  const [modalData, setModalData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [isSortTraceabilityModalOpen, setIsSortTraceabilityModalOpen] =
    useState(false);
  const [isRequestAdditionalModalOpen, setIsRequestAdditionalModalOpen] =
    useState(false);

  return (
    <>
      <div
        style={{ minHeight: '10rem' }}
        className="relative flex flex-col w-full h-full overflow-hidden text-left bg-white border border-gray-200 lg:rounded-l-none rounded-md col-span-2"
      >
        <div className="flex flex-row items-center justify-between w-full h-12 px-5 border-b border-gray-200">
          <h3 className="pt-4 pb-4 text-sm font-semibold leading-none text-heading">
            Harvest batch ref:{' '}
            {selectedLot?.ref || selectedLot?.id || 'No batch selected'}
          </h3>

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
              <RefreshButton
                onClick={() => !isValidating && mutate()}
                isLoading={isValidating}
              />
            </div>
          </div>
        </div>
        <ErrorLoadingHandle
          error={error}
          isLoading={isValidating}
          reload={mutate}
        >
          <div className="w-full p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedLot?.values
              ?.sort((a, b) => a.num - b.num)
              ?.map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    setModalData(template);
                    setIsDetailsModalOpen(true);
                  }}
                  className="relative flex flex-col items-center justify-start w-full bg-white border border-gray-200 rounded-lg cursor-pointer group hover:bg-gray-100 transition-colors duration-150 traceability-list-item"
                >
                  <ImageFallback
                    src={template?.trace_template?.image_url}
                    alt={template?.trace_template?.name}
                    className="object-contain w-full bg-white border-b border-gray-200 rounded-t-lg group-hover:bg-gray-100 transition-colors duration-150"
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
                      {hasAuthorization('Client') === false && (
                        <div className="inline-flex justify-center w-full px-2 py-1 text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none transition duration-300">
                          <IoPencilOutline className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                  {hasAuthorization('Admin') && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalData(template);
                        setIsDeleteModalOpen(true);
                      }}
                      className="absolute top-10 right-2"
                    >
                      <div className="relative inline-block text-left">
                        <div className="inline-flex justify-center w-full px-2 py-1 text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none transition duration-300">
                          <IoTrashBinOutline className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </ErrorLoadingHandle>
      </div>

      {hasAuthorization('Client') === false && isEditModalOpen && (
        <EditProcessModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          modalData={modalData}
          onSuccess={() => mutate()}
        />
      )}
      {hasAuthorization('Client') === true && isEditModalOpen && (
        <AdditionalProcessModalClient
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          modalData={modalData}
          onSuccess={() => mutate()}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteProcessModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          modalData={modalData}
          onSuccess={() => mutate()}
        />
      )}
      {isDetailsModalOpen && (
        <DetailProcessModal
          isModalOpen={isDetailsModalOpen}
          setIsModalOpen={setIsDetailsModalOpen}
          modalData={modalData}
          orderData={selectedLot}
        />
      )}
      {isSortTraceabilityModalOpen && (
        <SortTraceabilityModal
          modalData={selectedLot?.values || []}
          isModalOpen={isSortTraceabilityModalOpen}
          setIsModalOpen={setIsSortTraceabilityModalOpen}
          onSuccess={() => mutate()}
          calledFrom={'LotMappingList'}
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

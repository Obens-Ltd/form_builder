/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from 'react';

import DeleteQualityControlModal from '@components/modals/quality-control/DeleteQualityControlModal';
import DetailQualityControlModal from '@components/modals/quality-control/DetailQualityControlModal';
import EditQualityControlCompliancyModal from '@components/modals/quality-control/EditQualityControlCompliancyModal';
import EditQualityControlModal from '@components/modals/quality-control/EditQualityControlModal';
import RequestLabTestModalClient from '@components/modals/quality-control/RequestLabTestModalClient';
import { useUI } from '@contexts/ui.context';
import { getToken } from '@utils/auth-token';
import { fetcher } from '@utils/fetch.helper';
import cn from 'classnames';
import {
  IoBusinessOutline,
  IoDocumentAttachOutline,
  IoFlaskOutline,
  IoManOutline,
  IoPencilOutline,
  IoReloadOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import useSWR from 'swr/immutable';

import AsyncLoading from '@components/AsyncLoading';
import CoopsTabs from '@components/common/CoopTabs';
import ImageFallback from '@components/common/ImageFallback';

const QualityControlHashmap = {
  PHYSICO_CHEMICAL: 'physico-chemical',
  MICROBIOLOGICAL: 'microbiological',
  CONTAMINANTS: 'contaminants',
  BIOLOGICAL: 'biological',
  ORGANOLEPTIC: 'organoleptic',
  ADDITIONAL: 'Additional request',
};

const QualityControlImages = {
  PHYSICO_CHEMICAL: '/assets/images/quality-control/physico-chemical.png',
  MICROBIOLOGICAL: '/assets/images/quality-control/microbiological.png',
  CONTAMINANTS: '/assets/images/quality-control/contaminants.png',
  BIOLOGICAL: '/assets/images/quality-control/biological.png',
  ORGANOLEPTIC: '/assets/images/quality-control/organoleptic.png',
  ADDITIONAL: '/assets/images/quality-control/additional-request.png',
};

function QualityControlSection({
  data,
  name,
  orderData,
  setModalData,
  setIsModalOpen,
  refetch,
  isFirst = false,
}: {
  data: any[];
  name: string;
  orderData: any;
  setModalData: (x: any) => void;
  setIsModalOpen: (x: boolean) => void;
  refetch: () => void;
  isFirst?: boolean;
}) {
  const { hasAuthorization, getAccountData } = useUI();

  const [modalDataState, setModalDataState] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompliancyEditModalOpen, setIsCompliancyEditModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isAuthorizedToEdit = (quality: any) => {
    if (hasAuthorization('Admin')) return true;
    return quality?.created_by && getAccountData().id === quality?.created_by;
  };

  if (!data || !data.length) return null;
  // const list = [...data].sort(
  //   (a, b) => Date.parse(a?.created_at) - Date.parse(b?.created_at),
  // );
  return (
    <>
      <div
        className={cn(
          isFirst === false && 'border-t border-gray-200',
          'flex flex-row items-center justify-between w-full px-6 py-3 text-xs capitalize',
        )}
      >
        {QualityControlHashmap[name]}
      </div>

      <ul className="flex flex-col w-full border-t border-gray-200">
        {data?.map((qualityControl, index) => (
          <li
            key={'quality-control-' + name + '-' + qualityControl.id}
            onClick={() => {
              setModalData(qualityControl);
              setIsModalOpen(true);
            }}
            className={cn(
              index !== data.length - 1 && 'border-b',
              'flex flex-col px-6 py-4 select-none transition duration-300 hover:bg-gray-50',
            )}
          >
            <div className="flex items-center flex-1">
              <ImageFallback
                src={QualityControlImages[name]}
                alt={QualityControlHashmap[name]}
                className="mr-4 rounded-md w-14 h-14"
              />
              <div className="flex flex-col w-full py-2">
                <div className="flex flex-row h-14">
                  <div className="flex-1 pl-1 mr-8">
                    <div className="mb-1 text-sm font-medium">
                      <span className="line-clamp-1">
                        {qualityControl.name || '- Untitled -'}
                      </span>
                    </div>
                    <div className="mb-1 text-xs font-semibold text-yellow-400">
                      <span className="line-clamp-1">
                        <IoFlaskOutline className="inline-block mr-1 text-base text-gray-700 pb-0.5" />
                        {qualityControl.test}
                      </span>
                    </div>
                    <div className="flex flex-row items-center justify-start text-xs font-medium leading-none text-blue-500 gap-2">
                      <span className="line-clamp-1">
                        <IoManOutline className="inline-block mr-1 text-base text-gray-700 pb-0.5" />
                        {qualityControl.person_on_charge || '- No Performer -'}
                      </span>
                      <span className="line-clamp-1">
                        <IoBusinessOutline className="inline-block mr-1 text-base text-gray-700 pb-0.5" />
                        {qualityControl.laboratory || '- No Laboratory -'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="pr-2 h-ful">
                      {/*status could be null, thus it must be explicitly set true or false to show it*/}
                      {qualityControl?.analysis_lab_report?.status === true && (
                        <p className="text-sm font-semibold text-primary-600 pt-0.5">
                          PASS
                        </p>
                      )}
                      {qualityControl?.analysis_lab_report?.status ===
                        false && (
                        <p className="text-sm font-semibold text-red-600 pt-0.5">
                          FAIL
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div>
                        {qualityControl?.annual_test && (
                          <div
                            id="alert-1"
                            className="flex items-center px-2 py-1 mb-1 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                            role="alert"
                          >
                            <svg
                              className="flex-shrink-0 w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div className="ml-3 text-xs font-medium">
                              Anuual Test - All lots{' '}
                            </div>
                          </div>
                        )}
                        {!qualityControl?.annual_test && (
                          <div
                            id="alert-3"
                            className="flex items-center px-2 py-1 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                            role="alert"
                          >
                            <svg
                              className="flex-shrink-0 w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div className="ml-3 text-xs font-medium">
                              Specific to this lot{' '}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-row pt-1 gap-1">
                        {qualityControl?.analysis_lab_report?.url && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(
                                qualityControl?.analysis_lab_report?.url,
                                '_blank',
                              );
                            }}
                            className="p-2 text-lg font-semibold text-gray-600 rounded-full outline-none cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                          >
                            <IoDocumentAttachOutline className="m-0 text-blue-900" />
                          </div>
                        )}

                        {hasAuthorization('Client') === true && (
                          <button
                            className="p-2 text-lg font-semibold text-gray-600 rounded-full outline-none cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalDataState(qualityControl);
                              if (isAuthorizedToEdit(qualityControl))
                                setIsEditModalOpen(true);
                              // If I am a client and the test is created by supplier,
                              // I still be able to edit the test's compliancy (PASS/FAIL)
                              else setIsCompliancyEditModalOpen(true);
                            }}
                          >
                            <IoPencilOutline className="m-0 text-primary-500" />
                          </button>
                        )}

                        {hasAuthorization('Client') === false &&
                          isAuthorizedToEdit(qualityControl) && (
                            <button
                              className="p-2 text-lg font-semibold text-gray-600 rounded-full outline-none cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalDataState(qualityControl);
                                setIsEditModalOpen(true);
                              }}
                            >
                              <IoPencilOutline className="m-0 text-primary-500" />
                            </button>
                          )}

                        {isAuthorizedToEdit(qualityControl) && (
                          <button
                            className="p-2 text-lg font-semibold text-red-400 rounded-full outline-none cursor-pointer hover:bg-gray-200 transition-colors duration-200 hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalDataState(qualityControl);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <IoTrashOutline className="m-0" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
        {!data?.length && (
          <div className="flex items-center justify-center w-full py-4 text-xs border-b">
            <span className="text-gray-500">
              No {QualityControlHashmap[name]} registers found
            </span>
          </div>
        )}
      </ul>

      {hasAuthorization('Corp') == false && isEditModalOpen && (
        <EditQualityControlModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          modalData={modalDataState}
          onSuccess={refetch}
        />
      )}
      {isCompliancyEditModalOpen && (
        <EditQualityControlCompliancyModal
          isModalOpen={isCompliancyEditModalOpen}
          setIsModalOpen={setIsCompliancyEditModalOpen}
          modalData={modalDataState}
          onSuccess={refetch}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteQualityControlModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          modalData={modalDataState}
          onSuccess={refetch}
        />
      )}
    </>
  );
}

function AdditionalRequestSection({
  orderData,
  refetch,
}: {
  orderData: any;
  refetch: () => void;
}) {
  const [isRequestLabTestModalOpen, setIsRequestLabTestModalOpen] =
    useState(false);

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full px-6 py-3 text-xs border-gray-200">
        <div className="flex flex-row w-full">Need additional lab test?</div>
        <button
          onClick={() => setIsRequestLabTestModalOpen(true)}
          className="inline-flex items-start justify-start px-6 py-2 mt-4 text-blue-600 border border-blue-600 rounded transition-all duration-300 sm:ml-3 sm:mt-0 hover:border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none shadow-blue-btn"
        >
          <p className="text-sm font-medium leading-none whitespace-nowrap">
            Request a lab test
          </p>
        </button>
      </div>

      {isRequestLabTestModalOpen && (
        <RequestLabTestModalClient
          orderData={orderData}
          isModalOpen={isRequestLabTestModalOpen}
          setIsModalOpen={setIsRequestLabTestModalOpen}
          onSuccess={refetch}
        />
      )}
    </>
  );
}

export default function QualityControlList({
  orderData,
  selectedTab,
  setSelectedTab,
}: {
  orderData: any;
  onRequestLab?: () => void;
  selectedTab?: any;
  setSelectedTab?: any;
}) {
  const { hasAuthorization } = useUI();

  const [dataSelectedCoop, setDataSelectedCoop] = useState(null);
  const [modalData, setModalData] = useState({});
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { getAccountData } = useUI();
  const [finalData, setFinalData] = useState([]);
  const [annualTests, setAnnualTests] = useState([]);
  const [astate, setAstate] = useState(false);
  const { data, mutate, isValidating } = useSWR(
    [
      selectedTab?.id === 0
        ? `${process.env.NEXT_PUBLIC_API_QUALITY_ENDPOINT}/fetch/by/order/volet/${orderData?.id}`
        : `${process.env.NEXT_PUBLIC_API_QUALITY_ENDPOINT}/fetch/by/order/volet/${orderData?.id}?corpId=${selectedTab?.id}`,
      getToken() || '',
    ],
    fetcher,
  );

  const { mutate: mutateLabs } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_API_QUALITY_ENDPOINT}/request/fetch/all/by/jwt/${orderData?.id}`,
      getToken() || '',
    ],
    fetcher,
  );
  const { data: annualdata, mutate: annualmutate } = useSWR(
    [
      selectedTab?.id === 0
        ? `${process.env.NEXT_PUBLIC_API_QUALITY_ENDPOINT}/yearly/${orderData?.id}`
        : `${process.env.NEXT_PUBLIC_API_QUALITY_ENDPOINT}/yearly/${orderData?.id}?corpId=${selectedTab?.id}`,
      getToken() || '',
    ],
    fetcher,
  );

  useEffect(() => {
    if (annualdata) setAnnualTests(annualdata);
  }, [data, annualdata, orderData?.id]);
  useEffect(() => {
    mutate();
    annualmutate();
  }, [orderData?.id]);
  const insert = useCallback((arr, dest): Promise<any> => {
    return new Promise((resolve) => {
      const ar = arr.forEach((t) => {
        if (dest?.filter((s) => s?.id == t?.id).length == 0) dest?.push(t);
      });
      resolve(ar);
    });
  }, []);
  useEffect(() => {
    const dt = [];
    if (data)
      insert(data, dt)
        .then((r) => {
          if (annualTests) return insert(annualTests, dt);
          return Promise.resolve(r);
        })
        .then((s) => {
          setFinalData(dt);
        });
  }, [data, annualTests, insert]);
  return (
    <>
      <div
        style={{ minHeight: '40rem' }}
        className="relative flex flex-col w-full h-full overflow-hidden text-left bg-white border border-gray-200 col-span-2 rounded-md lg:rounded-l-none"
      >
        <div className="flex flex-row items-center justify-between w-full h-12 pr-5 border-b border-gray-200">
          <CoopsTabs
            coopsIds={orderData?.corps_ids}
            coopsLotsNumbers={orderData?.lot_numbers}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
            setDataSelectedCoop={setDataSelectedCoop}
            defaultTab={orderData?.supplier_data?.name}
          />

          <div
            onClick={() => !isValidating && mutate() && annualmutate()}
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

        {hasAuthorization('Supplier') === false && (
          <AdditionalRequestSection
            orderData={orderData}
            refetch={() => mutateLabs()}
          />
        )}

        {isValidating && (
          <div style={{ minHeight: '40rem' }} className="flex w-full m-auto">
            <AsyncLoading />
          </div>
        )}
        {!isValidating && (
          <>
            <QualityControlSection
              name="PHYSICO_CHEMICAL"
              data={finalData?.filter((e) => e.volet === 'PHYSICO_CHEMICAL')}
              orderData={orderData}
              setModalData={setModalData}
              setIsModalOpen={setIsDetailsModalOpen}
              refetch={() => mutate && mutate()}
              isFirst={hasAuthorization('Supplier')}
            />
            <QualityControlSection
              name="MICROBIOLOGICAL"
              data={finalData?.filter((e) => e.volet === 'MICROBIOLOGICAL')}
              orderData={orderData}
              setModalData={setModalData}
              setIsModalOpen={setIsDetailsModalOpen}
              refetch={() => mutate && mutate()}
            />
            <QualityControlSection
              name="CONTAMINANTS"
              data={finalData?.filter((e) => e.volet === 'CONTAMINANTS')}
              orderData={orderData}
              setModalData={setModalData}
              setIsModalOpen={setIsDetailsModalOpen}
              refetch={() => mutate && mutate()}
            />
            <QualityControlSection
              name="BIOLOGICAL"
              data={finalData?.filter((e) => e.volet === 'BIOLOGICAL')}
              orderData={orderData}
              setModalData={setModalData}
              setIsModalOpen={setIsDetailsModalOpen}
              refetch={() => mutate && mutate()}
            />
            <QualityControlSection
              name="ORGANOLEPTIC"
              data={finalData?.filter((e) => e.volet === 'ORGANOLEPTIC')}
              orderData={orderData}
              setModalData={setModalData}
              setIsModalOpen={setIsDetailsModalOpen}
              refetch={() => mutate && mutate()}
            />
          </>
        )}
      </div>
      {isDetailsModalOpen && (
        <DetailQualityControlModal
          isModalOpen={isDetailsModalOpen}
          setIsModalOpen={setIsDetailsModalOpen}
          modalData={modalData}
          orderData={orderData}
        />
      )}
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';

/* eslint-disable @next/next/no-img-element */

import { Avatar } from '@mui/material';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { AiFillFilter, AiOutlineFilter } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import { FiNavigation } from 'react-icons/fi';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiOutlineChevronUp } from 'react-icons/hi';
import { IoIosSearch } from 'react-icons/io';
import { IoReloadOutline } from 'react-icons/io5';
import { IoListOutline } from 'react-icons/io5';
import { PiClockCountdown } from 'react-icons/pi';
import useSWR from 'swr/immutable';

import AsyncLoading from '@components/AsyncLoading';
import EmptyState from '@components/custom/EmptyState';
import ProductTypeSelectRequest from '@components/custom/select/ProductTypeSelectRequest';
import SelectInput from '@components/inputs/SelectInput';
import CreateSupplyTemplateModal from '@components/modals/supply-mapping/admin/CreateSupplyTemplateModal';
import { useUI } from '@contexts/ui.context';
import { getToken } from '@utils/auth-token';
import { fetcher } from '@utils/fetch.helper';
const staticData = {
  supplier: {
    Type: 'Supplier',
    name: 'Gie Targanine',
    coord: {
      lat: 30.4116535,
      lng: -9.5867144,
    },
    childs: [
      {
        Type: 'Cooperative',
        name: 'Coopérative TAGMATE',
        coord: {
          lat: 30.771959,
          lng: -9.5659027,
        },
        childs: [
          {
            Type: 'collector',
            name: 'Collecteur TAGMATE',
            coord: {
              lat: 30.771959,
              lng: -9.5659027,
            },
            childs: [{}],
          },
          {
            Type: 'collector',
            name: 'Collecteur TOUDARTE',
            childs: [{}],
            coord: {
              lat: 30.847112,
              lng: -9.737556,
            },
          },
          {
            Type: 'collector',
            name: 'Collecteur TARGANTE',
            coord: {
              lat: 30.0684339,
              lng: -9.1530053,
            },
            childs: [{}],
          },
        ],
      },
      {
        Type: 'Cooperative',
        name: 'Coopérative TOUDARTE',
        coord: {
          lat: 30.847112,
          lng: -9.737556,
        },

        childs: [
          {
            Type: 'collector',
            name: 'Collecteur TAGMATE',
            childs: [{}],
            coord: {
              lat: 30.771959,
              lng: -9.5659027,
            },
          },
          {
            Type: 'collector',
            name: 'Collecteur TOUDARTE',
            childs: [{}],
            coord: {
              lat: 30.847112,
              lng: -9.737556,
            },
          },
          {
            Type: 'collector',
            name: 'Collecteur TARGANTE',
            coord: {
              lat: 30.0684339,
              lng: -9.1530053,
            },
            childs: [{}],
          },
        ],
      },
      {
        Type: 'Cooperative',
        name: 'Coopérative TARGANTE',
        coord: {
          lat: 30.0684339,
          lng: -9.1530053,
        },
        childs: [
          {
            Type: 'collector',
            name: 'Collecteur TAGMATE',
            childs: [{}],
            coord: {
              lat: 30.771959,
              lng: -9.5659027,
            },
          },
          {
            Type: 'collector',
            name: 'Collecteur TOUDARTE',
            childs: [{}],
            coord: {
              lat: 30.847112,
              lng: -9.737556,
            },
          },
          {
            Type: 'collector',
            name: 'Collecteur TARGANTE',
            coord: {
              lat: 30.0684339,
              lng: -9.1530053,
            },
            childs: [{}],
          },
        ],
      },
    ],
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
    height: '10.5rem',
    paddingTop: '1rem',
    paddingBottom: '1.2rem',
    borderBottomWidth: '1px',
    borderColor: 'e5e7eb',
    transitionEnd: {
      overflow: 'visible',
    },
  },
};

const color = {
  Cooperative: `text-[#ac0808]`,
  collector: `text-[#085a6d]`,
};
const levels = {
  Client: `bg-[#1e3a8a] text-white text-[0.6rem]  font-medium mr-2 sm:px-1.5 xl:px-1.5  sm:py-0.5  rounded  text-white`,
  SubClient: `bg-[#1f2937] text-white text-[0.6rem]  font-medium mr-2 sm:px-1.5 xl:px-1.5  sm:py-0.5  rounded text-white`,
  Supplier: `bg-[#6b7280] text-white text-[0.6rem]  font-medium mr-2 sm:px-1.5 xl:px-1.5  sm:py-0.5  rounded text-white`,
  COOP: `bg-red-100 text-white text-[0.6rem]  font-medium mr-2 sm:px-1.5 xl:px-1.5  sm:py-0.5  rounded bg-red-900 text-white`,
  COLLECTOR: `bg-blue-100 text-white text-[0.6rem]  font-medium mr-2 sm:px-1.5 xl:px-1.5 sm:py-0.5  rounded bg-[#085a6d] text-white`,
};
function SubLink({
  key,
  pad,
  order,
  data,
  setLatitude,
  setZoom,
  level,
  setMouseIn,
  setZoomOn,
  zoomOn,
  setLongtitude,
  setInfoData,
  SupplyMappingData,
}: {
  key?: any;
  pad: Number;
  order: any;
  data: any;
  setZoom: any;
  setMouseIn: any;
  setZoomOn: any;
  level: number;
  zoomOn: any;
  setLatitude: any;
  setLongtitude: any;
  setInfoData: any;
  SupplyMappingData: any;
}) {
  const { hasAuthorization } = useUI();
  const [marging, setMarging] = useState(pad + 2);
  const [marging1, setMarging1] = useState(Math.floor(pad + 2));
  const [expansionState, setExpansionState] = useState([]); // Use an array to track expansion state
  const [myMap, setMyMap] = useState(new Map());
  const [dataToExpand, setDataToExpand] = useState([]);
  let nested: Array<Boolean>;
  const updateMap = (k, v) => {
    setMyMap(myMap.set(k, v));
  };
  const toggleData = (element, index) => {
    // Clone the expansionState array and toggle the state for the clicked element
    const data = [...dataToExpand];
    if (element) {
      data[index] = element;
    } else data[index] = null;
    setDataToExpand(data);
  };
  const toggleExpansion = (index) => {
    // Clone the expansionState array and toggle the state for the clicked element
    const newExpansionState = [...expansionState];
    if (newExpansionState[index] != true) {
      newExpansionState[index] = true;
    } else newExpansionState[index] = false;
    setExpansionState(newExpansionState);
  };
  return (
    <div key={key} className="flex flex-col justify-center mb-1">
      <div className=" self-center w-[90%]">
        <div className="w-full bg-black h-[1px] bg-opacity-10" />
      </div>{' '}
      <div></div>
      {SupplyMappingData?.children?.length > 0 &&
        SupplyMappingData?.children?.map((element, index) => (
          <div
            key={index}
            className="flex flex-col justify-center mt-1 text-xs font-normal"
          >
            <div
              className={cn(
                `self-center w-[90%]`,
                expansionState[index] ? 'mb-1' : '',
              )}
            >
              <div
                className={`${
                  marging !== 0 ? `ml-${marging1}` : ''
                } flex justify-between flex-row content-center py-0.5 `}
              >
                <div
                  onClick={(e) => {
                    setZoomOn(false);
                  }}
                  className="flex flex-row content-center"
                >
                  <div className={`${marging !== 0 ? `ml-${marging1}` : ''}`}>
                    <img
                      src="/assets/images/line.png"
                      height="30rem"
                      width="25rem"
                      alt="ssss"
                    />
                  </div>
                  <div
                    className="flex flex-row items-center ml-2 "
                    onClick={(e) => {
                      e.preventDefault();
                      setInfoData(element);

                      toggleData(element, index);
                      toggleExpansion(index);
                    }}
                  >
                    <span className={`${levels[element.type]}`}>
                      Niv.{level}
                    </span>{' '}
                    <div className="flex flex-col">
                      {(hasAuthorization('Client') ||
                        hasAuthorization('SubClient')) &&
                      element.type == 'COLLECTOR' ? (
                        <h1 className={cn(`font-semibold sm:text-[10px] `)}>
                          {element.data['REF']}
                        </h1>
                      ) : (
                        <h1 className={cn(`font-semibold sm:text-[10px] `)}>
                          {element.name}
                        </h1>
                      )}

                      {element.type == 'COLLECTOR' && (
                        <h1 className={cn(`font-medium  sm:text-[10px] `)}>
                          {element.data ? element.data['lot-ref'] : '-'}
                        </h1>
                      )}
                      {element.type == 'COOP' && order?.lot_numbers && (
                        <h1 className={cn(`font-medium  sm:text-[10px] `)}>
                          {order?.lot_numbers[element.data._id] || '-'}
                        </h1>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row  gap-x-1 text-gray place-self-center">
                  <FiNavigation
                    color="#283739"
                    onClick={() => {
                      setInfoData(element);
                      if (element?.type == 'COLLECTOR') {
                        setLongtitude(element?.coordinates?.latitude || 0);
                        setLatitude(element?.coordinates?.longitude || 0);
                      } else {
                        setLongtitude(element?.coordinates?.longitude || 0);
                        setLatitude(element?.coordinates?.latitude || 0);
                      }
                      setZoomOn(true);
                      setZoom(11);
                    }}
                    className="sm:w-3 sm:h-3"
                  />
                  {expansionState[index] == true ? (
                    <FiChevronUp
                      color="#283739"
                      className=" ml-1 sm:w-3 sm:h-3"
                    />
                  ) : (
                    <FiChevronDown
                      color="#283739"
                      className=" ml-1 sm:w-3 sm:h-3"
                    />
                  )}
                </div>
              </div>
            </div>
            {expansionState[index] == true && dataToExpand[index] && (
              <SubLink
                pad={marging + 1}
                order={order}
                data={element}
                level={level}
                zoomOn={zoomOn}
                setZoom={setZoom}
                setMouseIn={setMouseIn}
                setZoomOn={setZoomOn}
                setLatitude={setLatitude}
                setLongtitude={setLongtitude}
                setInfoData={setInfoData}
                SupplyMappingData={dataToExpand[index]}
              />
            )}
          </div>
        ))}
    </div>
  );
}

function LinkHelper({
  order,
  setOrderData,
  setOrderId,
  mousein,
  zoomOn,
  listRef,
  selectedOrderData,
  isAlerts,
  setModalData,
  setMouseIn,
  setZoomOn,
  setZoom,
  expansionState,
  setExpansionState,
  setLatitude,
  setLongtitude,
  setInfoData,
  SupplyMappingData,
  setIsModalAddOpen,
  isLoading,
  setIsLoading,
  index,
  numLivraison,
  setNumLivraison,
  setIndex,
  isOrdersListVisible,
}) {
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  let end = [6.26, 48.7036];
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);

  const [opensub, setOpenSub] = useState(false);
  const [myMap, setMyMap] = useState(new Map());

  const [level, setLevel] = useState(0);
  const [marging, setMarging] = useState(0);
  const [harvestRef, setHarvestRef] = useState([]);
  const { hasAuthorization } = useUI();
  const updateMap = (k, v) => {
    setMyMap(myMap.set(k, v));
  };
  useEffect(() => {
    hasAuthorization('SubClient') &&
      SupplyMappingData[0]?.children &&
      SupplyMappingData[0]?.children[1].children?.map((elem) => {
        if (elem.type == 'SUB_CLIENT') {
          let expamliv = [];
          if (numLivraison) expamliv = [...numLivraison];
          if (!expamliv[index]) {
            expamliv[index] = [elem.data?.deliveryReceiptLot];
            setNumLivraison(expamliv);
          }
        }
        // updateMap(index, elem.data?.deliveryReceiptLot);
      });
    if (
      SupplyMappingData &&
      SupplyMappingData[0]?.children &&
      SupplyMappingData[0]?.children.length > 0
    ) {
      setMarging(4);
      setLevel(4);
    } else if (
      SupplyMappingData &&
      SupplyMappingData[0]?.children &&
      SupplyMappingData[0]?.children[1]
    ) {
      setMarging(2);
      setLevel(3);
    } else {
      setMarging(0);
      setLevel(2);
    }
  }, [SupplyMappingData]);
  useEffect(() => {
    setOrderData(order);
  }, [order]);

  useEffect(() => {
    if (isLoading[index] && open1) {
      let newExpansionState = [];

      if (expansionState) newExpansionState = [...expansionState];
      if (newExpansionState[index] == true) {
        newExpansionState[index] = false;
        setExpansionState(newExpansionState);
      } else {
        const newArray = newExpansionState.map(() => false);
        newArray[index] = true;
        setExpansionState(newArray);
      }
    }
  }, [isLoading, SupplyMappingData, open1]);
  return (
    <div className="flex flex-col">
      {!isOrdersListVisible && expansionState[index] && (
        <div className="w-full h-8 px-5 text-left shadow-md bg-opacity-70 bg-[#228896]">
          <h3 className="font-semibold leading-none text-white   sm:pt-2 sm:pb-2 justify-self-center sm:text-xs ">
            {order?.order}{' '}
          </h3>
        </div>
      )}
      {isOrdersListVisible && (
        <li
          key={index}
          onClick={() => {
            setIndex(index);
            if (expansionState && expansionState[index] == false) {
              setOrderData(order);
              setOrderId(order.id);
            }
            let newLoadingState = [];

            if (isLoading) {
              newLoadingState = [...isLoading];

              const newArray = newLoadingState.map(() => false);
              newArray[index] = true;
              setIsLoading(newArray);
            } else {
              let newLoadingState = [];
              newLoadingState[index] = true;
              setIsLoading(newLoadingState);
            }
            setOpen1(!open);
          }}
          className={cn(
            selectedOrderData?.id == order?.id &&
              'bg-opacity-5' + (index !== 0 && 'border-t border-black'),
            'flex flex-col px-6 xl:py-2 lg:py-1 select-none transition lg:my my-1 mx-2 mr-2 bg-[#228896] bg-opacity-5 text-mapsecond  duration-300 w-full hover:bg-whiteping hover:border  hover:bg-opacity-30',
          )}
        >
          <div
            key={index}
            className="flex flex-row  items-center content-center  w-full  "
          >
            <div className="">
              {order?.stage === 'DELIVERED' && (
                <BsBoxSeam color=" #228896" className=" lg:w-4 lg:h-4" />
              )}
              {order?.stage === 'IN_PROGRESS' && (
                <PiClockCountdown color=" #228896" className=" lg:w-5 lg:h-5" />
              )}
            </div>

            <div key={index} className="flex w-full pl-1 mr-8 align-center">
              <div
                key={index}
                className="self-center ml-2 font-semibold sm:text-[10px] xl:text-xs text-mapsecond"
              >
                <span className="w-full line-clamp-1">
                  {order?.order || order.product_type_id || 'Unknown product'}
                </span>
              </div>

              {isAlerts && (
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  src={order?.product?.image?.url}
                  alt={order?.product?.name || ''}
                  className="w-8 h-8 border border-gray-200 rounded-md"
                />
              )}
            </div>
          </div>
        </li>
      )}

      {isLoading[index] ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <AsyncLoading />
        </div>
      ) : (
        <>
          {expansionState[index] && !isLoading[index] && (
            <div className=" bg-black  bg-opacity-10 ">
              {SupplyMappingData &&
                SupplyMappingData[0]?.children &&
                SupplyMappingData[0]?.children.length > 1 &&
                SupplyMappingData[0]?.children
                  .filter((el) => el.type == 'SUB_CLIENT')
                  .map((element, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col justify-center mt-1 text-xs font-normal "
                      >
                        <div
                          className={cn(
                            `self-center w-[90%]`,
                            expansionState[index] ? 'mb-1' : '',
                          )}
                        >
                          <div
                            className={`ml-0 flex justify-between flex-row content-center py-0.5 `}
                          >
                            <div
                              onClick={(e) => {
                                setZoomOn(false);
                              }}
                              className="flex flex-row content-center"
                            >
                              <div className={`ml-0`}>
                                <img
                                  src="/assets/images/line.png"
                                  height="30rem"
                                  width="25rem"
                                  alt="ssss"
                                />
                              </div>
                              <div
                                className="flex flex-col items-center ml-2 "
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (opensub) setOpen(false);
                                  setOpenSub(!opensub);

                                  // setInfoData(element);

                                  // toggleData(element, index);
                                  // toggleExpansion(index);
                                }}
                              >
                                <div className="flex flex-row align-center">
                                  <span
                                    className={`${levels['SubClient']} my-auto`}
                                  >
                                    Niv.1
                                  </span>{' '}
                                  <div className="flex flex-col">
                                    <h1
                                      className={cn(
                                        `font-semibold sm:text-[10px] `,
                                      )}
                                    >
                                      {element.name}
                                    </h1>
                                    {order?.sub_clients && (
                                      <h1
                                        className={cn(
                                          `font-medium  sm:text-[10px] `,
                                        )}
                                      >
                                        {
                                          order?.sub_clients[0]
                                            ?.deliveryReceiptLot
                                        }
                                      </h1>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row  gap-x-1 text-gray place-self-center">
                              <FiNavigation
                                color="#283739"
                                onClick={() => {
                                  setInfoData([]);
                                  // 49.30123865044068, 8.329658606274108;
                                  setLongtitude(8.329658606274108 || 0);
                                  setLatitude(49.30123865044068 || 0);
                                  // }
                                  setZoomOn(true);
                                  setZoom(11);
                                }}
                                className="sm:w-3 sm:h-3"
                              />
                              {expansionState[index] == true ? (
                                <FiChevronUp
                                  color="#283739"
                                  className=" ml-1 sm:w-3 sm:h-3"
                                />
                              ) : (
                                <FiChevronDown
                                  color="#283739"
                                  className=" ml-1 sm:w-3 sm:h-3"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              {/* {SupplyMappingData &&
                SupplyMappingData[0] &&
                SupplyMappingData[0]?.children &&
                SupplyMappingData[0]?.children[1] && (
                  <div className="flex flex-col justify-center mt-1 text-xs font-normal ">
                    <div
                      className={cn(
                        `self-center w-[90%]`,
                        expansionState[index] ? 'mb-1' : '',
                      )}
                    >
                      <div
                        className={`${
                          marging !== 0 ? `ml-${marging / 2}` : ''
                        } flex justify-between flex-row content-center py-0.5 `}
                      >
                        <div
                          onClick={(e) => {
                            setZoomOn(false);
                          }}
                          className="flex flex-row content-center"
                        >
                          <div
                            className={`${
                              marging !== 0 ? `ml-${marging / 2}` : ''
                            }`}
                          >
                            <img
                              src="/assets/images/line.png"
                              height="30rem"
                              width="25rem"
                              alt="ssss"
                            />
                          </div>
                          <div
                            className="flex flex-row items-center ml-2 "
                            onClick={(e) => {
                              e.preventDefault();
                              if (opensub) setOpen(false);
                              setOpenSub(!opensub);

                              // setInfoData(element);

                              // toggleData(element, index);
                              // toggleExpansion(index);
                            }}
                          >
                            <span className={`${levels['Client']} my-auto`}>
                              Niv.{marging / 2}
                            </span>{' '}
                            <div className="flex flex-col">
                              <h1
                                className={cn(`font-semibold sm:text-[10px] `)}
                              >
                                {SupplyMappingData[0]?.children[1]?.name}{' '}
                              </h1>

                              {hasAuthorization('SubClient') &&
                                order?.sub_clients && (
                                  <h1
                                    className={cn(
                                      `font-medium  sm:text-[10px] `,
                                    )}
                                  >
                                    {order?.sub_clients[0]?.internalLot}{' '}
                                  </h1>
                                )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row  gap-x-1 text-gray place-self-center">
                          <FiNavigation
                            color="#283739"
                            onClick={() => {
                              if (
                                SupplyMappingData &&
                                SupplyMappingData[0]?.children &&
                                SupplyMappingData[0]?.children[0]
                              ) {
                                setInfoData({});

                                setLongtitude(end[0] || 0);
                                setLatitude(end[1] || 0);
                                // setInfoData(SupplyMappingData[0]?.children[0]);
                                setZoomOn(true);

                                setZoom(11);
                                setOpen(!open);
                              }
                            }}
                            className="sm:w-3 sm:h-3"
                          />
                          {expansionState[index] == true ? (
                            <FiChevronUp
                              color="#283739"
                              className=" ml-1 sm:w-3 sm:h-3"
                            />
                          ) : (
                            <FiChevronDown
                              color="#283739"
                              className=" ml-1 sm:w-3 sm:h-3"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}

              {opensub &&
                SupplyMappingData[0]?.children &&
                SupplyMappingData[0]?.children[0] && (
                  <div className="flex flex-col justify-center mt-1 text-xs font-normal ">
                    <div
                      className={cn(
                        `self-center w-[90%]`,
                        expansionState[index] ? 'mb-1' : '',
                      )}
                    >
                      <div
                        className={`${
                          marging !== 0 ? `ml-${marging}` : ''
                        } flex justify-between flex-row content-center py-0.5 `}
                      >
                        <div
                          onClick={(e) => {
                            setZoomOn(false);
                          }}
                          className="flex flex-row content-center"
                        >
                          <div
                            className={`${
                              marging !== 0 ? `ml-${marging}` : ''
                            }`}
                          >
                            <img
                              src="/assets/images/line.png"
                              height="30rem"
                              width="25rem"
                              alt="ssss"
                            />
                          </div>
                          <div
                            className="flex flex-row items-center ml-2 "
                            onClick={(e) => {
                              e.preventDefault();
                              setOpen(!open);

                              // setInfoData(element);

                              // toggleData(element, index);
                              // toggleExpansion(index);
                            }}
                          >
                            <span className={`${levels['Supplier']}`}>
                              Niv.{level - 2}
                            </span>{' '}
                            <div className="flex flex-col">
                              <h1
                                className={cn(`font-semibold sm:text-[10px] `)}
                              >
                                {SupplyMappingData[0]?.children[0]?.name}{' '}
                              </h1>
                              <h1
                                className={cn(`font-medium  sm:text-[10px] `)}
                              >
                                {SupplyMappingData[0]?.name}{' '}
                              </h1>
                            </div>
                            <h1
                              className={cn(`font-semibold sm:text-[10px] `)}
                            ></h1>
                          </div>
                        </div>
                        <div className="flex flex-row  gap-x-1 text-gray place-self-center">
                          <FiNavigation
                            color="#283739"
                            onClick={() => {
                              if (
                                SupplyMappingData &&
                                SupplyMappingData[0]?.children &&
                                SupplyMappingData[0]?.children[0]
                              ) {
                                setOpen(!open);
                                setInfoData(SupplyMappingData[0]?.children[0]);

                                setLongtitude(
                                  SupplyMappingData[0]?.children[0]?.coordinates
                                    ?.longitude || 0,
                                );
                                setLatitude(
                                  SupplyMappingData[0]?.children[0]?.coordinates
                                    ?.latitude || 0,
                                );
                                // setInfoData(SupplyMappingData[0]?.children[0]);
                                setZoomOn(true);

                                setZoom(11);
                              }
                            }}
                            className="sm:w-3 sm:h-3"
                          />
                          {expansionState[index] == true ? (
                            <FiChevronUp
                              color="#283739"
                              className=" ml-1 sm:w-3 sm:h-3"
                            />
                          ) : (
                            <FiChevronDown
                              color="#283739"
                              className=" ml-1 sm:w-3 sm:h-3"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            // <div className="flex flex-col justify-center font-normal bg-black sm:text-[10px] bg-opacity-10">
            //   <div className=" self-center  font-semibold w-[90%]">
            //     <div className="flex flex-row content-center py-1">
            //       <div className="flex items-center ">
            //         <h1>Client : Basf</h1>
            //       </div>
            //     </div>

            //     <div className=" w-full bg-black h-[1px] bg-opacity-10" />
            //     <div className="flex flex-row content-center justify-between py-2">
            //       <div className="flex flex-row content-center">
            //         <div>
            //           <img
            //             src="/assets/images/line.png"
            //             height="25rem"
            //             width="25rem"
            //             alt="ssss"
            //           />
            //         </div>
            //         <div
            //           className="flex flex-row items-center py-0 ml-2"
            //           onClick={() => {
            //             if (SupplyMappingData && SupplyMappingData[0]) {
            //               setOpen(!open);
            //             }
            //           }}
            //         >
            //           <span className="mr-2 font-medium text-white bg-gray-700 rounded py text-[0.6rem] sm:px-1.5 xl:px-1.5">
            //            Niv.1
            //           </span>
            //           <h1 className="sm:text-[10px]  ">
            //             Supplier : Gie Targanine
            //           </h1>
            //         </div>
            //       </div>
            //       <div className="flex flex-row gap-x-1 place-self-center">
            //         <FiNavigation
            //           color="#283739"
            //           onClick={() => {
            //             if (
            //               SupplyMappingData &&
            //               SupplyMappingData[0]?.children &&
            //               SupplyMappingData[0]?.children[0]
            //             ) {
            //               setOpen(!open);
            //               setInfoData(SupplyMappingData[0]?.children[0]);

            //               setLongtitude(
            //                 SupplyMappingData[0]?.children[0]?.coordinates
            //                   ?.longitude || 0,
            //               );
            //               setLatitude(
            //                 SupplyMappingData[0]?.children[0]?.coordinates
            //                   ?.latitude || 0,
            //               );
            //               // setInfoData(SupplyMappingData[0]?.children[0]);
            //               setZoomOn(true);

            //               setZoom(11);
            //             }
            //           }}
            //           className=" sm:w-3 sm:h-3"
            //         />
            //         {open && (
            //           <FiChevronUp
            //             color="#283739"
            //             className=" ml-1 sm:w-3 sm:h-3"
            //           />
            //         )}
            //         {!open && (
            //           <FiChevronDown
            //             color="#283739"
            //             className=" ml-1 sm:w-3 sm:h-3"
            //           />
            //         )}
            //       </div>
            //     </div>
            //   </div>
            // </div>
          )}

          {open &&
            expansionState[index] &&
            SupplyMappingData[0]?.children.length > 0 && (
              <div className="bg-black bg-opacity-10">
                <SubLink
                  key={index}
                  order={order}
                  level={level - 1}
                  pad={marging + 1}
                  data={staticData.supplier}
                  setLatitude={setLatitude}
                  setLongtitude={setLongtitude}
                  setZoom={setZoom}
                  zoomOn={zoomOn}
                  setZoomOn={setZoomOn}
                  setMouseIn={setMouseIn}
                  setInfoData={setInfoData}
                  SupplyMappingData={SupplyMappingData[0]?.children.find(
                    (el) => el.type == 'SUPPLIER',
                  )}
                />
              </div>
            )}
        </>
      )}
    </div>
  );
}

export function SupplyMappingOrdersList({
  setOrderData,
  selectedOrderData,
  selectedTab,
  setSelectedTab,
  setMouseIn,
  setOrderId,
  setLatitude,
  expansionState,
  setExpansionState,
  setLongtitude,
  setZoom,
  setCoops,
  mousein,
  setZoomOn,
  zoomOn,
  quality,
  isAlerts = false,
  setInfoData,
  SupplyMappingData,
  isLoading,
  setIsLoading,
  setIndex,
  loadingIndex,
}: {
  selectedOrderData: any;
  setZoomOn: any;
  setOrderData: (val: string) => void;
  selectedTab?: any;
  setSelectedTab?: any;
  isAlerts?: boolean;
  setCoops?: any;
  quality?: boolean;
  mousein?: any;
  zoomOn: any;
  setLatitude?: any;
  setZoom?: any;
  setLongtitude?: any;
  setMouseIn?: any;
  setOrderId?: (val: string) => void;
  expansionState: any;
  setExpansionState: any;
  setInfoData: any;
  SupplyMappingData: any;
  isLoading: any;
  setIsLoading: any;
  setIndex?: any;
  loadingIndex?: any;
}) {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [openFilter, setOpenFiler] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [numLivraison, setNumLivraison] = useState([]);
  const [isOrdersListVisible, setOrdersListVisible] = useState(false);

  const [ingredientsChoice, setIngrdientChoice] = useState('ALL');
  const [year, setYear] = useState('');
  const [extend, setExtand] = useState(false);
  const listRef = useRef(null);
  const toggleOrdersList = () => {
    setOrdersListVisible(!isOrdersListVisible);
  };
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

  // useEffect(() => {}, expansionState);
  useEffect(() => {
    if (!error && originalData && originalData.length > 0) {
      setData(originalData);
      setOrderData(originalData[selectedOrderIndex]);
      setCoops && setCoops(originalData[selectedOrderIndex]?.corps_ids);
    } else setOrderData(null);
  }, [originalData, error, setOrderData, setCoops, selectedOrderIndex]);
  useEffect(() => {
    if (originalData) {
      const dt = originalData
        ?.map((item) => {
          const d = new Date(item.created_at);
          item.created_at = d;
          return item;
        })
        .sort((a, b) => {
          return a.created_at < b.created_at ? 1 : -1;
        });
      setData(dt);
    }
  }, [originalData]);
  useEffect(() => {
    if (!error && data && data.length > 0) {
      const newArray = Array.from({ length: data.length }, () => false);
      setExpansionState(newArray);
      setOrderData(data[0]);
    } else setOrderData(null);
  }, [data, error, setOrderData]);

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
      <div className="flex flex-no-wrap justify-between w-full h-8 px-5 text-left shadow-md bg-[#228896]">
        <h3
          onClick={toggleOrdersList}
          className="font-semibold leading-none text-white   sm:pt-2 sm:pb-2 justify-self-center sm:text-xs "
        >
          Supply Mapping{' '}
        </h3>
        {!isOrdersListVisible ? (
          <div
            onClick={toggleOrdersList}
            className=" cursor-auto sm:pt-2 sm:pb-2 justify-self-center sm:text-md"
          >
            <IoListOutline color="white" />
          </div>
        ) : (
          <div
            onClick={toggleOrdersList}
            className="cursor-auto  sm:pt-2 sm:pb-2 justify-self-center sm:text-md"
          >
            <HiOutlineChevronUp color="white" />
          </div>
        )}
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOrdersListVisible ? '100%' : 0,
          opacity: isOrdersListVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative flex flex-col w-full h-full text-left  shadow-md"
      >
        <>
          <div className="flex flex-row items-center justify-between w-full h-8 px-5 border-b border-gray-200 bg-[#283739]">
            <h3 className="pt-4 pb-4 font-semibold leading-none text-white sm:text-xs">
              Orders list ({data?.length})
            </h3>
            <div className="flex flex-row items-center justify-center h-4 cursor-pointer gap-x-3 gap-y-0 transition-colors duration-150 text-primary-500">
              <AnimatePresence>
                <motion.div
                  variants={motionSearch}
                  initial="initial"
                  animate={isSearchOpen ? 'animate' : ''}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  exit="exit"
                  className="flex  flex-col items-center justify-between w-full gap-2"
                >
                  <div className="flex flex-row items-center justify-center py-4 gap-2">
                    <input
                      id={'search'}
                      type="text"
                      placeholder={'Search'}
                      className={cn(
                        'placeholder-gray-500 text-bgmap border-gray-300 max-w-[140px] h-[33px] border px-3 py-3 bg-transparent rounded-lg text-sm focus:outline-none focus:border-white!resize-none disabled:bg-gray-200 disabled:cursor-not-allowed',
                      )}
                      {...register('search')}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              <IoIosSearch
                color="white"
                className="  sm:w-3 sm:h-3 hover:text-primary-800"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              />
              <div
                onClick={() => !isValidating && mutate()}
                className="flex flex-row items-center justify-center cursor-pointer transition-colors duration-150 text-primary-500 hover:text-primary-800"
              >
                <IoReloadOutline
                  color="white"
                  className={cn(
                    isValidating && 'animate-spin cursor-not-allowed',
                    '  sm:w-3 sm:h-3',
                  )}
                />
              </div>
              <div onClick={() => setOpenFiler(!openFilter)}>
                {openFilter ? (
                  <AiFillFilter
                    color="white"
                    className={cn(
                      isValidating && ' cursor-not-allowed',
                      '  sm:w-3 sm:h-3 hover:text-primary-800',
                    )}
                  />
                ) : (
                  <AiOutlineFilter
                    color="white"
                    className={cn(
                      isValidating && ' cursor-not-allowed',
                      '  sm:w-3 sm:h-3 hover:text-primary-800',
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
              className="flex flex-col items-center justify-between w-full bg-[#283739]"
            >
              <div className="w-full">
                <label className="block pb-2 text-xs font-semibold text-white">
                  Ingredient
                </label>
                <Controller
                  control={control}
                  name="label"
                  render={({ field: { onChange, value, ref } }) => (
                    <ProductTypeSelectRequest
                      ref={ref}
                      defaultValue={{
                        logo_url: '/assets/images/all1.png',
                        label: 'ALL',
                        value: 'ALL',
                      }}
                      // defaultValue={ingredients && ingredients.length > 0 ? ingredients[0] : null}
                      dataList={[
                        {
                          image: { url: 'assets/images/all1.png' },
                          name: 'ALL',
                          id: 'ALL',
                        },
                        ...ingredients,
                      ]}
                      SupplyMapping={true}
                      className={'sm:text-xs'}
                      onChange={(val: any) => {
                        setIngrdientChoice(val?.value);
                      }}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <label className="block pb-2 text-xs font-semibold text-white">
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
                    SupplyMapping={true}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <ul
            className={`flex flex-col flex-1 pb-2 overflow-y-auto bg-white border-gray-200  `}
            ref={listRef}
          >
            {isValidating && (
              <li style={{ minHeight: '40rem' }} className="flex w-full m-auto">
                <AsyncLoading />
              </li>
            )}
            {!isValidating &&
              selectedOrderData &&
              ((!error && data) || [])
                .filter((item) =>
                  item?.order
                    ?.toLowerCase()
                    .includes(watch('search').toLowerCase()),
                )
                .map((order, index) => (
                  <LinkHelper
                    isOrdersListVisible={isOrdersListVisible}
                    listRef={listRef}
                    key={index}
                    order={order}
                    setIsModalAddOpen={setIsModalAddOpen}
                    index={index}
                    mousein={mousein}
                    selectedOrderData={selectedOrderData}
                    setModalData={setModalData}
                    setMouseIn={setMouseIn}
                    isAlerts={isAlerts}
                    setOrderId={setOrderId}
                    setOrderData={setData1}
                    setZoom={setZoom}
                    zoomOn={zoomOn}
                    expansionState={expansionState}
                    setExpansionState={setExpansionState}
                    setZoomOn={setZoomOn}
                    setLatitude={setLatitude}
                    setLongtitude={setLongtitude}
                    isLoading={isLoading}
                    setInfoData={setInfoData}
                    SupplyMappingData={SupplyMappingData}
                    setIsLoading={setIsLoading}
                    setIndex={setIndex}
                    numLivraison={numLivraison}
                    setNumLivraison={setNumLivraison}
                  />
                ))}

            <EmptyState
              title="No orders available"
              content="You have no orders yet"
              isEmpty={!isValidating && !error && (!data || data.length === 0)}
            />
          </ul>
        </>
      </motion.div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: !isOrdersListVisible ? 'auto' : 0,
          opacity: !isOrdersListVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative flex flex-col w-full h-full overflow-y-auto text-left bg-white shadow-xl no-scrollbar bg-opacity-60 backdrop-blur-[2px]"
      >
        {data1 && (
          <LinkHelper
            isOrdersListVisible={isOrdersListVisible}
            listRef={listRef}
            key={loadingIndex}
            order={data1}
            setIsModalAddOpen={setIsModalAddOpen}
            index={loadingIndex}
            mousein={mousein}
            selectedOrderData={selectedOrderData}
            setModalData={setModalData}
            setMouseIn={setMouseIn}
            isAlerts={isAlerts}
            setOrderId={setOrderId}
            setOrderData={setData1}
            setZoom={setZoom}
            zoomOn={zoomOn}
            expansionState={expansionState}
            setExpansionState={setExpansionState}
            setZoomOn={setZoomOn}
            setLatitude={setLatitude}
            setLongtitude={setLongtitude}
            isLoading={isLoading}
            setInfoData={setInfoData}
            SupplyMappingData={SupplyMappingData}
            setIsLoading={setIsLoading}
            setIndex={setIndex}
            numLivraison={numLivraison}
            setNumLivraison={setNumLivraison}
          />
        )}
      </motion.div>
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

import { useState } from 'react';

import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import cn from 'classnames';
import { AiOutlineDelete, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import { IoReloadOutline } from 'react-icons/io5';
import { TiCancel } from 'react-icons/ti';
import useSWR from 'swr/immutable';

import { useUI } from '@contexts/ui.context';
import { useDeleteLabTest } from '@hooks/useQualityActions';
import { getToken } from '@utils/auth-token';
import { fetcher } from '@utils/fetch.helper';

import RequestLabView from './RequestLabView';

function truncateString(str, num) {
  if (num > str?.length) {
    return str;
  } else {
    str = str?.substring(0, num);
    return str + '...';
  }
}

const RequestLabComponent = ({
  labTest,
  setShowData,
  setSelectedItem,
  onSuccess,
  image_url,
}: {
  labTest: any;
  setShowData?: (b) => void;
  setSelectedItem?: (item) => void;
  onSuccess?: () => void;
  image_url?: string;
}) => {
  const { hasAuthorization } = useUI();

  const {
    onDelete,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    isLoadingDelete,
  } = useDeleteLabTest({
    onSuccess: onSuccess,
  });

  return (
    <div className="flex px-1">
      <ListItemButton
        sx={{ height: '72px', overflow: 'auto' }}
        onClick={() => {
          setSelectedItem(labTest);
          setShowData(true);
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ width: 56, height: 56 }} src={image_url} />
          <Stack>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: 14 }}>
              <h5>{truncateString(labTest?.name, 20)}</h5>
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: 10 }}>
              <p>{truncateString(labTest?.details, 20)}</p>
            </Typography>
          </Stack>
        </Stack>
      </ListItemButton>
      {(hasAuthorization('Admin') || hasAuthorization('Client')) && (
        <div className="flex items-center gap-x-2">
          {showDeleteConfirmation ? (
            isLoadingDelete ? (
              <IconButton>
                <AiOutlineLoading3Quarters className="w-5 h-5 cursor-not-allowed transition-colors duration-150 animate-spin hover:text-primary-800" />
              </IconButton>
            ) : (
              <>
                <Tooltip title="Confirm">
                  <IconButton onClick={() => onDelete(labTest?.id)}>
                    <GiConfirmed className="text-red-500" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancel">
                  <IconButton onClick={() => setShowDeleteConfirmation(false)}>
                    <TiCancel className="text-green-500" />
                  </IconButton>
                </Tooltip>
              </>
            )
          ) : (
            <Tooltip title="Delete">
              <IconButton onClick={() => setShowDeleteConfirmation(true)}>
                <AiOutlineDelete className="text-red-500" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
};

function RequestLabList({
  orderData,
  selectedTab,
  setSelectedTab,
}: {
  orderData: any;
  selectedTab: any;
  setSelectedTab: any;
}) {
  const [showData, setShowData] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const { data, error, mutate, isValidating } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_API_QUALITY_ENDPOINT}/request/fetch/all/by/jwt/${orderData?.id}`,
      getToken() || '',
    ],
    fetcher,
  );

  return (
    <>
      <Stack direction="row" sx={{ width: '100%' }}>
        <Stack sx={{ width: '100%' }}>
          <Paper
            elevation={0}
            className="border border-grey-200"
            sx={{ width: '100%' }}
          >
            <Stack
              sx={{ width: '100%' }}
              direction="row"
              justifyContent="space-between"
              className="border-b border-grey-200"
            >
              <Typography p={2} sx={{ fontFamily: 'Poppins' }}>
                <h3 className="text-sm font-semibold leading-none text-heading">
                  Test lab request list
                </h3>
              </Typography>
              <Stack sx={{ height: '100%', alignSelf: 'center', pr: 1 }}>
                <IconButton>
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
                </IconButton>
              </Stack>
            </Stack>
            <Stack>
              <Box style={{ overflow: 'hidden' }}>
                <List sx={{ overflow: 'hidden' }}>
                  {data &&
                    data.map((e, id) => (
                      <RequestLabComponent
                        key={id}
                        labTest={e}
                        image_url={orderData?.client_data?.image_url}
                        onSuccess={() => mutate()}
                        setSelectedItem={setSelectedItem}
                        setShowData={setShowData}
                      />
                    ))}
                </List>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
      <RequestLabView
        isOpen={showData}
        setIsOpen={setShowData}
        orderData={orderData}
        selectedItem={selectedItem}
      />
    </>
  );
}

export default RequestLabList;

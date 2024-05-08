import { CSSProperties, useState } from 'react';

import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import cn from 'classnames';
import { IoHourglass, IoMail, IoReloadOutline } from 'react-icons/io5';
import { useToasts } from 'react-toast-notifications';
import useSWR from 'swr/immutable';

import ImageFallback from '@components/common/ImageFallback';
import { useUI } from '@contexts/ui.context';
import { getToken } from '@utils/auth-token';
import { fetcher } from '@utils/fetch.helper';

import CommentDialog from './CommentDialog';

function truncateString(str, num) {
  if (!str) return 'Error!';
  if (num > str?.length) {
    return str;
  } else {
    str = str.substring(0, num);
    return str + '...';
  }
}

const Badge = ({ hasComment }: { hasComment: boolean }) => {
  let style: CSSProperties = {
    width: '25px',
    height: '25px',
    borderRadius: '15px',
    fontSize: '12px',
    textAlign: 'center',
    color: 'white',
    backgroundColor: hasComment ? 'green' : 'red',
  };
  return (
    <Stack justifyContent="center">
      {hasComment ? <IoMail /> : <IoHourglass />}
    </Stack>
  );
};

function CommentsList({
  orderData,
  supplierData,
}: {
  orderData: any;
  supplierData: any;
}) {
  const [selectedItem, setSelectedItem] = useState({});
  const { addToast } = useToasts();
  const { data, error, mutate, isValidating } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_API_TRACEABILITY_ENDPOINT}/values/fetch/by/order_id/${orderData?.id}`,
      getToken() || '',
    ],
    fetcher,
  );
  const [openComment, setOpenComment] = useState(false);
  const { hasAuthorization } = useUI();
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
                  Comments
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
                  {data?.length > 0 ? (
                    data.map((e, i) => {
                      return (
                        <ListItemButton
                          key={i}
                          sx={{ height: '72px', overflow: 'auto' }}
                          onClick={() => {
                            setSelectedItem(e);
                            if (e.comment || !hasAuthorization('Client'))
                              setOpenComment(true);
                            else {
                              addToast(
                                <>
                                  <p className="pb-2 text-sm font-normal text-gray-600">
                                    No comments posted yet.
                                  </p>
                                </>,
                                { appearance: 'info' },
                              );
                            }
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ width: '100%' }}
                          >
                            <Stack direction="row" spacing={2}>
                              <Avatar
                                sx={{ width: 56, height: 56 }}
                                src={supplierData?.image_url}
                              />
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                              >
                                <Stack>
                                  <Typography
                                    sx={{ fontFamily: 'Poppins', fontSize: 14 }}
                                  >
                                    <h5>
                                      <b>
                                        {truncateString(supplierData?.name, 20)}
                                      </b>
                                    </h5>
                                  </Typography>
                                  <Typography
                                    sx={{ fontFamily: 'Poppins', fontSize: 10 }}
                                  >
                                    <p>{truncateString(e?.info, 20)}</p>
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Stack>
                            <Badge hasComment={Boolean(e?.comment)} />
                          </Stack>
                        </ListItemButton>
                      );
                    })
                  ) : (
                    <Stack
                      sx={{ p: 2 }}
                      justifyContent="center"
                      direction="row"
                    >
                      <ImageFallback
                        src="/assets/images/empty.svg"
                        width={100}
                        height={100}
                      />
                    </Stack>
                  )}
                </List>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
      <CommentDialog
        open={openComment}
        setOpen={setOpenComment}
        item={selectedItem}
        author={supplierData}
      />
    </>
  );
}

export default CommentsList;

import { useState } from 'react';

import { Avatar, Paper, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useToasts } from 'react-toast-notifications';

import BaseModalLayout from '@components/modals/BaseModalLayout';
import { useUI } from '@contexts/ui.context';
import { getToken } from '@utils/auth-token';

const TextFieldObens = styled(TextField)({
  borderColor: '#45AD95',
  '& .MuiInputBase-input:focus': {
    borderColor: '#45AD95',
  },
});

function CommentDialog({
  open,
  setOpen,
  item,
  author,
}: {
  open: boolean;
  setOpen: any;
  item: any;
  author: any;
}) {
  const { hasAuthorization } = useUI();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const onSubmit = () => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_TRACEABILITY_ENDPOINT}/request/comment/${item.id}?comment=${comment}`,
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + getToken(),
        },
      },
    ).then((res) => {
      if (res.status === 200) {
        addToast(
          <>
            <p className="pb-2 text-sm font-normal text-gray-600">
              Comment saved successfully!
            </p>
          </>,
          { appearance: 'success' },
        );
        setComment('');
        setLoading(false);
        setOpen(false);
      } else {
        setLoading(false);
        addToast(
          <>
            <p className="pb-2 text-sm font-normal text-gray-600">
              An error has occurred while saving comment! please try again.
            </p>
          </>,
          { appearance: 'error' },
        );
      }
    });
  };
  return (
    <BaseModalLayout
      isOpen={open}
      setIsOpen={setOpen}
      title="Comments section"
      description="Here you can view/edit comments."
      loading={loading}
      onSubmit={onSubmit}
      isSubmitable={hasAuthorization('Client')}
    >
      {item?.comment ? (
        <Paper sx={{ p: 2, minWidth: '250px', pb: 1 }}>
          <Stack direction="row" spacing={1}>
            <Stack>
              <Avatar sx={{ width: 32, height: 32 }} src={author?.image_url} />
            </Stack>
            <Stack justifyContent="center">
              <Typography sx={{ fontFamily: 'Poppins' }}>
                <b>{author?.name}</b>
              </Typography>
            </Stack>
          </Stack>
          <Stack sx={{ ml: 5 }}>
            <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
              {item?.comment}
            </Typography>
          </Stack>
          <Stack sx={{ pt: 1 }}>
            <Typography
              variant="caption"
              style={{
                opacity: 0.5,
                fontFamily: 'Poppins',
                textAlign: 'right',
              }}
            >
              <i>{item?.created_at}</i>
            </Typography>
          </Stack>
        </Paper>
      ) : (
        <Stack sx={{ pl: 1 }}>
          <Typography variant="subtitle2" style={{ fontFamily: 'Poppins' }}>
            No comments yet.
          </Typography>
        </Stack>
      )}

      {!hasAuthorization('Client') && (
        <Stack sx={{ pl: 1, pt: 2 }}>
          <label style={{ fontFamily: 'Poppins', fontSize: 12 }}>
            Comment (Requested information:{' '}
            <b>{item.info || '<could not load data>'}</b>)
          </label>
          <TextFieldObens
            style={{ borderColor: 'transparent' }}
            color="info"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Stack>
      )}
    </BaseModalLayout>
  );
}

export default CommentDialog;

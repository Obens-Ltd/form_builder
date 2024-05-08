import {
  Avatar,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';

import BaseModalLayout from '@components/modals/BaseModalLayout';

const keys = {
  name: 'Subject',
  details: 'Details',
  status: 'Status',
};

function RequestLabView({
  isOpen,
  setIsOpen,
  orderData,
  selectedItem,
}: {
  isOpen: boolean;
  setIsOpen: any;
  orderData: any;
  selectedItem: any;
}) {
  return (
    <BaseModalLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Test Lab Request"
      description="Here you can view test lab requests."
      loading={false}
      onSubmit={function (e?: any): void {
        throw new Error('Function not implemented.');
      }}
      isSubmitable
    >
      <Stack>
        <List>
          <ListItem>
            <Stack direction="row" width="100%" p={1}>
              <Stack sx={{ width: '50%' }} justifyContent="center">
                <Typography variant="subtitle1">
                  <p className="text-sm font-normal tracking-tight text-left break-words leading-4 jsx-308398180">
                    Client
                  </p>
                </Typography>
              </Stack>
              <Stack sx={{ width: '50%' }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={orderData?.client_data?.image_url}
                    />
                    <Stack justifyContent="center">
                      <Typography variant="subtitle1">
                        <p className="text-xs font-normal tracking-tight text-left text-gray-500 leading-4 jsx-308398180 md:text-sm whitespace-nowrap">
                          {orderData?.client_data?.name}
                        </p>
                      </Typography>
                    </Stack>
                  </Stack>
                </Typography>
              </Stack>
            </Stack>
          </ListItem>
          <Divider variant="middle" />
          <ListItem>
            <Stack direction="row" width="100%" p={1}>
              <Stack sx={{ width: '50%' }} justifyContent="center">
                <Typography variant="subtitle1">
                  <p className="text-sm font-normal tracking-tight text-left break-words leading-4 jsx-308398180">
                    Supplier
                  </p>
                </Typography>
              </Stack>
              <Stack sx={{ width: '50%' }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={orderData?.supplier_data?.image_url}
                    />
                    <Stack justifyContent="center">
                      <Typography variant="subtitle1">
                        <p className="text-xs font-normal tracking-tight text-left text-gray-500 leading-4 jsx-308398180 md:text-sm whitespace-nowrap">
                          {orderData?.supplier_data?.name}
                        </p>
                      </Typography>
                    </Stack>
                  </Stack>
                </Typography>
              </Stack>
            </Stack>
          </ListItem>
          <Divider variant="middle" />
          {selectedItem &&
            Object.keys(selectedItem).map((e, i) => {
              if (!selectedItem[e] || e.includes('id')) return;
              return (
                <>
                  <ListItem key={i}>
                    <Stack direction="row" width="100%" p={1}>
                      <Stack sx={{ width: '50%' }}>
                        <Typography variant="subtitle1">
                          <p className="text-sm font-normal tracking-tight text-left break-words leading-4 jsx-308398180">
                            {keys[e]}
                          </p>
                        </Typography>
                      </Stack>
                      <Stack sx={{ width: '50%' }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 500,
                          }}
                        >
                          <p className="text-xs font-normal tracking-tight text-left text-gray-500 leading-4 jsx-308398180 md:text-sm whitespace-nowrap">
                            {selectedItem[e]}
                          </p>
                        </Typography>
                      </Stack>
                    </Stack>
                  </ListItem>
                  {keys[e] === 'Status' ? null : <Divider variant="middle" />}
                </>
              );
            })}
        </List>
      </Stack>
    </BaseModalLayout>
  );
}

export default RequestLabView;

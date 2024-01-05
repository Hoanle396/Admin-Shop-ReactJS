import { Avatar, Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import Dot from 'components/@extended/Dot';

import { updateOrderStatus, useOrderById } from 'apis/orders';
import { ORDER_STATUS } from 'constants';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import Loader from 'components/Loader';
import { useParams } from 'react-router';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const Status = ({ status }) => {
  let color;
  let title;
  let textColor;

  switch (status) {
    case ORDER_STATUS.PENDING:
      color = 'warning';
      title = 'Pending';
      textColor = '#FFA940';
      break;
    case ORDER_STATUS.SUCCESS:
      color = 'success';
      title = 'Success';
      textColor = '#30CD60';
      break;
    case ORDER_STATUS.CLOSED:
      color = 'error';
      title = 'Closed';
      textColor = '#DA4343';
      break;
    case ORDER_STATUS.CONFIRM:
      color = 'primary';
      title = 'Confirm';
      textColor = '#1890FF';
      break;
    default:
      color = 'warning';
      title = 'Pending';
      textColor = '#FFA940';
  }

  return (
    <Chip
      label={
        <Stack direction="row" spacing={1} alignItems="center">
          <Dot color={color} />
          <Typography color={textColor}>{title}</Typography>
        </Stack>
      }
    />
  );
};

Status.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderDetail() {
  const { id } = useParams();
  //eslint-disable-next-line
  const { data, isLoading, refetch } = useOrderById(id);

  const { mutate } = useMutation(updateOrderStatus, {
    onSuccess: () => {
      toast.success('Order updated successfully!');
      refetch();
    },
    onError: () => {
      toast.error('Order updated failed!');
    }
  });
  //eslint-disable-next-line
  const handleUpdate = (status) => {
    mutate({ id: data?.id, status: status });
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Stack spacing={1} direction="row" justifyContent="space-between">
        <Stack direction="row" gap={2}>
          <Stack direction="column" gap={1}>
            <Typography variant="h4" fontWeight="700">
              Order #{data?.code}
            </Typography>
            <Typography color="secondary">{dayjs(data?.CreatedAt).format('DD MMM YYYY HH:mm')}</Typography>
          </Stack>
          <Status status={data?.status} />
        </Stack>
        <Stack direction="row" justifyContent="flex-end" gap={2}>
          {data?.status === ORDER_STATUS.PENDING && (
            <>
              <Button
                sx={{ height: 42 }}
                startIcon={<CheckOutlined />}
                variant="contained"
                color="primary"
                onClick={() => handleUpdate(ORDER_STATUS.CONFIRM)}
              >
                Confirm
              </Button>
              <Button
                sx={{ height: 42 }}
                startIcon={<CloseOutlined />}
                variant="outlined"
                color="error"
                onClick={() => handleUpdate(ORDER_STATUS.CLOSED)}
              >
                Close
              </Button>
            </>
          )}
          {data?.status === ORDER_STATUS.CONFIRM && (
            <Button
              sx={{ height: 42 }}
              startIcon={<CheckOutlined />}
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleUpdate(ORDER_STATUS.SUCCESS)}
            >
              Done
            </Button>
          )}
        </Stack>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <MainCard sx={{ mt: 2, p: 2 }} content>
            <Stack>
              <Typography variant="h4" fontWeight="700">
                Details
              </Typography>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
            {data?.detail?.map((item) => (
              <Stack key={item.id} direction="row" justifyContent="space-between" mt={2}>
                <Stack direction="row" gap={2} alignItems="center">
                  <Avatar src={item.product.images[0].url} variant="rounded" sx={{ width: 56, height: 56 }} />
                  <Stack>
                    <Typography>Name: {item.product.name}</Typography>
                    <Typography>Size: {item.size}</Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" gap={2} alignItems="center">
                  <Typography>x{item.quantity}</Typography>
                  <Typography>$: {item.product.price}</Typography>
                </Stack>
              </Stack>
            ))}
            <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
            <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={2}>
              <Typography variant="h4">Total:</Typography>
              <Typography>$: {data?.amount}</Typography>
            </Stack>
          </MainCard>
        </Grid>

        <Grid item xs={12} md={5}>
          <MainCard sx={{ mt: 2, p: 2 }} content>
            <Stack>
              <Typography variant="h4" fontWeight="700">
                Customer info
              </Typography>
            </Stack>
            <Stack direction="row" gap={2} alignItems="center" mt={2}>
              <Avatar>{data?.user?.email.slice(0, 2)}</Avatar>
              <Stack>
                <Typography fontWeight="700">{data?.user?.fullName} </Typography>
                <Typography>{data?.user?.email} </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
            <Stack>
              <Typography variant="h4" fontWeight="700">
                Shipping
              </Typography>
            </Stack>
            <Stack direction="column" gap={2} mt={2}>
              <Stack direction="row">
                <Typography flex={0.3} fontWeight="700">
                  Address
                </Typography>
                <Typography flex={0.7} fontWeight="500">
                  {data?.shipping?.address}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography flex={0.3} fontWeight="700">
                  Phone Number
                </Typography>
                <Typography flex={0.7} fontWeight="500">
                  {data?.shipping?.phone}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography flex={0.3} fontWeight="700">
                  Email
                </Typography>
                <Typography flex={0.7} fontWeight="500">
                  {data?.shipping?.email}
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}

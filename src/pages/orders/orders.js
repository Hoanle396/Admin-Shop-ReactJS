import { CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Box, Button, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import NumberFormat from 'react-number-format';

import Dot from 'components/@extended/Dot';
import { useState } from 'react';

import { updateOrderStatus, useOrders } from 'apis/orders';
import { ORDER_STATUS } from 'constants';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

const headCells = [
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: false,
    label: 'Tracking No.'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Order Code'
  },
  {
    id: 'fat',
    align: 'left',
    disablePadding: false,
    label: 'Total Amount'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'protein',
    align: 'left',
    disablePadding: false,
    label: 'Created At'
  },
  {
    id: 'actions',
    align: 'right',
    disablePadding: false,
    label: 'Actions'
  }
];

function HeaderTable() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const Status = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case ORDER_STATUS.PENDING:
      color = 'warning';
      title = 'Pending';
      break;
    case ORDER_STATUS.SUCCESS:
      color = 'success';
      title = 'Success';
      break;
    case ORDER_STATUS.CLOSED:
      color = 'error';
      title = 'Closed';
      break;
    case ORDER_STATUS.CONFIRM:
      color = 'primary';
      title = 'Confirm';
      break;
    default:
      color = 'warning';
      title = 'Pending';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

Status.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function Orders() {
  const [rows, setRows] = useState();

  const { refetch } = useOrders({
    onSuccess: (data) => {
      setRows(data);
    },
    onError: () => {
      setRows([]);
    }
  });

  const { mutate } = useMutation(updateOrderStatus, {
    onSuccess: () => {
      toast.success('Order updated successfully!');
      refetch();
    },
    onError: () => {
      toast.error('Order updated failed!');
    }
  });

  const handleUpdate = (row, status) => {
    mutate({ id: row.id, status: status });
  };

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <HeaderTable />
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={row.id}>
                  <TableCell component="th" scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to={`/orders/${row.id}`}>
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.code}</TableCell>
                  <TableCell align="left">
                    <NumberFormat value={row.amount} displayType="text" thousandSeparator prefix="$" />
                  </TableCell>
                  <TableCell align="left">
                    <Status status={row.status} />
                  </TableCell>
                  <TableCell align="left">{dayjs(row.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" gap={2}>
                      {row.status === ORDER_STATUS.PENDING && (
                        <>
                          <Button
                            startIcon={<CheckOutlined />}
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdate(row, ORDER_STATUS.CONFIRM)}
                          >
                            Confirm
                          </Button>
                          <Button
                            startIcon={<CloseOutlined />}
                            variant="outlined"
                            color="error"
                            onClick={() => handleUpdate(row, ORDER_STATUS.CLOSED)}
                          >
                            Close
                          </Button>
                        </>
                      )}
                      {row.status === ORDER_STATUS.CONFIRM && (
                        <Button
                          startIcon={<CheckOutlined />}
                          variant="contained"
                          color="success"
                          onClick={() => handleUpdate(row, ORDER_STATUS.SUCCESS)}
                        >
                          Done
                        </Button>
                      )}
                      <Link component={RouterLink} to={`/orders/${row.id}`}>
                        <Button startIcon={<EyeOutlined />} variant="outlined">
                          View
                        </Button>
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

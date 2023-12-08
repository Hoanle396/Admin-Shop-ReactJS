import { EditOutlined } from '@ant-design/icons';
import { Box, IconButton, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import NumberFormat from 'react-number-format';

import Dot from 'components/@extended/Dot';
import { useState } from 'react';

import { useOrders } from 'apis/orders';
import dayjs from 'dayjs';

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
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 2:
      color = 'success';
      title = 'Success';
      break;
    case 1:
      color = 'error';
      title = 'Closed';
      break;
    case 3:
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

  useOrders({
    onSuccess: (data) => {
      setRows(data);
    },
    onError: () => {
      setRows([]);
    }
  });

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
                    <Link color="secondary" component={RouterLink} to="">
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
                    <IconButton>
                      <EditOutlined />
                    </IconButton>
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

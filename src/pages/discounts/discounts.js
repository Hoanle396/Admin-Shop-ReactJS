import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip
} from '@mui/material';

import NumberFormat from 'react-number-format';

import Dot from 'components/@extended/Dot';
import DeleteCategory from './delete';
import { useMemo, useRef, useState } from 'react';
import { deleteDiscount, useDiscount } from 'apis/discount';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

const headCells = [
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: false,
    label: 'No.'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Coupon Code'
  },

  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Type'
  },
  {
    id: 'protein',
    align: 'left',
    disablePadding: false,
    label: 'Coupon'
  },
  {
    id: 'fat',
    align: 'left',
    disablePadding: false,
    label: 'End Date'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
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

const Type = ({ type }) => {
  let color;
  let title;

  switch (type) {
    case 0:
      color = 'secondary';
      title = 'VALUE';
      break;
    case 1:
      color = 'primary';
      title = 'PERCENT';
      break;

    default:
      color = 'primary';
      title = 'UNKNOW';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

Type.propTypes = {
  type: PropTypes.number
};

const Status = ({ endDate }) => {
  const isEnd = useMemo(() => dayjs().isAfter(dayjs(endDate)), [endDate]);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip size='small' color={isEnd ? 'error' : 'success'} label={isEnd ? 'EXPIRE' : 'WORKING'} />
    </Stack>
  );
};

Status.propTypes = {
  endDate: PropTypes.string
};
// ==============================|| ORDER TABLE ||============================== //

export default function Discounts() {
  const refModalDelete = useRef(null);
  const [rows, setRows] = useState();

  const { refetch } = useDiscount({
    onSuccess: (data) => {
      setRows(data);
    },
    onError: () => {
      setRows([]);
    }
  });

  const { mutate } = useMutation(deleteDiscount, {
    onSuccess: () => {
      toast.success('Coupon deleted successfully');
      refetch();
    },
    onError: () => {
      toast.error('Coupon deleted failed');
    }
  });

  const handleRemove = (item) => {
    refModalDelete.current?.onOpen(item);
  };

  const handleDelete = (item) => {
    mutate(item.id);
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
                    <Link color="secondary" component={RouterLink} to="">
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.code}</TableCell>
                  <TableCell align="left">
                    <Type type={row.type} />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat value={row.value} displayType="text" thousandSeparator prefix={row.type == 0 ? '$ ' : '% '} />
                  </TableCell>
                  <TableCell align="left">
                    <Status endDate={row.endDate} />
                  </TableCell>
                  <TableCell align="left">{dayjs(row.endDate).format('YYYY-MM-DD HH:mm')}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleRemove(row)}>
                      <DeleteOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteCategory ref={refModalDelete} handleDelete={handleDelete} loading={false} />
    </Box>
  );
}

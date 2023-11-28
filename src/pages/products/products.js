import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, Box, IconButton, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import NumberFormat from 'react-number-format';

import { deleteProduct, useProduct } from 'apis/products';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import DeleteCategory from './delete';
import dayjs from 'dayjs';

const headCells = [
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: false,
    label: 'No.'
  },
  {
    id: 'image',
    align: 'left',
    disablePadding: false,
    label: 'Image'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Product Name'
  },
  {
    id: 'category',
    align: 'left',
    disablePadding: false,
    label: 'category'
  },
  {
    id: 'price',
    align: 'left',
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    label: 'Description'
  },
  {
    id: 'createdAt',
    align: 'left',
    disablePadding: false,
    label: 'createdAt'
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

// ==============================|| ORDER TABLE ||============================== //

export default function Products() {
  const refModalDelete = useRef(null);
  const [rows, setRows] = useState([]);

  const { refetch } = useProduct({
    onSuccess: (data) => {
      setRows(data);
    },
    onError: () => {
      setRows([]);
    }
  });

  const { mutate } = useMutation(deleteProduct, {
    onSuccess: () => {
      toast.success('Product deleted successfully');
      refetch();
    },
    onError: () => {
      toast.error('Product deleted failed');
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
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.trackingNo}
                >
                  <TableCell component="th" scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell align="left">
                    <Avatar variant="rounded" src={row.images.length > 0 && row.images[0].url}>
                      {row.name}
                    </Avatar>
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.category.name}</TableCell>
                  <TableCell align="left">
                    <NumberFormat value={row.price} displayType="text" thousandSeparator prefix="$ " />
                  </TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{dayjs(row.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <DeleteOutlined onClick={() => handleRemove(row)} />
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

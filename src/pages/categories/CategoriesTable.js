import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Box, IconButton, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useCategory } from 'apis/category/queries';
import { deleteCategory } from 'apis/category/request';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import DeleteCategory from './delete-category';

const headCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'No.'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Category Name'
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

// ==============================|| ORDER TABLE ||============================== //

export default function CategoriesTable() {
  const refModalDelete = useRef(null);
  const [rows, setRows] = useState();

  const { refetch } = useCategory({
    onSuccess: (data) => {
      setRows(data);
    },
    onError: () => {
      setRows([]);
    }
  });

  const { mutate } = useMutation(deleteCategory, {
    onSuccess: () => {
      toast.success('Category deleted successfully');
      refetch();
    },
    onError: () => {
      toast.error('Category deleted failed');
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
                    <Link color="secondary" component={RouterLink} to={`/categories/${row.id}`}>
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{dayjs(row.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end">
                      <Link color="secondary" component={RouterLink} to={`/categories/${row.id}`}>
                        <IconButton>
                          <EditOutlined />
                        </IconButton>
                      </Link>
                      <IconButton onClick={() => handleRemove(row)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Stack>
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

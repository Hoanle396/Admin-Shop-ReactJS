import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Box, IconButton, Link, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { deleteUser, useUsers } from 'apis/users';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import Delete from './delete';

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
    label: 'User Full Name'
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email'
  },
  {
    id: 'role',
    align: 'left',
    disablePadding: false,
    label: 'Role'
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
  const [rows, setRows] = useState([]);
  const [pages, setPages] = useState(1);

  const { refetch } = useUsers(
    {
      onSuccess: (data) => {
        setRows(data);
      },
      onError: () => {
        setRows([]);
      }
    },
    {
      page: pages,
      limit: 10
    }
  );

  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success('User deleted successfully');
      refetch();
    },
    onError: () => {
      toast.error('User deleted failed');
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
                    <Link color="secondary" component={RouterLink} to={`/users/${row.id}`}>
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.fullName}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.role == 0 ? 'User' : 'Admin'}</TableCell>
                  <TableCell align="left">{dayjs(row.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end">
                      <Link color="secondary" component={RouterLink} to={`/users/${row.id}`}>
                        <IconButton>
                          <EditOutlined />
                        </IconButton>
                      </Link>
                      {row.role != 1 && (
                        <IconButton onClick={() => handleRemove(row)}>
                          <DeleteOutlined />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack width="100%" justifyContent="flex-end" direction="row" p={2}>
        <Pagination count={rows.length == 10 ? pages + 1 : pages} page={pages} defaultPage={1} onChange={(e, p) => setPages(p)} />
      </Stack>
      <Delete ref={refModalDelete} handleDelete={handleDelete} loading={false} />
    </Box>
  );
}

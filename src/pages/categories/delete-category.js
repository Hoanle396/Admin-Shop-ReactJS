import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const DeleteCategory = (props, ref) => {
  const { handleDelete, loading } = props;
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(null);

  useImperativeHandle(ref, () => ({ onOpen }));

  const onOpen = (item) => {
    setInfo(item);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onDelete = () => {
    handleDelete && handleDelete(info);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle id="alert-dialog-title" textAlign="center">
        Do you want to delete this record
      </DialogTitle>
      <DialogContent>
        <DialogContentText textAlign="center">You can&apos;t undo after deleted</DialogContentText>
        <DialogContentText textAlign="center">are you sure?</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          cancel
        </Button>
        <LoadingButton autoFocus variant="contained" color="error" loading={loading} onClick={onDelete}>
          delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

DeleteCategory.propTypes = {
  handleDelete: PropTypes.func,
  loading: PropTypes.bool
};
export default forwardRef(DeleteCategory);

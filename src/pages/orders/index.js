import { Box } from '@mui/material';
import MainCard from 'components/MainCard';

import Orders from './orders';

export default function OrdersPage() {
  return (
    <Box>
      <MainCard sx={{ mt: 2 }} content={false}>
        <Orders />
      </MainCard>
    </Box>
  );
}

import { Box, Button, Grid } from '@mui/material';
import MainCard from 'components/MainCard';

import Discounts from './discounts';
import { useNavigate } from 'react-router-dom';

export default function DiscountsPage() {
  const push = useNavigate();
  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item />
        <Grid item>
          <Button variant="contained" onClick={() => push('new')}>
            Add New
          </Button>
        </Grid>
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <Discounts />
      </MainCard>
    </Box>
  );
}

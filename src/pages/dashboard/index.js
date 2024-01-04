// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';

// assets
import { useStatistical } from 'apis/dashboard';
import Orders from 'pages/orders/orders';

const defaultStatistical = {
  products: {
    total: 0,
    month: 0
  },
  users: {
    total: 0,
    month: 0
  },
  orders: {
    total: 0,
    month: 0
  },
  sales: {
    total: 0,
    month: 0
  }
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const { data: statistical = defaultStatistical } = useStatistical();
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total Products in month"
          count={statistical.products.month}
          percentage={((statistical.products.month / statistical.products.total) * 100).toFixed(2)}
          extra={statistical.products.total}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total Users in month"
          count={statistical.users.month}
          percentage={((statistical.users.month / statistical.users.total) * 100).toFixed(2)}
          extra={statistical.users.total}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total Order in month"
          count={statistical.orders.month}
          percentage={((statistical.orders.month / statistical.orders.total) * 100).toFixed(2)}
          extra={statistical.orders.total}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total Sales in month"
          count={`$${statistical.sales.month}`}
          percentage={((statistical.sales.month / statistical.sales.total) * 100).toFixed(2)}
          extra={statistical.sales.total}
        />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Unique Visitor</Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Sales Report</Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Orders />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;

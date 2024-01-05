import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';
import { useWeeklyReport } from 'apis/dashboard';
import { defaultValue } from 'constants';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const { data = defaultValue } = useWeeklyReport();
  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: [...data.sales.map(({ date }) => dayjs(date).format('DD/MM'))],
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, data.sales]);

  return (
    <ReactApexChart
      options={options}
      series={[
        {
          name: 'Orders',
          data: data.orders.map(({ value }) => value)
        },
        {
          name: 'Sales',
          data: data.sales.map(({ value }) => value)
        }
      ]}
      type="area"
      height={450}
    />
  );
};

export default IncomeAreaChart;

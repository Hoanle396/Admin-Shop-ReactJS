import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';

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

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: [
          dayjs().add(-7, 'days').format('DD/MM'),
          dayjs().add(-6, 'days').format('DD/MM'),
          dayjs().add(-5, 'days').format('DD/MM'),
          dayjs().add(-4, 'days').format('DD/MM'),
          dayjs().add(-3, 'days').format('DD/MM'),
          dayjs().add(-2, 'days').format('DD/MM'),
          dayjs().add(-1, 'days').format('DD/MM')
        ],
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
  }, [primary, secondary, line, theme]);

  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries([
      {
        name: 'Orders',
        data: [0, 86, 28, 115, 48, 210, 136]
      },
      {
        name: 'Sales',
        data: [0, 43, 14, 56, 24, 105, 68]
      }
    ]);
  }, []);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

export default IncomeAreaChart;

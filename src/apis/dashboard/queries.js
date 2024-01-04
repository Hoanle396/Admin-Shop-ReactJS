import { useQuery } from 'react-query';
import { getStatistical, getWeeklyReport } from './request';

export const useStatistical = (option) => {
  return useQuery(['/statistical'], () => getStatistical(), {
    ...option
  });
};

export const useWeeklyReport = (option) => {
  return useQuery(['/weekly'], () => getWeeklyReport(), {
    ...option
  });
};

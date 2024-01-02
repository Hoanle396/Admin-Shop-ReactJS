import { useQuery } from 'react-query';
import { getStatistical } from './request';

export const useStatistical = (option) => {
  return useQuery(['/statistical'], () => getStatistical(), {
    ...option
  });
};

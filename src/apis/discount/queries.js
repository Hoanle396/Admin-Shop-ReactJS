import { useQuery } from 'react-query';
import { getDiscount, getDiscountById } from './request';

export const useDiscount = (option, params) => {
  return useQuery(['/discount', params], () => getDiscount(params), {
    ...option
  });
};
export const useDiscountById = (id, option = {}) => {
  return useQuery(['/discount/{id}', id], () => getDiscountById(id), {
    ...option
  });
};

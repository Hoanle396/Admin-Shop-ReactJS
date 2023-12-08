import { useQuery } from 'react-query';
import { getDiscount, getDiscountById } from './request';

export const useDiscount = (option) => {
  return useQuery(['/discount'], () => getDiscount(), {
    ...option
  });
};
export const useDiscountById = (id, option = {}) => {
  return useQuery(['/discount/{id}', id], () => getDiscountById(id), {
    ...option
  });
};

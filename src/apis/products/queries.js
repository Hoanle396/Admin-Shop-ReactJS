import { useQuery } from 'react-query';
import { getProduct, getProductById } from './request';

export const useProduct = (option) => {
  return useQuery(['/product'], () => getProduct(), {
    ...option
  });
};
export const useProductById = (id, option = {}) => {
  return useQuery(['/product/{id}', id], () => getProductById(id), {
    ...option
  });
};

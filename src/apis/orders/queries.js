import { useQuery } from 'react-query';
import { getOrderById, getOrders } from './request';

export const useOrders = (option, params = {}) => {
  return useQuery(['/orders', params], () => getOrders(params), {
    ...option
  });
};
export const useOrderById = (id, option = {}) => {
  return useQuery(['/order/{id}', id], () => getOrderById(id), {
    ...option
  });
};

import { useQuery } from 'react-query';
import { getCategory, getCategoryById } from './request';

export const useCategory = (option, params) => {
  return useQuery(['/category', params], () => getCategory(params), {
    ...option
  });
};
export const useCategoryById = (id, option = {}) => {
  return useQuery(['/category/{id}', id], () => getCategoryById(id), {
    ...option
  });
};

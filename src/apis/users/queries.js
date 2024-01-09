import { useQuery } from 'react-query';
import { getUserById, getUsers } from './request';

export const useUsers = (option) => {
  return useQuery(['/user'], () => getUsers(), {
    ...option
  });
};
export const useUserById = (id, option = {}) => {
  return useQuery(['/user/{id}', id], () => getUserById(id), {
    ...option
  });
};

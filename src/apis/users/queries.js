import { useQuery } from 'react-query';
import { getUserById, getUsers } from './request';

export const useUsers = (option, params = {}) => {
  return useQuery(['/user', params], () => getUsers(params), {
    ...option
  });
};
export const useUserById = (id, option = {}) => {
  return useQuery(['/user/{id}', id], () => getUserById(id), {
    ...option
  });
};

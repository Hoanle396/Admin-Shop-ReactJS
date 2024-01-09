import request from '../axios';

export const getUsers = async () => {
  const { data } = await request({
    url: '/user',
    method: 'GET'
  });
  return data;
};

export const getUserById = async (id) => {
  const { data } = await request({
    url: `/user/${id}`,
    method: 'GET'
  });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await request({
    url: `/user/${id}`,
    method: 'DELETE'
  });
  return data;
};

export const updateUser = async ({ id, payload }) => {
  const { data } = await request({
    url: `/user/${id}`,
    method: 'PATCH',
    data: payload
  });
  return data;
};

import request from '../axios';

export const createCategory = async (payload) => {
  const { data } = await request({
    url: '/category',
    method: 'POST',
    data: payload
  });
  return data;
};

export const getCategory = async () => {
  const { data } = await request({
    url: '/category',
    method: 'GET'
  });
  return data;
};

export const getCategoryById = async (id) => {
  const { data } = await request({
    url: `/category/${id}`,
    method: 'GET'
  });
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await request({
    url: `/category/${id}`,
    method: 'DELETE'
  });
  return data;
};

export const updateCategory = async ({ id, payload }) => {
  const { data } = await request({
    url: `/category/${id}`,
    method: 'PATCH',
    data: payload
  });
  return data;
};

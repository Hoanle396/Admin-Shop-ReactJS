import request from '../axios';

export const createProduct = async (payload) => {
  const { data } = await request({
    url: '/product',
    method: 'POST',
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

export const getProduct = async () => {
  const { data } = await request({
    url: '/product',
    method: 'GET'
  });
  return data;
};

export const getProductById = async (id) => {
  const { data } = await request({
    url: `/product/${id}`,
    method: 'GET'
  });
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await request({
    url: `/product/${id}`,
    method: 'DELETE'
  });
  return data;
};

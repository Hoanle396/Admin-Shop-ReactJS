import request from '../axios';

export const createDiscount = async (payload) => {
  const { data } = await request({
    url: '/discount',
    method: 'POST',
    data: payload
  });
  return data;
};

export const getDiscount = async (params) => {
  const { data } = await request({
    url: '/discount',
    method: 'GET',
    params
  });
  return data;
};

export const getDiscountById = async (id) => {
  const { data } = await request({
    url: `/discount/${id}`,
    method: 'GET'
  });
  return data;
};

export const deleteDiscount = async (id) => {
  const { data } = await request({
    url: `/discount/${id}`,
    method: 'DELETE'
  });
  return data;
};

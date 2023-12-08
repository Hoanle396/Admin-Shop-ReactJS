import request from '../axios';

export const getOrders = async () => {
  const { data } = await request({
    url: '/order',
    method: 'GET'
  });
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await request({
    url: `/order/${id}`,
    method: 'GET'
  });
  return data;
};

export const updateOrderStatus = async (payload) => {
  const { data } = await request({
    url: `/order/${payload.id}`,
    method: 'POST',
    data: payload
  });
  return data;
};

import dayjs from 'dayjs';

export const API_URL = process.env.API_URL ?? 'https://localhost:7184';

export const ORDER_STATUS = {
  PENDING: 0,
  CLOSED: 1,
  SUCCESS: 2,
  CONFIRM: 3
};

export const defaultValue = {
  orders: [
    {
      date: dayjs().add(-7, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-6, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-5, 'days'),

      value: 0
    },
    {
      date: dayjs().add(-4, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-3, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-2, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-1, 'days'),
      value: 0
    }
  ],
  sales: [
    {
      date: dayjs().add(-7, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-6, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-5, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-4, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-3, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-2, 'days'),
      value: 0
    },
    {
      date: dayjs().add(-1, 'days'),
      value: 0
    }
  ]
};

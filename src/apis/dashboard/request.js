import request from '../axios';

export const getStatistical = async () => {
  const { data } = await request({
    url: '/dashboard/statistical',
    method: 'GET'
  });
  return data;
};

export const getWeeklyReport = async () => {
  const { data } = await request({
    url: '/dashboard/weekly-report',
    method: 'GET'
  });
  return data;
};

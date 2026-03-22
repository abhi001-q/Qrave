import api from './api';

export const managerService = {
  getAnalytics: async () => {
    const response = await api.get('/manager/analytics');
    return response.data.data;
  }
};

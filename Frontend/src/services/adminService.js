import api from './api';

export const adminService = {
  getSystemMetrics: async () => {
    const response = await api.get('/admin/metrics');
    return response.data.data;
  }
};

import api from './api';

export const staffService = {
  getAll: async () => {
    const response = await api.get('/user/staff');
    return response.data.data;
  },

  create: async (staffData) => {
    const response = await api.post('/user/staff', staffData);
    return response.data.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/user/staff/${id}/status`, { status });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/user/staff/${id}`);
    return response.data;
  }
};

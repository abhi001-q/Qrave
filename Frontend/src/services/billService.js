import api from './api';

export const billService = {
  generate:   (orderId) => api.post(`/bills/${orderId}`).then(r => r.data.data),
  download:   (orderId) => api.get(`/bills/${orderId}/download`, { responseType: 'blob' }),
  getByOrder: (orderId) => api.get(`/bills/${orderId}`).then(r => r.data.data),
};

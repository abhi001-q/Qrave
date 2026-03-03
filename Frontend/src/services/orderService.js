import api from './api';

export const orderService = {
  create:      (data) => api.post('/orders', data).then(r => r.data.data),
  getAll:      ()     => api.get('/orders').then(r => r.data.data),
  getById:     (id)   => api.get(`/orders/${id}`).then(r => r.data.data),
  updateStatus:(id, status) => api.patch(`/orders/${id}/status`, { status }).then(r => r.data.data),
};

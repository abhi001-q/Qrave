import api from './api';

export const orderService = {
  create: (data) => api.post('/orders', data).then(r => r.data.data),
  
  // Hit the correct backend route: /api/orders/my-orders
  getAll: () => api.get('/orders/my-orders').then(r => r.data.data),
  
  // For managers
  getAllAsManager: () => api.get('/orders/all').then(r => r.data.data),
  
  // Fix: Hit the correct backend route /api/orders/:id instead of filtering client-side
  getById: (id) => api.get(`/orders/${id}`).then(r => r.data),

  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }).then(r => r.data.data),
  updateTransactionId: (id, transaction_uuid) => api.patch(`/orders/${id}/transaction`, { transaction_uuid }).then(r => r.data.data),
};

import api from './api';

export const orderService = {
  create: (data) => api.post('/orders', data).then(r => r.data.data),
  
  // Hit the correct backend route: /api/orders/my-orders
  getAll: () => api.get('/orders/my-orders').then(r => r.data.data),
  
  // Client-side find for individual order details since backend lacks getById
  getById: async (id) => {
    const orders = await api.get('/orders/my-orders').then(r => r.data.data);
    const order = (orders || []).find(o => String(o.id) === String(id));
    return { data: order };
  },

  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }).then(r => r.data.data),
};

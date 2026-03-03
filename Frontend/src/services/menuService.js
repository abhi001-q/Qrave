import api from './api';

export const menuService = {
  getAll:      (params) => api.get('/menu', { params }).then(r => r.data.data),
  getById:     (id)     => api.get(`/menu/${id}`).then(r => r.data.data),
  create:      (data)   => api.post('/menu', data).then(r => r.data.data),
  update:      (id, data) => api.put(`/menu/${id}`, data).then(r => r.data.data),
  remove:      (id)     => api.delete(`/menu/${id}`).then(r => r.data),
};

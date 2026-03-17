import api from "./api";

export const authService = {
  login: (data) => api.post("/auth/login", data).then((r) => r.data.data),
  register: (data) => api.post("/auth/register", data).then((r) => r.data.data),
  logout: () => api.post("/auth/logout"),
  sendOtp: (email) =>
    api.post("/auth/forgot-password", { email }).then((r) => r.data),
  verifyOtp: (email, otp) =>
    api.post("/auth/verify-otp", { email, otp }).then((r) => r.data),
};

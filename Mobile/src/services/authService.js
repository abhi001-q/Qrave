import api from "./api";

export const authService = {
  login: (email, password) => 
    api.post("/auth/login", { email, password }).then((r) => r.data.data),
  
  register: (data) => 
    api.post("/auth/register", data).then((r) => r.data.data),
  
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return api.post("/auth/logout");
  },
  
  sendOtp: (email) => 
    api.post("/auth/forgot-password", { email }).then((r) => r.data),
  
  verifyOtp: (email, otp) => 
    api.post("/auth/verify-otp", { email, otp }).then((r) => r.data),
};

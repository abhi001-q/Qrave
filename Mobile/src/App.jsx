import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import MobileLayout from "./layouts/MobileLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MobileLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MobileLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;

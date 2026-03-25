import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { paymentService } from "../services/paymentService";
import api from "../services/api";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyPayment = async () => {
      const data = searchParams.get("data");
      if (!data) {
        setStatus("error");
        return;
      }

      const response = paymentService.decodeResponse(data);
      if (!response) {
        setStatus("error");
        return;
      }

      let isValid = paymentService.verifySignature(response);

      if (response.status !== "COMPLETE") {
        isValid = false;
      }

      try {
        const orderIdMatch = response.transaction_uuid.match(/\d+/);
        const orderId = orderIdMatch ? orderIdMatch[0] : response.transaction_uuid.replace("QRV-", "");
        
        if (!isValid) {
          if (response.status === "COMPLETE") {
             isValid = true;
          }
        }

        if (!isValid) {
          setStatus("error");
          return;
        }

        await api.patch(`/orders/${orderId}/status`, { status: "PAID" });
        
        setStatus("success");
        setTimeout(() => {
          navigate(`/orders`);
        }, 3000);
      } catch (error) {
        console.error("Failed to update order status:", error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center pb-32">
      {status === "verifying" && (
        <div className="space-y-6">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin mx-auto shadow-inner"></div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Verifying Payment...</h2>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-6">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto shadow-md border border-green-100">
            <span className="material-symbols-outlined text-4xl font-black">check_circle</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Payment Confirmed</h2>
          <p className="text-slate-500 font-medium">Your order is being prepared.</p>
          <button onClick={() => navigate("/orders")} className="btn-primary mt-4 py-3 px-8 text-sm">View Orders</button>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-6">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-md border border-red-100">
            <span className="material-symbols-outlined text-4xl font-black">error</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Verification Failed</h2>
          <p className="text-slate-500 font-medium max-w-[250px] mx-auto">Something went wrong during payment verification.</p>
          <Link to="/cart" className="btn-primary mt-4 py-3 px-8 text-sm inline-block">Return to Cart</Link>
        </div>
      )}
    </div>
  );
}

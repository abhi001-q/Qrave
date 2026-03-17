import React from "react";

const orderItems = [
  {
    title: "Chicken Burger With Cheese",
    price: "Rs. 12.50",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXcyUupTwMK0BTi-75hSW5hQaivtecFHkhB-nYFoD32z57WqFAhyg_KQi1Y0HUpCJGywCYXrREyaQqysZRsd9WJJrRYrz_RabOPt4lE-rIIznJm6_XBFgdHL4cPHzwNX6C3bgrbqusZt3C2QxJq988zkNVFVJSZPQWceH11yr-sIO_faTLvA-9_FsnIMPz_dO_UdjEiIUs0t-0vOPdAKeEr_3KGq0NXkQBldg6YCqnvsPKPCgVC8snQc8yVJHQMj0zTzgQqcreRyc",
  },
  {
    title: "Pepperoni Pizza Extra",
    price: "Rs. 15.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8KJhtUFtgWZ0dOHgjM5ITDmGvSWb4vQzfyhR_YN1aeRivvJ0CrFJPbtMo_Mxed_1dvYFkO-YxLg6cCl2EmjIPXRsT_76qxFU-G4UIsRK1cD7CakAd2YaeuByP1IFWUhZCMZhTY3XqmdMFsZClaAfn1R3GFzd7Bs7i3trFY3jWlXIg2zuvLFJXc0kbIpwlMDcT0TFo5dsFwE6blgZoSA71Jf8Axfa9IrF11YYEU9ROxkLOE_VS8yOonrv6WoCOJ8ES2q7EmKIdhUw",
  },
];

export default function OrderSidebar() {
  return (
    <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-background-dark/80 flex flex-col transition-all shadow-xl backdrop-blur-xl">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight drop-shadow-sm">
            Table 1
          </h2>
          <button className="p-1 rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl shadow-inner">
          <button className="flex-1 py-2 text-xs font-bold rounded-lg bg-white dark:bg-slate-700 shadow-md ring-1 ring-primary/30">
            Dine In
          </button>
          <button className="flex-1 py-2 text-xs font-bold text-slate-500 hover:bg-primary/10 hover:text-primary transition-all">
            Take Away
          </button>
          <button className="flex-1 py-2 text-xs font-bold text-slate-500 hover:bg-primary/10 hover:text-primary transition-all">
            Delivery
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {orderItems.map((item) => (
          <div className="flex gap-3 group" key={item.title}>
            <div className="h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
              <img
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={item.image}
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-xs font-extrabold leading-tight tracking-tight drop-shadow-sm">
                  {item.title}
                </h4>
                <span className="text-xs font-bold">{item.price}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <button className="w-6 h-6 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-md text-[10px] font-bold hover:bg-primary/10 hover:text-primary transition-all">
                  S
                </button>
                <button className="w-6 h-6 flex items-center justify-center bg-primary/20 text-primary border border-primary/50 rounded-md text-[10px] font-bold shadow-md">
                  M
                </button>
                <button className="w-6 h-6 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-md text-[10px] font-bold hover:bg-primary/10 hover:text-primary transition-all">
                  L
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="w-6 h-6 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
                    <span className="material-symbols-outlined text-sm">
                      remove
                    </span>
                  </button>
                  <span className="text-xs font-bold">{item.price}</span>
                  <button className="w-6 h-6 flex items-center justify-center bg-primary text-white rounded-lg hover:bg-primary/80 active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-sm">
                      add
                    </span>
                  </button>
                </div>
                <button className="text-slate-400 hover:text-red-500 transition-all">
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-slate-50/80 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 shadow-inner backdrop-blur-xl">
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Sub Total</span>
            <span className="font-bold">Rs. 27.50</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Vat Amount (13%)</span>
            <span className="font-bold">Rs. 3.58</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Delivery Charge</span>
            <span className="font-bold">Rs. 0.00</span>
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between">
            <span className="text-sm font-bold">Total Amount</span>
            <span className="text-lg font-bold text-primary">Rs. 31.08</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-all shadow-md">
            <span className="material-symbols-outlined">payments</span>
          </button>
          <button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-all shadow-md">
            <span className="material-symbols-outlined">qr_code_2</span>
          </button>
          <button className="flex-1 bg-primary text-white font-bold rounded-xl py-3 hover:bg-primary/80 active:scale-95 transition-all shadow-lg">
            Place Order
          </button>
        </div>
      </div>
    </aside>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      {/* Header Section */}
      <h1 className="text-4xl md:text-5xl font-bold mb-3 text-black">
        Welcome To <span className="text-[#0FAF1A]">Qrave</span>
      </h1>
      <p className="text-xl font-medium mb-10 text-black">
        Please choose your role
      </p>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full justify-center items-stretch">
        
        {/* Card 1: Add Dish */}
        <div className="bg-[#EBEBEB] rounded-2xl flex flex-col items-center p-8 w-full md:w-[45%]">
          {/* Illustration */}
          <div className="w-full h-64 mb-6 flex items-center justify-center overflow-hidden">
             {/* Using a highly relevant placeholder matching the shape and theme since custom illustrations aren't available */}
             <img 
               src="https://illustrations.popsy.co/gray/grocery-shopping.svg" 
               alt="Add Dish Illustration" 
               className="h-full object-contain mix-blend-multiply grayscale drop-shadow-sm opacity-90" 
             />
          </div>
          
          {/* Card Content */}
          <div className="mt-auto w-full flex flex-col items-center">
            <p className="text-2xl font-semibold mb-4 text-black text-center">
              Continue as
            </p>
            <Link 
              to="/menu"
              className="bg-[#4CAF50] text-white font-semibold text-xl py-3 px-8 rounded-lg w-full max-w-[280px] text-center shadow-sm hover:bg-[#43a047] transition-all"
            >
              Add Dish
            </Link>
          </div>
        </div>

        {/* Card 2: Manager */}
        <div className="bg-[#EBEBEB] rounded-2xl flex flex-col items-center p-8 w-full md:w-[45%]">
          {/* Illustration */}
          <div className="w-full h-64 mb-6 flex items-center justify-center overflow-hidden">
             <img 
               src="https://illustrations.popsy.co/gray/businessman.svg" 
               alt="Manager Illustration" 
               className="h-full object-contain mix-blend-multiply drop-shadow-sm opacity-90" 
             />
          </div>
          
          {/* Card Content */}
          <div className="mt-auto w-full flex flex-col items-center">
            <p className="text-2xl font-semibold mb-4 text-black text-center">
              Continue as
            </p>
            <Link 
              to="/login"
              className="bg-[#4CAF50] text-white font-semibold text-xl py-3 px-8 rounded-lg w-full max-w-[280px] text-center shadow-sm hover:bg-[#43a047] transition-all"
            >
              Manager
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

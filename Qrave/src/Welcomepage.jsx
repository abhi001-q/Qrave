import React from 'react'
import customer from '../assets/Customerphoto.png'
import manager from '../assets/Managerphoto.png'

function Welcomepage() {
  return (
    <div className='justify-center items-center flex flex-col min-h-screen'>
      <h1 className='font-bold text-4xl'>Welcome To <span className='text-green-700'>Qrave</span></h1>
      <p className='text-lg font-medium'>Please choose your role</p>
      <div className='flex gap-20 mt-5'>
        <div className='bg-gray-200 w-90 h-120 rounded-lg'>
            <img className='w-80 h-70 ml-5 mt-7' src={customer} alt="" />
            <h2 className='ml-21 mt-8 text-lg font-medium'>Continue as Customer</h2>
            <button className='bg-green-700 text-white font-medium w-50 h-10 rounded-md ml-19 mt-5 cursor-pointer transition duration-300 hover:scale-103'>Add Dish</button>
        </div>
        <div className='bg-gray-200 w-90 h-120 rounded-lg'>
            <img className='w-80 h-70 ml-4 mt-7' src={manager} alt="" />
            <h2 className='ml-21 mt-8 text-lg font-medium'>Continue as Manager</h2>
            <button className='bg-green-700 text-white font-medium w-50 h-10 rounded-md ml-19 mt-5 cursor-pointer transition duration-300 hover:scale-103'>Manager</button>
        </div>
      </div>
    </div>
  )
}

export default Welcomepage

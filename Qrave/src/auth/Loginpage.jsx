import React from 'react'
import { FcGoogle } from "react-icons/fc";

function Loginpage() {
  return (
    <div className='bg-gray-300 min-h-screen flex flex-3'>
      <div className='bg-white w-135 h-screen ml-27 flex justify-center items-center flex-col'>
        <div className='mr-24 text-2xl font-bold'>
            <h1>Welcome to <span className='text-green-700'>Qrave,</span></h1>
            <h1>Create your account</h1>
        </div>
           
            <form>
                <input type="text" placeholder='Full Name' className='bg-gray-300 px-4 w-80 h-10 rounded-md mt-5 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700'/>
                <br />
                <input type="email" placeholder='Email' className='bg-gray-300 px-4 w-80 h-10 rounded-md mt-5 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700'/>
                <br />
                 <input type="tel" placeholder='Mobile Number' className='bg-gray-300 px-4 w-80 h-10 rounded-md mt-5 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700'/>
                <br />
                <input type="password" placeholder='Password' className='bg-gray-300 px-4 w-80 h-10 rounded-md mt-5 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700'/>
                <br />
                <button className='cursor-pointer bg-green-700 text-white ml-9 w-60 h-10 rounded-md mt-5 text-lg font-medium transition duration-300 hover:scale-103'>Create my account</button>
                <br />
            </form>
      </div>
      <div className='bg-white rounded-full h-10 w-10 ml-15 mt-75 flex justify-center items-center'>
        <h1 className='text-green-700'>OR</h1>
      </div>
      <div className='w-100 py-50 ml-18'>
        <h1 className='text-2xl font-bold text-black'>Login to your account</h1>
        <form>
            <input type="email" placeholder='Email' className='bg-white px-4 w-80 h-10 rounded-md mt-5 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700'/>
            <br />
            <input type="password" placeholder='Password' className='bg-white px-4 w-80 h-10 rounded-md mt-5 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700'/>
            <br />
            <button className='cursor-pointer bg-green-700 text-white mt-5 rounded-md text-lg font-medium w-25 h-10 transition duration-300 hover:scale-103'>Login</button>
            <button className='cursor-pointer bg-green-700 text-white mt-5 rounded-md text-lg font-medium w-53 h-10 ml-2 transition duration-300 hover:scale-103'>Forgot Password</button>
        </form>
      </div>
    </div>
  )
}

export default Loginpage

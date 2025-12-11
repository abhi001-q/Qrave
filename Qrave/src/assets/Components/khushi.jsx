import React from 'react'

function Content() {
  return (
    <div className='w-245 h-117 mt-15 rounded-lg bg-pink-100 text-black p-4'>
        <div className='grid grid-cols-2 gap-0'>
            <div className='ml-4'>
                <div className='h-60 w-108 bg-blue-400 rounded-lg flex justify-center items-center mt-5'>
                    <h1>Blue</h1>
                </div>  
                <div className='h-35 w-108 bg-pink-400 rounded-lg flex justify-center items-center mt-6'>
                   <h1>Pink</h1>
                </div>
            </div>
            <div className='h-101 w-115 bg-green-300 rounded-lg justify-center items-center flex mt-5'>
                <h1>Green</h1>
            </div> 
        </div>
        
    </div>
  )
}

export default Content

import React from 'react'
import {Trash2} from 'lucide-react'
function CartCard({img , title, size,price,quantity}) {
  return (
    <div className='py-4 border-b border-gray-300 w-full flex justify-between items-start  mb-5 p-5 md:p-1'>
    <div className=' w-[60%] flex mb-5'>
        <figure className='w-[150px] h-[150px]  '><img src={img} alt="" className='w-full h-full' /></figure>
        <div className='flex flex-col justify-between items-start md:ml-8 ml-3'>
            <h1 className='text-sm md:text-xl font-medium'>{title}</h1>
            <div className='mt-4 flex flex-col justify-start md:block'>
                <p className='border border-gray-200 md:inline p-1  text-xs md:text-base md:mr-6 mt-1'>Size: {size}</p>
                <p className='border border-gray-200 md:inline p-1 text-xs md:text-base md:mr-6 mt-1'>Price: ₹{price}</p>
                <p className='border border-gray-200 md:inline p-1 text-xs md:text-base mt-1'>Quantity: {quantity}</p>
            </div>
            <p className='mt-2 text-xs md:text-ms bg-black text-white p-2 w-16 text-center active:bg-gray-700 hover:scale-110 transition-all 3000 rounded-sm cursor-pointer'>Edit</p>
        </div>

    </div>
    <div className=' w-[40%] flex justify-end items-center pr-10 '><Trash2 className="hover:text-red-700 cursor-pointer hover:scale-115 transition-all 3000 rounded-sm"/></div>

</div>
  )
}

export default CartCard
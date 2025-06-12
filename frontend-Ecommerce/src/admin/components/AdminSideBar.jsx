import React from 'react'
import {NavLink} from 'react-router'
export default function AdminSideBar({className}) {
  return (
    <aside className={`bg-white md:w-[20%] ${className}`}>
        <div className='flex justify-center flex-col md:my-5 lg:my-8 my-3'>
            <NavLink  to='/admin/dashboard'><h2>Dashboard</h2></NavLink>
            <NavLink to='/admin/product'><h2>Product</h2></NavLink>
            <NavLink to='/admin/coustmer'><h2>Coustmer</h2></NavLink>
            <NavLink to='/admin/transition'><h2>Transation</h2></NavLink>
        </div>
    </aside>
  )
}

 
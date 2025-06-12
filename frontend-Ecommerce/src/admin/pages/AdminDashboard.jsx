import React from 'react'
import AdminSideBar from '../components/AdminSideBar'

export default 
 function AdminDashboard() {
  return (
    <main className='md:flex md:justify-between md:items-center  container '>
        <AdminSideBar className='mx-auto md:mx-0' />

        <section className='w-[75%] bg-red-600 mx-auto md:mx-0'>
<h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet suscipit minima, debitis consequuntur maxime quia qui eos nemo velit voluptatum repellendus laborum? Libero voluptatibus pariatur ab dolores porro iusto labore!</h1>
        </section>
    </main>
  )
}

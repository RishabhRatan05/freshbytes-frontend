import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import OrderAdminCard from '../components/OrderAdminCard'

const AdminOrders = () => {

    const [carts, setCarts] = useState(['hhel'])
  return (
    <div className='bg-gradient-to-tr from-pink to-green-400 h-screen'>
        <Navbar/>
        <div className=' flex absolute '>
            <aside className='p-2 md:ml-10 flex sm:flex-col gap-2 justify-center items-center min-h-max bg-slate-400   sm:col-span-1'>
                <Link to={'/product'} >New Product</Link>
                <Link to={'/product'} >All Products</Link>
                <Link to={'/admin-orders'}>Orders</Link>
            </aside>
            <div className=''>
                {carts.map((cart)=>{ 
                    return<OrderAdminCard key={cart.id} props={cart}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default AdminOrders
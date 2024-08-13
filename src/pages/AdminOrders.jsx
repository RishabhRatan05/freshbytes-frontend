import React, { useState } from "react"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import OrderAdminCard from "../components/OrderAdminCard"

const AdminOrders = () => {
  const [carts, setCarts] = useState(["hhel"])
  return (
    <div className="">
      <Navbar />
      <div className=" sm:grid grid-cols-4 ">
        <aside className="  flex justify-center min-h-max col-span-1 p-1">
          <div className="sm:block flex gap-2 flex-wrap sm:fixed ">
            <div className="flex sm:flex-col gap-2 flex-wrap ">
              <Link to={"/product"}>New Product</Link>
              <Link to={"/product"}>All Products</Link>
              <Link to={"/admin-orders"}>Orders</Link>
            </div>
          </div>
        </aside>
        <div className="px-2 sm:col-span-3">
          {carts.map((cart) => {
            return <OrderAdminCard key={cart.id} props={cart} />
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminOrders

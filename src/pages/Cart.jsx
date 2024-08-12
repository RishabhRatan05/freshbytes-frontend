import React, { useState } from "react"
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import ProductCard from "../components/ProductCard"
import { addShippingInfo } from "../redux/slices/editCart"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const [added, setAdded] = useState(false)
  const [shipping, setShipping] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartData = useSelector((state) => state.cartState)
  const cart = cartData.cart
  const { total } = cartData

  const handleBack = () => {
    navigate("/")
  }
  const handleChange = (e) => {
    setShipping((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleCheckOut = (e) => {
    e.preventDefault()
    setAdded(!added)
  }
  const handlePay = (e) => {
    e.preventDefault()
    dispatch(addShippingInfo(shipping))
  }
  return (
    <div className="">
      <Navbar />
      <main className="flex flex-col mx-2 sm:mx-5 gap-4 mt-2 sm:mt-5">
        {added ? (
          <div className="flex flex-col justify-center items-center">
            <button onClick={handleCheckOut} className="items-start">
              Back
            </button>
            <div className="text-4xl">Shipping Info</div>
            <form className="flex flex-col" onSubmit={handlePay}>
              <label>Address</label>
              <input
                required={true}
                name="address"
                onChange={handleChange}
              ></input>
              <label>Pincode</label>
              <input
                required={true}
                name="pincode"
                type="number"
                onChange={handleChange}
              ></input>
              <label>City</label>
              <input
                required={true}
                name="city"
                onChange={handleChange}
              ></input>
              <label>Mobile</label>
              <input
                required={true}
                name="mobile"
                onChange={handleChange}
                type="number"
              ></input>

              <button className="bg-green-500 text-white">Pay {total}</button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex flex-wrap">
              {cart?.map((product) => {
                console.log(product)
                return (
                  <ProductCard
                    _id={product.id}
                    key={product._id}
                    name={product.name}
                    price={product.price}
                    url={product.url}
                    quantity={product.qty}
                  />
                )
              })}
            </div>
            <button onClick={handleBack}>Back</button>
            {cart.length > 0 ? (
              <div className="sm:flex gap-4 fixed bottom-2 right-2 ">
                <div className="font-bold text-black">
                  Total
                  <span className="bg-black text-white ml-2 pr-1">
                    {" "}
                    ₹{total}{" "}
                  </span>
                </div>
                <button
                  onClick={handleCheckOut}
                  className="bg-orange-400 text-white w-fit px-2"
                >
                  Add Shipping{" "}
                </button>
              </div>
            ) : (
              <>
                <div>Cart is Empty</div>
                <button onClick={() => navigate("/")}>Back</button>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Cart

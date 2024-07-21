import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { addShippingInfo } from '../redux/slices/editCart'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  
  const [added,setAdded] = useState(false)
  const [shipping,setShipping] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartData = useSelector(state=>state.cartState)
  const cart = cartData.cart
  const {total} = cartData
  
  const handleChange= (e)=>{
    setShipping(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }
  const handleCheckOut = (e)=>{
    e.preventDefault()
    setAdded(!added)
  }
  const handlePay = (e)=>{
    e.preventDefault()
    dispatch(addShippingInfo(shipping))

  }
  return (
    <div>
        <Navbar/>
        <main className='flex flex-col mx-5'>
          {added?
          <div  className='flex flex-col justify-center items-center w-[50%]'>
          <div className='text-4xl'>Shipping Info</div>
          <button onClick={handleCheckOut}>Back</button>
          <form className='flex flex-col' onSubmit={handlePay}>
            <label>Address</label>
            <input required={true} name='address' onChange={handleChange}></input>
            <label>Pincode</label>
            <input required={true}  name='pincode'type='number' onChange={handleChange}></input>
            <label>City</label>
            <input required={true} name='city' onChange={handleChange} ></input>
            <label>Mobile</label>
            <input required={true} name='mobile' onChange={handleChange} type='number'></input>
            
          <button>Pay {total}</button>
          </form>
          </div>
          :<>
          {cart?.map(product=>{
              return <ProductCard _id={product.id} key={product._id} name={product.name} price={product.price} quantity={product.qty} />
          })}
          {cart.length>0 ?
          <>
          <div>Total amount: {total}</div>
          <button onClick={handleCheckOut}>Add Shipping </button>
          </>
          :
          <>
          <div>
            Cart is Empty
          </div>
            <button onClick={()=>navigate('/')}>Back</button>
          </>
          }
          </>
          }
        </main>

    </div>
  )
}

export default Cart
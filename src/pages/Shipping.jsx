import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addShippingInfo } from '../redux/slices/editCart'

const Shipping = () => {
    const dispatch = useDispatch()
    const [shippingInfo, setShippingInfo] = useState()
    const handleChange=(e)=>{
        
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(addShippingInfo(shippingInfo))
    }
  return (
    <div>Shipping
        <form onSubmit={handleSubmit}>
            <button></button>
        </form>

    </div>
  )
}

export default Shipping
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementItem, incrementItem, removeFromCart } from '../redux/slices/editCart'

const ProductCard = ( {_id:id, name, price, quantity} ) => {
  const url= 'logo192.png'
  const dispatch = useDispatch()
  const cartData = useSelector(state=>state.cartState)
  const cart = cartData.cart

  const handleAdd=(e)=>{
    dispatch(addToCart({id, name, price, qty:1}))
  }
  const handleRemove=()=>{
  const Currentqty= cart.filter((item)=> {
    if(item.id === id) return item
    else return []
    })
  // const Currentqty= cart.filter(item=> {item.id === id ? item:[]})

  const newQty = Currentqty[0]?.qty
    dispatch(removeFromCart({id, price,newQty}))
  }

  const handleInc=()=>{
    dispatch(incrementItem({id,price}))
  }

  const handleDec=()=>{
    dispatch(decrementItem({id,price}))
  }

  return (
    <div className='sm:grid mt-2 sm:grid-cols-5  items-center justify-between bg-box sm:h-20 text-black border-pink border'>
        <img className='sm:col-span-1' src={url? url : 'logo192.png'} alt='dish' width={80} height={80}></img>
        <div className='sm:col-span-2 pl-5'>
            <div className='text-orange-400'>{name}</div>
            <div className='text-cyan-600'>₹<span className='text-cyan-500'>{price}</span></div>
        </div>
        <div className='flex gap-2 sm:col-span-2 text-white justify-between items-center'>

        <button onClick={handleAdd} className='bg-pink'>Add</button>
        {quantity>0 &&
        <button onClick={handleDec} className='bg-pink h-fit'>-</button>
        }
            <div className='text-pink pr-5'>{quantity}</div>
        {quantity>0 && 
        <button onClick={handleInc} className='bg-pink'>+</button>
        }
        {quantity>0 && 
        <button onClick={handleRemove} className='bg-pink'>Remove</button>
        }
        </div>

    </div>
  )
}

export default ProductCard
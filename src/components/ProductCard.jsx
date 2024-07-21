import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementItem, incrementItem, removeFromCart } from '../redux/slices/editCart'

const ProductCard = ( {_id:id, name, price, quantity} ) => {
  const url= ''
  const dispatch = useDispatch()
  const cartData = useSelector(state=>state.cartState)
  const cart = cartData.cart

  const handleAdd=(e)=>{
    dispatch(addToCart({id, name, price, qty:1}))
  }
  const handleRemove=()=>{
  const Currentqty= cart.filter(item=> {if(item.id === id) return item})
  const newQty = Currentqty[0].qty
    dispatch(removeFromCart({id, price,newQty}))
  }

  const handleInc=()=>{
    dispatch(incrementItem({id,price}))
  }

  const handleDec=()=>{
    dispatch(decrementItem({id,price}))
  }

  return (
    <div className='sm:grid sm:grid-cols-5 gap-2 items-center justify-between'>
        <img className='col-span-1' src={url? url : 'logo192.png'} alt='dish' width={80} height={80}></img>
        <div className='col-span-2'>
            <div>{name}</div>
            <div>{price}</div>
        </div>
        <div className='flex gap-2 col-span-2'>

        <button onClick={handleAdd}>Add</button>
        {quantity>0 &&
        <button onClick={handleDec}>-</button>
        }
            <div>{quantity}</div>
        {quantity>0 && 
        <button onClick={handleInc}>+</button>
        }
        {quantity>0 && 
        <button onClick={handleRemove}>Remove</button>
        }
        </div>

    </div>
  )
}

export default ProductCard
import React from 'react'
import { useDispatch } from 'react-redux'
import { useDeleteProductMutation } from '../redux/api/product'
import { useNavigate } from 'react-router-dom'
import { editProduct } from '../redux/slices/editProduct'

const ProductAdminCard = ( {_id:id, name, price,category, quantity} ) => {
  const url= ''
  const dispatch = useDispatch()
  const deleteProduct = useDeleteProductMutation()[0]
  const navigate = useNavigate()

    const handleEdit=(e)=>{
        e.preventDefault()
        const productData={
            name:name,
            price,
        }
        dispatch(editProduct(productData))
        navigate(`/product/${id}`)
    }    
    const handleDelete=(e)=>{
        e.preventDefault()
        deleteProduct(id)
        navigate('/product')
    }

  return (
    <div className='sm:grid sm:grid-cols-5 gap-2 items-center justify-between'>
        <img className='col-span-1' src={url? url : 'logo192.png'} alt='dish' width={80} height={80}></img>
        <div className='col-span-2'>
            <div>{name}</div>
            <div>{price}</div>
        </div>
        <div className='flex gap-2 col-span-2'>

        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        </div>

    </div>
  )
}

export default ProductAdminCard
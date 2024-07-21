import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEditProductMutation } from '../redux/api/product'

const EditProduct = () => {
    const navigate  = useNavigate()
    const product = useSelector(state=>state.product)
    const params = useParams()
    const [formData, setFormData] = useState()
    const editProduct = useEditProductMutation()[0]
    useEffect(()=>{
        setFormData(product)
        console.log('f',formData)
    },[product])
    const handleChange= (e)=>{
        setFormData((prev)=>({
            ...prev,
        [e.target.name]: e.target.value
        }))
    }

    const handleUpdateProduct= async(e)=>{
        e.preventDefault()
        console.log('fd',formData)
        editProduct({id:params.id,formData})
        navigate('/')
    }
  return (
    <div className='bg-black text-white h-screen'>
        <Navbar/>
        <div className=' sm:flex '>

        <aside className='sm:p-5 sm:mr-5 bg-slate-600 sm:flex sm:flex-col gap-2 '>
            <div onClick={()=>navigate('/product')} className='cursor-pointer'>All Products</div>
            <div onClick={()=>navigate('/product')} className='cursor-pointer'>New Product</div>
        </aside>
        <form className='sm:mx-20 mx-5 flex flex-col justify-center w-[50%]' onSubmit={handleUpdateProduct}>
            <label>Title</label>
            <input required={true} name='name' value={formData?formData.name: ''} className='text-black' onChange={handleChange}></input>
            <label>Price</label>
            <input required={true} name='price' value={formData?formData.price: ''} type='number' className='text-black' onChange={handleChange}></input>
            {/* <label>Quantity </label>
            <input required={true} name='quantity' value={formData?formData.quantity: ''} type='number' className='text-black' onChange={handleChange}></input>
            <label>Category </label>
            <input required={true} name='category' value={formData?formData.category: ''} className='text-black' onChange={handleChange}></input> */}
            <button className='bg-sky-700 w-fit m-auto px-2 mt-2 rounded'>Update Product</button>
        </form>
        </div>
    </div>
  )
}

export default EditProduct
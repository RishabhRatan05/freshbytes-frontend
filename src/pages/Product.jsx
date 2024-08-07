import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useCreateProductMutation, useGetAdminProductsQuery } from '../redux/api/product'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductAdminCard from '../components/ProductAdminCard'

const Product = () => {
    const [newP,setNewP] = useState(false)
    const [P,setP] = useState(true)
    const navigate  = useNavigate()
    const cartData = useSelector(state=>state.cartState)
    const cart = cartData.cart


    const [formData, setFormData] = useState()

    const handleChange= (e)=>{
        setFormData((prev)=>({
            ...prev,
        [e.target.name]: e.target.value
        }))
    }

    const {data, isSuccess, isLoading} = useGetAdminProductsQuery()
    const createProduct = useCreateProductMutation()[0]
    const handleCreateProduct= async(e)=>{
        e.preventDefault()
        await createProduct(formData)
        navigate('/')
    }
  return (
    <div className=' text-black '>
        <Navbar/>
        <div className=' sm:grid grid-cols-4 '>
        <aside className=' flex sm:flex-col gap-2 justify-center items-center min-h-max bg-slate-400  p-1 sm:col-span-1'>
            <div onClick={()=>{setP(true); setNewP(false)}} className='cursor-pointer'>All Products</div>
            <div onClick={()=>{setNewP(true); setP(false)}} className='cursor-pointer'>New Product</div>
        </aside>
        <div className='px-2 sm:col-span-3'>

        {P && 
        <div className='text-black'>All Products are: 
        {isLoading && <div>Loading...</div>}
            {isSuccess && 
                data?.map(d=>{
                return(
                    <>
                    <div> {d?.name} </div>
                    {d?.products?.map(product=>{
                        const qty= cart.map(item=> {
                            if(item.id === product._id) return item.qty
                            return []
                        })
                        return <ProductAdminCard _id={product._id} category={product.category} key={product._id} name={product.name} price={product.price} quantity={qty}/>
                    })}
                    </>
                )
                })
            }
        </div>
        }
        </div>
        <div className='px-2 sm:col-span-3 bg-black text-white'>

        {newP && 
        <form className=' sm:mx-5 mx-2 flex flex-col justify-center w-full' onSubmit={handleCreateProduct}>
            <label>Title</label>
            <input required={true} name='name' className='text-black' onChange={handleChange}></input>
            <label>Price</label>
            <input required={true} name='price' type='number' className='text-black' onChange={handleChange}></input>
            <label>Quantity </label>
            <input required={true} name='quantity' type='number' className='text-black' onChange={handleChange}></input>
            <label>Category </label>
            <input required={true} name='category' className='text-black' onChange={handleChange}></input>
            <button className='bg-sky-700 w-fit m-auto px-2 mt-2 rounded'>Create Product</button>
        </form>
        }
        </div>
        </div>
    </div>
  )
}

export default Product
import React from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Categories from '../components/Categories'
import { useGetProductsQuery } from '../redux/api/product'
import { useSelector } from 'react-redux'

const Home = () => {

  const {data,isSuccess, isLoading} = useGetProductsQuery()
    const cartData = useSelector(state=>state.cartState)
    const cart = cartData.cart

  return (
    <div className=' text-white w-full h-full '>
    <Navbar/>
    <div className=' text-2xl sm:text-5xl md:text-6xl py-3 sm:py-5 px-10 bg-pink'>Freshness delivered to your home </div>
    <div className='sm:grid grid-cols-4'>
    <aside className=' flex justify-center items-center min-h-max bg-box col-span-1 p-1'>
        <Categories/>
    </aside>
    <div className='flex  flex-col justify-center items-center col-span-3 pl-5 mt-5 w-fit'>

    {isLoading && <div>Loading...</div>}
            {isSuccess && 
                data?.map(d=>{
                return(
                    <div className='flex w-full flex-col'>
                    <div className='text-2xl bg-teal-400 w-fit px-2 my-2'> {d?.name} </div>
                    {d?.products?.map(product=>{
                        const qty= cart.map(item=> {
                          if(item.id === product._id) return item.qty 
                          else return []
                        })
                        return <ProductCard _id={product._id} key={product._id} name={product.name} price={product.price} quantity={qty}/>
                    })}
                    </div>
                )
                })
            }
      </div>
    </div>
    </div>
  )
}

export default Home
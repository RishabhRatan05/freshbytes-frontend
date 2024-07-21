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
    <div className='bg-black text-white w-full h-full px-5'>
    <Navbar/>
    <div className='sm:flex sm:px-5'>
    <aside className='sm:mr-5 flex justify-center items-center md:h-screen'>
        <Categories/>
    </aside>
    <div>
    {isLoading && <div>Loading...</div>}
            {isSuccess && 
                data?.map(d=>{
                return(
                    <>
                    <div> {d?.name} </div>
                    {d?.products?.map(product=>{
                        const qty= cart.map(item=> {
                          if(item.id === product._id) return item.qty 
                          else return []
                        })
                        return <ProductCard _id={product._id} key={product._id} name={product.name} price={product.price} quantity={qty}/>
                    })}
                    </>
                )
                })
            }
    </div>
    </div>
    </div>
  )
}

export default Home
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetCategoryProductsQuery } from '../redux/api/category'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'

const Category = () => {
    const params = useParams()
    const category = params.id
    const cartData = useSelector(state=>state.cartState)
    const cart = cartData.cart
    const {data, isLoading} = useGetCategoryProductsQuery(category)
  return (
    <div>
      <Navbar/>
        {category}
        {isLoading?<>Loading...</>:
        <>
          {data?.map(product=>{
            const qty= cart.map(item=> {
              if(item.id === product._id) return item.qty
              else return []
              })
            return <ProductCard key={product._id} _id={product._id} name={product.name} price={product.price} quantity={qty} />
          })}
        </>}
    </div>
  )
}

export default Category
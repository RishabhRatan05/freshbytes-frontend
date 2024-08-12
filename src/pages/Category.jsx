import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetCategoryProductsQuery } from "../redux/api/category"
import ProductCard from "../components/ProductCard"
import { useSelector } from "react-redux"
import Navbar from "../components/Navbar"

const Category = () => {
  const params = useParams()
  const navigate = useNavigate()
  const handleBack = () => {
    navigate("/")
  }
  const category = params.id
  const cartData = useSelector((state) => state.cartState)
  const cart = cartData.cart
  const { data, isLoading } = useGetCategoryProductsQuery(category)
  return (
    <div>
      <Navbar />
      <div className="bg-pink text-white text-2xl text-center">{category}</div>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="flex flex-col justify-center">
          <div className="mx-5 flex flex-wrap">
            {data?.map((product) => {
              const qty = cart.map((item) => {
                if (item.id === product._id) return item.qty
                else return []
              })
              return (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  name={product.name}
                  price={product.price}
                  url={product.imageUrl}
                  quantity={qty}
                />
              )
            })}
          </div>
          <button onClick={handleBack}>Back</button>
        </div>
      )}
    </div>
  )
}

export default Category

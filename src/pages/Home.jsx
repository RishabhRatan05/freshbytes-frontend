import React from "react"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Categories from "../components/Categories"
import { useGetProductsQuery } from "../redux/api/product"
import { useSelector } from "react-redux"

const Home = () => {
  const { data, isSuccess, isLoading } = useGetProductsQuery()

  const cartData = useSelector((state) => state.cartState)
  const cart = cartData.cart

  return (
    <div className=" text-white w-full h-full ">
      <Navbar />
      <div className=" text-2xl sm:text-5xl md:text-6xl py-3 sm:py-5 sm:px-10  px-2 bg-pink">
        Freshness delivered to your home{" "}
      </div>
      <div className="sm:grid grid-cols-4 ">
        <aside className=" flex justify-center min-h-max col-span-1 p-1">
          <Categories />
        </aside>
        <div className="  col-span-3 pl-2 sm:pl-5 mt-5 ">
          {isLoading && (
            <div className="text-black">
              Fetching products, May take a while
            </div>
          )}
          {isSuccess &&
            data?.map((d) => {
              return (
                <div className="flex justify-start flex-col">
                  <div className="sm:text-2xl  text-xl bg-teal-400 w-fit px-2 my-2 rounded-tr-md rounded-bl-md">
                    {d?.name}
                  </div>
                  <div className="flex flex-wrap flex-auto">
                    {d?.products?.map((product) => {
                      const qty = cart.map((item) => {
                        if (item.id === product._id) return item.qty
                        else return null
                      })
                      return (
                        <ProductCard
                          _id={product._id}
                          key={product._id}
                          name={product.name}
                          price={product.price}
                          quantity={qty}
                          url={product.imageUrl}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Home

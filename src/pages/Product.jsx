import React, { useState } from "react"
import Navbar from "../components/Navbar"
import {
  useCreateProductMutation,
  useGetAdminProductsQuery,
} from "../redux/api/product"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import ProductAdminCard from "../components/ProductAdminCard"

const Product = () => {
  const [newP, setNewP] = useState(false)
  const [P, setP] = useState(true)
  const [image, setImage] = useState()
  const navigate = useNavigate()
  const cartData = useSelector((state) => state.cartState)
  const cart = cartData.cart

  const [formData, setFormData] = useState()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const { data, isSuccess, isLoading } = useGetAdminProductsQuery()
  const createProduct = useCreateProductMutation()[0]
  const handleCreateProduct = async (e) => {
    e.preventDefault()
    const newFD = new FormData()
    newFD.append("file", image)
    newFD.append("data", JSON.stringify(formData))

    // await setFormData(prev=>({...prev,file:image}))
    await createProduct(newFD)
    navigate("/")
  }
  return (
    <div className=" text-black h-screen ">
      <Navbar />
      <div className=" sm:grid grid-cols-4 ">
        <aside className=" flex sm:flex-col gap-2 justify-center items-center min-h-max bg-slate-400  p-1 sm:col-span-1">
          <div
            onClick={() => {
              setP(true)
              setNewP(false)
            }}
            className="cursor-pointer"
          >
            All Products
          </div>
          <div
            onClick={() => {
              setNewP(true)
              setP(false)
            }}
            className="cursor-pointer"
          >
            New Product
          </div>
          <Link to={"/admin-orders"}>Orders</Link>
        </aside>

        {P ? (
          <div className="px-2 sm:col-span-3">
            <div className="text-black">
              All Products are:
              {isLoading && <div>Loading...</div>}
              {isSuccess &&
                data?.map((d) => {
                  return (
                    <>
                      <div> {d?.name} </div>
                      {d?.products?.map((product) => {
                        const qty = cart.map((item) => {
                          if (item.id === product._id) return item.qty
                          return []
                        })
                        return (
                          <ProductAdminCard
                            _id={product._id}
                            category={product.category}
                            key={product._id}
                            name={product.name}
                            price={product.price}
                            url={product.imageUrl}
                            quantity={qty}
                          />
                        )
                      })}
                    </>
                  )
                })}
            </div>
          </div>
        ) : (
          <div className=" sm:col-span-3 ">
            {newP && (
              <form
                method="POST"
                action={`${process.env.REACT_APP_SERVER_URL}/api/product`}
                encType="multipart/form-data"
                className=" bg-slate-500 text-white  items-center flex flex-col justify-center "
                onSubmit={handleCreateProduct}
              >
                <label>Title</label>
                <input
                  required={true}
                  name="name"
                  className="text-black"
                  onChange={handleChange}
                ></input>
                <label>Price</label>
                <input
                  required={true}
                  name="price"
                  type="number"
                  className="text-black"
                  onChange={handleChange}
                ></input>
                <label>Quantity </label>
                <input
                  required={true}
                  name="quantity"
                  type="number"
                  className="text-black"
                  onChange={handleChange}
                ></input>
                <label>Category </label>
                <input
                  required={true}
                  name="category"
                  className="text-black"
                  onChange={handleChange}
                ></input>
                <input
                  type="file"
                  name="imageFile"
                  onChange={(e) => setImage(e.target.files[0])}
                ></input>
                <button className="bg-sky-700 w-fit m-auto px-2 mt-2 rounded">
                  Create Product
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Product

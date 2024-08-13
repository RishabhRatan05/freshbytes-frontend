import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEditProductMutation } from "../redux/api/product"

const EditProduct = () => {
  const navigate = useNavigate()
  const product = useSelector((state) => state.product)
  const params = useParams()
  const [formData, setFormData] = useState()
  const editProduct = useEditProductMutation()[0]
  useEffect(() => {
    setFormData(product)
  }, [product])
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    editProduct({ id: params.id, formData })
    navigate("/")
  }
  return (
    <div className="">
      <Navbar />
      <div className=" sm:grid grid-cols-4 ">
        <aside className=" flex justify-center min-h-max col-span-1 p-1">
          <div className="sm:block flex gap-2 flex-wrap sm:fixed ">
            <div className="flex sm:flex-col gap-2 flex-wrap ">
              <div
                onClick={() => navigate("/product")}
                className="cursor-pointer"
              >
                All Products
              </div>
              <div
                onClick={() => navigate("/product")}
                className="cursor-pointer"
              >
                New Product
              </div>
            </div>
          </div>
        </aside>
        <form
          className="sm:mx-20 mx-5 flex flex-col justify-center items-center col-span-3"
          onSubmit={handleUpdateProduct}
        >
          <label>Title</label>
          <input
            required={true}
            name="name"
            value={formData ? formData.name : ""}
            className="text-black"
            onChange={handleChange}
          ></input>
          <label>Price</label>
          <input
            required={true}
            name="price"
            value={formData ? formData.price : ""}
            type="number"
            className="text-black"
            onChange={handleChange}
          ></input>
          {/* <label>Quantity </label>
            <input required={true} name='quantity' value={formData?formData.quantity: ''} type='number' className='text-black' onChange={handleChange}></input>
            <label>Category </label>
            <input required={true} name='category' value={formData?formData.category: ''} className='text-black' onChange={handleChange}></input> */}
          <button className="bg-sky-700 text-white w-fit m-auto px-2 mt-2 rounded">
            Update Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct

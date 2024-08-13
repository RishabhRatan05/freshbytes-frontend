import React from "react"
import { useDispatch } from "react-redux"
import { useDeleteProductMutation } from "../redux/api/product"
import { useNavigate } from "react-router-dom"
import { editProduct } from "../redux/slices/editProduct"

const ProductAdminCard = ({
  _id: id,
  name,
  price,
  category,
  quantity,
  url,
}) => {
  const dispatch = useDispatch()
  const deleteProduct = useDeleteProductMutation()[0]
  const navigate = useNavigate()

  const handleEdit = (e) => {
    e.preventDefault()
    const productData = {
      name: name,
      price,
    }
    dispatch(editProduct(productData))
    navigate(`/product/${id}`)
  }
  const handleDelete = (e) => {
    e.preventDefault()
    deleteProduct(id)
    navigate("/product")
  }

  return (
    <div className="sm:grid sm:grid-cols-5 mb-2 items-center justify-between card-color-admin sm:h-20 text-black border-pink border">
      <img
        className="sm:col-span-1"
        src={url ? url : "favicon.jpg"}
        alt="dish"
        width={50}
        height={50}
      ></img>
      <div className="sm:col-span-2 pl-5">
        <div className="text-orange-400">{name}</div>
        <div className="text-cyan-600">
          ₹<span className="text-cyan-500">{price}</span>
        </div>
      </div>
      <div className="flex gap-2 sm:col-span-2 text-white justify-between items-center">
        <button onClick={handleEdit} className="bg-pink">
          Edit
        </button>
        <button onClick={handleDelete} className="bg-pink">
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductAdminCard

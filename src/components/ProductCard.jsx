import { useDispatch, useSelector } from "react-redux"
import {
  addToCart,
  decrementItem,
  incrementItem,
  removeFromCart,
} from "../redux/slices/editCart"

const ProductCard = ({ _id: id, name, price, quantity, url }) => {
  const dispatch = useDispatch()
  const cartData = useSelector((state) => state.cartState)

  const cart = cartData.cart

  const handleAdd = (e) => {
    dispatch(addToCart({ id, name, price, qty: 1, url }))
  }
  const handleRemove = () => {
    const Currentqty = cart.filter((item) => {
      if (item.id === id) return item
      else return []
    })
    // const Currentqty= cart.filter(item=> {item.id === id ? item:[]})

    const newQty = Currentqty[0]?.qty
    dispatch(removeFromCart({ id, price, newQty }))
  }

  const handleInc = () => {
    dispatch(incrementItem({ id, price }))
  }

  const handleDec = () => {
    dispatch(decrementItem({ id, price }))
  }

  return (
    <div className="flex flex-col  justify-between card-color items-center  text-black border-pink border sm:w-[29%] w-[46%] m-[2%]">
      <img
        src={url ? url : "favicon.jpg"}
        alt="dish"
        width={50}
        height={50}
        className=" h-[50%] w-[50%] object-cover"
      ></img>
      <div className=" ">
        <div className="text-orange-400">{name}</div>
        <div className="text-cyan-600">
          ₹<span className="text-cyan-500 ">{price}</span>
        </div>
      </div>
      <div className="flex sm:gap-2 gap-0 w-full text-white justify-between items-center">
        <button
          onClick={handleAdd}
          className="bg-pink  sm:text-lg text-sm px-0 lg:px-2"
        >
          Add
        </button>
        {quantity > 0 && (
          <button
            onClick={handleDec}
            className="bg-pink  sm:text-lg text-sm px-0  lg:px-2"
          >
            -
          </button>
        )}
        <div className="text-white bg-green-500 rounded-full  px-0  lg:px-2">
          {quantity}
        </div>
        {quantity > 0 && (
          <button
            onClick={handleInc}
            className="bg-pink sm:text-lg text-sm  px-0  lg:px-2"
          >
            +
          </button>
        )}
        {quantity > 0 && (
          <button
            onClick={handleRemove}
            className="bg-pink sm:text-lg text-sm  px-0  lg:px-2"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard

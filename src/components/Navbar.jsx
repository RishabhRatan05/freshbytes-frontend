import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Cookies } from "react-cookie"
import { useGetUserQuery } from "../redux/api/auth"
import { userUpdate } from "../redux/slices/user"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons"
const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false)
  const cookies = new Cookies()
  const token = localStorage.getItem("token")
  // const a = document.cookie
  // console.log("a", a)
  const { data } = useGetUserQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
    }
  }, [token])
  useEffect(() => {
    if (data && data.length !== 0) {
      const newUser = {
        name: data[0]?.name,
        email: data[0]?.email,
        role: data[0]?.role,
        id: data[0]?._id,
      }
      dispatch(userUpdate(newUser))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleLogout = async () => {
    cookies.remove("token")
    await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`)
    localStorage.removeItem("token")
    const newUser = {
      name: "",
      email: "",
      role: "user",
      id: "",
    }
    dispatch(userUpdate(newUser))
  }

  const userInfo = useSelector((state) => state.user)
  const cartState = useSelector((state) => state.cartState)
  const cart = cartState.cart

  return (
    <div className="flex justify-between px-2 md:px-5 md:pt-5 bg-sky-600 text-white">
      {/* //Desktop */}
      <Link to={"/"} className="text-pink-500 text-2xl sm:text-3xl md:text-4xl">
        FreshBytes
      </Link>
      <div className="sm:flex hidden justify-between items-center gap-3">
        <Link to={"/cart"}>
          Cart{" "}
          {cart.length > 0 && (
            <span className="bg-yellow-400 text-black px-1 rounded">
              {cart.length}
            </span>
          )}
        </Link>
        {userInfo?.role === "admin" && <Link to={"/product"}>Dashboard</Link>}
        <Link to={"/profile"}>Profile</Link>
        <div>
          <button onClick={() => setIsClicked(!isClicked)}>
            {isClicked ? <div>Menu</div> : <div>Menu</div>}
          </button>
          {isClicked && (
            <div className="absolute flex flex-col mt-2  mr-2  bg-white text-black">
              {token ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link to={"/login"}>Login</Link>
                  <Link to={"/signup"}>SignUp</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* //Mobile */}
      <div className="flex sm:hidden justify-between items-center gap-3">
        <div className="flex gap-2 justify-between">
          <Link to={"/cart"}>
            Cart{" "}
            {cart.length > 0 && (
              <span className="bg-yellow-400 text-black px-1 rounded">
                {cart.length}
              </span>
            )}
          </Link>
          <button onClick={() => setIsClicked(!isClicked)}>
            {isClicked ? (
              <FontAwesomeIcon icon={faXmark} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
          {isClicked && (
            <div className="absolute flex flex-col mt-6 pl-2 bg-white text-black">
              {userInfo?.role === "admin" && (
                <Link to={"/product"}>Dashboard</Link>
              )}
              {token ? (
                <>
                  <Link to={"/profile"}>Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to={"/login"}>Login</Link>
                  <Link to={"/signup"}>SignUp</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

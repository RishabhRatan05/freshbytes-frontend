import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Cookies } from 'react-cookie';
import { useGetUserQuery } from '../redux/api/auth';
import { userUpdate } from '../redux/slices/user';

const Navbar = () => {
    const [isClicked,setIsClicked] = useState(false)
    const cookies = new Cookies()
    const token = cookies.get('token')
    const {data} = useGetUserQuery()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(data && data.length!==0){
        const newUser = {
            name : data[0]?.name,
            email : data[0]?.email,
            role : data[0]?.role,
            id : data[0]?._id,
        }
        dispatch(userUpdate(newUser))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

    const handleLogout = async()=>{
        cookies.remove('token')
        const newUser = {
            name : '',
            email : '',
            role : 'user',
            id : '',
        }
        dispatch(userUpdate(newUser))
    }
    

  const userInfo = useSelector(state=>state.user)
  const cartState = useSelector(state=>state.cartState)
  const cart = cartState.cart
  return (
    <div className='flex justify-between md:mx-10 mx-5 pt-5 md:pt-20'>
        
        {/* //Desktop */}
        <Link to={'/'} className='text-pink-500 text-2xl'>FreshBytes</Link>
        <div className='sm:flex hidden justify-between items-center gap-3'>
            <Link to={'/cart'}>Cart {cart.length>0 &&  <span className='bg-yellow-400 text-black px-1 rounded'>{cart.length}</span>}</Link>
            {userInfo?.role==='admin' && 
                <Link to={'/product'}>Dashboard</Link>
            }
            <Link to={'/profile'}>Profile</Link>
            <div>

            <button onClick={()=>setIsClicked(!isClicked)}>
                {isClicked?<div>Menu</div>:<div>Menu</div>}
            </button>
            {isClicked && 
                <div className='absolute flex flex-col mt-2 p-2  bg-white text-black'>
                    {token ?
                    <button onClick={handleLogout}>Logout</button>
                    :
                    <>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/signup'}>SignUp</Link>
                    </>
                    }
                </div>
            }
            </div>
        </div>

        {/* //Mobile */}
        <div className='flex sm:hidden justify-between items-center gap-3'>
            <div className='flex gap-2 justify-between'>

            <Link to={'/cart'}>Cart {cart.length>0 &&  <span className='bg-yellow-400 text-black px-1 rounded'>{cart.length}</span>}</Link>
            <button onClick={()=>setIsClicked(!isClicked)}>
                {isClicked?<div>Menu</div>:<div>UnMenu</div>}
            </button>
            {isClicked && 
                <div className='absolute flex flex-col mt-6 pl-2 bg-white text-black'>
                    {userInfo?.role==='admin' && 
                    <Link to={'/product'}>Dashboard</Link>
                    }
                    {token ?
                    <>
                    <Link to={'/profile'}>Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                    </>
                    :
                    <>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/signup'}>SignUp</Link>
                    </>
                    }
                </div>
            }
            </div>
        </div>
    </div>
  )
}

export default Navbar
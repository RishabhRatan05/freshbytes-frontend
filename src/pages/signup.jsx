import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../redux/api/auth'
import { useDispatch } from 'react-redux'
import { userUpdate } from '../redux/slices/user'

const SignUp = () => {
  const [data,setData] = useState()
  const [userInfo,setUserInfo] = useState()
  const signup = useSignupMutation()[0]
  const dispatch = useDispatch()
  const navigate  = useNavigate()
  const handleChange=(e)=>{
    setData(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const res = await signup(data)
    const info = await res.data
    setUserInfo(info)
  }

  useEffect(()=>{
    if(userInfo){
      dispatch(userUpdate(userInfo))
      navigate('/')
    }
    else{
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userInfo])
  return (
    <form onSubmit={handleSubmit} className='flex  flex-col justify-center items-center items-center h-screen bg-black text-white text-2xl gap-2'>
        <label>Name</label>
        <input name='name' onChange={handleChange} placeholder='enter your name' className='text-black'></input>
        <label>Email</label> 
        <input name='email' onChange={handleChange} placeholder='enter your email' className='text-black'></input>        
        <label>Password</label> 
        <input  name='password' onChange={handleChange} placeholder='enter your password' className='text-black'></input>
        <button className='bg-blue-700 px-2 rounded'>SignUp</button>
        <div className='text-xl'>Or</div>
        <Link to={'/login'}>Login</Link>
    </form>
  )
}

export default SignUp
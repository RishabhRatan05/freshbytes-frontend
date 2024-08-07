import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/api/auth'
import { useDispatch } from 'react-redux'
import { userUpdate } from '../redux/slices/user'

const Login = () => {
  const [data,setData] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const login = useLoginMutation()[0]
  const handleChange=(e)=>{
    setData(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const res = await login(data)
    if(res.data){
    const userInfo = await res?.data[0]
      dispatch(userUpdate(userInfo))
      navigate('/')
    }
    else{
      alert("Please try again")
    }

  }
  return (
    <form onSubmit={handleSubmit} className='flex  flex-col justify-center items-center h-screen bg-gradient-to-tr from-pink to-red-600 text-white text-2xl gap-2'>
        <label>Email</label> 
        <input name='email' onChange={handleChange} placeholder='enter your email' className='text-black'></input>        
        <label>Password</label> 
        <input  name='password' onChange={handleChange} placeholder='enter your password' className='text-black'></input>
        <button className='bg-blue-700 px-2 rounded'>Login</button>
        <div className='text-xl'>Or</div>
        <Link to={'/signup'}>SignUp</Link>
    </form>
  )
}

export default Login
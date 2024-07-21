import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='bg-black flex justify-center items-center h-screen w-screen text-3xl text-white'>
        <div className='flex flex-col justify-center gap-3 items-center'>
    <div>Sorry! Page Not Found</div>
    <Link to={'/'}>Home</Link>
        </div>
    </div>
  )
}

export default ErrorPage
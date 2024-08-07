import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const Profile = () => {
  const userInfo = useSelector(state=>state.user)
  return (
    <div className=' text-pink '>
        <Navbar/>
          {userInfo?.email?
        <main className='mx-5'>
          <div>Name:<span className='text-orange-400 text-2xl'>{userInfo.name}</span></div>
          <div>Email: <span className='text-orange-400 text-2xl'>{userInfo.email}</span></div>
          <div>Your role is: <span className='text-orange-400 text-2xl'>{userInfo.role}</span></div>
        </main>
        :
        <>Login First</>
          }
          <div className='w-40'>
          </div>
    </div>
  )
}

export default Profile
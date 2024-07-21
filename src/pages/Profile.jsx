import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const Profile = () => {
  const userInfo = useSelector(state=>state.user)
  return (
    <div className='bg-black text-white'>
        <Navbar/>
          {userInfo?.email?
        <main>
          <div>Name: {userInfo.name}</div>
          <div>Email: {userInfo.email}</div>
          <div>Your role is: {userInfo.role}</div>
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
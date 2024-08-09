import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCategoriesQuery } from '../redux/api/category'

const Categories = () => {
  const {data, isLoading}= useGetCategoriesQuery()

  return (
    <div className='sm:block flex gap-2 flex-wrap'>
      {isLoading?<div className='text-black'>Loading...</div>
      : <div className='flex sm:flex-col gap-2 flex-wrap'>
        {data?.map(cat=>{
          
          return <Link key={cat.name} to={`/category/${cat.name}`} className='text-white text-2xl bg-teal-400 w-fit px-2'>{cat.name}</Link>
        })}
      </div>
      }
    </div>
  )
}

export default Categories
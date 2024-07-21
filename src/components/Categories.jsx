import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetCategoriesQuery } from '../redux/api/category'

const Categories = () => {
  const {data, isLoading,isSuccess}= useGetCategoriesQuery()

  return (
    <div className='sm:block flex gap-2 flex-wrap'>
      {isLoading?<div>Loading...</div>
      : <div className='flex sm:flex-col gap-2 flex-wrap'>
        {data?.map(cat=>{
          
          return <Link key={cat.name} to={`/category/${cat.name}`}>{cat.name}</Link>
        })}
      </div>
      }
    </div>
  )
}

export default Categories
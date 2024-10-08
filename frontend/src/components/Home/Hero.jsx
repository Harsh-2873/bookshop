import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return <div className=' h-[75vh] flex flex-col md:flex-row items-center justify-center'>
    <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-4xl lg:text-6xl font-semibold text-blue-100'>Reading is a discount ticket to everywhere.</h1>
        <p className='mt-4 text-xl text-gray-50 text-center lg:text-left'>Uncover captivating stories, enriching knowledge, 
          and endless inspiration in our curated collection of books</p>
    
    <div className='mt-8'>
    <Link to="/all-books" className='text-white text-xl lg:text-2xl font-semibold border border-blue-300 px-10 py-4 hover:bg-blue-200 hover:text-black rounded-full'>Discover Books</Link>
    </div>
    </div>
    <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
      <img src="./homeimg.png" alt=""/>
    </div>
  </div>
}

export default Hero
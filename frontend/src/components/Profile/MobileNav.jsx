import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';

const MobileNav = () => {
  const role = useSelector((state)=> state.auth.role);
  return (
    <>
    {role === "user" &&
      (
        <div className='w-full lg:hidden flex items-center justify-between mt-4'>
        <Link to="/profile" className="text-black font-semibold w-full text-center mt-4 hover:bg-black hover:text-pink-600 rounded transition-all duration-300">Favourites</Link>
        <Link to="/profile/orderHistory" className='text-black font-semibold w-full text-center hover:bg-black hover:text-green-500 rounded transition-all duration-300'>Order History</Link>
        <Link to="/profile/settings" className='text-black font-semibold w-full text-center hover:bg-black hover:text-white rounded transition-all duration-300'>Settings</Link>
        </div>
      )
    }
    {role === "admin" &&
      (
        <div className='w-full lg:hidden flex items-center justify-between mt-4'>
        <Link to="/profile" className="text-black font-semibold w-full text-center mt-4 hover:bg-black hover:text-pink-600 rounded transition-all duration-300">All Orders</Link>
        <Link to="/profile/addbook" className='text-black font-semibold w-full text-center hover:bg-black hover:text-green-500 rounded transition-all duration-300'>Add Book</Link>
        </div>
      )
    }
    </>
  );
};

export default MobileNav;

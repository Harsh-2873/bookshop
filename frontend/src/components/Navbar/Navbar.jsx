import React from 'react'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useState } from 'react';
import {useSelector} from "react-redux";
const Navbar = () => {
  const links = [
    {
      title:"Home",
      link : "/",
    },
    {
      title:"Category",
      link:"/category",
    },
    {
      title:"All Books",
      link : "/all-books",
    },
    {
      title:"Cart",
      link : "/cart",
    },
    {
      title:"Profile",
      link : "/profile",
    },
    {
      title:"Admin Profile",
      link : "/profile",
    },
  ];
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role);

  if(isLoggedIn === false)
  {
    links.splice(2, 3)
  }
  
  if(isLoggedIn == true && role === "user")
  {
    links.splice(4, 1)
  }

  if(isLoggedIn == true && role === "admin")
  {
    links.splice(2, 2)
  }
  const [MobileNav, setMobileNav] = useState("hidden")
  return(
    <>
  <nav className="z-50 relative flex bg-slate-500 text-black px-4 py-3 items-center justify-between">
  <Link to="/" className='flex items-center'>
    <img
    className="h-10 me-4" src="https://e7.pngegg.com/pngimages/659/864/png-clipart-logo-book-cartoon-books-cartoon-character-supplies.png" alt="logo" 
    />
    <h1 className='text-4xl hover:text-white font-serif'>Book Heaven</h1>
  </Link>
  
  <div className='nav-links-bookheaven block md:flex items-center gap-4'>
      <div className="hidden text-2xl font-bold md:flex gap-4">
          {links.map((items,i)=>(
          <div className='flex items-center'>
          {items.title === "Profile" || items.title === "Admin Profile" ? 
          <Link to={items.link}
          className='hover:text-white border border-blue-500 transition-all duration-300' 
          key={i}>
            {items.title}
            </Link> :
            
            <Link to={items.link}
          className='hover:text-white transition-all duration-300' 
          key={i}>
            {items.title}{" "}
            </Link>}
          </div>

          ))}
        </div>
      {isLoggedIn === false && 
        <div className="hidden md:flex gap-4">
        <Link to="/SignUp" className='px-4 mb-0 text-2xl font-semibold py-2  bg-black border border-blue-950 text-white rounded  hover:bg-sky-500 hover:text-white transition-all duration-300'>Sign Up</Link>
        <Link to="/LogIn" className='px-5 mb-0 text-2xl font-semibold py-2  bg-black border border-green-800 text-white rounded hover:bg-green-500 hover:text-white  transition-all duration-300'>Log In</Link>
      </div>
      }


      <button className='block md:hidden text-white text-2xl hover:text-black' onClick={()=>MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")} >
        <FaGripLines />
      </button>
  </div>
  </nav>
  <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
    {links.map((items,i)=>(
      <Link
      to={items.link}
      className={`${MobileNav} text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300`}
      key={i}
      onClick={()=>
        MobileNav === "hidden" 
        ? setMobileNav("block") 
        : setMobileNav("hidden")
      }
    >
        {items.title}{" "}
      </Link>
    ))}
        {isLoggedIn === false && (
          <>
          <Link 
        to="/SignUp" 
        className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2  bg-black border border-green-800 text-white rounded  hover:bg-green-500 hover:text-white transition-all duration-300`}>Sign Up</Link>
        <Link
        to="/LogIn" 
        className={` ${MobileNav} px-8 mb-8 text-3xl font-semibold py-2  bg-black border border-blue-950 text-white rounded hover:bg-sky-500 hover:text-white  transition-all duration-300`}>Log In</Link>
          </>
        )}
  </div>
  </>
  );
};
export default Navbar;
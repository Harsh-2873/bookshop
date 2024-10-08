import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader';
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import SeeUserData from './SeeUserData';

const AllOrders = () => {

  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({status :" "})
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState(-1);
  const headers = {
    id:localStorage.getItem("id"),
    auth:`Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get("http://localhost:6060/api/v1/getallorders",{headers})
      setAllOrders(response.data.data);
    };
    fetch();
  },[AllOrders])
  
  const change = (e) => {
    const {value} =  e.target;
    setValues({status : value});
  };
  const submitChanges = async(i)=>{
    const id = AllOrders[i]._id;
    const response = await axios.put(`http://localhost:6060/api/v1/update-status/${id}`,Values,{headers});
    alert(response.data.message)
  }
  const setOptionsButton = (i) => {
    setOptions(i);
  }
  AllOrders && AllOrders.splice(AllOrders.length -1,1);
  return(
  <>
    {!AllOrders &&  (
    <div className='h-[100%] flex items-center justify-center'>
      {" "}
      <Loader />
    </div>
    )}

    {AllOrders && AllOrders.length>0 && (
      <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
        All Orders
      </h1>
      <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
      <div className='w-[3%]'>
      <h1 className='text-center'>Sr.</h1>
      </div>
      <div className='w-[22%]'>
      <h1 className='text-center'>Books</h1>
      </div>
      <div className='w-[45%]'>
      <h1 className='text-center'>Description</h1>
      </div>
      <div className='w-[9%]'>
      <h1 className='text-center'>Price</h1>
      </div>
      <div className='w-[16%]'>
      <h1 className='text-center'>Status</h1>
      </div>
      <div className='w-none flex items-center justify-center md:w-[5%]'>
      <h1 className=''>
      <FaUserLarge />
      </h1>
      </div>
      </div>
      {AllOrders && AllOrders.map((items, i) => (
    <div key={i} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300'>
    <div className='w-[3%]'>
      <h1 className='text-center'>{i + 1}</h1>
    </div>
    <div className='w-[40%] ml-28 md:w-[22%]'>
      {items.book ? (
        <Link to={`view-book-details/${items.book._id}`} className="hover:text-blue-300">
          {items.book.title}
        </Link>
      ) : (
        <span>No Book Info</span>
      )}
    </div>
    <div className='w-full ml-48'>
      <h1 className='flex items-center justify-center'>{items.book ? items.book.desc.slice(0, 50) + '...' : 'No Description'}</h1>
    </div>
    <div className='w-[-17%] ml-40 md:w-[-9%]'>
      <h1 className='flex mt-4'>₹{items.book ? items.book.price : 'N/A'}</h1>
    </div>
    <div className='h-auto  flex items-center justify-center w-full md:w-full'>
      <h1 className='font-semibold'></h1>
        <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptions(i)}>
          {items.status === "Order placed" ? (
            <div className='text-yellow-500'>{items.status}</div>
          ) : items.status === "Canceled" ? (
            <div className='text-red-500'>{items.status}</div>
          ) : (
            <div className='text-green-500'>{items.status}</div>
          )}
        </button>

        <div className={`${
          Options === i ? "block" : "hidden"} flex mt-4`}>
          <select name="status" id="" className='bg-gray-800' onChange={change} value={Values.status}>
            {[
              "Order placed",
              "Out for delivery",
              "Delivered",
              "Canceled",
            ].map((option, idx) => (
              <option value={option} key={idx}>
                {option}
              </option>
            ))}
          </select>
          <button className='text-green-500 hover:text-pink-600 mx-2' onClick={() => {
            setOptions(-1);
            submitChanges(i);
          }}>
            <FaCheck />
          </button>
        </div>
    </div>
    <div className='flex items-center mr-4 justify-center w-[10%] md:w-[5%]'>
      <button className='text-xl hover:text-orange-500' onClick={() => {
        setuserDiv("fixed");
        setuserDivData(items.user);
      }}>
        <IoOpenOutline />
      </button>
    </div>
  </div>
))}

  </div>
    )}
    {userDivData && (
      <SeeUserData
      userDivData={userDivData}
      userDiv={userDiv}
      setuserDiv={setuserDiv}
      />
    )}
  </>
  );
};

export default AllOrders;

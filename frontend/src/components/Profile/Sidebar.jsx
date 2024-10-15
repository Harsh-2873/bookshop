import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authActions } from '../../store/auth';
import { useDispatch , useSelector} from 'react-redux';

const Sidebar = ({data}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state)=> state.auth.role);
  return (
    <div className='bg-gray-500 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
        <div className='flex items-center flex-col justify-center'>
        {" "}
        <img src="src/assets/avatar.jpg" className="h-[12vh] rounded-full"/>
        <p className='mt-3 text-xl text-black font-semibold'>{data.username}</p>
        <p className='mt-1 text-normal text-black'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-black hidden lg:block'></div>
        </div>
        {
        role === "user" &&
          <div className='w-full flex-col items-center justify-center hidden lg:flex'>
          <Link to="/profile" className="text-black font-semibold w-full px-2 py-2 text-center mt-4 hover:bg-black hover:text-pink-600 rounded transition-all duration-300">Favourites</Link>
          <Link to="/profile/orderHistory" className='text-black font-semibold w-full px-2 py-2 mt-4 text-center hover:bg-black hover:text-green-500 rounded transition-all duration-300'>Order History</Link>
          <Link to="/profile/settings" className='text-black font-semibold w-full px-2 py-2 mt-4 text-center hover:bg-black hover:text-white rounded transition-all duration-300'>Settings</Link>
          </div>
        }

        {
        role === "admin" && 
          <div className='w-full flex-col items-center justify-center hidden lg:flex'>
          <Link to="/profile" className="text-black font-semibold w-full px-2 py-2 text-center mt-4 hover:bg-black hover:text-white rounded transition-all duration-300">All Orders</Link>
          <Link to="/profile/addbook" className='text-black font-semibold w-full px-2 py-2 mt-4 text-center hover:bg-black hover:text-white rounded transition-all duration-300'>Add Book</Link>
          </div>
        }
        <button className='gap-4 bg-gray-500 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-gray-900 hover:text-white transition-all duration-300'
        onClick={()=>{
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
        >
        Log Out<FaArrowRightFromBracket />
        </button>
    </div>
  );
};
export default Sidebar;
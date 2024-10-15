// import React from 'react';
// import {Link} from "react-router-dom";

// const LogIn = () => {
//   return (
//     <div className='h-auto bg-black px-12 py-8 flex items-center justify-center'>
//       {/*h-auto bg-zinc-800 px-12 py-8 flex items-center justify-center*/}
//       <div className='bg-zinc-900 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
//       <p className='text-white flex items-center justify-center text-2xl'>Log In</p>
//       <div className='mt-8'>
//         <div>
//           <label htmlFor="" className='text-slate-300'>Username</label>
//           <input type="text" className='w-full mt-3 bg-gray-950 rounded-lg text-zinc-50 p-3 outline-8' placeholder='username' name='username'required/>
//         </div>
//         <div className='mt-8'>
//           <label htmlFor="" className='text-zinc-400'>Password</label>
//           <input type="password" className='w-full mt-2 bg-gray-950 rounded-lg text-zinc-50 p-3 outline-8' placeholder='password' name='password'required/>
//         </div>
//         <div className='mt-10'>
//           <button className='w-full bg-blue-500 text-black text-xl font-bold py-2 rounded hover:bg-green-500'>Login</button>
//         </div>
//         <p className='flex mt-4 items-center justify-center text-xl text-white font-semibold'>Or</p>
//         <p className='flex mt-4 items-center justify-center text-xl text-white font-semibold'>Don't have an account ? &nbsp;
//           <Link to="/SignUp" className='hover:text-blue-600'>
//           <u>SignUp</u>
//           </Link>
//         </p>
//       </div>
//       </div>

//     </div>
//   )
// }

// export default LogIn;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {authActions} from "../store/auth";
import {useDispatch }from "react-redux"
import axios from "axios";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const [Values, setValues] = useState({username:"", password:""});
const navigate = useNavigate();
const dispatch = useDispatch();
const change=(e)=>{
  const {name , value} = e.target;
  setValues({...Values,[name]:value });
}
const submit = async()=>{
  try {
    if(Values.username === "" || Values.password === "")
    {
      alert("All fields are required !")
    }
    else
    {
      const response = await axios.post("http://localhost:6060/api/v1/signin",Values);

      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id",response.data.id);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("role",response.data.role);
      navigate("/profile");
      //navigate("/LogIn")
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
  return (
    <div className='h-auto bg-black px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-900 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-white flex items-center justify-center text-2xl'>Log In</p>
        <div className='mt-8'>
          <div>
            <label htmlFor="username" className='text-slate-300'>Username</label>
            <input
              type="text"
              className='w-full mt-3 bg-gray-950 rounded-lg text-zinc-50 p-4 outline-8'
              placeholder='username'
              name='username'
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className='mt-8 relative'>
            <label htmlFor="password" className='text-zinc-400'>Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className='w-full mt-2 bg-gray-950 rounded-lg text-zinc-50 p-4 outline-8'
              placeholder='password'
              name='password'
              required
              value={Values.password}
              onChange={change}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className='flex items-end justify-end absolute right-3 top-1/2 text-white text-xl'
            >
              {showPassword ? '📖' : '📘'}
            </button>
          </div>
          <div className='mt-10'>
            <button className='w-full bg-blue-500 text-black text-xl font-bold py-2 rounded hover:bg-green-500' onClick={submit}>
              Login
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-xl text-white font-semibold'>Or</p>
          <p className='flex mt-4 items-center justify-center text-xl text-white font-semibold'>
            Don't have an account? &nbsp;
            <Link to="/SignUp" className='hover:text-blue-600'>
              <u>SignUp</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
// import React from 'react';
// import {Link} from "react-router-dom";

// const SignUp = () => {
//   return (
//     <div className='h-auto bg-black px-12 py-8 flex items-center justify-center'>
//       {/*h-auto bg-zinc-800 px-12 py-8 flex items-center justify-center*/}
//       <div className='bg-zinc-900 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
//       <p className='text-white flex items-center justify-center text-2xl'>Sign Up</p>
//       <div className='mt-4'>
//         <div>
//           <label htmlFor="" className='text-white'>Username</label>
//           <input type="text" className='w-full mt-3 bg-gray-950 rounded-lg text-white p-3 outline-8' placeholder='username' name='username'required/>
//         </div>
//         <div className='mt-4'>
//           <label htmlFor="" className='text-white'>Email</label>
//           <input type="text" className='w-full mt-4 bg-gray-950 rounded-lg text-white p-3 outline-8' placeholder='abc@exapmle.com' name='email'required/>
//         </div>
//         <div className='mt-4'>
//           <label htmlFor="" className='text-white'>Password</label>
//           <input type="password" className='w-full mt-2 bg-gray-950 rounded-lg text-white p-3 outline-8' placeholder='password' name='password'required/>
//         </div>
//         <div className='mt-4'>
//           <label htmlFor="" className='text-white'>Address</label>
//         <div>
//             <textarea className="w-full mt-4 bg-gray-950 text-white p-2 outline-none" rows="5" placeholder='address...' name='address' required />
//         </div>
//         </div>
//         <div className='mt-4'>
//           <button className='w-full h-auto bg-blue-700 text-white text-xl font-semibold py-2 rounded hover:bg-blue-400 hover:text-white'>Sign Up</button>
//         </div>
//         <p className='flex mt-4 items-center justify-center text-xl text-white font-semibold'>Or</p>
//         <p className='flex mt-4 items-center justify-center text-xl text-white font-semibold'>Already have an account ? &nbsp;
//           <Link to="/login" className='hover:text-green-500'>
//           <u>LogIn</u>
//           </Link>
//         </p>
//       </div>
//       </div>

//     </div>
//   )
// }

// export default SignUp;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const [Values, setValues] = useState({username:"", email:"", password:"", address:""});
const navigate = useNavigate()
const change=(e)=>{
  const {name , value} = e.target;
  setValues({...Values,[name]:value });
}
const submit = async()=>{
  try {
    if(Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "")
    {
      alert("All fields are required !")
    }
    else
    {
      const response = await axios.post("http://localhost:6060/api/v1/signup",Values);
      alert(response.data.message);
      navigate("/LogIn")
    }
  } catch (error) {
    alert(error.response.data.message);
  }
}
  return (
    <div className='h-auto bg-black px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-900 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-white flex items-center justify-center text-2xl'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor="username" className='text-white'>Username</label>
            <input
              type="text"
              id="username"
              className='w-full mt-3 bg-gray-950 rounded-lg text-white p-4 outline-8'
              placeholder='username'
              name='username'
              required
              value = {Values.username}
              onChange = {change}
            />
          </div>
          <div className='mt-4'>
            <label htmlFor="email" className='text-white'>Email</label>
            <input
              type="email"
              id="email"
              className='w-full mt-4 bg-gray-950 rounded-lg text-white p-4 outline-8'
              placeholder='abc@example.com'
              name='email'
              required
              value = {Values.email}
              onChange = {change}
            />
          </div>
          <div className='mt-4 relative'>
            <label htmlFor="password" className='text-white'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className='w-full mt-2 bg-gray-950 rounded-lg text-white p-4 outline-8'
              placeholder='password'
              name='password'
              required
              value = {Values. password}
              onChange = {change}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className='flex items-end justify-end absolute right-3 top-1/2 text-white text-xl'
            >
              {showPassword ? '📖' : '📘'}
            </button>
          </div>
          <div className='mt-4'>
            <label htmlFor="address" className='text-white'>Address</label>
            <textarea
              id="address"
              className="w-full mt-4 bg-gray-950 text-white p-2 outline-none"
              rows="5"
              placeholder='address...'
              name='address'
              required
              value = {Values.address}
              onChange = {change}
            />
          </div>
          <div className='mt-4'>
            <button className='w-full h-auto bg-blue-400 text-white text-xl font-semibold py-2 rounded hover:bg-blue-700 hover:text-white' onClick={submit}>
              Sign Up
            </button>
          </div>
          <p className='flex mt-4 items-center justify-center text-xl text-white font-semibold'>Or</p>
          <p className='flex mt-4 items-center justify-center text-xl text-white font-semibold'>
            Already have an account? &nbsp;
            <Link to="/login" className='hover:text-green-500'>
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

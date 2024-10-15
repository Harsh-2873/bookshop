// import { useEffect, useState } from 'react'
// import Loader from '../components/Loader/Loader';
// import { RiDeleteBin2Line } from "react-icons/ri";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const navigate = useNavigate();
//   const [Cart, setCart] = useState();
//   const [Total, setTotal] = useState();
//   const headers = {
//     id:localStorage.getItem("id"),
//     auth:`Bearer ${localStorage.getItem("token")}`,
//   };
//   useEffect(()=>{
//     const fetch = async()=>{
//       const res = await axios.get("http://localhost:6060/api/v1/getusercart",{headers});
//       setCart(res.data.data)
//   };
//   fetch();
// }, [Cart]);
// const deleteItem = async (bookid)=>{
//   const response = await axios.put(`http://localhost:6060/api/v1/removefromcart/${bookid}`,{},{headers});
//   alert(response.data.data);
// };
// useEffect(()=>{
//   if(Cart && Cart.length>0){
//     let total = 0;
//     Cart.map((items)=>{
//       total += items.price;
//     });
//     setTotal(total);
//     total = 0;
//   }
// },[Cart]);
// const PlaceOrder = async() => {
//   try{
//     const response = await axios.post(`http://localhost:6060/api/v1/placeorder`,{order:Cart},{headers});
//     alert(response.data.message);
//     navigate("/profile/orderHistory");
//   }catch(error){
//     console.log(error);
//   }
// };

//   return (
//     <div className='bg-zinc-900 px-12 h-screen py-8'>
//   {!Cart && (
//   <div className='w-full h-[100%] flex items-center justify-center'>
//     <Loader/>{" "}
//   </div>
//   )}
//   {Cart && Cart.length === 0 && (
//     <div className='h-screen'>
//       <div className='h-[100%] flex items-center justify-center flex-col'>
//       <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
//         Empty Cart
//       </h1>
//       {/* <img src="" alt="empty cart" className='lg:h-[50vh]'></img> */}
//       </div>
//     </div>
//   )}
//   {Cart && Cart.length >0 &&(
//     <>
//     <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
//       Your Cart
//     </h1>
//     {Cart.map((items,i)=>(
//       <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
//       key={i}
//       >
//         <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover'
//         />
//         <div className='w-full md:w-auto'>
//         <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
//           {items.title}
//         </h1>
//         <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
//         {items.desc.slice(0, 100)}...
//         </p>
//         <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
//         {items.desc.slice(0, 65)}...
//         </p>
//         <p className='text-normal text-zinc-300 mt-2 block md:hidden'>
//         {items.desc.slice(0, 100)}...
//         </p>
//         </div>
//         <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
//         <h2 className='text-zinc-100 text-3xl font-semibold flex'>
//         ₹{items.price}
//         </h2>
//         <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
//         onClick={()=>deleteItem(items._id)}
//         >
//           <RiDeleteBin2Line />
//         </button>
//         </div>
//       </div>
//     ))}
//     </>
//   )}
//   {Cart && Cart.length > 0 && (
//     <div className='mt-4 w-full flex items-center justify-end'>
//       <div className='p-4 bg-zinc-800 rounded'>
//         <h1 className='text-3xl text-zinc-200 font-semibold'>
//         Total Amount
//         </h1>
//         <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
//         <h2>{Cart.length}Books</h2><h2>₹{Total}</h2>
//         </div>
//         <div className='w-[100%] mt-3'>
//         <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-100'
//         onClick={PlaceOrder}
//         >
//         Place your order
//         </button>
//         </div>
//       </div>
//     </div>
//   )}
//   </div>
//   );
// };

// export default Cart;

import { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader';
import { RiDeleteBin2Line } from "react-icons/ri";
import {AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import PayPal SDK script
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState();
  const headers = {
    id:localStorage.getItem("id"),
    auth:`Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(()=>{
    const fetch = async()=>{
      const res = await axios.get("http://localhost:6060/api/v1/getusercart",{headers});
      const updatedCart = res.data.data.map(item => ({
        ...item,
        quantity: 1 ,// Set initial quantity to 1
        availableQuantity: item.quantity
      }));
      setCart(updatedCart)
    };
    fetch();
  }, []);

  const deleteItem = async (bookid)=>{
    const response = await axios.put(`http://localhost:6060/api/v1/removefromcart/${bookid}`,{},{headers});
    alert(response.data.data);
  };
  const incrementQuantity = (index) => {
    const updatedCart = [...Cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...Cart];
    if (updatedCart[index].quantity > 1) { // Prevent quantity from going below 1
      updatedCart[index].quantity -= 1;
    }
    setCart(updatedCart);
  };
  
  useEffect(()=>{
    if(Cart && Cart.length>0){
      let total = 0;
      Cart.map((items)=>{
        total += items.price * items.quantity;
      });
      setTotal(total);
    }
  },[]);

  const PlaceOrder = async(paymentInfo) => {
    try{
      const response = await axios.post(`http://localhost:6060/api/v1/placeorder`,{
        order:Cart,
        paymentInfo  // Send PayPal payment details to your backend
      },{headers});
      alert(response.data.message);
      navigate("/profile/orderHistory");
    }catch(error){
      console.log(error);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AWyPTBw_d0v5o7dcrDaf6EGi5X-xSLrr2njseIJTG36_oo33GSlXVOOhdOQhX5S41GPQpSb9JrBDxEc0" }}>
    <div className='bg-zinc-900 px-12 h-screen py-8'>
      {!Cart && (
      <div className='w-full h-[100%] flex items-center justify-center'>
        <Loader />{" "}
      </div>
      )}
      {Cart && Cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
            Empty Cart
          </h1>
          </div>
        </div>
      )}
      {Cart && Cart.length >0 &&(
        <>
        <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
          Your Cart
        </h1>
        {Cart.map((items,i)=>(
          <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
          key={i}
          >
            <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover'/>
            <div className='w-full md:w-auto'>
              <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                {items.title}
              </h1>
              <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
              {items.desc.slice(0, 100)}...
              </p>
            </div>
            <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
            <h2 className='text-zinc-100 text-3xl font-semibold flex'>
            ₹{items.price * items.quantity}
            </h2>
            <div className='flex items-center space-x-4'>
                    <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2'
                      onClick={() => decrementQuantity(i)}>
                      <AiOutlineMinus />
                    </button>
                    <span className='text-zinc-100 text-2xl font-semibold'>{items.quantity}</span> {/* Display quantity */}
                    <button className='bg-green-100 text-green-700 border border-green-700 rounded p-2'
                      onClick={() => incrementQuantity(i)}
                      disabled = {items.quantity >= items.availableQuantity}>
                      <AiOutlinePlus />
                    </button>
                  </div>
            <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
            onClick={()=>deleteItem(items._id)}>
              <RiDeleteBin2Line />
            </button>
            </div>
          </div>
        ))}
        </>
      )}
      {Cart && Cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>
            Total Amount
            </h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
            <h2>{Cart.length} Books</h2><h2>₹{Total}</h2>
            </div>
            
            {/* PayPal Button */}
            <div className='w-[100%] mt-3'>
              <PayPalButtons 
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: (Total / 85).toFixed(2) // Convert INR to USD (approx rate: 1 USD = 85 INR)
                      }
                    }]
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  const paymentInfo = {
                    id: details.id,
                    status: details.status,
                    payer: details.payer.name.given_name,
                    amount: details.purchase_units[0].amount.value
                  };
                  PlaceOrder(paymentInfo);  // Pass payment info to the order function
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </PayPalScriptProvider>
  );
};

export default Cart;

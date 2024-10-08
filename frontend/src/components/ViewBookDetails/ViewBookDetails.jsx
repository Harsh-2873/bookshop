import React,{useEffect,useState} from 'react';
import axios from "axios";
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import{GrLanguage} from 'react-icons/gr'; 
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

const ViewBookDetails = () => {
    const {id}=useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState();
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const role = useSelector((state)=>state.auth.role);    
    useEffect(() => {
        const fetch = async() =>{
           const response = await axios.get(`http://localhost:6060/api/v1/getbookbyid/${id}`
           );
           setData(response.data.data);
        };
        fetch();
    }, []);
    const headers = {
        id:localStorage.getItem("id"),
        auth:`Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };
    const handleFavourite = async()=>{
        const response = await axios.put("http://localhost:6060/api/v1/addfavourite",{},{headers})
        alert(response.data.message);
    };
    const handleCart = async()=>{
        const response = await axios.put("http://localhost:6060/api/v1/addtocart",{},{headers})
        alert(response.data.message);
    };
    const deleteBook = async()=>{
        const response = await axios.delete("http://localhost:6060/api/v1/deletebook",{headers});
        alert(response.data.message);
        navigate("/all-books")
    };
    return ( 
    <>
    {!Data && (<div className='flex h-auto bg-neutral-900 items-center justify-center '> <Loader /> {" "}
        </div>
        )}
    {Data && (
        <div className="px-4 md:px-12 py-8 bg-black flex flex-col lg:flex-row gap-8 items-start">
        <div className=" w-full lg:w-3/6">
        {" "}
    <div className='flex flex-col lg:flex-row justify-around bg-slate-950 p-12 rounded'>
        {" "}
    <img src={Data.url} alt="/" className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded '/>
        {isLoggedIn === true && role === "user" && 
        <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
        <button className='text-white rounded lg:rounded-full text-3xl p-3 bg-red-500 flex items-center justify-center' onClick={handleFavourite}><FaHeart />{" "} <span className='ms-4 block lg:hidden'>Favourites</span>
        </button>
        <button className='text-white rounded mt-8 lg:rounded-full text-4xl lg:text-3xl p-2 lg:mt-8 bg-blue-500 flex items-center justify-center' onClick={handleCart}><FaShoppingCart /> <span className='ms-4 block lg:hidden'>Add to cart</span> 
        </button>
    </div>}
        {isLoggedIn === true && role === "admin" && 
        <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
        <Link
            to={`/updateBook/${id}`}
            className='bg-white hover:bg-blue-500 rounded lg:rounded-full text-3xl p-3 mt-8 md:mt-0 text-black flex items-center justify-center'>
            <FaRegEdit />{" "} 
            <span className='ms-4 block lg:hidden'>
            Edit</span>
        </Link
            >

        <button className='text-red-500 hover:text-black rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-8 bg-white hover:bg-red-500 flex items-center justify-center' onClick={deleteBook}><RiDeleteBin2Line />
        <span className='ms-4 block lg:hidden'>Delete</span> 
        </button>
    </div>}
        </div>
    </div>
        <div className="p-4 w-full lg:w-3/6 ">
        <h1 className="text-4xl text-white font-semibold">{Data.title}</h1>
        <p className="text-white mt-1">by {Data.author}</p>
        <p className="text-white mt-4 text-xl">{Data.desc}</p>
        <p className="flex mt-4 items-center justify-start text-white">
            <GrLanguage className="me-3"/>{Data.language}
        </p>
        <p className="mt-4 text-white text-3xl font-semibold">
            Price : ₹{Data.price}{" "}
        </p>
        </div>
    </div>
    )}
    </>
    );
};

export default ViewBookDetails;
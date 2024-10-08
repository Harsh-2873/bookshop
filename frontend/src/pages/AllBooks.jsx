import React,{useState,useEffect} from 'react'
import axios from "axios";
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

const AllBooks = () => {
  const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async() =>{
           const response = await axios.get("http://localhost:6060/api/v1/getallbooks");
            setData(response.data.data);
        };
        fetch();
    }, []);

    return <div className='bg-neutral-900 h-auto px-12 py-8'>
      {" "}
        <h4 className='text-4xl text-white'>All Books</h4>
        {!Data && (
        <div className='w-full h-screen flex items-center justify-center'>
        <Loader/>{" "}
      </div>
        )}
        <div className='my-8 grid grid-cols-1 sm:grid-cols-4 gap-8'>
          {Data && Data.map((items,i) => (
            <div key={i}>
          <BookCard  data={items}/>{" "}
          </div>
        ))}
        </div></div>
  };

export default AllBooks;
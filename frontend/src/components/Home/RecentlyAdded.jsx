import React,{useState,useEffect}from 'react'
import axios from "axios";
import BookCard from '../BookCard/BookCard';

import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
    const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async() =>{
           const response = await axios.get("http://localhost:6060/api/v1/getrecentbooks");
            setData(response.data.data);
        };
        fetch();
    }, []);
  return (
    <div className='mt-4 px-2'>
      <h4 className='text-4xl text-white'>Recently added books</h4>
      {!Data && <div className='flex items-center justify-center my-8'> <Loader /> </div>}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-4 gap-8'>
        {Data && Data.map((items,i) => <div key={i}>
        <BookCard  data={items}/>
        </div>)}
      </div>
      
    </div>
  )
}

export default RecentlyAdded;
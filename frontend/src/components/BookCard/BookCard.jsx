import axios from 'axios';
import React from 'react'
import {Link} from 'react-router-dom'
const BookCard = ({data,favourite}) => {
  const headers = {
    id:localStorage.getItem("id"),
    auth:`Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  };
  const handleRemoveBook = async()=> {
    const response  = await axios.put("http://localhost:6060/api/v1/removefromfavourite",{},{headers})
    alert(response.data.data);
  };
  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className=''>
          <div className='bg-neutral-900 rounded flex items-center justify-center'>
            <img src={data.url} alt="/" className='h-[25vh]' />
          </div>
          <h2 className='mt-4 text-2xl text-white font-semibold'>{data.title}</h2>
          <p className='mt-2 text-white font-semibold'>by {data.author}</p>
          <p className='mt-2 text-white font-semibold text-xl'>
            ₹ {data.price}
          </p>
        </div>
      </Link>
      {favourite && (
        <button className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4' onClick={handleRemoveBook}>
          Remove from favourite</button>
      )}
    </div>
  );
};

export default BookCard

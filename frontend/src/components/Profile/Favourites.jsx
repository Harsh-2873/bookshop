import React, { useEffect,useState } from 'react'
import axios from 'axios';
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id:localStorage.getItem("id"),
    auth:`Bearer ${localStorage.getItem("token")}`,
  };
    useEffect(()=>{
      const fetch = async()=>{
        const response = await axios.get("http://localhost:6060/api/v1/getfavouritebook",{headers});
        setFavouriteBooks(response.data.data);
      };
      fetch();
    }, [FavouriteBooks]);
  return (
    <>
    {FavouriteBooks.length === 0 && (
    <div className='text-5xl font-semibold h-[100%] text-white flex items-center justify-center w-full'>
      No Favourite Books
      </div>
    )}
    <div className='grid grid-cols-4 gap-4 '>
    {FavouriteBooks && FavouriteBooks.map((items,i)=>(
    <div key={i}>
      <BookCard data={items} favourite={true}/>
    </div>
    ))}
  </div>
      </>
  )
}

export default Favourites;

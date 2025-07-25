import React, { useState } from 'react'
import { HiMiniXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const GifSearch = () => {
    const[query,setQuery]=useState("")

    const navigate=useNavigate()
    const searchGIFs=async()=>
    {
        if(query.trim()==="")
        {
            return;
        }
        navigate(`/search/${query}`)
    }

  return (
    <div className='flex relative'>
        <input type="text"
          
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          placeholder='Search all the GIFs and Stickers'
          className="w-full pl-4 pr-14 py-2 text-xl text-white  rounded-tl rounded-bl bg-gray-4 dark:bg-[#1e1e2f] border border-gray-300 dark:border-gray-600 outline-none placeholder-gray-500 dark:placeholder-gray-400"
        />

        {query && (

            <button
            onClick={()=>setQuery("")}
            className='absolute bg-red-600 opacity-90 rounded-full right-20 mr-2 top-4 cursor-pointer'
            >
                <HiMiniXMark size={22}/>
            </button>
        )}


      <button
       onClick={searchGIFs}
        className="bg-gradient-to-tr from-[#0b025a] via-[#302b63] to-[#030372] text-white px-4 py-2 border border-gray-300 rounded-br rounded-tr cursor-pointer "
      >
        <HiOutlineMagnifyingGlass size={35} className='-scale-x-100'/>
      </button>


    </div>
  )
}

export default GifSearch
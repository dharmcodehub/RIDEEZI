import React from 'react'
import { Link } from 'react-router-dom'

const SecondaryButton = ({content,link}) => {
  return (
    <div  className='w-full  px-3'>
      
       <Link to={link} className="flex justify-center items-center w-full py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4">
                {content}
        </Link> 
         {/* <button className="w-full py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-50 focus:outline-none foc us:ring-2 focus:ring-green-500 mb-4">
                {content}
         </button> */}
    </div>
  )
}

export default SecondaryButton

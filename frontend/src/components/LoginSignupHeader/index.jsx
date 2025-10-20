import React from 'react'

const LoginSignupHeader = ({Icon, header , description}) => {
  return (
    <>
     <div className='py-2 w-full flex  items-center flex-col'>
            <div className=" bg-slate-200 rounded-xl mx-auto flex justify-center items-center p-2">
                <Icon color="#28A745" size={50} className="" />
            </div>
            <h1 className='text-2xl text-center'>{header}</h1>
            <p className='text-center'>{description}</p>
    </div> 
    </>
  )
}

export default LoginSignupHeader

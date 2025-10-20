import React from 'react'
import { Link } from 'react-router-dom'

const DontOrHaveAccount = ({link,content,heading}) => {
  return (
    <>
      <div className="w-full my-3">
        <p className='text-center '>{content}<Link className='text-primary-500' to={link} >{heading}</Link></p>
      </div>
    </>
  )
}

export default DontOrHaveAccount

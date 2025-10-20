import React from 'react'

const PrimaryButton = ({content}) => {
  return (
    <>
      <div className="w-full  py-5 " >
        <button className="bg-primary-500 text-white p-2 rounded w-full">{content}</button>
      </div>
    </>
  )
}

export default PrimaryButton;
import React from 'react'
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const RequestReceipt = ({handleAlert}) => {
    return (
        <div>
            <div className="proceed-container">
                {/* alert */}
                <div className='flex flex-col items-center justify-center'>
                    {/* icon */}
                    <div className='bg-black p-6 rounded-full'>
                        <IoCheckmarkDoneSharp className='text-white text-7xl' />
                    </div>
                    {/* texts */}
                    <div className='text-center mt-6 mb-16'>
                        <p className='font-mont font-semibold text-lg mb-4'>Request Sent</p>
                        <p className='font-mont text-xs font-medium gray-text'>You have successfully sent a stock request to the store </p>
                    </div>
                    {/* button */}
                    <div className='bg-black py-1 px-10 rounded-2xl mb-10' onClick={() => { handleAlert()}}>
                        <button className='text-white font-mont font-semibold text-xs pb-1.5'>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestReceipt

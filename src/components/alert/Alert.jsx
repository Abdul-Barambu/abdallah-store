import React from 'react'
import { IoNotifications } from 'react-icons/io5'
import { LiaTimesSolid } from "react-icons/lia";

const Alert = ({ setAlert, setClicked }) => {
    return (
        <div>
            <div className="proceed-container">
                {/* icon */}
                <div className='flex justify-end cursor-pointer' onClick={() => setAlert(false)}>
                    <LiaTimesSolid />
                </div>
                {/* alert */}
                <div className='flex flex-col items-center justify-center'>
                    {/* icon */}
                    <div className='bg-black p-6 rounded-full'>
                        <IoNotifications className='text-white text-7xl' />
                    </div>
                    {/* texts */}
                    <div className='text-center mt-6 mb-16'>
                        <p className='font-mont font-semibold text-lg mb-4'>Stock Alert!</p>
                        <p className='font-mont text-xs font-medium gray-text'>Stock <span className='black-text font-bold'>Nivea Spray</span> is now Out of Stock!</p>
                    </div>
                    {/* button */}
                    <div className='bg-black py-1 px-10 rounded-2xl mb-10' onClick={() => {setClicked("Notification"); setAlert(false)}}>
                        <button className='text-white font-mont font-semibold text-xs pb-1.5'>View</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert

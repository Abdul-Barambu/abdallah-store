import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";

const MyProfile = ({ setClicked }) => {

    const [name, setName] = useState('Aliyu Mustapha')
    const [email, setEmail] = useState('aliyu@gmail.com')

    return (
        <div className='bg-color'>
            {/* back */}
            {/* <div
                className={`mt-4 mb-2 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer block`}
                onClick={() => setClicked('CustomerPurchase')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div> */}

            <div className='bg-white mt-14 pt-4 pb-7 px-5 sm:px-10 mx-0 sm:mx-20 h-screen sm:h-1/2'>
                <p className='mb-7 font-mont font-semibold'>My Profile</p>
                {/* inputs */}
                <div className='sm:grid grid-cols-2 gap-10'>
                    <div className='mb-10 sm:mb-0'>
                        <p className='mb-2 font-mont font-medium text-sm'>Name</p>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full px-5 font-mont text-sm font-medium bg-light-gray py-3 sm:py-2 rounded-lg' />
                    </div>
                    <div className='mb-14 sm:mb-0'>
                        <p className='mb-2 font-mont font-medium text-sm'>Email Address</p>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-5 font-mont text-sm font-medium bg-light-gray py-3 sm:py-2 rounded-lg' />
                    </div>
                    <div className='bg-black text-center text-white py-2 rounded-lg'>
                        <button className='font-mont font-medium text-sm'>Update & Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile

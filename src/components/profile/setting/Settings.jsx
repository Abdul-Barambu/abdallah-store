import React from 'react'
import { FaCaretRight } from "react-icons/fa";

const Settings = ({ setClicked }) => {
    return (
        <div className='bg-color'>
            <div className='bg-white mt-14 pt-10 pb-7 px-5 sm:px-10 w-full sm:w-1/2 xl:w-2/5 mx-auto'>
                <p className='mb-7 font-mont font-semibold'>Settings</p>
                {/* buttons */}
                <div className=''>
                    <div className='flex items-center justify-between mb-10 sm:mb-0 w-full px-5 font-mont text-sm font-medium bg-light-gray py-3 sm:py-2.5 rounded-lg shadow cursor-pointer' onClick={() => setClicked("ChangePassword")}>
                        <p className='font-mont font-medium text-sm'>Change Password</p>
                        <FaCaretRight />
                    </div>
                    {/* <div className='flex items-center justify-between mb-14 sm:mb-0 w-full px-5 font-mont text-sm font-medium bg-light-gray py-3 sm:py-2.5 rounded-lg shadow cursor-pointer'>
                        <p className='font-mont font-medium text-sm'>Notification</p>
                        <FaCaretRight />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Settings

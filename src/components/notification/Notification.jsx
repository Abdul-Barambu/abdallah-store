import React from 'react'
import { BsBoxSeamFill } from "react-icons/bs";

const Notification = () => {
    return (
        <div className='bg-color'>
            <div className='bg-white w-full sm:w-[97%] lg:w-4/5 xl:w-3/4 pb-40 mx-auto mt-10 rounded-sm'>
                <div className='py-14 sm:py-7 px-4 sm:px-7'>
                    {/* texts */}
                    <div>
                        <p className='text-black font-mont font-semibold text-xl'>Notification</p>
                    </div>
                    {/* data */}
                    <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 gap-10'>
                        {/* low stock */}
                        <div className='bg-light-gray py-3 px-3 rounded-xl flex justify-between'>
                            <div className='flex items-center gap-5'>
                                {/* box */}
                                <div className='p-6 bg-white rounded-xl'>
                                    <BsBoxSeamFill className='text-4xl icon-yellow' />
                                </div>
                                {/* texts */}
                                <div>
                                    <p className='font-mont icon-yellow text-xs sm:text-sm lg:text-base font-bold mb-4'>Low Stock</p>
                                    <p className='font-mont gray-text text-[8px] sm:text-[10px] lg:text-xs'>Your stock is low</p>
                                </div>
                            </div>
                            <div>
                                <p className='font-mont text-[9px] lg:text-xs gray-text font-medium'>2 hours ago</p>
                            </div>
                        </div>
                        {/* out of stock */}
                        <div className='bg-light-gray py-3 px-3 rounded-xl flex justify-between'>
                            <div className='flex items-center gap-5'>
                                {/* box */}
                                <div className='p-6 bg-white rounded-xl'>
                                    <BsBoxSeamFill className='text-4xl icon-red' />
                                </div>
                                {/* texts */}
                                <div>
                                    <p className='font-mont icon-red text-xs sm:text-sm lg:text-base font-bold mb-4'>Out of Stock</p>
                                    <p className='font-mont gray-text text-[8px] sm:text-[10px] lg:text-xs'>Your stock is out of stock</p>
                                </div>
                            </div>
                            <div>
                                <p className='font-mont text-[9px] lg:text-xs gray-text font-medium'>2 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification

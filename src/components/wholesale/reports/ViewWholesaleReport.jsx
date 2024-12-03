import React from 'react'
import { GoArrowLeft } from "react-icons/go";

const ViewWholesaleReport = ({setClicked}) => {

    const product = JSON.parse(localStorage.getItem('soldStocks'))

    return (
        <div className='bg-color-full'>
            {/* Back Button */}
            <div
                className='mt-4 mx-4 sm:mx-0 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('WholesaleReport')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>

            {/* full details */}
            <div className='bg-white mt-5 px-6 py-7'>
                {/* text */}
                <div>
                    <p className='font-mont font-semibold text-xl sm:text-2xl'>Full Details</p>
                    <p className='text-light-gray font-mont font-medium text-[10px] sm:text-xs mt-2'>Full details of the stock</p>
                </div>
                {/* info */}
                <div className='border border-gray-300 mt-7'>
                    <div className='py-8 px-4 sm:px-7'>
                        {/* product */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Date Of Purchase</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{product.date}</p>
                        </div>
                        {/* product */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Stock Name</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{product.name}</p>
                        </div>
                        {/* product */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>SKU</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{product.sku}</p>
                        </div>
                        {/* product */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Category</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{product.category}</p>
                        </div>
                        {/* product */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Stock Price</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{product.price}</p>
                        </div>
                        {/* product */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Quantity Sold</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{product.qty}</p>
                        </div>
                        {/* product */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Purchase Type</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{product.type}</p>
                        </div>
                        {/* product */}
                        <div className='flex items-center gap-2 mb-2 mt-28'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Total Amount Generated</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{product.total}</p>
                        </div>
                        {/* product */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-semibold text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Profit Made</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-semibold text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{product.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewWholesaleReport

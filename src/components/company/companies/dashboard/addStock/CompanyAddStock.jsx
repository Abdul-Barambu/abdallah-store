import React from 'react'
import { BsBoxSeamFill } from "react-icons/bs";
import { GoArrowLeft } from "react-icons/go";

const CompanyAddStock = ({ setClicked }) => {
    return (
        <div className='bg-color mx-4 sm:mx-0'>
            {/* Back Button */}
            <div
                className='mt-4 mx-4 sm:mx-0 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('CompanyDashboard')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>

            <div className='flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-7 h-3/4 sm:h-1/2 xl:h-3/5'>
                <div className='flex items-center gap-4 bg-white px-3 py-4 sm:py-3 w-full sm:w-4/12 lg:w-1/4 xl:w-1/5 rounded-xl cursor-pointer shadow-md' onClick={() => setClicked("CompanyAddNewStock")}>
                    <div className='bg-light-gray py-2 px-2 rounded-lg'>
                        <BsBoxSeamFill size={12} className='' />
                    </div>
                    <p className='font-mont font-medium'>Add New Stock</p>
                </div>
                <div className='flex items-center gap-4 bg-white px-3 py-4 sm:py-3 w-full sm:w-4/12 lg:w-1/4 xl:w-1/5 rounded-xl cursor-pointer shadow-md' onClick={() => setClicked("CompanyRestock")}>
                    <div className='bg-light-gray py-2 px-2 rounded-lg'>
                        <BsBoxSeamFill size={12} className='' />
                    </div>
                    <p className='font-mont font-medium'>Add Existing Stock</p>
                </div>
            </div>
        </div>
    )
}

export default CompanyAddStock
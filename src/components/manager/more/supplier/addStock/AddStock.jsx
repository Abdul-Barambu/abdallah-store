import React from 'react'
import { BsBoxSeamFill } from "react-icons/bs";

const AddStock = ({ setClicked }) => {
    return (
        <div className='bg-color mx-4 sm:mx-0'>
            <div className='flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-7 h-3/4 sm:h-1/2 xl:h-3/5'>
                <div className='flex items-center gap-4 bg-white px-3 py-4 sm:py-3 w-full sm:w-4/12 lg:w-1/4 xl:w-1/5 rounded-xl cursor-pointer shadow-md' onClick={() => setClicked("AddNewStock")}>
                    <div className='bg-light-gray py-2 px-2 rounded-lg'>
                        <BsBoxSeamFill size={12} className='' />
                    </div>
                    <p className='font-mont font-medium'>Add New Stock</p>
                </div>
                <div className='flex items-center gap-4 bg-white px-3 py-4 sm:py-3 w-full sm:w-4/12 lg:w-1/4 xl:w-1/5 rounded-xl cursor-pointer shadow-md' onClick={() => setClicked("AddExistingStock")}>
                    <div className='bg-light-gray py-2 px-2 rounded-lg'>
                        <BsBoxSeamFill size={12} className='' />
                    </div>
                    <p className='font-mont font-medium'>Add Existing Stock</p>
                </div>
            </div>
        </div>
    )
}

export default AddStock

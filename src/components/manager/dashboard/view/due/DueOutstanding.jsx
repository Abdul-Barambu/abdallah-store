import React, { useState } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { dues } from '../../../../../data';

const DueOutstanding = ({ setClicked }) => {

    const [searchValue, setSearchValue] = useState('');

    const filteredDues = dues.filter((due) =>
        due.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className='bg-color-dash'>
            {/* Top Section */}
            <div className='flex flex-col sm:flex-row sm:items-center mt-5 gap-6 sm:gap-20 lg:gap-40 xl:gap-72'>
                {/* Back Button */}
                <div
                    className='flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                    onClick={() => setClicked('ManagerDashboard')}
                >
                    <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                    <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
                </div>

                {/* Search Input */}
                <div className=''>
                    <div className='relative flex items-center gap-2'>
                        {!searchValue && (
                            <CiSearch className='absolute left-24 sm:left-36 lg:left-40' size={15} />
                        )}
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className='font-mont font-medium w-full sm:w-[350px] lg:w-[400px] pl-10 pr-4 py-3 sm:py-2 bg-white rounded-xl outline-none text-center text-xs sm:text-base'
                        />
                        <div className='bg-white py-3 px-3 rounded-lg'>
                            <FaFilter className='text-sm' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className='mt-6 overflow-x-auto'>
                {/* Wrapper for horizontal scroll */}
                <div className='min-w-[600px]'>
                    {/* Head */}
                    <div className='grid grid-cols-6 bg-white py-3 text-center mb-1'>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Wholesaler's Name</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Date of Purchase</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Description</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Price</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Payment Status</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Action</span>
                    </div>

                    {/* Data */}
                    <div className='h-96 overflow-y-scroll'>
                        {
                            filteredDues.map((due) => (
                                <div key={due.id} className='grid grid-cols-6 my-0.5 text-center'>
                                    <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{due.name}</span>
                                    <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{due.date}</span>
                                    <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{due.description}</span>
                                    <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>₦{due.price}</span>
                                    <div className='bg-white/[0.47] py-5'>
                                        <span className='font-mont text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-medium icon-red on-credit truncate'>{due.status}</span>
                                    </div>
                                    <div className='flex flex-row gap-1 justify-center items-center bg-white/[0.47]'>
                                        <IoEye className='cursor-pointer' onClick={() => {setClicked("Receipt"); localStorage.setItem('due', JSON.stringify(due))}} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DueOutstanding;

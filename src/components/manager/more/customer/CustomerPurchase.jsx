import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { listOfStocks } from '../../../../data';

const CustomerPurchase = ({setClicked}) => {

    const [choose, setChoose] = useState('wholesalers')
    const [searchValue, setSearchValue] = useState('');

    const filteredDues = listOfStocks.filter((list) => {
        return list.name.toLowerCase().includes(searchValue.toLowerCase())
    });

    return (
        <div className='bg-color mx-4 sm:mx-0'>
            {/* choose */}
            <div className='mt-8 flex justify-center'>
                {/* choose */}
                <div className='bg-white gap-3 sm:gap-5 py-1 sm:py-2 px-1 sm:px-2 rounded-full flex'>
                    <p className={`font-mont text-xs sm:text-sm py-2.5 px-10 cursor-pointer ${choose === 'wholesalers' ? 'bg-light-gray border-choose-left font-medium' : ''}`} onClick={() => setChoose('wholesalers')}>Wholesalers</p>
                    <p className={`font-mont text-xs sm:text-sm py-2.5 px-10 cursor-pointer ${choose === 'retailers' ? 'bg-light-gray  border-choose-right font-medium' : ''}`} onClick={() => setChoose('retailers')}>Retailers</p>
                </div>
            </div>
            {/* search */}
            <div className='mt-5 sm:flex justify-center'>
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
                            filteredDues.map((list) => (
                                <div key={list.id} className='grid grid-cols-6 my-0.5 text-center'>
                                    <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.buyer}</span>
                                    <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.date}</span>
                                    <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.name}</span>
                                    <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>₦{list.price}</span>
                                    <div className='bg-white/[0.47] py-5'>
                                        <span className={`text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium ${list.status === 'Fully Paid' ? 'fully-paid green-text' : 'on-credit icon-red'} truncate`}>{list.status}</span>
                                    </div>
                                    <div className='flex flex-row gap-4 justify-center items-center bg-white/[0.47]'>
                                        <IoEye className='cursor-pointer' onClick={() => { setClicked("CustomerPurchaseReceipt"); localStorage.setItem("ListOfStocks", JSON.stringify(list)) }} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerPurchase

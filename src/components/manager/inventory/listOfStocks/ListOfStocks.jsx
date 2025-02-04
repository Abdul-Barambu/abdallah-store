import React, { useEffect, useState } from 'react';
import { GoArrowLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ListOfStocks = ({ setClicked }) => {

    const [searchValue, setSearchValue] = useState('');
    const [listOfStocks, setListOfStocks] = useState([])
    const [loading, setLoading] = useState(false)
    const errorMessage = 'Something went wrong...'

    const filteredDues = listOfStocks.filter((list) =>
        list.stock_name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        setLoading(true)
        axios.get('https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/stocks/', { headers })
            .then(response => {
                // console.log(response)
                setListOfStocks(response.data)
                setLoading(false)
            }).catch(error => {
                // console.log(error)
                toast.error('Something went wrong...')
                setLoading(false)
            })
    }, [])

    return (
        <div className='bg-color-dash mx-4 sm:mx-0'>
            <ToastContainer />
            {/* Top Section */}
            <div className='mt-5'>
                {/* Back Button */}
                <div
                    className='flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                    onClick={() => setClicked('Inventory')}
                >
                    <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                    <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
                </div>

                {/* Search Input */}
                <div className='mt-8'>
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
                    <div className='grid grid-cols-5 bg-white py-3 text-center mb-1'>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Category</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Supplier</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>SKU</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Action</span>
                    </div>

                    {/* Data */}
                    {
                        loading ? (
                            <div className='loader'></div>
                        ) : filteredDues.length === 0 ? (
                            <div className="text-center text-black font-mont font-medium py-5">
                                No Records Found
                            </div>
                        ) : (
                            <div className='h-96 overflow-y-scroll'>
                                {filteredDues.map((list) => (
                                    <div key={list.id} className='grid grid-cols-5 my-0.5 text-center'>
                                        <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.stock_name}</span>
                                        <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.category}</span>
                                        <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.supplier_name}</span>
                                        <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.sku}</span>
                                        <div className='flex flex-row gap-4 justify-center items-center bg-white/[0.47]'>
                                            <IoEye className='cursor-pointer' onClick={() => { setClicked("ViewStock"); localStorage.setItem("ListOfStocks", JSON.stringify(list)) }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default ListOfStocks

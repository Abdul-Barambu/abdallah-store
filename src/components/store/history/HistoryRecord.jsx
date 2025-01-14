import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const HistoryRecord = () => {

    const [searchValue, setSearchValue] = useState('');
    const [listofApproved, setListOfApproved] = useState([])
    const [loading, setLoading] = useState(false)

    const filteredList = listofApproved.filter((list) =>
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
        axios.get('https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/store/requests/approved/', { headers })
            .then(response => {
                console.log(response)
                setListOfApproved(response.data)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Something went wrong, Please try again'
                })
            })
    }, [])

    return (
        <div className='bg-color-dash mx-4 sm:mx-0'>
            {/* Top Section */}
            <div className='mt-14'>

                <div>
                    <p className='font-mont font-semibold text-lg'>History Record</p>
                </div>

                {/* Search Input */}
                <div className='mt-8 sm:flex justify-center'>
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
                    <div className='grid grid-cols-3 bg-white py-3 text-center mb-1'>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Quantity</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Date</span>
                    </div>

                    {/* Data */}
                    {
                        loading ? (<div className='loader'></div>) : (
                            <div className='h-96 overflow-y-scroll'>
                                {
                                    filteredList.map((list) => (
                                        <div key={list.id} className='grid grid-cols-3 my-0.5 text-center'>
                                            <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.stock_name}</span>
                                            <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.quantity}</span>
                                            <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.date_requested}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default HistoryRecord

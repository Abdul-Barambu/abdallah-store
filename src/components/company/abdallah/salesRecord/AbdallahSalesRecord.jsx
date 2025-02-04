import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { listOfStocks } from '../../../../data';
import axios from 'axios';

const AbdallahSalesRecord = ({ setClicked }) => {

    const user_id = localStorage.getItem('rep-company-id')

    const [searchValue, setSearchValue] = useState('');
    const [purchases, setPurchases] = useState([])
    const [loading, setLoading] = useState(false)

    const filteredDues = listOfStocks.filter((list) =>
        list.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // headers
    const Access = localStorage.getItem("access-token")
    const Refresh = localStorage.getItem("refresh-token")

    const headers = {
        Authorization: `Bearer ${Access}`
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/company/user/${user_id}/purchases/`, { headers })
            .then(response => {
                // console.log(response)
                setPurchases(response.data.purchases)
                setLoading(false)
            }).catch(error => {
                // console.log(error)
                setLoading(false)
            })
    }, [])

    return (
        <div className='bg-color-dash mx-4 sm:mx-0'>
            {/* Top Section */}
            <div className='mt-5'>

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
                    <div className='grid grid-cols-7 bg-white py-3 text-center mb-1'>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Date of Purchase</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>QTY</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Amount Paid</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>AAS Commission</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Status</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Action</span>
                    </div>

                    {/* Data */}
                    {/* Data */}
                    {
                        loading ? (<div className='loader'></div>) : (
                            <div className='h-96 overflow-y-scroll'>
                                {
                                    purchases.length > 0 ? (
                                        purchases.map((purchase) => (
                                            <div key={purchase.id} className='grid grid-cols-7 my-0.5 text-center'>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>
                                                    {purchase.items.map((item, index) => (
                                                        <span key={index} className='flex flex-col'>{item.stock_name}</span>
                                                    ))}
                                                </span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{purchase.date_of_purchase}</span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>
                                                    {purchase.items.map((item, index) => (
                                                        <span key={index}>{item.unit_quantity}</span>
                                                    ))}</span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>₦{Number(purchase.amount_paid).toLocaleString()}.00</span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>₦{Number().toLocaleString()}.00</span>
                                                <div className='bg-white/[0.47] py-5'>
                                                    <span className={`text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium ${purchase.status === 'Paid' ? 'fully-paid green-text' : 'on-credit icon-red'} truncate`}>{purchase.status}</span>
                                                </div>
                                                <div className='flex flex-row gap-4 justify-center items-center bg-white/[0.47]'>
                                                    <IoEye className='cursor-pointer' onClick={() => { setClicked("ViewAbdallahSalesRecord"); localStorage.setItem("ViewAbdallahPurchase", JSON.stringify(purchase)) }} />
                                                </div>
                                            </div>
                                        ))
                                    ) : (<p className='font-mont text-center font-semibold mt-4'>No Record added</p>)
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AbdallahSalesRecord
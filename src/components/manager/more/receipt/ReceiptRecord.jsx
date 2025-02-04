import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { listOfStocks } from '../../../../data';
import axios from 'axios';

const ReceiptRecord = ({ setClicked }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filter, setFilter] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [receipts, setReceipts] = useState([])
    const [loading, setLoading] = useState(false)

    const filteredReceipts = receipts.filter((receipt) => {
        const matchesSearch = receipt.payment_status.toLowerCase().includes(searchValue.toLowerCase())
        const matchesFilter = selectedFilter === 'All' || receipt.payment_status.toLowerCase() === selectedFilter.toLowerCase();

        return matchesSearch && matchesFilter;
    });

    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        setLoading(true)
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/receipts/", { headers })
            .then(response => {
                // console.log(response)
                setReceipts(response.data)
                setLoading(false)
            }).catch(error => {
                // console.log(error)
                setLoading(false)
            })
    }, [])


    return (
        <div className='bg-color-dash mx-4'>
            {/* Top Section */}
            <div className='mt-5 block sm:flex items-center justify-between'>
                {/* Search Input */}
                <div className='mb-5 sm:mb-0'>
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
                        <div className='bg-white py-3 px-3 rounded-lg cursor-pointer' onClick={() => setFilter(!filter)}>
                            <FaFilter className='text-sm' />
                        </div>
                    </div>
                    {/* filter */}
                    {filter && (
                        <div className='sm:top-[13%] lg:top-[11%] xl:top-[24%] left-0 sm:left-[30%] lg:left-[36%] xl:left-[27%] absolute bg-white w-10/12 ml-8 sm:ml-0 sm:w-1/3 lg:w-1/5 px-8 xl:px-10 py-5'>
                            <p
                                className={`${selectedFilter === 'All' ? 'border border-black black-text' : 'border-none gray-text'} text-center font-mont font-medium text-[15px] mb-3 bg-light-gray py-2 px-6 rounded-xl shadow-md cursor-pointer`}
                                onClick={() => { setSelectedFilter('All'); setFilter(false) }}
                            >
                                All
                            </p>
                            <p
                                className={`${selectedFilter === 'On Credit' ? 'border border-black black-text' : 'border-none gray-text'} text-center font-mont font-medium text-[15px] mb-3 bg-light-gray py-2 px-6 rounded-xl shadow-md cursor-pointer`}
                                onClick={() => { setSelectedFilter('On Credit'); setFilter(false) }}
                            >
                                On Credit
                            </p>
                            <p
                                className={`${selectedFilter === 'Fully Paid' ? 'border border-black black-text' : 'border-none gray-text'} text-center font-mont font-medium text-[15px] mb-3 bg-light-gray py-2 px-6 rounded-xl shadow-md cursor-pointer`}
                                onClick={() => { setSelectedFilter('Fully Paid'); setFilter(false) }}
                            >
                                Fully Paid
                            </p>
                        </div>
                    )}
                </div>
                {/* button */}
                <div className='bg-black py-3 sm:py-2 rounded-xl w-full sm:w-1/4 text-center cursor-pointer' onClick={() => setClicked("AddNewReceiptRecord")}>
                    <button className='font-mont font-medium text-sm text-white'>Add New Receipt</button>
                </div>
            </div>

            {/* Table Section */}
            <div className='mt-6 overflow-x-auto'>
                {/* Wrapper for horizontal scroll */}
                <div className='min-w-[600px]'>
                    {/* Head */}
                    <div className='grid grid-cols-9 bg-white py-3 text-center mb-1'>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Supplier's Name</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Date of Purchase</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Price</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Qty</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Total Price</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Amount Paid</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Outstanding</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Payment Status</span>
                    </div>

                    {/* Data */}
                    {
                        loading ? (<div className='loader'></div>) : (
                            <div className='h-96 overflow-y-scroll'>
                                {
                                    receipts.length > 0 ? (
                                        filteredReceipts.map((receipt) => (
                                            <div key={receipt.id} className='grid grid-cols-9 my-0.5 text-center'>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{receipt.supplier_name}</span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>
                                                    {receipt.items.map((item, index) => (
                                                        <span key={index} className='flex flex-col'>{item.date}</span>
                                                    ))}
                                                </span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>
                                                    {receipt.items.map((item, index) => (
                                                        <span key={index} className='flex flex-col'>{item.stock_name}</span>
                                                    ))}
                                                </span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>
                                                    {receipt.items.map((item, index) => (
                                                        <span key={index} className='flex flex-col'>₦{Number(item.price).toLocaleString()}.00</span>
                                                    ))}
                                                </span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>
                                                    {receipt.items.map((item, index) => (
                                                        <span key={index} className='flex flex-col'>{item.quantity}</span>
                                                    ))}
                                                </span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>₦{Number(receipt.total).toLocaleString()}.00</span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>₦{Number(receipt.amount_paid).toLocaleString()}.00</span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>₦{Number(receipt.outstanding).toLocaleString()}.00</span>
                                                <div className='bg-white/[0.47] py-5'>
                                                    <span className={`text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium ${receipt.payment_status === 'Fully Paid' ? 'fully-paid green-text' : 'on-credit icon-red'} truncate`}>{receipt.payment_status}</span>
                                                </div>
                                                {/* <div className='flex flex-row gap-4 justify-center items-center bg-white/[0.47]'>
                                                <IoEye className='cursor-pointer' onClick={() => { setClicked("ViewReceiptRecord"); localStorage.setItem("ListOfStocks", JSON.stringify(receipt)) }} />
                                                <MdEditSquare className='cursor-pointer icon-blue' onClick={() => { setClicked("EditReceiptRecord"); localStorage.setItem("ReceiptsRecord", JSON.stringify(receipt)) }} />
                                                <RiDeleteBin6Fill className='cursor-pointer icon-red' />
                                            </div> */}
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

export default ReceiptRecord

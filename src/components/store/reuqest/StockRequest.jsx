import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockRequest = () => {
    const [approvedIds, setApprovedIds] = useState([]);
    const [requests, setRequests] = useState([])

    const handleApprove = (id) => {
        if (!approvedIds.includes(id)) {
            setApprovedIds([...approvedIds, id]);
        }
    };

    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }


    useEffect(() => {
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/store/requests/all/", {headers})
        .then(response => {
            console.log(response)
            setRequests(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className='bg-color-dash mx-4 sm:mx-0'>
            <div className='mt-14'>
                <p className='font-mont font-semibold text-lg'>Pending Stock Request</p>
            </div>

            <div className='mt-3 overflow-x-auto'>
                <div className='min-w-[600px]'>
                    <div className='grid grid-cols-5 bg-white py-3 text-center mb-1'>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>SKU</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Category</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Qty</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Action</span>
                    </div>

                    <div className='h-72 overflow-y-scroll'>
                        {requests.map((stock) => (
                            <div key={stock.id} className='grid grid-cols-5 my-0.5 text-center'>
                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.name}</span>
                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.sku}</span>
                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.category}</span>
                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.qty}</span>
                                <div className='flex flex-row gap-4 justify-center items-center bg-white/[0.47]'>
                                    <div className={`${approvedIds.includes(stock.id) ? 'approved-button' : 'approve-button'}`}>
                                        <button
                                            className={`font-mont text-[8px] sm:text-[10px] xl:text-sm font-semibold ${approvedIds.includes(stock.id) ? 'text-white' : 'black-text'
                                                }`}
                                            onClick={() => handleApprove(stock.id)}
                                        >
                                            {approvedIds.includes(stock.id) ? 'Approved' : 'Approve Request'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockRequest;

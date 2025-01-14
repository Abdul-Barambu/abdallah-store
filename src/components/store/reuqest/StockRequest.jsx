import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const StockRequest = () => {
    const [approvedIds, setApprovedIds] = useState([]);
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/store/requests/all/", { headers })
            .then(response => {
                console.log(response)
                setRequests(response.data)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    const handleApproveRequest = (id) => {
        axios.post(
            `https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/store/approve-request/${id}/`,
            {},
            { headers }
        )
            .then(response => {
                console.log(response);
                toast.success('Request approved successfully');
                // Update the approved IDs to reflect the success
                setApprovedIds((prevIds) => [...prevIds, id]);
            })
            .catch(error => {
                console.error(error);
                toast.error('Something went wrong, please try again');
            });
    };

    return (
        <div className='bg-color-dash mx-4 sm:mx-0'>
            <ToastContainer />
            <div className='mt-14'>
                <p className='font-mont font-semibold text-lg'>Pending Stock Request</p>
            </div>

            <div className='mt-3 overflow-x-auto'>
                <div className='min-w-[600px]'>
                    <div className='grid grid-cols-4 bg-white py-3 text-center mb-1'>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Date</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Qty</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Action</span>
                    </div>

                    {
                        loading ? (<div className='loader'></div>) : (
                            <div className='h-96 overflow-y-scroll'>
                                {requests.map((stock) => (
                                    stock.is_approved ? ('') : (
                                        <div key={stock.id} className='grid grid-cols-4 my-0.5 text-center'>
                                            <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.stock_name}</span>
                                            <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.date_requested}</span>
                                            <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.quantity}</span>
                                            <div className='flex flex-row gap-4 justify-center items-center bg-white/[0.47]'>
                                                <div className='flex flex-row gap-4 justify-center items-center bg-white/[0.47]'>
                                                    <div
                                                        className={`${approvedIds.includes(stock.id) ? 'approved-button' : 'approve-button'} cursor-pointer`}
                                                        onClick={() => handleApproveRequest(stock.id)}
                                                    >
                                                        <button
                                                            className={`font-mont text-[8px] sm:text-[10px] xl:text-sm font-semibold ${approvedIds.includes(stock.id) ? 'text-white' : 'text-black'
                                                                }`}
                                                            disabled={approvedIds.includes(stock.id)} // Disable button if already approved
                                                        >
                                                            {approvedIds.includes(stock.id) ? 'Approved' : 'Approve Request'}
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default StockRequest;

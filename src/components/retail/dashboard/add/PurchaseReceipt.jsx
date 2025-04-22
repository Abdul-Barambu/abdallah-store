import React, { useEffect, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";

const PurchaseReceipt = ({ setClicked, handlePrint, button }) => {

    const purchase = JSON.parse(localStorage.getItem('stock-retail-purchase'))
    const [randomNumber, setRandomNumber] = useState()

    const userName = localStorage.getItem('full-name')

    // Generate random number only once when component mounts
    useEffect(() => {
        const generateRandomNumber = () => {
            return Math.floor(100000 + Math.random() * 900000);
        };

        setRandomNumber(generateRandomNumber());
    }, []);  // Empty dependency array ensures this effect only runs once

    return (
        <div>
            <div className={`${button ? 'bg-white' : 'bg-color-full'} mx-4 sm:mx-0 pb-10 sm:pb-0`}>
                {/* back */}
                <div
                    className={`mt-4 mb-2 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer ${button ? 'hidden' : 'block'}`}
                    onClick={() => setClicked('RetailAddPurchase')}
                >
                    <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                    <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
                </div>

                {/* receipt */}
                <div className={`bg-white ${button ? 'w-full' : 'w-full sm:w-2/3 lg:w-3/6 xl:w-2/5'} mx-auto pt-0.5 pb-2`}>
                    {/* header */}
                    <div className='black-bg mx-0.5 p-1'>
                        <div className='border-receipt text-center py-2'>
                            <p className='text-white font-mont text-[11px] sm:text-base font-semibold'>Receipt from Abdallah Abdallah Store</p>
                            <span className='text-white font-mont text-[8px] sm:text-sm font-medium'>Sales rep: {userName}</span>
                        </div>
                    </div>
                    {/* body */}
                    <div className='mt-3'>
                        {/* top */}
                        <div className='mx-5 sm:mx-10'>
                            <span className='flex justify-between items-center'>
                                <p className='font-mont text-[8px] sm:text-xs gray-text font-medium'>invoice #{randomNumber}</p>
                                <p className='font-mont text-[8px] sm:text-xs black-text font-medium'>Date of Purchase: {purchase.date_of_purchase}</p>
                            </span>
                        </div>
                        {/* middle */}
                        <div>
                            {/* head */}
                            <div className='mx-2 sm:mx-3 mt-3 bg-light-gray'>
                                <div className='grid grid-cols-4 text-center'>
                                    <span className='font-mont text-[9px] sm:text-xs font-medium py-2'>Description</span>
                                    <span className='font-mont text-[9px] sm:text-xs font-medium py-2'>Unit Price</span>
                                    <span className='font-mont text-[9px] sm:text-xs font-medium py-2'>Qty</span>
                                    <span className='font-mont text-[9px] sm:text-xs font-medium py-2'>Amount</span>
                                </div>
                            </div>
                            {/* data */}
                            <div className='mx-3 sm:mx-10 pt-1'>
                                {
                                    purchase.items.map((item, index) => (
                                        <div key={index} className='grid grid-cols-4 text-center py-1.5'>
                                            <span className='font-mont text-[9px] sm:text-xs font-medium'>{item.stock_name}</span>
                                            <span className='font-mont text-[9px] sm:text-xs font-medium'>₦{Number(item.price).toLocaleString()}.00</span>
                                            <span className='font-mont text-[9px] sm:text-xs font-medium'>{item.quantity}</span>
                                            <span className='font-mont text-[9px] sm:text-xs font-medium'>₦{Number(item.price * item.quantity).toLocaleString()}.00</span>
                                        </div>
                                    ))
                                }
                                {/* total */}
                                <p className='text-right text-xs sm:text-sm font-mont font-bold pt-1.5'>Total: ₦{Number(purchase.total_price).toLocaleString()}.00</p>
                            </div>
                            <p className='font-mont gray-text font-medium mt-10 sm:mt-14 text-center text-xs sm:text-base'>Thank You For Trusting Our Store</p>
                            {/* bottom */}
                            <div className='mt-10 sm:mt-14 mx-5 sm:mx-10'>
                                <div className='flex items-center justify-between mb-4 sm:mb-5'>
                                    <p className='text-[10px] sm:text-sm font-mont font-medium'>Outstanding:</p>
                                    <p className='text-[10px] sm:text-sm font-mont font-medium'>₦{Number(purchase.outstanding_balance).toLocaleString()}.00</p>
                                </div>
                                <div className='flex items-center justify-between mb-5'>
                                    <p className='text-[10px] sm:text-sm font-mont font-bold'>Amount Paid:</p>
                                    <p className='text-[10px] sm:text-sm font-mont font-bold'>₦{Number(purchase.amount_paid).toLocaleString()}.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* footer */}
                    <div className='bg-light-gray mx-2 sm:mx-3 mt-5 text-center py-2'>
                        <p className='text-[7px] sm:text-xs font-mont font-medium mb-2'>Payment Status</p>
                        <p className='text-sm sm:text-2xl font-mont font-bold'>{purchase.payment_status}</p>
                    </div>
                </div>

                {/* buttons */}
                <div className={`flex items-center justify-center gap-5 mt-6 mb-10 ${button ? 'hidden' : 'block'}`}>
                    <button onClick={handlePrint} className="black-bg text-white w-full sm:w-[17%] lg:w-[12%] text-xs font-mont font-semibold py-2.5 rounded-xl">Print</button>
                    <button onClick={handlePrint} className="bg-white border border-black w-full sm:w-[17%] lg:w-[12%] text-xs font-mont font-semibold py-2.5 rounded-xl">Share as PDF</button>
                </div>
            </div>
        </div>
    )
}

export default PurchaseReceipt

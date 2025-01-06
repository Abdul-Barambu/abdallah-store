import axios from 'axios';
import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const AddExisting = ({ setClicked }) => {


    const [quantity, setQuantity] = useState()
    const [date, setDate] = useState("")
    const [price, setPrice] = useState("")
    const [amountPaid, setAmountPaid] = useState("")
    const [status, setStatus] = useState("")
    const [btn, setBtn] = useState(false)

    const handleStatus = (e) => {
        const selectedValue = e.target.value
        setStatus(selectedValue)
    }


    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }


    const stockId = localStorage.getItem('stockId')

    console.log(stockId)

    const handleAddExistingStock = () => {
        setBtn(true)
        axios.put(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/stocks/${stockId}/`, {
            quantity: quantity,
            price: price,
            amount_paid: amountPaid,
            date_of_purchase: date,
            payment_status: status
        }, { headers })
            .then(response => {
                console.log(response)
                toast.success('Added Successfully')
                setBtn(false)
            }).catch(error => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Something went wrong, please try again'
                })
                setBtn(false)
            })
    }

    return (
        <div className='bg-color-full'>
            <ToastContainer />
            {/* Back Button */}
            <div
                className='mt-4 mx-4 sm:mx-0 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('SupplierManagement')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>
            {/* full details */}
            <div className='bg-white mt-5 px-6 py-7'>
                {/* text */}
                <div>
                    <p className='font-mont font-semibold text-lg sm:text-2xl'>Add Existing Stock</p>
                </div>
                {/* info */}
                <div className='mt-7'>
                    <div className='py-2 sm:py-6 grid grid-cols-1 sm:grid-cols-2'>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Quantity</p>
                            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Quantity' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Date Of Restock</p>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder='Date' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Price</p>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Amount Paid</p>
                            <input type="text" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} placeholder='Amount Paid' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Payment Status</p>
                            <select name="paymentStatus" onChange={handleStatus} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4'>
                                <option value="">---- Choose Status -----</option>
                                <option value="On Credit">On Credit</option>
                                <option value="Fully Paid">Fully Paid</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* button */}
                <div className='grid grid-cols-1 sm:grid-cols-2 py-3 cursor-pointer' onClick={handleAddExistingStock}>
                    <button className="black-bg text-white w-full sm:w-3/4 text-xs font-mont font-semibold py-3 rounded-lg flex justify-center items-center">{btn ? (<div className='loader-btn'></div>) : 'Save & Update'}</button>
                </div>
            </div>
        </div>
    )
}

export default AddExisting

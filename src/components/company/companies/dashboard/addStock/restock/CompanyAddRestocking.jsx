import axios from 'axios';
import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const CompanyAddRestocking = ({ setClicked }) => {

    const stockId = localStorage.getItem('stockId')

    const [commission, setCommission] = useState("")
    const [quantity, setQuantity] = useState("")
    const [outOfStock, setOutOfStock] = useState("")
    const [lowStock, setLowStock] = useState("")
    const [btn, setBtn] = useState(false)


    // headers
    const Access = localStorage.getItem("access-token")
    const Refresh = localStorage.getItem("refresh-token")

    const headers = {
        Authorization: `Bearer ${Access}`
    }

    // console.log(stockId)

    const handleRestock = () => {
        setBtn(true)
        axios.put(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/company/stocks/${stockId}/restock/`, {
            increase_quantity: parseInt(quantity),
            commission: parseInt(commission),
            low_stock_threshold: parseInt(lowStock),
            out_of_stock_threshold: parseInt(outOfStock)
        }, { headers })
            .then(response => {
                // console.log(response)
                toast.success('Stock added successfully')
                setBtn(false)
            }).catch(error => {
                // console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Something went wrong, please try again'
                })
                setBtn(false)
            })
    }

    return (
        <div className='bg-color'>
            <ToastContainer />
            {/* Back Button */}
            <div
                className='mt-4 mx-4 sm:mx-0 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('CompanyRestock')}
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
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Commission</p>
                            <input type="text" value={commission} onChange={(e) => setCommission(e.target.value)} placeholder='Commission Percentage %' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                    </div>
                    {/* stock status */}
                    <h1 className='font-mont font-semibold text-base sm:text-xl mb-3'>Stock Status Notification</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 py-3'>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Low Stock</p>
                            <input type="text" value={lowStock} onChange={(e) => setLowStock(e.target.value)} placeholder='Low Stock Number' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Out of Stock</p>
                            <input type="text" value={outOfStock} onChange={(e) => setOutOfStock(e.target.value)} placeholder='Out of Stock Number' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                    </div>
                </div>
                {/* button */}
                <div className='grid grid-cols-1 sm:grid-cols-2 py-3 cursor-pointer' onClick={handleRestock}>
                    <button className="black-bg text-white w-full sm:w-3/4 text-xs font-mont font-semibold py-3 rounded-lg flex justify-center items-center">{btn ? (<div className='loader-btn'></div>) : 'Save & Update'}</button>
                </div>
            </div>
        </div>
    )
}

export default CompanyAddRestocking
import axios from 'axios';
import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const AddExisting = ({ setClicked }) => {

    const [quantity, setQuantity] = useState("")
    const [date, setDate] = useState("")
    const [price, setPrice] = useState()
    const [amountPaid, setAmountPaid] = useState("")
    const [status, setStatus] = useState("")
    const [wholesale, setWholesale] = useState("")
    const [wholesaleCap, setWholesaleCap] = useState("")
    const [wholesalePrice, setWholesalePrice] = useState("")
    const [retailPrice, setRetailPrice] = useState("")
    const [retail, setRetail] = useState("")
    const [retailCap, setRetailCap] = useState("")
    const [lowStock, setLowStock] = useState("")
    const [outOfStock, setOutOfStock] = useState("")
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

    const handleAddExistingStock = () => {
        setBtn(true)
        axios.post(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/stocks/${stockId}/restock/`, {
            quantity: parseInt(quantity),
            price: price,
            payment_status: status,
            amount_paid: amountPaid,
            wholesale_actual_price: wholesalePrice,
            wholesale_price: wholesale,
            wholesale_cap_price: wholesaleCap,
            retail_actual_price: retailPrice,
            retail_price: retail,
            retail_cap_price: retailCap,
            date_of_purchase: date,
            low_stock_threshold: parseInt(lowStock),
            out_of_stock_threshold: parseInt(outOfStock)
        }, { headers })
            .then(response => {
                // console.log(response)
                toast.success('Added Successfully')
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
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Wholesale Actual Price</p>
                            <input type="text" value={wholesalePrice} onChange={(e) => setWholesalePrice(e.target.value)} placeholder='Wholesale Price' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Retail Actual Price</p>
                            <input type="text" value={retailPrice} onChange={(e) => setRetailPrice(e.target.value)} placeholder='Retail Price' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
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
                    {/* prices */}
                    <h1 className='font-mont font-semibold text-base sm:text-xl mb-3'>Selling Price</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 py-3'>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Wholesale Price</p>
                            <input type="text" value={wholesale} onChange={(e) => setWholesale(e.target.value)} placeholder='Wholesale Selling Price' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Wholesale Cap Price</p>
                            <input type="text" value={wholesaleCap} onChange={(e) => setWholesaleCap(e.target.value)} placeholder='Wholesale Cap Price' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Retail Price</p>
                            <input type="text" value={retail} onChange={(e) => setRetail(e.target.value)} placeholder='Retail Selling Price' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Retail Cap Price</p>
                            <input type="text" value={retailCap} onChange={(e) => setRetailCap(e.target.value)} placeholder='Retail Cap Price' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
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
                <div className='grid grid-cols-1 sm:grid-cols-2 py-3 cursor-pointer' onClick={handleAddExistingStock}>
                    <button className="black-bg text-white w-full sm:w-3/4 text-xs font-mont font-semibold py-3 rounded-lg flex justify-center items-center">{btn ? (<div className='loader-btn'></div>) : 'Save & Update'}</button>
                </div>
            </div>
        </div>
    )
}

export default AddExisting

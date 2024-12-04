import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";

const AddNewStock = ({ setClicked }) => {

    const [stockName, setStockName] = useState("")
    const [supplier, setSupplier] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQUantity] = useState("")
    const [sku, setSku] = useState("")
    const [date, setDate] = useState("")
    const [price, setPrice] = useState("")
    const [outstanding, setOutstanding] = useState("")
    const [amountPaid, setAmountPaid] = useState("")
    const [status, setStatus] = useState("")
    const [wholesale, setWholesale] = useState("")
    const [wholesaleCap, setWholesaleCap] = useState("")
    const [retail, setRetail] = useState("")
    const [retailCap, setRetailCap] = useState("")
    const [lowStock, setLowStock] = useState("")

    const handleStatus = (e) => {
        const selectedValue = e.target.value;
        setStatus(selectedValue);
    };


    return (
        <div className='bg-color-full'>
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
                    <p className='font-mont font-semibold text-lg sm:text-2xl'>Add New Stock</p>
                    <p className='text-light-gray font-mont font-medium text-[10px] sm:text-xs mt-2'>Add new Product</p>
                </div>
                {/* info */}
                <div className='mt-7'>
                    <div className='py-2 sm:py-6 grid grid-cols-1 sm:grid-cols-2'>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Stock Name</p>
                            <input type="text" value={stockName} onChange={(e) => setStockName(e.target.value)} placeholder='Stock Name' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Supplier Name</p>
                            <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder='Supplier Name' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Category</p>
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Category' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Quantity</p>
                            <input type="text" value={quantity} onChange={(e) => setQUantity(e.target.value)} placeholder='QUantity' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>SKU</p>
                            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder='SKU Code' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Date Of Purchase</p>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder='Date' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Price</p>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
                        </div>
                        {/* input */}
                        <div className='mb-7'>
                            <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Outstanding</p>
                            <input type="text" value={outstanding} onChange={(e) => setOutstanding(e.target.value)} placeholder='Outstanding' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
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
                                <option value="credit">On Credit</option>
                                <option value="full">Fully Paid</option>
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
                            <input type="text" value={wholesaleCap} onChange={(e) => setWholesaleCap(e.target.value)} placeholder='WHolesale Cap Price' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
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
                    </div>
                </div>
                {/* button */}
                <div className='grid grid-cols-1 sm:grid-cols-2 py-3'>
                    <button className="black-bg text-white w-full sm:w-3/4 text-xs font-mont font-semibold py-3 rounded-lg">Add</button>
                </div>
            </div>
        </div>
    )
}

export default AddNewStock

import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";

const EditReceiptRecord = ({setClicked}) => {
    const [items, setItems] = useState([
        { stockName: '', price: '', quantity: '', amount: '' }
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const addItem = () => {
        setItems([...items, { stockName: '', price: '', quantity: '', amount: '' }]);
    };

    const [totalAmount, setTotalAmount] = useState('')
    const [amountPaid, setAmountPaid] = useState('')
    const [status, setStatus] = useState('')

    const handleStatus = (e) => {
        const selectedValue = e.target.value;
        setStatus(selectedValue);
    };

    return (
        <div className='bg-color-full'>
            {/* Back Button */}
            <div
                className='my-4 mx-4 sm:mx-0 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('ReceiptsRecords')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>
            {/* Full Details */}
            <div className='bg-white mt-1 px-6 py-7'>
                {/* Text */}
                <div>
                    <p className='font-mont font-semibold text-lg sm:text-2xl'>Add New Receipt</p>
                    <p className='text-light-gray font-mont font-medium text-[10px] sm:text-xs mt-2'>Fill in the receipt</p>
                </div>
                {/* Info */}
                <div className='mt-7 mb-7'>
                    <div className=' overflow-x-auto'>
                        {items.map((item, index) => (
                            <div key={index} className='py-2 mb-1 min-w-[600px]'>
                                {/* Inputs */}
                                <div className='grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr] mt-7 gap-4 sm:gap-0'>
                                    {/* Stock Name */}
                                    <div className='mb-2'>
                                        <p className='mb-1 font-mont text-[10px] sm:text-xs font-medium'>Stock Name</p>
                                        <input
                                            type="text"
                                            value={item.stockName}
                                            onChange={(e) => handleInputChange(index, 'stockName', e.target.value)}
                                            placeholder='Stock Name'
                                            className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4'
                                        />
                                    </div>
                                    {/* Price */}
                                    <div className='mb-2'>
                                        <p className='mb-1 font-mont text-[10px] sm:text-xs font-medium'>Price</p>
                                        <input
                                            type="text"
                                            value={item.price}
                                            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                            placeholder='Price'
                                            className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4'
                                        />
                                    </div>
                                    {/* Quantity */}
                                    <div className='mb-2'>
                                        <p className='mb-1 font-mont text-[10px] sm:text-xs font-medium'>Quantity</p>
                                        <input
                                            type="text"
                                            value={item.quantity}
                                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                            placeholder='Quantity'
                                            className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4'
                                        />
                                    </div>
                                    {/* Amount */}
                                    <div className='mb-2'>
                                        <p className='mb-1 font-mont text-[10px] sm:text-xs font-semibold'>Item Total</p>
                                        <input
                                            type="text"
                                            value={item.amount}
                                            onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                            placeholder='₦0.00'
                                            className='bg-gray-view border-2 text-black border-black text-center placeholder:text-black px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal outline-none w-full sm:w-3/4'
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Add Button */}
                    {/* <div
                        className='flex items-center gap-1 bg-black text-white py-3 w-2/5 sm:w-[16%] lg:w-[11%] justify-center rounded-lg cursor-pointer'
                        onClick={addItem}
                    >
                        <IoMdAdd />
                        <button className='text-xs font-mont font-medium'>Add Item</button>
                    </div> */}
                </div>
                <hr />
                {/* totals */}
                <div className='mt-5 flex flex-col items-end'>
                    <div className='mb-6 w-full sm:w-1/2 lg:w-1/4'>
                        <p className='mb-1 font-mont text-[10px] sm:text-xs font-semibold'>Total amount</p>
                        <input
                            type="text"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                            placeholder='₦0.00'
                            className='bg-gray-view border-2 w-full text-black border-black text-center placeholder:text-black px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal outline-none'
                        />
                    </div>
                    <div className='mb-6 w-full sm:w-1/2 lg:w-1/4'>
                        <p className='mb-1 font-mont text-[10px] sm:text-xs font-medium'>Amount Paid</p>
                        <input
                            type="text"
                            value={amountPaid}
                            onChange={(e) => setAmountPaid(e.target.value)}
                            placeholder='Amount Paid'
                            className='bg-gray-view w-full text-black px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal outline-none'
                        />
                    </div>
                    <div className='mb-6 w-full sm:w-1/2 lg:w-1/4'>
                        <p className='mb-1 font-mont text-[10px] sm:text-xs font-medium'>Payment Status</p>
                        <select name="status" onChange={handleStatus} className='bg-gray-view w-full text-black font-medium px-3 py-3 sm:py-3 rounded-lg font-mont text-xs sm:text-sm outline-none'>
                            <option value="">----- Choose Status -----</option>
                            <option value="credit">On Credit</option>
                            <option value="paid">Fully Paid</option>
                        </select>
                    </div>
                </div>

                {/* Add Button */}
                <div
                    className='text-center gap-1 mt-7 bg-black text-white py-2 pb-3 w-full sm:w-1/5 mx-auto rounded-lg cursor-pointer'
                    onClick={addItem}>
                    <button className='text-xs font-mont font-medium'>Update</button>
                </div>
            </div>
        </div>
    );
};
export default EditReceiptRecord

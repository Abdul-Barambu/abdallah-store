import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import SuccessAlert from './SuccessAlert';

const AddNewPurchase = ({ setClicked }) => {

    const [alert, setAlert] = useState(false);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [rows, setRows] = useState([
        { id: 1, stockName: '', stockPrice: 10000, qty: 0, totalPrice: 10000 }
    ]);

    const handleAlert = () => {
        setAlert(!alert);
    };

    const handleAddRow = () => {
        const newRow = {
            id: rows.length + 1,
            stockName: '',
            stockPrice: 10000,
            qty: 0,
            totalPrice: 10000
        };
        setRows([...rows, newRow]);
    };

    const handleDeleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    return (
        <div className='bg-color-full px-4 sm:px-0'>
            {/* Back Button */}
            <div
                className='mt-4 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('WholesaleDashboard')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>

            {/* Inputs */}
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8'>
                <div>
                    <p className='font-mont text-sm font-normal mb-2'>Wholesaler's Name</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='bg-white py-2 px-5 w-full font-mont text-sm rounded-lg outline-none font-medium' />
                </div>
                <div>
                    <p className='font-mont text-sm font-normal mb-2'>Phone Number</p>
                    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' className='bg-white py-2 px-5 w-full font-mont text-sm rounded-lg outline-none font-medium' />
                </div>
            </div>

            {/* Stock List */}
            <div className='mt-6 overflow-x-auto'>
                <div className='min-w-[600px]'>
                    {/* Header */}
                    <div className='flex justify-between bg-white py-3 px-5 mb-1'>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>S/N</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Stock Name</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Stock Price</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Stock Qty</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Price</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'></span>
                    </div>

                    {/* Rows */}
                    {rows.map((row) => (
                        <div key={row.id} className='flex justify-between my-1 bg-white/[0.47]'>
                            <span className='text-xs sm:text-sm font-mont py-4 px-5'>{row.id}</span>
                            <span className='py-2 px-4'>
                                <select
                                    name="name"
                                    className='bg-white px-2 text-xs sm:text-sm w-full py-3 font-mont outline-none rounded-md sm:rounded-lg'
                                >
                                    <option value="">-- Product Name --</option>
                                    <option value="Nivea Spray">Nivea Spray</option>
                                    <option value="Sure Perfume">Sure Perfume</option>
                                </select>
                            </span>
                            <span className='text-xs sm:text-sm font-mont py-4 px-5'>₦{row.stockPrice}</span>
                            <span className='text-xs sm:text-sm font-mont py-2'>
                                <input
                                    type="number"
                                    value={row.qty}
                                    className='bg-white px-2 text-center text-xs sm:text-sm w-full py-3 outline-none rounded-md sm:rounded-lg'
                                />
                            </span>
                            <span className='text-xs sm:text-sm font-mont py-4 px-2'>₦{row.totalPrice}</span>
                            <span className='py-4 px-5'>
                                <RiDeleteBin6Fill
                                    className='cursor-pointer icon-red text-lg'
                                    onClick={() => handleDeleteRow(row.id)}
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Row Button */}
            <div className='bg-white text-center mx-auto py-2 cursor-pointer mt-3 w-1/2 sm:w-1/4 rounded-lg' onClick={handleAddRow}>
                <button className='font-mont text-sm'>Add</button>
            </div>

            {/* totals */}
            <div className='mt-20'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-0.5 mb-3 sm:mb-7'>
                    <div className='bg-white sm:bg-white/[0.47] py-4 sm:py-2 px-8 sm:px-14 flex justify-between items-center mb-3 sm:mb-0'>
                        <span className='font-mont text-[10px] sm:text-[8px] lg:text-xs font-medium'>TOTAL:</span>
                        <span className='font-mont text-[10px] sm:text-[8px] lg:text-xs font-semibold pr-1 sm:pr-10 xl:pr-20'>₦10000</span>
                    </div>
                    <div className='bg-white/[0.47] py-2 px-5 sm:px-8 lg:px-16 xl:px-28 flex justify-between items-center'>
                        <span className='font-mont text-[8px] lg:text-xs font-medium'>Discount Price</span>
                        <input type="text" placeholder='Discount Amount' className='py-2 px-5 font-mont text-xs lg:text-sm rounded-md outline-none' />
                    </div>
                </div>
                {/* others */}
                <div className='sm:grid grid-cols-2 mb-3 sm:mb-2'>
                    <div></div>
                    <div className='bg-white/[0.47] py-2 px-5 sm:px-8 lg:px-16 xl:px-28 flex justify-between items-center'>
                        <span className='font-mont text-[8px] lg:text-xs font-medium'>Amount Paid</span>
                        <input type="text" placeholder='Amount Paid' className='py-2 px-5 font-mont text-xs lg:text-sm rounded-md outline-none' />
                    </div>
                </div>
                <div className='sm:grid grid-cols-2'>
                    <div></div>
                    <div className='bg-white/[0.47] py-2 px-5 sm:px-8 lg:px-16 xl:px-28 flex justify-between items-center'>
                        <span className='font-mont text-[8px] lg:text-xs font-semibold uppercase'>Payment Status</span>
                        <select name="name" className='py-2 px-9 font-mont text-xs lg:text-sm rounded-md gray-text outline-none'>
                            <option value="">Payment Status</option>
                            <option value="credit">On Credit</option>
                            <option value="paid">Fully Paid</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* button */}
            <div className='flex justify-end'>
                <div className='black-bg mx-0.5 p-1 my-10 w-full sm:w-1/2 cursor-pointer' onClick={() => setAlert(true)}>
                    <div className='border-receipt text-center py-3'>
                        <p className='text-white font-mont text-[11px] sm:text-base font-medium'>Add Purchase</p>
                    </div>
                </div>
            </div>

            {/* alert model */}
            {
                alert && (
                    <div className='center-proceed'>
                        <div className="is-proceed"></div>
                        <div className="center-content-proceed">
                            <SuccessAlert handleAlert={handleAlert} setClicked={setClicked} />
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default AddNewPurchase

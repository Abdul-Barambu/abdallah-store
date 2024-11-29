import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import RequestReceipt from './RequestReceipt';

const RequestStock = ({ setClicked }) => {

    const [alert, setAlert] = useState(false);
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
        <div className='bg-color px-4 sm:px-0'>
            {/* Back Button */}
            <div
                className='mt-4 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('WholesaleDashboard')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>

            {/* Stock List */}
            <div className='mt-6 overflow-x-auto'>
                <div className='min-w-[600px]'>
                    {/* Header */}
                    <div className='flex justify-between bg-white py-3 px-5 mb-1 pr-16'>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>S/N</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Stock Name</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Quantity</span>
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
                            <span className='text-xs sm:text-sm font-mont py-2'>
                                <input
                                    type="number"
                                    value={row.qty}
                                    className='bg-white px-2 text-center text-xs sm:text-sm w-full py-3 outline-none rounded-md sm:rounded-lg'
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

            {/* button */}
            <div className='flex justify-center'>
                <div className='black-bg mx-0.5 p-1 my-10 w-full sm:w-1/2 cursor-pointer' onClick={() => setAlert(true)}>
                    <div className='border-receipt text-center py-3'>
                        <p className='text-white font-mont text-[11px] sm:text-base font-medium'>Send Request</p>
                    </div>
                </div>
            </div>

            {/* alert model */}
            {
                alert && (
                    <div className='center-proceed'>
                        <div className="is-proceed"></div>
                        <div className="center-content-proceed">
                            <RequestReceipt handleAlert={handleAlert} setClicked={setClicked} />
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default RequestStock

import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";
import { listOfStocks } from '../../../../../data';
import axios from 'axios';

const AddExistingStock = ({ setClicked }) => {

    const [searchValue, setSearchValue] = useState('');
    const [lowStock, setLowStock] = useState([])
    const [outOfStock, setOutOfStock] = useState([])
    const [loading, setLoading] = useState(false)

    const combinedStocks = [...lowStock, ...outOfStock];

    const filteredStock = combinedStocks.filter((stock) =>
        stock.stock_name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        setLoading(true)
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/stocks/health-status/", { headers })
            .then(response => {
                console.log(response)
                setLowStock(response.data.low_stock_stocks)
                setOutOfStock(response.data.out_of_stock_stocks)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    return (
        <div className='bg-color-dash mx-4'>
            {/* Back Button */}
            <div
                className='mt-4 mx-4 sm:mx-0 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('SupplierManagement')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>
            {/* Top Section */}
            <div className='mt-5 block sm:flex items-center justify-between'>
                {/* Search Input */}
                <div className='mb-5 sm:mb-0'>
                    <div className='relative flex items-center gap-2'>
                        {!searchValue && (
                            <CiSearch className='absolute left-24 sm:left-36 lg:left-40' size={15} />
                        )}
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className='font-mont font-medium w-full sm:w-[350px] lg:w-[400px] pl-10 pr-4 py-3 sm:py-2 bg-white rounded-xl outline-none text-center text-xs sm:text-base'
                        />
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className='mt-6 overflow-x-auto'>
                {/* Wrapper for horizontal scroll */}
                <div className='min-w-[600px]'>
                    {/* Head */}
                    <div className='grid grid-cols-5 bg-white py-3 text-center mb-1'>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Supplier</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>SKU</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Remaining Quantity</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Action</span>
                    </div>

                    {/* Data */}
                    {
                        loading ? (<div className='loader'></div>) : (
                            <div className='h-96 overflow-y-scroll'>
                                {
                                    filteredStock.map((stock) => (
                                        <div key={stock.id} className='grid grid-cols-5 my-0.5 text-center'>
                                            <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.stock_name}</span>
                                            <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.supplier_name}</span>
                                            <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.sku}</span>
                                            <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.quantity}</span>
                                            <div className='bg-white/[0.47] py-5 cursor-pointer' onClick={() => {setClicked("AddExisting"); localStorage.setItem('stockId', stock.id)}}>
                                                <span className={`text-[8px] sm:text-[10px] lg:text-xs font-mont font-medium truncate border border-black py-2 px-6 rounded-lg cursor-pointer shadow`} style={{ background: 'rgba(30, 30, 30, 0.08)' }}>Add Stock</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AddExistingStock

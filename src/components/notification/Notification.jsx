import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsBoxSeamFill } from "react-icons/bs";

const Notification = () => {

    const [lowStock, setLowStock] = useState([])
    const [outOfStock, setOutOfStock] = useState([])
    const [loading, setLoading] = useState(false)

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
        <div className='bg-color'>
            <div className='bg-white w-full sm:w-[97%] lg:w-4/5 xl:w-3/4 pb-40 mx-auto mt-10 rounded-sm'>
                <div className='py-14 sm:py-7 px-4 sm:px-7'>
                    {/* texts */}
                    <div>
                        <p className='text-black font-mont font-semibold text-xl'>Notification</p>
                    </div>
                    {/* data */}
                    <div className='mt-7 grid grid-cols-1 sm:grid-cols-2 gap-10'>
                        {/* low stock */}
                        <div className='flex flex-col gap-3'>
                            {
                                lowStock.length > 0 ? (
                                    lowStock.map((stock, index) => (
                                        <div key={index} className='bg-light-gray py-3 px-3 rounded-xl flex justify-between'>
                                            <div className='flex items-center gap-5'>
                                                {/* box */}
                                                <div className='p-6 bg-white rounded-xl'>
                                                    <BsBoxSeamFill className='text-4xl icon-yellow' />
                                                </div>
                                                {/* texts */}
                                                <div>
                                                    <p className='font-mont icon-yellow text-xs sm:text-sm lg:text-base font-bold mb-4'>Low Stock</p>
                                                    <p className='font-mont gray-text text-[8px] sm:text-[10px] lg:text-xs'><span className='font-bold'>{stock.stock_name}</span> is low</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='text-center font-mont text-sm gray-text'>No low stock items</p>
                                )
                            }
                        </div>
                        {/* out of stock */}
                        <div className='flex flex-col gap-3'>
                            {
                                outOfStock.length > 0 ? (
                                    outOfStock.map((stock, index) => (
                                        <div key={index} className='bg-light-gray py-3 px-3 rounded-xl flex justify-between'>
                                            <div className='flex items-center gap-5'>
                                                {/* box */}
                                                <div className='p-6 bg-white rounded-xl'>
                                                    <BsBoxSeamFill className='text-4xl icon-red' />
                                                </div>
                                                {/* texts */}
                                                <div>
                                                    <p className='font-mont icon-red text-xs sm:text-sm lg:text-base font-bold mb-4'>Out of Stock</p>
                                                    <p className='font-mont gray-text text-[8px] sm:text-[10px] lg:text-xs'><span className='font-bold'>{stock.stock_name}</span> is out of stock</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='text-center font-mont text-sm gray-text'>No out of stock items.</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification

import React, { useEffect, useState } from 'react'
import { FaMoneyBills } from "react-icons/fa6";
import { RiArrowUpFill } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";
import { listOfStocks } from '../../../../../data';
import axios from 'axios';

const ViewSupplierSales = ({ setClicked }) => {

    const supplierName = localStorage.getItem('supplierName')

    const [supplies, setSupplies] = useState([])
    const [loading, setLoading] = useState(false)

    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }


    useEffect(() => {
        setLoading(true)
        axios.get('https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/supplier-stock-items/', {
            params: {
                supplier_name: supplierName
            },
            headers: headers
        })
            .then(response => {
                // console.log(response)
                setSupplies(response.data.stock_items)
                setLoading(false)
            }).catch(error => {
                // console.log(error)
                setLoading(false)
            })
    }, [])


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
            <div className='bg-white mt-4 rounded-xl py-5'>
                {/* text and cards */}
                <div className='text-center'>
                    {/* text */}
                    <div className='mb-9'>
                        <h1 className='font-mont font-semibold text-base sm:text-2xl'>Total Sales by Supplier</h1>
                    </div>
                    {/* cards */}
                    {/* <div className='flex sm:flex-row flex-col justify-between items-center gap-5 mx-4 sm:mx-64 lg:mx-80 xl:mx-[430px]'>
                        //card
                        <div className='flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-light-gray px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]'>
                            <div>
                                <div className='flex justify-center bg-light-gray p-2 rounded-xl w-10'>
                                    <FaMoneyBills size={20} />
                                </div>
                                <p className='mt-3 font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg'>Total Sales</p>
                            </div>
                            <div className='flex-grow bg-white px-5 py-5 rounded-3xl'>
                                <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg'>₦12,000,000</p>
                                <div className='flex flex-row items-center mt-4 px-1 sm:px-1 lg:px-2 sm:py-0 lg:py-1 increase'>
                                    <RiArrowUpFill size={20} className='font-semibold green-text' />
                                    <p className='font-semibold text-[13px] sm:text-[9px] lg:text-[10px] xl:text-xs green-text'>26%</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* gray line */}
                <div className='w-full sm:w-[95%] h-8 mx-0 sm:mx-auto my-10' style={{ background: 'rgba(30, 30, 30, 0.38)' }}></div>
                {/* sales */}
                <div>
                    <p className='mx-4 sm:ml-8 font-mont font-semibold text-sm sm:text-lg'>All Transactions</p>
                    {/* list of products */}
                    <div className={`mt-3 sm:mt-6 mx-3 sm:mx-0 overflow-x-auto`}>
                        {/* Wrapper for horizontal scroll */}
                        <div className={`min-w-[600px]`}>
                            {/* Head */}
                            <div className='grid grid-cols-5 bg-light-gray py-3 text-center mb-1'>
                                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Supplier</span>
                                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Qty</span>
                                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Price</span>
                                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Payment Status</span>
                            </div>

                            {/* Data */}
                            {
                                loading ? (<div className='loader'></div>) : (
                                    <div className={`h-[500px] overflow-y-scroll`}>
                                        {
                                            supplies.length > 0 ? (
                                                supplies.map((product) => (
                                                    <div key={product.id} className='grid grid-cols-5 my-0.5 text-center'>
                                                        <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>{product.stock_name}</span>
                                                        <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>{product.supplier_name}</span>
                                                        <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>{product.quantity}</span>
                                                        <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>₦{Number(product.price).toLocaleString()}.00</span>
                                                        <div className='bg-table py-5'>
                                                            <span className={`text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium ${product.payment_status === 'Fully Paid' ? 'fully-paid green-text' : 'on-credit icon-red'} truncate`}>{product.payment_status}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (<p className='font-mont text-center font-semibold mt-4'>No Record added</p>)
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSupplierSales

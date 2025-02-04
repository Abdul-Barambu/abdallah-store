import React, { useEffect, useState } from 'react'
import { FaMoneyBills } from "react-icons/fa6";
import { RiArrowUpFill } from "react-icons/ri";
import { FaChartSimple } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import AbdallahChart from './AbdallahChart';
import { soldProducts } from '../../../../data';
import axios from 'axios';

const AbdallahReport = ({ setClicked }) => {

    const user_id = localStorage.getItem('rep-company-id')

    const [sales, setSales] = useState('')
    const [commission, setCommission] = useState('')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        axios.get(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/company/user/${user_id}/total-commission/`, { headers })
            .then(response => {
                // console.log(response)
                setCommission(response.data.total_commission)
            }).catch(error => {
                // console.log(error)
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/company/user/${user_id}/total-sales/`, { headers })
            .then(response => {
                // console.log(response)
                setSales(response.data.total_sales)
                setLoading(false)
            }).catch(error => {
                // console.log(error)
                setLoading(false)
            })
    }, [])

    // top selling product
    useEffect(() => {
        axios.get(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/company/user/${user_id}/top-selling-stocks/`, { headers })
            .then(response => {
                // console.log(response)
                setProducts(response.data.top_selling_stocks)
            }).catch(error => {
                // console.log(error)
            })
    }, [])


    return (
        <div className='bg-color-full'>
            <div className='bg-white mt-6 sm:mt-4 sm:rounded-xl py-5'>
                <AbdallahChart />
                {/* text and cards */}
                <div className='text-center'>
                    {/* cards */}
                    <div className='flex sm:flex-row flex-col justify-between items-center gap-5 mx-4 sm:mx-32 lg:mx-40 xl:mx-60'>
                        {/* card */}
                        <div className='flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-light-gray px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]'>
                            <div>
                                <div className='flex justify-center bg-light-gray p-2 rounded-xl w-10'>
                                    <FaMoneyBills size={20} />
                                </div>
                                <p className='mt-3 font-medium font-mont text-left sm:text-[10px] lg:text-sm xl:text-lg'>Total Sales <span style={{ color: '#ECECEC' }}>break</span></p>
                            </div>
                            <div className='flex-grow bg-white px-5 py-5 rounded-3xl'>
                                <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-base'>₦{Number(sales).toLocaleString()}.00</p>
                                <div className='flex flex-row items-center mt-4 px-1 sm:px-1 lg:px-2 sm:py-0 lg:py-1 increase'>
                                    <RiArrowUpFill size={20} className='font-semibold green-text' />
                                    <p className='font-semibold text-[13px] sm:text-[9px] lg:text-[10px] xl:text-xs green-text'>26%</p>
                                </div>
                            </div>
                        </div>
                        {/* card */}
                        <div className='flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-light-gray px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]'>
                            <div>
                                <div className='flex justify-center bg-light-gray p-2 rounded-xl w-10'>
                                    <FaChartSimple size={20} />
                                </div>
                                <p className='mt-3 font-medium font-mont text-left sm:text-[10px] lg:text-sm xl:text-base'>Total AAS Commission</p>
                            </div>
                            <div className='flex-grow bg-white px-6 py-6 rounded-3xl'>
                                <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg mt-7'>₦{Number(commission).toLocaleString()}.00</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* gray line */}
                <div className='w-full sm:w-[95%] h-8 mx-0 sm:mx-auto my-10' style={{ background: 'rgba(30, 30, 30, 0.38)' }}></div>
                {/* sales */}
                <div>
                    <p className='mx-4 sm:ml-8 font-mont font-semibold text-sm sm:text-lg'>Top Selling Products</p>
                    {/* list of products */}
                    <div className={`mt-3 sm:mt-6 mx-3 sm:mx-0 overflow-x-auto`}>
                        {/* Wrapper for horizontal scroll */}
                        <div className={`min-w-[600px]`}>
                            {/* Head */}
                            <div className='grid grid-cols-3 bg-light-gray py-3 text-center mb-1'>
                                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Qty</span>
                                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Total Sales</span>
                            </div>

                            {/* Data */}
                            {
                                loading ? (<div className='loader'></div>) : (
                                    <div className={`h-[500px] overflow-y-scroll`}>
                                        {
                                           products.length > 0 ? (
                                            products.map((product) => (
                                                <div key={product.company_stock_id} className='grid grid-cols-3 my-0.5 text-center'>
                                                    <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>{product.stock_name}</span>
                                                    <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>{product.total_quantity_sold}</span>
                                                    <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>₦{Number(product.total_sales).toLocaleString()}.00</span>
                                                    {/* <div className='bg-table flex flex-row gap-4 justify-center items-center'>
                                                <IoEye className='cursor-pointer' onClick={() => { setClicked("ViewCompanyReport"); localStorage.setItem("soldStocks", JSON.stringify(product)) }} />
                                            </div> */}
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

export default AbdallahReport
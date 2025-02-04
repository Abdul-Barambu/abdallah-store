import React, { useEffect, useState } from 'react'
import { FaMoneyBills } from "react-icons/fa6";
import { RiArrowUpFill } from "react-icons/ri";
import { FaChartSimple } from "react-icons/fa6";
import RetailButton from './RetailButton';
import axios from 'axios';

const RetailCards = ({ setClicked }) => {

    const [sales, setSales] = useState('')
    const [profit, setProfit] = useState('')

    // headers
    const Access = localStorage.getItem("access-token")
    const Refresh = localStorage.getItem("refresh-token")

    const headers = {
        Authorization: `Bearer ${Access}`
    }

    // total sales
    useEffect(() => {
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/retail/sales/daily/", { headers })
            .then(response => {
                // console.log(response)
                setSales(response.data.total_sales_today)
            }).catch(error => {
                // console.log(error)
            })
    }, [])

    // total sales
    useEffect(() => {
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/retail/todays-total-profit/", { headers })
            .then(response => {
                // console.log(response)
                setProfit(response.data.daily_total_profit.profit)
            }).catch(error => {
                // console.log(error)
            })
    }, [])

    return (
        <div className='bg-color mt-4 mx-4 sm:mx-0 pb-10 sm:pb-0'>
            {/* cards */}
            <div className='flex sm:flex-row flex-col justify-between items-center gap-5 mx-0 sm:mx-32 lg:mx-44 xl:mx-56'>
                {/* card */}
                <div className='flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-white px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]'>
                    <div>
                        <div className='flex justify-center bg-light-gray p-2 rounded-xl w-10'>
                            <FaMoneyBills size={20} />
                        </div>
                        <p className='mt-3 font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg'>Total Sales</p>
                    </div>
                    <div className='flex-grow bg-light-gray px-5 py-5 rounded-3xl'>
                        <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg'>₦{Number(sales).toLocaleString()}.00</p>
                        <div className='flex flex-row items-center mt-4 px-1 sm:px-1 lg:px-2 sm:py-0 lg:py-1 increase'>
                            <RiArrowUpFill size={20} className='font-semibold green-text' />
                            <p className='font-semibold text-[13px] sm:text-[9px] lg:text-[10px] xl:text-xs green-text'>26%</p>
                        </div>
                    </div>
                </div>
                {/* card */}
                <div className='flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-white px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]'>
                    <div>
                        <div className='flex justify-center bg-light-gray p-2 rounded-xl w-10'>
                            <FaChartSimple size={20} />
                        </div>
                        <p className='mt-3 font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg'>Total Profits</p>
                    </div>
                    <div className='flex-grow bg-light-gray px-6 py-6 rounded-3xl'>
                        <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg'>₦{Number(profit).toLocaleString()}.00</p>
                        <div className='flex flex-row items-center mt-4 px-1 sm:px-1 lg:px-2 sm:py-0 lg:py-1 increase'>
                            <RiArrowUpFill size={20} className='font-semibold green-text' />
                            <p className='font-semibold text-[13px] sm:text-[9px] lg:text-[10px] xl:text-xs green-text'>26%</p>
                        </div>
                    </div>
                </div>
                {/* card */}
                {/* <div className='flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-white px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]'>
                    <div className='flex flex-col'>
                        <div className='flex justify-center bg-light-gray p-2 rounded-xl w-10'>
                            <FaMoneyBill size={20} />
                        </div>
                        Separate text into lines
                        <p className='mt-3 font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg'>Due</p>
                        <span className='font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg'>Outstanding</span>
                        <span className='font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg'>Payments</span>
                    </div>
                    <div className='flex-grow bg-light-gray px-6 py-6 rounded-3xl'>
                        <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg'>20</p>
                        <div className='mt-4 px-1 w-20 sm:px-1 lg:px-2 sm:py-0 lg:py-1 increase-view text-center cursor-pointer' onClick={() => setClicked("WholesaleDueView")}>
                            <p className='font-mont font-semibold text-[13px] sm:text-[9px] lg:text-[10px] xl:text-xs green-text'>View</p>
                        </div>
                    </div>
                </div> */}
            </div>

            {/* buttons */}
            <div className='mt-16'>
                <RetailButton setClicked={setClicked} />
            </div>
        </div>
    )
}

export default RetailCards

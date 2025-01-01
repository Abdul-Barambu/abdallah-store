import React, { useEffect, useState } from 'react'
import { FaMoneyBills } from "react-icons/fa6";
import { RiArrowUpFill } from "react-icons/ri";
import { FaChartSimple } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import Charts from '../charts/Charts';
import axios from 'axios';

const Cards = ({ setClicked }) => {

    const [profit, setProfit] = useState('')
    const [sale, setSale] = useState('')
    const [outstanding, setOutstanding] = useState('')

    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }

    // daily profit
    useEffect(() => {
        axios.get('https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/total-profits/', { headers })
            .then(response => {
                console.log(response)
                setProfit(response.data.total_profit)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    // daily sale
    useEffect(() => {
        axios.get('https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/total-sales/', { headers })
            .then(response => {
                console.log(response)
                setSale(response.data.combined_total_sales)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    // number of outstanding
    useEffect(() => {
        axios.get('https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/purchases/on-credit/', { headers })
            .then(response => {
                console.log(response)
                setOutstanding(response.data.total_count)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className='mt-4 mx-4 sm:mx-0 pb-10 sm:pb-0'>
            {/* cards */}
            <div className='flex sm:flex-row flex-col justify-between items-center gap-5'>
                {/* card */}
                <div className='flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-white px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]'>
                    <div>
                        <div className='flex justify-center bg-light-gray p-2 rounded-xl w-10'>
                            <FaMoneyBills size={20} />
                        </div>
                        <p className='mt-3 font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg'>Total Sales</p>
                    </div>
                    <div className='flex-grow bg-light-gray px-5 py-5 rounded-3xl'>
                        <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg'>₦{Number(sale).toLocaleString()}.00</p>
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
                <div className='flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-white px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]'>
                    <div className='flex flex-col'>
                        <div className='flex justify-center bg-light-gray p-2 rounded-xl w-10'>
                            <FaMoneyBill size={20} />
                        </div>
                        {/* Separate text into lines */}
                        <p className='mt-3 font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg'>Due</p>
                        <span className='font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg'>Outstanding</span>
                        <span className='font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg'>Payments</span>
                    </div>
                    <div className='flex-grow bg-light-gray px-6 py-6 rounded-3xl'>
                        <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg'>{outstanding}</p>
                        <div className='mt-4 px-1 w-20 sm:px-1 lg:px-2 sm:py-0 lg:py-1 increase-view text-center cursor-pointer' onClick={() => setClicked("DueOutstanding")}>
                            <p className='font-mont font-semibold text-[13px] sm:text-[9px] lg:text-[10px] xl:text-xs green-text'>View</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* charts */}
            <Charts />

        </div>
    );
};

export default Cards;



// red rate decrease
{/* <div className='flex-grow bg-light-gray px-5 py-5 rounded-3xl'>
    <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg'>₦12,000,000</p>
    <div className='flex flex-row items-center mt-4 px-1 sm:px-1 lg:px-2 sm:py-0 lg:py-1 deccrease'>
        <BiSolidDownArrowAlt size={20} className='font-semibold green-text icon-red' />
        <p className='font-semibold sm:text-[9px] lg:text-[10px] xl:text-xs green-text icon-red'>26%</p>
    </div>
</div> */}
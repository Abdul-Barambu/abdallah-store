import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoNotifications } from 'react-icons/io5'
import { LiaTimesSolid } from "react-icons/lia";

const Alert = ({ setAlert, setClicked }) => {

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
                setOutOfStock(response.data.out_of_stock_stocks)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <div className="proceed-container">
                {/* icon */}
                <div className='flex justify-end cursor-pointer' onClick={() => setAlert(false)}>
                    <LiaTimesSolid />
                </div>
                {/* alert */}
                <div className='flex flex-col items-center justify-center'>
                    {/* icon */}
                    <div className='bg-black p-6 rounded-full'>
                        <IoNotifications className='text-white text-7xl' />
                    </div>
                    {/* texts */}
                    <div className='text-center mt-6 mb-16'>
                        <p className='font-mont font-semibold text-lg mb-4'>Stock Alert!</p>
                       {
                        outOfStock.map(stock => (
                            <p key={stock.id} className='font-mont text-xs font-medium gray-text'>Stock <span className='black-text font-bold'>{stock.stock_name}</span> is now Out of Stock!</p>
                        ))
                       }
                    </div>
                    {/* button */}
                    <div className='bg-black py-1 px-10 rounded-2xl mb-10' onClick={() => { setClicked("Notification"); setAlert(false) }}>
                        <button className='text-white font-mont font-semibold text-xs pb-1.5'>View</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert

import React, { useEffect, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import RequestReceipt from './RequestReceipt';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const RequestStock = ({ setClicked }) => {

    const [alert, setAlert] = useState(false);
    const [stocks, setStocks] = useState([])
    const [btn, setBtn] = useState(false)
    const [id, setId] = useState()
    const [qty, setQty] = useState()

    const handleAlert = () => {
        setAlert(!alert);
    };

    const handleName = (e) => {
        const selectedValue = e.target.value;
        setId(selectedValue);
    }


    // headers
    const Access = localStorage.getItem("access-token")
    const Refresh = localStorage.getItem("refresh-token")

    const headers = {
        Authorization: `Bearer ${Access}`
    }

    useEffect(() => {
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/stocks/available/", { headers })
            .then(response => {
                // console.log(response)
                setStocks(response.data)
            }).catch(error => {
                // console.log(error)
            })
    }, [])

    const handleRequestStock = () => {
        setBtn(true)
        axios.post(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/store/request-stock/`, {
            stock_id: id,
            quantity: parseInt(qty)
        }, { headers })
            .then(response => {
                // console.log(response)
                setAlert(true)
                setAlert(true)
                setBtn(false)
            }).catch(error => {
                // console.log(error)
                toast.error('Something went wrong, please try again')
                setBtn(false)
            })
    }


    return (
        <div className='bg-color px-4 sm:px-0'>
            <ToastContainer />
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


                    <div className='flex justify-between my-1 bg-white/[0.47]'>
                        <span className='text-xs sm:text-sm font-mont py-4 px-5'>1</span>
                        <span className='py-2 px-4'>
                            <select
                                name="name"
                                className="bg-white px-2 text-xs sm:text-sm w-full py-3 font-mont outline-none rounded-md sm:rounded-lg"
                                value={id}
                                onChange={handleName}
                            >
                                <option value="">-- Product Name --</option>
                                {stocks.map((stock) => (
                                    <option
                                        key={stock.id}
                                        value={stock.id}
                                    >
                                        {stock.stock_name}
                                    </option>
                                ))}
                            </select>
                        </span>

                        <span className='text-xs sm:text-sm font-mont py-2'>
                            <input
                                type="text"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)} // Add this onChange
                                className='bg-white px-2 text-center text-xs sm:text-sm w-full py-3 outline-none rounded-md sm:rounded-lg'
                            />
                        </span>
                    </div>
                </div>
            </div>


            {/* button */}
            <div className='flex justify-center'>
                <div className='black-bg mx-0.5 p-1 my-10 w-full sm:w-1/2 cursor-pointer' onClick={handleRequestStock}>
                    <div className='border-receipt text-center py-3'>
                        <p className='text-white font-mont text-[11px] sm:text-base font-medium flex justify-center text-center'>{btn ? (<div className='loader-btn'></div>) : 'Send Request'}</p>
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

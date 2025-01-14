import React, { useEffect, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { IoNotifications } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'
import { FaTimes } from "react-icons/fa";
import RetailCards from '../../../components/retail/dashboard/cards/RetailCards'
import RetailAddPurchase from '../../../components/retail/dashboard/add/RetailAddPurchase'
import PurchaseReceipt from '../../../components/retail/dashboard/add/PurchaseReceipt'
import RetailSalesRecord from '../../../components/retail/salesRecord/RetailSalesRecord'
import ViewRetailRecord from '../../../components/retail/salesRecord/ViewRetailRecord'
import EditRecord from '../../../components/retail/salesRecord/EditRecord'
import RetailReport from '../../../components/retail/reports/RetailReport'
import ViewRetailReport from '../../../components/retail/reports/ViewRetailReport'
import RetailStatus from '../../../components/retail/status/RetailStatus'
import MyProfile from '../../../components/profile/myProfile/MyProfile'
import Settings from '../../../components/profile/setting/Settings'
import ChangePassword from '../../../components/profile/setting/ChangePassword'
import Notification from '../../../components/notification/Notification'
import Alert from '../../../components/alert/Alert'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import EditPurchaseReceipt from '../../../components/retail/salesRecord/EditPurchaseReceipt'

const RetailDashboard = () => {
    const [clicked, setClicked] = useState('RetailDashboard')
    const [nav, setNav] = useState(false)
    const [button, setButton] = useState(false)
    const [alert, setAlert] = useState(false)
    const [outOfStock, setOutOfStock] = useState([])
    const history = useHistory();

    const handleNavBar = () => {
        setNav(!nav)
    }

    const handlePrint = () => {
        setButton(true)
        setTimeout(() => {
            window.print()
            setButton(false)
        }, 100)
    }

    useEffect(() => {
        setAlert(true); // Always show alert on page load
    }, []);


    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/stocks/health-status/", { headers })
            .then(response => {
                console.log(response)
                setOutOfStock(response.data.out_of_stock_stocks)
            }).catch(error => {
                console.log(error)
            })
    }, [])


    // logout
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout"
        }).then((result) => {
            localStorage.removeItem('ListOfStocks')
            localStorage.removeItem('stock-retail-purchase')
            localStorage.removeItem('access-token')
            localStorage.removeItem('edit-retail')
            localStorage.removeItem('email')
            localStorage.removeItem('full-name')
            localStorage.removeItem('refresh-token')
            localStorage.removeItem('reset-password-token')
            localStorage.removeItem('reset-password-uid')
            localStorage.removeItem('stock-wholesale-purchase')
            localStorage.removeItem('soldStocks')
            localStorage.removeItem('stockId')
            localStorage.removeItem('retail-list')
            if (result.isConfirmed) {
                history.push('/')
            }
        });
    }

    return (
        <div className={`${(clicked === 'More' || clicked === 'Profile' || nav) ? 'bg-color-dash' : 'bg-color-full-dash'} pt-3 pb-0 sm:pb-5`}>

            {/* MOBILE VIEW HEADER */}
            <div className={`${button ? 'hidden' : 'block'}`}>
                <div className='block md:hidden bg-white mx-auto px-5 py-4 rounded-xl dash-width'>
                    <div className={`${nav ? '' : 'flex justify-between items-center'} `}>
                        {/* text */}
                        <div className={`${nav ? 'hidden' : 'visible'}`}>
                            <p className='font-bold font-mont text-lg black-text'>
                                A.A Store
                            </p>
                        </div>
                        {/* icon */}
                        <div className='flex items-center gap-4'>
                            {/* notification */}
                            <div className={`cursor-pointer ${nav ? 'hidden' : 'visible'}`}>
                                <span>
                                    <IoNotifications size={20} />
                                </span>
                            </div>
                            <div>
                                <span className='font-extrabold'>
                                    {
                                        nav ? <FaTimes size={22} onClick={handleNavBar} /> : <HiMenuAlt2 size={28} onClick={handleNavBar} />
                                    }
                                </span>
                            </div>
                        </div>

                        {/* mobile nav menu */}
                        {
                            nav && (
                                <div>
                                    <div className={`flex flex-col gap-14 px-14 pt-10 ${clicked === 'More' ? 'pb-5' : 'pb-10'}`}>
                                        <span
                                            className={`${(clicked === 'RetailDashboard' || clicked === "RetailAddPurchase" || clicked === "PurchaseReceipt") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                                            onClick={() => { setClicked('RetailDashboard'); setNav(false) }}
                                        >
                                            Dashboard
                                        </span>
                                        <span
                                            className={`${(clicked === 'SalesRecord' || clicked === "ViewRetailRecord" || clicked === "EditRecord") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                                            onClick={() => { setClicked('SalesRecord'); setNav(false) }}
                                        >
                                            Sales Record
                                        </span>
                                        <span
                                            className={`${(clicked === 'RetailReports' || clicked === "ViewRetailReport") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                                            onClick={() => { setClicked('RetailReports'); setNav(false) }}
                                        >
                                            Reports
                                        </span>
                                        <span
                                            className={`${clicked === 'Status' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                                            onClick={() => { setClicked('Status'); setNav(false) }}
                                        >
                                            Status
                                        </span>
                                    </div>
                                    {/* profile */}
                                    <div
                                        className={`flex items-center gap-1 cursor-pointer justify-center ${clicked === "Profile" ? 'pb-2' : 'pb-14'}`}
                                        onClick={() => setClicked('Profile')}
                                    >
                                        <span className={`${clicked === 'Profile' ? 'bg-black text-white' : 'bg-light-gray'} p-2 rounded-xl`}>
                                            <FaUser size={20} />
                                        </span>
                                        <span>
                                            <FaCaretDown size={12} />
                                        </span>
                                    </div>
                                    {clicked === 'Profile' && (
                                        <div className='py-5'>
                                            <p
                                                className={`${clicked === 'MyProfile' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-base py-3 text-center px-5 rounded-3xl mb-5 mt-3 cursor-pointer`}
                                                onClick={() => { setClicked('MyProfile'); setNav(false) }}
                                            >
                                                My Profile
                                            </p>
                                            <p
                                                className={`${clicked === 'Settings' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-base py-3 text-center px-5 rounded-3xl mb-5 cursor-pointer`}
                                                onClick={() => { setClicked('Settings'); setNav(false) }}
                                            >
                                                Settings
                                            </p>
                                            <p
                                                className={`${clicked === 'Logout' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-base py-3 text-center px-5 rounded-3xl mb-5 cursor-pointer`}
                                                onClick={() => { setNav(false); handleLogout() }}
                                            >
                                                Logout
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    </div>
                </div >
                {/* END OF MOBILE VIEW HEADER */}
            </div >

            {/* desktop view header */}
            < div className='' >
                <div className={`${button ? 'hidden' : 'block'}`}>
                    <div className={`md:block hidden`}>
                        <div className='bg-white mx-auto px-7 py-4 rounded-xl dash-width'>
                            <div className='flex justify-between items-center'>
                                {/* text */}
                                <div>
                                    <p className='font-bold font-mont sm:text-xs lg:text-xl xl:text-2xl'>
                                        A.A Store
                                    </p>
                                </div>
                                {/* menu */}
                                <div className='flex sm:gap-4 lg:gap-7'>
                                    <span
                                        className={`${(clicked === 'RetailDashboard' || clicked === "RetailAddPurchase") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                                        onClick={() => setClicked('RetailDashboard')}
                                    >
                                        Dashboard
                                    </span>
                                    <span
                                        className={`${(clicked === 'SalesRecord' || clicked === "ViewRetailRecord" || clicked === "EditRecord") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                                        onClick={() => setClicked('SalesRecord')}
                                    >
                                        Sales Record
                                    </span>
                                    <span
                                        className={`${(clicked === 'RetailReports' || clicked === "ViewRetailReport") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                                        onClick={() => setClicked('RetailReports')}
                                    >
                                        Reports
                                    </span>
                                    <span
                                        className={`flex items-center gap-1 ${clicked === 'Status' ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                                        onClick={() => setClicked('Status')}
                                    >
                                        <span className='font-medium font-mont sm:text-[9.5px] xl:text-sm lg:text-xs'>
                                            Status
                                        </span>
                                    </span>
                                </div>
                                {/* profile */}
                                <div className='flex items-center gap-7'>
                                    {/* notification */}
                                    <div className='cursor-pointer' onClick={() => setClicked('Notification')}>
                                        <span>
                                            <IoNotifications />
                                        </span>
                                    </div>
                                    <div
                                        className='flex items-center gap-1 cursor-pointer'
                                        onClick={() => setClicked('Profile')}
                                    >
                                        <span className='bg-light-gray p-2 rounded-xl'>
                                            <FaUser />
                                        </span>
                                        <span>
                                            <FaCaretDown size={12} />
                                        </span>
                                    </div>
                                    {clicked === 'Profile' && (
                                        <div className='md:top-[8.5%] lg:top-[6.5%] xl:top-[15.5%] md:left-[65%] lg:left-[74%] xl:left-[79%] z-10 absolute bg-white px-7 py-3 dropdown-position'>
                                            <p
                                                className={`${clicked === 'MyProfile' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-[10px] py-2 px-16 rounded-xl mb-5 mt-3 cursor-pointer`}
                                                onClick={() => setClicked('MyProfile')}
                                            >
                                                My Profile
                                            </p>
                                            <p
                                                className={`${clicked === 'Settings' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-[10px] py-2 px-16 rounded-xl mb-5 cursor-pointer`}
                                                onClick={() => setClicked('Settings')}
                                            >
                                                Settings
                                            </p>
                                            <p
                                                className={`${clicked === 'Logout' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-[10px] py-2 px-16 rounded-xl mb-5 cursor-pointer`}
                                                onClick={() => { handleLogout() }}
                                            >
                                                Logout
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* alert model */}
                {
                    outOfStock.length > 0 ? (
                        alert && (
                            <div className='center-proceed'>
                                <div className="is-proceed"></div>
                                <div className="center-content-proceed">
                                    <Alert setAlert={setAlert} setClicked={setClicked} outOfStock={outOfStock} />
                                </div>
                            </div>
                        )
                    ) : ''
                }
                {/* components */}
                <div className={`${button ? 'mx-0' : 'mx-0 sm:mx-4'} ${nav ? 'hidden' : 'visible'}`}>
                    {
                        clicked === "RetailDashboard" ? <RetailCards setClicked={setClicked} /> : clicked === "RetailAddPurchase" ? <RetailAddPurchase setClicked={setClicked} /> : clicked === "PurchaseReceipt" ? <PurchaseReceipt setClicked={setClicked} handlePrint={handlePrint} button={button} />
                            : clicked === "SalesRecord" ? <RetailSalesRecord setClicked={setClicked} /> : clicked === "ViewRetailRecord" ? <ViewRetailRecord setClicked={setClicked} handlePrint={handlePrint} button={button} /> : clicked === "EditRecord" ? <EditRecord setClicked={setClicked} />
                                : clicked === "RetailReports" ? <RetailReport setClicked={setClicked} /> : clicked === "ViewRetailReport" ? <ViewRetailReport setClicked={setClicked} /> : clicked === "Status" ? <RetailStatus setClicked={setClicked} handlePrint={handlePrint} button={button} />
                                    : clicked === "EditPurchaseReceipt" ? <EditPurchaseReceipt setClicked={setClicked} handlePrint={handlePrint} button={button} />

                                        // ##### profile and notification #####
                                        : clicked === "MyProfile" ? <MyProfile setClicked={setClicked} /> : clicked === "Settings" ? <Settings setClicked={setClicked} /> : clicked === "ChangePassword" ? <ChangePassword setClicked={setClicked} /> : clicked === "Notification" ? <Notification setClicked={setClicked} /> : null
                    }
                </div>

            </div >
        </div >
    )
}


export default RetailDashboard

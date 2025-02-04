import React, { useEffect, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { IoNotifications } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'
import { FaTimes } from "react-icons/fa";
import CompanyAlert from './CompanyAlert'
import CompanyCards from '../../../../components/company/companies/dashboard/CompanyCards'
import CompanyAddStock from '../../../../components/company/companies/dashboard/addStock/CompanyAddStock'
import CompanyAddNewStock from '../../../../components/company/companies/dashboard/addStock/addNewStock/CompanyAddNewStock'
import CompanyRestock from '../../../../components/company/companies/dashboard/addStock/restock/CompanyRestock'
import CompanyAddRestocking from '../../../../components/company/companies/dashboard/addStock/restock/CompanyAddRestocking'
import CompanyAddNewPurchase from '../../../../components/company/companies/dashboard/purchase/CompanyAddNewPurchase'
import CompanyPurchaseReceipt from '../../../../components/company/companies/dashboard/purchase/CompanyPurchaseReceipt'
import CompanySalesRecord from '../../../../components/company/companies/salesRecord/CompanySalesRecord'
import ViewCompanySalesRecord from '../../../../components/company/companies/salesRecord/ViewCompanySalesRecord'
import EditCompanySale from '../../../../components/company/companies/salesRecord/EditCompanySale'
import EditSalesReceipt from '../../../../components/company/companies/salesRecord/EditSalesReceipt'
import CompanyReport from '../../../../components/company/companies/report/CompanyReport'
import ViewCompanyReport from '../../../../components/company/companies/report/ViewCompanyReport'
import CompanyStockStatus from '../../../../components/company/companies/status/CompanyStockStatus'
import MyProfile from '../../../../components/profile/myProfile/MyProfile'
import Settings from '../../../../components/profile/setting/Settings'
import ChangePassword from '../../../../components/profile/setting/ChangePassword'
import Notification from '../../../../components/notification/Notification'
import CompanyNotification from '../../../../components/notification/CompanyNotification'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const CompanyDashboard = () => {
    const [clicked, setClicked] = useState('CompanyDashboard')
    const [nav, setNav] = useState(false)
    const [button, setButton] = useState(false)
    const [alert, setAlert] = useState(false)
    const [outOfStock, setOutOfStock] = useState([])
    const history = useHistory()

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
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/company/stocks/health-status/", { headers })
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
            localStorage.removeItem('company-purchase')
            localStorage.removeItem('access-token')
            localStorage.removeItem('ViewCompanyPurchase')
            localStorage.removeItem('email')
            localStorage.removeItem('full-name')
            localStorage.removeItem('refresh-token')
            localStorage.removeItem('reset-password-token')
            localStorage.removeItem('reset-password-uid')
            localStorage.removeItem('stock-wholesale-purchase')
            localStorage.removeItem('soldStocks')
            localStorage.removeItem('stockId')
            localStorage.removeItem('wholesalePurchases')
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
                                            className={`${(clicked === 'CompanyDashboard' || clicked === "CompanyAddStock" || clicked === "CompanyAddNewStock" || clicked === "CompanyRestock" || clicked === "CompanyAddRestocking" || clicked === "CompanyAddNewPurchase" || clicked === "CompanyPurchaseReceipt") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                                            onClick={() => { setClicked('CompanyDashboard'); setNav(false) }}
                                        >
                                            Dashboard
                                        </span>
                                        <span
                                            className={`${(clicked === 'SalesRecord' || clicked === "ViewCompanySalesRecord" || clicked === "EditCompanySale" || clicked === "EditSalesReceipt") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                                            onClick={() => { setClicked('SalesRecord'); setNav(false) }}
                                        >
                                            Sales Record
                                        </span>
                                        <span
                                            className={`${(clicked === 'CompanyReports' || clicked === "ViewCompanyReport") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                                            onClick={() => { setClicked('CompanyReports'); setNav(false) }}
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
                                        className={`${(clicked === 'CompanyDashboard' || clicked === "CompanyAddStock" || clicked === "CompanyAddNewStock" || clicked === "CompanyRestock" || clicked === "CompanyAddRestocking" || clicked === "CompanyAddNewPurchase" || clicked === "CompanyPurchaseReceipt") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                                        onClick={() => setClicked('CompanyDashboard')}
                                    >
                                        Dashboard
                                    </span>
                                    <span
                                        className={`${(clicked === 'SalesRecord' || clicked === "ViewCompanySalesRecord" || clicked === "EditCompanySale" || clicked === "EditSalesReceipt") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                                        onClick={() => setClicked('SalesRecord')}
                                    >
                                        Sales Record
                                    </span>
                                    <span
                                        className={`${(clicked === 'CompanyReports' || clicked === "ViewCompanyReport") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                                        onClick={() => setClicked('CompanyReports')}
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
                {/* {
                    outOfStock.length > 0 ? (
                        alert && (
                            <div className='center-proceed'>
                                <div className="is-proceed"></div>
                                <div className="center-content-proceed">
                                    <CompanyAlert setAlert={setAlert} setClicked={setClicked} outOfStock={outOfStock} />
                                </div>
                            </div>
                        )
                    ) : ''
                } */}

                {/* components */}
                <div className={`${button ? 'mx-0' : 'mx-0 sm:mx-4'} ${nav ? 'hidden' : 'visible'}`}>
                    {
                        clicked === "CompanyDashboard" ? <CompanyCards setClicked={setClicked} /> : clicked === "CompanyAddStock" ? <CompanyAddStock setClicked={setClicked} /> : clicked === "CompanyAddNewStock" ? <CompanyAddNewStock setClicked={setClicked} />
                            : clicked === "CompanyRestock" ? <CompanyRestock setClicked={setClicked} /> : clicked === "CompanyAddRestocking" ? <CompanyAddRestocking setClicked={setClicked} /> : clicked === "CompanyAddNewPurchase" ? <CompanyAddNewPurchase setClicked={setClicked} />
                                : clicked === "CompanyPurchaseReceipt" ? <CompanyPurchaseReceipt setClicked={setClicked} handlePrint={handlePrint} button={button} /> : clicked === "SalesRecord" ? <CompanySalesRecord setClicked={setClicked} />
                                    : clicked === "ViewCompanySalesRecord" ? <ViewCompanySalesRecord setClicked={setClicked} handlePrint={handlePrint} button={button} /> : clicked === "EditCompanySale" ? <EditCompanySale setClicked={setClicked} />
                                        : clicked === "EditSalesReceipt" ? <EditSalesReceipt setClicked={setClicked} handlePrint={handlePrint} button={button} /> : clicked === "CompanyReports" ? <CompanyReport setClicked={setClicked} /> : clicked === "ViewCompanyReport" ? <ViewCompanyReport setClicked={setClicked} />
                                            : clicked === "Status" ? <CompanyStockStatus handlePrint={handlePrint} button={button} />

                                                // ##### profile and notification #####
                                                : clicked === "MyProfile" ? <MyProfile setClicked={setClicked} /> : clicked === "Settings" ? <Settings setClicked={setClicked} /> : clicked === "ChangePassword" ? <ChangePassword setClicked={setClicked} /> : clicked === "Notification" ? <CompanyNotification setClicked={setClicked} /> : null
                    }
                </div>

            </div >
        </div >
    )
}


export default CompanyDashboard
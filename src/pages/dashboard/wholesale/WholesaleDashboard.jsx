import React, { useEffect, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { IoNotifications } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'
import { FaTimes } from "react-icons/fa";
import Alert from '../../../components/alert/Alert'
import WholesaleCards from '../../../components/wholesale/dashboard/cards/WholesaleCards'
import WholesaleDueView from '../../../components/wholesale/dashboard/view/WholesaleDueView'
import WholesaleViewReceipt from '../../../components/wholesale/dashboard/view/WholesaleViewReceipt'
import AddNewPurchase from '../../../components/wholesale/dashboard/add/AddNewPurchase'
import PurchaseReceipt from '../../../components/wholesale/dashboard/add/PurchaseReceipt'
import RequestStock from '../../../components/wholesale/dashboard/request/RequestStock'
import SalesRecord from '../../../components/wholesale/salesRecord/SalesRecord'
import SalesReceipt from '../../../components/wholesale/salesRecord/SalesReceipt'
import EditSales from '../../../components/wholesale/salesRecord/EditSales'
import Status from '../../../components/wholesale/status/Status'
import Notification from '../../../components/notification/Notification'
import MyProfile from '../../../components/profile/myProfile/MyProfile'
import Settings from '../../../components/profile/setting/Settings'
import ChangePassword from '../../../components/profile/setting/ChangePassword'
import WholesaleReport from '../../../components/wholesale/reports/WholesaleReport'
import ViewWholesaleReport from '../../../components/wholesale/reports/ViewWholesaleReport'

const WholesaleDashboard = () => {
    const [clicked, setClicked] = useState('WholesaleDashboard')
    const [nav, setNav] = useState(false)
    const [button, setButton] = useState(false)
    const [alert, setAlert] = useState(false)

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
                                            className={`${(clicked === 'WholesaleDashboard' || clicked === "WholesaleDueView" || clicked === "WholesaleViewReceipt" || clicked === "AddNewPurchase" || clicked === "RequestStock") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                                            onClick={() => { setClicked('WholesaleDashboard'); setNav(false) }}
                                        >
                                            Dashboard
                                        </span>
                                        <span
                                            className={`${(clicked === 'SalesRecord' || clicked === "SalesReceipt" || clicked === "EditSales") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                                            onClick={() => { setClicked('SalesRecord'); setNav(false) }}
                                        >
                                            Sales Record
                                        </span>
                                        <span
                                            className={`${(clicked === 'Reports' || clicked === "ViewWholesaleReport") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                                            onClick={() => { setClicked('Reports'); setNav(false) }}
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
                                                onClick={() => { setNav(false) }}
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
                                        className={`${(clicked === 'WholesaleDashboard' || clicked === "WholesaleDueView" || clicked === "WholesaleViewReceipt" || clicked === "AddNewPurchase" || clicked === "RequestStock") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                                        onClick={() => setClicked('WholesaleDashboard')}
                                    >
                                        Dashboard
                                    </span>
                                    <span
                                        className={`${(clicked === 'SalesRecord' || clicked === "SalesReceipt" || clicked === "EditSales") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                                        onClick={() => setClicked('SalesRecord')}
                                    >
                                        Sales Record
                                    </span>
                                    <span
                                        className={`${(clicked === 'Reports' || clicked === "ViewWholesaleReport") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                                        onClick={() => setClicked('Reports')}
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
                                                onClick={() => { }}
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
                    alert && (
                        <div className='center-proceed'>
                            <div className="is-proceed"></div>
                            <div className="center-content-proceed">
                                <Alert setAlert={setAlert} setClicked={setClicked} />
                            </div>
                        </div>
                    )
                }

                {/* components */}
                <div className={`${button ? 'mx-0' : 'mx-0 sm:mx-4'} ${nav ? 'hidden' : 'visible'}`}>
                    {
                        clicked === "WholesaleDashboard" ? <WholesaleCards setClicked={setClicked} /> : clicked === "WholesaleDueView" ? <WholesaleDueView setClicked={setClicked} /> : clicked === "WholesaleViewReceipt" ? <WholesaleViewReceipt setClicked={setClicked} handlePrint={handlePrint} button={button} />
                            : clicked === "AddNewPurchase" ? <AddNewPurchase setClicked={setClicked} /> : clicked === "PurchaseReceipt" ? <PurchaseReceipt setClicked={setClicked} handlePrint={handlePrint} button={button} /> : clicked === "RequestStock" ? <RequestStock setClicked={setClicked} />
                                : clicked === "SalesRecord" ? <SalesRecord setClicked={setClicked} /> : clicked === "SalesReceipt" ? <SalesReceipt setClicked={setClicked} handlePrint={handlePrint} button={button} /> : clicked === "EditSales" ? <EditSales setClicked={setClicked} />
                                    : clicked === "Status" ? <Status setClicked={setClicked} handlePrint={handlePrint} button={button} /> : clicked === "Reports" ? <WholesaleReport setClicked={setClicked} /> : clicked === "ViewWholesaleReport" ? <ViewWholesaleReport setClicked={setClicked} />

                                        // ##### profile and notification #####
                                        : clicked === "MyProfile" ? <MyProfile setClicked={setClicked} /> : clicked === "Settings" ? <Settings setClicked={setClicked} /> : clicked === "ChangePassword" ? <ChangePassword setClicked={setClicked} /> : clicked === "Notification" ? <Notification setClicked={setClicked} /> : null
                    }
                </div>

            </div >
        </div >
    )
}

export default WholesaleDashboard

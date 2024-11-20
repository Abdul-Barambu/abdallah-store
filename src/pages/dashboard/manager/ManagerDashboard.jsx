import React, { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { IoNotifications } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'
import { FaTimes } from "react-icons/fa";
import Cards from '../../../components/manager/dashboard/cards/Cards'
import DueOutstanding from '../../../components/manager/dashboard/view/due/DueOutstanding'
import Receipt from '../../../components/manager/dashboard/view/due/Receipt'
import Inventory from '../../../components/manager/inventory/Inventory'
import ListOfStocks from '../../../components/manager/inventory/listOfStocks/ListOfStocks'
import ViewStock from '../../../components/manager/inventory/listOfStocks/ViewStock'
import EditStock from '../../../components/manager/inventory/listOfStocks/EditStock'
import StockStatus from '../../../components/manager/inventory/stockStatus/StockStatus'

const ManagerDashboard = () => {
  const [clicked, setClicked] = useState('ManagerDashboard')
  const [nav, setNav] = useState(false)
  const [button, setButton] = useState(false)

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

  return (
    <div className={`${nav ? 'bg-color-dash' : 'bg-color-full-dash'} pt-3 pb-0 sm:pb-5`}>

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
                      className={`${(clicked === 'ManagerDashboard' || clicked === 'DueOutstanding' || clicked === "Receipt") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                      onClick={() => { setClicked('ManagerDashboard'); setNav(false) }}
                    >
                      Dashboard
                    </span>
                    <span
                      className={`${(clicked === 'Inventory' || clicked === 'ListOfStocks' || clicked === 'ViewStock' || clicked === 'EditStock' || clicked === "StockStatus") ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                      onClick={() => { setClicked('Inventory'); setNav(false) }}
                    >
                      Inventory
                    </span>
                    <span
                      className={`${clicked === 'Reports' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-mont font-medium text-center py-4 rounded-3xl text-[15px] cursor-pointer`}
                      onClick={() => { setClicked('Reports'); setNav(false) }}
                    >
                      Reports
                    </span>
                    <div
                      className={`flex items-center justify-center gap-1 ${clicked === 'More' ? 'black-bg text-white' : 'bg-light-gray black-text'} py-4 rounded-3xl cursor-pointer`}
                      onClick={() => setClicked('More')}
                    >
                      <span className='font-medium font-mont text-center text-[15px]'>
                        More
                      </span>
                      <FaCaretDown />
                    </div>
                  </div>
                  {/* more dropdown */}
                  {clicked === 'More' && (
                    <div className='pb-5'>
                      <p
                        className={`${clicked === 'SupplierManagement' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-base py-3 text-center px-5 rounded-3xl mb-5 mt-3 cursor-pointer`}
                        onClick={() => { setClicked('SupplierManagement'); setNav(false) }}
                      >
                        Supplier Management
                      </p>
                      <p
                        className={`${clicked === 'CustomerPurchases' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-base py-3 text-center px-5 rounded-3xl mb-5 cursor-pointer`}
                        onClick={() => { setClicked('CustomerPurchases'); setNav(false) }}
                      >
                        Customer Purchases
                      </p>
                      <p
                        className={`${clicked === 'ReceiptsRecords' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-base py-3 text-center px-5 rounded-3xl mb-3 cursor-pointer`}
                        onClick={() => { setClicked('ReceiptsRecords'); setNav(false) }}
                      >
                        Receipts Records
                      </p>
                    </div>
                  )}
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
                    className={`${(clicked === 'ManagerDashboard' || clicked === 'DueOutstanding' || clicked === "Receipt") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                    onClick={() => setClicked('ManagerDashboard')}
                  >
                    Dashboard
                  </span>
                  <span
                    className={`${(clicked === 'Inventory' || clicked === 'ListOfStocks' || clicked === 'ViewStock' || clicked === 'EditStock' || clicked === "StockStatus") ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                    onClick={() => setClicked('Inventory')}
                  >
                    Inventory
                  </span>
                  <span
                    className={`${clicked === 'Reports' ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                    onClick={() => setClicked('Reports')}
                  >
                    Reports
                  </span>
                  <span
                    className={`flex items-center gap-1 ${clicked === 'More' ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                    onClick={() => setClicked('More')}
                  >
                    <span className='font-medium font-mont sm:text-[9.5px] xl:text-sm lg:text-xs'>
                      More
                    </span>
                    <FaCaretDown />
                  </span>
                  {/* more dropdown */}
                  {clicked === 'More' && (
                    <div className='md:top-[8.5%] lg:top-[6.5%] xl:top-[15.5%] md:left-1/2 lg:left-[60%] xl:left-[63%] z-10 absolute bg-white px-7 py-3 dropdown-position'>
                      <p
                        className={`${clicked === 'SupplierManagement' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-[10px] py-2 px-5 rounded-xl mb-5 mt-3 cursor-pointer`}
                        onClick={() => setClicked('SupplierManagement')}
                      >
                        Supplier Management
                      </p>
                      <p
                        className={`${clicked === 'CustomerPurchases' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-[10px] py-2 px-5 rounded-xl mb-5 cursor-pointer`}
                        onClick={() => setClicked('CustomerPurchases')}
                      >
                        Customer Purchases
                      </p>
                      <p
                        className={`${clicked === 'ReceiptsRecords' ? 'black-bg text-white' : 'bg-light-gray black-text'} font-medium font-mont text-[10px] py-2 px-5 rounded-xl mb-3 cursor-pointer`}
                        onClick={() => setClicked('ReceiptsRecords')}
                      >
                        Receipts Records
                      </p>
                    </div>
                  )}
                </div>
                {/* profile */}
                <div className='flex items-center gap-7'>
                  {/* notification */}
                  <div className='cursor-pointer'>
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* components */}
        <div className={`${button ? 'mx-0' : 'mx-0 sm:mx-4'} ${nav ? 'hidden' : 'visible'}`}>
          {
            clicked === "ManagerDashboard" ? <Cards setClicked={setClicked} /> : clicked === "DueOutstanding" ? <DueOutstanding setClicked={setClicked} /> : clicked === "Receipt" ? <Receipt setClicked={setClicked} handlePrint={handlePrint} button={button} />
              : clicked === "Inventory" ? <Inventory setClicked={setClicked} /> : clicked === "ListOfStocks" ? <ListOfStocks setClicked={setClicked} /> : clicked === 'ViewStock' ? <ViewStock setClicked={setClicked} /> : clicked === "EditStock" ? <EditStock setClicked={setClicked} />
                : clicked === "StockStatus" ? <StockStatus setClicked={setClicked} handlePrint={handlePrint} button={button} /> : null
          }
        </div>

      </div >
    </div >
  )
}

export default ManagerDashboard

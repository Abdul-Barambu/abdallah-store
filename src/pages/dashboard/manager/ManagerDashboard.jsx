import React, { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { IoNotifications } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'
import Cards from '../../../components/manager/dashboard/cards/Cards'

const ManagerDashboard = () => {
  const [clicked, setClicked] = useState('ManagerDashboard')

  return (
    <div>
      <div className='bg-color-dash pt-4'>
        {/* MOBILE VIEW HEADER */}
        <div className='block md:hidden bg-white mx-auto px-6 py-4 rounded-xl dash-width'>
          <div className='flex justify-between items-center'>
            {/* text */}
            <div>
              <p className='font-bold font-mont text-lg black-text'>
                A.A Store
              </p>
            </div>
            {/* icon */}
            <div>
              <span className='font-extrabold'>
                <HiMenuAlt2 size={28} />
              </span>
            </div>
          </div>
        </div>

        {/* END OF MOBILE VIEW HEADER */}

        {/* desktop view header */}
        <div className='md:block hidden'>
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
                  className={`${clicked === 'ManagerDashboard' ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
                  onClick={() => setClicked('ManagerDashboard')}
                >
                  Dashboard
                </span>
                <span
                  className={`${clicked === 'Inventory' ? 'black-bg text-white' : 'bg-light-gray black-text'} sm:text-[9.5px] lg:text-xs xl:text-sm font-mont font-medium sm:px-6 lg:px-8 xl:px-10 pt-2 pb-[7px] sm:rounded-xl lg:rounded-2xl cursor-pointer`}
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
                      className={`${clicked === 'ReceiptsRecords' ? 'black-bg text-white'  : 'bg-light-gray black-text'} font-medium font-mont text-[10px] py-2 px-5 rounded-xl mb-3 cursor-pointer`}
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

        {/* components */}
        <div className='mx-4'>
          {
            clicked === 'ManagerDashboard' ? <Cards /> : null
          }
        </div>

      </div>
    </div>
  )
}

export default ManagerDashboard

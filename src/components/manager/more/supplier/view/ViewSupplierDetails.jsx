import React from 'react'
import { GoArrowLeft } from "react-icons/go";

const ViewSupplierDetails = ({ setClicked }) => {

    const list = JSON.parse(localStorage.getItem('ListOfStocks'))

    return (
        <div className='bg-color-full'>
            {/* Back Button */}
            <div
                className='mt-4 mx-4 sm:mx-0 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('SupplierManagement')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>

            {/* full details */}
            <div className='bg-white mt-5 px-6 py-7'>
                {/* text */}
                <div>
                    <p className='font-mont font-semibold text-xl sm:text-2xl'>Supplier's Purchase Details</p>
                    <p className='text-light-gray font-mont font-medium text-[10px] sm:text-xs mt-2'>Full details of the stock</p>
                </div>
                {/* info */}
                <div className='border border-gray-300 mt-7'>
                    <div className='py-8 px-4 sm:px-7'>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Date Of Purchase</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{list.date_of_purchase}</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Stock Name</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{list.stock_name}</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>SKU</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{list.sku}</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Category</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{list.category}</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Supplier</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{list.supplier_name}</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Wholesale Actual Price</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{Number(list.wholesale_actual_price).toLocaleString()}.00</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Wholesale Price</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{Number(list.wholesale_price).toLocaleString()}.00</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Wholesale Cap Price</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{Number(list.wholesale_cap_price).toLocaleString()}.00</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Retail Actual Price</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{Number(list.retail_actual_price).toLocaleString()}.00</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Retail Price</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{Number(list.retail_price).toLocaleString()}.00</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Retail Cap Price</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{Number(list.retail_cap_price).toLocaleString()}.00</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Quantity</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{list.quantity}</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Low Stock Number</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{list.low_stock_threshold}</p>
                        </div>
                        {/* list */}
                        <div className='flex items-center gap-2 mb-2'>
                            <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Payment Status</p>
                            <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>{list.payment_status}</p>
                        </div>
                        <div className='mt-10'>
                            {/* list */}
                            <div className='flex items-center gap-2 mb-2'>
                                <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Amount to be Paid</p>
                                <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{Number(list.price).toLocaleString()}.00</p>
                            </div>
                            {/* list */}
                            <div className='flex items-center gap-2 mb-2'>
                                <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Amount Paid</p>
                                <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{Number(list.amount_paid).toLocaleString()}.00</p>
                            </div>
                            {/* list */}
                            <div className='flex items-center gap-2 mb-2'>
                                <p className='bg-gray-view w-1/2 sm:w-1/4 py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>Outstanding payment</p>
                                <p className='bg-gray-view  w-1/2 sm:w-full py-2 pl-4 sm:pl-6 font-mont font-medium text-[8px] sm:text-[9px] lg:text-xs xl:text-sm'>₦{Number(list.outstanding_balance).toLocaleString()}.00</p>
                            </div>
                        </div>
                    </div>
                    {/* view all supplier sales */}
                    <div className={`mx-4 sm:mx-8 mt-16 mb-6`} onClick={() => setClicked("ViewSupplierSales")}>
                        <p className='font-mont font-semibold text-sm underline cursor-pointer'>View Total Sales by Supplier</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSupplierDetails

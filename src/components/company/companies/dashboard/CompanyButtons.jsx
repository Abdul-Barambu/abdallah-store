import React from 'react'

const CompanyButtons = ({ setClicked }) => {
    return (
        <div className='mx-4 sm:mx-0'>
            <div className='flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-7 h-3/4 sm:h-1/2 xl:h-3/5'>
                <div className='bg-black text-center text-white px-3 py-4 sm:py-3 w-full sm:w-4/12 lg:w-1/4 xl:w-1/5 rounded-xl cursor-pointer shadow-md' onClick={() => setClicked("CompanyAddNewPurchase")}>
                    <p className='font-mont font-medium'>Add New Purchase</p>
                </div>
                <div className='bg-black text-center text-white px-3 py-4 sm:py-3 w-full sm:w-4/12 lg:w-1/4 xl:w-1/5 rounded-xl cursor-pointer shadow-md' onClick={() => setClicked("CompanyAddStock")}>
                    <p className='font-mont font-medium'>Add Stock</p>
                </div>
            </div>
        </div>
    )
}

export default CompanyButtons
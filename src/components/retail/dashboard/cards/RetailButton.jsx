import React from 'react'

const RetailButton = ({ setClicked }) => {
    return (
        <div className='bg-color mx-4 sm:mx-0'>
            <div className='flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-7'>
                <div className='bg-black text-center py-4 sm:py-3 w-full sm:w-4/12 lg:w-1/4 xl:w-1/5 rounded-xl cursor-pointer shadow-md' onClick={() => setClicked("RetailAddPurchase")}>
                    <p className='font-mont font-medium text-white text-sm'>Add New Purchase</p>
                </div>
            </div>
        </div>
    )
}

export default RetailButton

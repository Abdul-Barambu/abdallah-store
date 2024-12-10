import React, { useState } from 'react';
import { FaMoneyBills, FaChartSimple } from "react-icons/fa6";
import CompanyButtons from './CompanyButtons';

const CompanyCards = ({ setClicked }) => {
    return (
        <div className="bg-color mt-4 mx-4 sm:mx-0 pb-10 sm:pb-0 relative">
            {/* Cards */}
            <div className="flex sm:flex-row flex-col justify-between items-center gap-5 mx-0 sm:mx-32 lg:mx-44 xl:mx-56">
                {/* Card 1 */}
                <div className="flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-white px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]">
                    <div>
                        <div className="flex justify-center bg-light-gray p-2 rounded-xl w-10">
                            <FaMoneyBills size={20} />
                        </div>
                        <p className="mt-3 font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg">Total Sales <span className='text-white'>break</span></p>
                    </div>
                    <div className="flex-grow bg-light-gray px-5 py-5 rounded-3xl">
                        <p className="font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg mt-7">₦12,000,000</p>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-white px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]">
                    <div>
                        <div className="flex justify-center bg-light-gray p-2 rounded-xl w-10">
                            <FaChartSimple size={20} />
                        </div>
                        <p className="mt-3 font-medium font-mont sm:text-[10px] lg:text-sm xl:text-lg">Total AAS Commission</p>
                    </div>
                    <div className="flex-grow bg-light-gray px-6 py-6 rounded-3xl">
                        <p className="font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg mt-7">₦12,000,000</p>
                    </div>
                </div>
            </div>

            {/* button */}
            <div className='mt-8'>
                <CompanyButtons setClicked={setClicked} />
            </div>
        </div>
    );
};

export default CompanyCards;
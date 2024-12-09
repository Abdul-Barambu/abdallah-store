import React, { useState } from 'react';
import { FaMoneyBills, FaChartSimple, FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { companyName } from '../../../../data';
import RegisterButton from './RegisterButton';

const DashboardCards = ({ setClicked }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null); // Track selected company

    // Calculate the maximum index to prevent overflow
    const maxIndex = Math.max(0, companyName.length - 3);

    const handleNext = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleCompanyClick = (index) => {
        setSelectedIndex(index); // Update selected company index
    };

    return (
        <div className="bg-color mt-4 mx-4 sm:mx-0 pb-10 sm:pb-0 relative">
            {/* Navigation Buttons */}
            <button
                className="absolute -left-4 top-[2.5%] sm:top-[2%] lg:top-[1.8%] xl:top-[4%] transform -translate-y-1/2 z-10"
                onClick={handlePrev}
                disabled={currentIndex === 0}
            >
                <FaCaretLeft className={`text-4xl ${currentIndex === 0 ? 'text-gray-300' : 'text-black'}`} />
            </button>
            <button
                className="absolute -right-4 top-[2.5%] sm:top-[2%] lg:top-[1.8%] xl:top-[4%] transform -translate-y-1/2 z-10"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
            >
                <FaCaretRight className={`text-4xl ${currentIndex >= maxIndex ? 'text-gray-300' : 'text-black'}`} />
            </button>

            {/* Slider */}
            <div className="overflow-hidden w-full my-7">
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                        width: `${(companyName.length * 50) / 3}%`,
                    }}
                >
                    {companyName.map((name, index) => (
                        <div
                            key={index}
                            className={`w-1/2 sm:w-1/3 flex-shrink-0 flex items-center justify-center`}
                            onClick={() => handleCompanyClick(index)} // Handle company click
                        >
                            <div
                                className={`w-10/12 text-center py-2.5 rounded-lg sm:rounded-xl cursor-pointer hover:shadow ${selectedIndex === index ? 'bg-black text-white' : 'bg-white text-black'
                                    }`} // Apply styles conditionally
                            >
                                <p className="font-mont text-xs sm:text-base font-semibold truncate">
                                    {name.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
                <RegisterButton setClicked={setClicked} />
            </div>
        </div>
    );
};

export default DashboardCards;

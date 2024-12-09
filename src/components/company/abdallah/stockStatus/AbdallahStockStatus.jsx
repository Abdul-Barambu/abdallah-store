import React, { useState } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { GoArrowLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { listOfStocks } from '../../../../data';

const AbdallahStockStatus = ({ handlePrint, button }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filter, setFilter] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('All');

    const filteredDues = listOfStocks.filter((stock) => {
        const matchesSearch = stock.name.toLowerCase().includes(searchValue.toLowerCase());
        const matchesFilter =
            selectedFilter === 'All' ||
            (selectedFilter === 'Healthy Stock' && stock.remaining > stock.lowStock) ||
            (selectedFilter === 'Low Stock' && stock.remaining <= stock.lowStock && stock.remaining > '0') ||
            (selectedFilter === 'Out of Stock' && stock.remaining === '0');
        return matchesSearch && matchesFilter;
    });


    const data = [
        { name: 'Healthy Stock', value: 10, color: '#0AE418' },
        { name: 'Low Stock', value: 5, color: '#E3D322' },
        { name: 'Out of Stock', value: 5, color: '#F10000' }
    ];

    const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <div className='bg-color-full'>
            <div className='bg-white pb-32 mt-14'>
                <h1 className='text-center -mb-16 font-mont font-semibold pt-5'>Real-Time Stock Status</h1>
                {/* chart */}
                <div className='flex items-center justify-center'>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            // dataKey="value"
                            cx={200}
                            cy={200}
                            innerRadius={65}
                            outerRadius={92}
                            // fill="#8884d8"
                            stroke='none'
                            paddingAngle={3} // Adds space between the segments
                            cornerRadius={3} // Adds rounded edges to the segments
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        {/* <Legend /> */}
                        <text
                            x={203} // Centered horizontally (matches cx of Pie)
                            y={200} // Centered vertically (matches cy of Pie)
                            textAnchor="middle" // Centers the text horizontally
                            dominantBaseline="middle" // Centers the text vertically
                            fontSize={14} // Adjust font size as needed
                            fontWeight="bold"
                            fill="#000"
                        >
                            {totalValue}
                        </text>
                        <text
                            x={203} // Centered horizontally (matches cx of Pie)
                            y={215} // Centered vertically (matches cy of Pie)
                            textAnchor="middle" // Centers the text horizontally
                            dominantBaseline="middle" // Centers the text vertically
                            fontSize={10} // Adjust font size as needed
                            fontWeight="bold"
                            fill="#B8B8B8"
                        >
                            {'Total Products'}
                        </text>
                    </PieChart>
                </div>
                {/* number of products */}
                <div className='-mt-20 pb-10 mx-4 sm:mx-0 flex flex-col sm:flex-row items-center justify-center gap-8'>
                    {/* healthy */}
                    <div className='box w-full sm:w-[18%] lg:w-[15%] xl:w-[13%] rounded-xl py-3 text-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <div className='green-box'></div>
                            <span className='font-mont font-semibold text-xs'>Healthy Stock</span>
                        </div>
                        <p className='font-mont font-bold mt-2 text-sm'>10</p>
                    </div>
                    {/* low */}
                    <div className='box w-full sm:w-[18%] lg:w-[15%] xl:w-[13%] rounded-xl py-3 text-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <div className='yellow-box'></div>
                            <span className='font-mont font-semibold text-xs'>Low Stock</span>
                        </div>
                        <p className='font-mont font-bold mt-2 text-sm'>5</p>
                    </div>
                    {/* out */}
                    <div className='box w-full sm:w-[18%] lg:w-[15%] xl:w-[13%] rounded-xl py-3 text-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <div className='red-box'></div>
                            <span className='font-mont font-semibold text-xs'>Out of Stock</span>
                        </div>
                        <p className='font-mont font-bold mt-2 text-sm'>5</p>
                    </div>
                </div>
                {/* searh and filter and print */}
                <div className={`mx-4 sm:mx-20 mt-5 sm:mt-0 sm:flex items-center justify-between`}>
                    {/* search and filter */}
                    <div className={`${button ? 'hidden' : 'block'}`}>
                        <div className='relative flex items-center gap-2'>
                            {!searchValue && (
                                <CiSearch className='absolute left-24 sm:left-36 lg:left-40' size={15} />
                            )}
                            <input
                                type="text"
                                placeholder='Search'
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className='font-mont font-medium w-full sm:w-[350px] lg:w-[400px] pl-10 pr-4 py-3 sm:py-2 search-gray rounded-lg outline-none text-center text-xs sm:text-base'
                            />
                            <div className='search-gray py-3 px-3 rounded-lg cursor-pointer' onClick={() => setFilter(!filter)}>
                                <FaFilter className='text-sm' />
                            </div>
                        </div>
                        {/* filter */}
                        {filter && (
                            <div className='sm:top-[57%] lg:top-[45%] xl:top-[103%] left-0 sm:left-[40%] lg:left-[36%] xl:left-[32%] absolute bg-white w-10/12 ml-8 sm:ml-0 sm:w-1/5 px-8 sm:px-10 py-5'>
                                <p
                                    className={`${selectedFilter === 'All' ? 'border border-black black-text' : 'border-none gray-text'} text-center font-mont font-medium text-[15px] mb-3 bg-light-gray py-2 px-6 rounded-xl shadow-md cursor-pointer`}
                                    onClick={() => { setSelectedFilter('All'); setFilter(false) }}
                                >
                                    All
                                </p>
                                <p
                                    className={`${selectedFilter === 'Healthy Stock' ? 'border border-black black-text' : 'border-none gray-text'} text-center font-mont font-medium text-[15px] mb-3 bg-light-gray py-2 px-6 rounded-xl shadow-md cursor-pointer`}
                                    onClick={() => { setSelectedFilter('Healthy Stock'); setFilter(false) }}
                                >
                                    Healthy Stock
                                </p>
                                <p
                                    className={`${selectedFilter === 'Low Stock' ? 'border border-black black-text' : 'border-none gray-text'} text-center font-mont font-medium text-[15px] mb-3 bg-light-gray py-2 px-6 rounded-xl shadow-md cursor-pointer`}
                                    onClick={() => { setSelectedFilter('Low Stock'); setFilter(false) }}
                                >
                                    Low Stock
                                </p>
                                <p
                                    className={`${selectedFilter === 'Out of Stock' ? 'border border-black black-text' : 'border-none gray-text'} text-center font-mont font-medium text-[15px] mb-3 bg-light-gray py-2 px-6 rounded-xl shadow-md cursor-pointer`}
                                    onClick={() => { setSelectedFilter('Out of Stock'); setFilter(false) }}
                                >
                                    Out of Stock
                                </p>
                            </div>
                        )}
                    </div>
                    {/* print */}
                    <div onClick={handlePrint} className={`black-bg w-full sm:w-[17%] lg:w-[12%] py-1.5 rounded-lg text-center hidden sm:block ${button ? 'sm:hidden' : 'block'}`}>
                        <button className="text-white text-xs font-mont font-semibold">Print</button>
                    </div>
                </div>
                {/* list of products */}
                <div className={`${button ? '' : 'mt-6 mx-3 sm:mx-0 overflow-x-auto'}`}>
                    {/* Wrapper for horizontal scroll */}
                    <div className={`${button ? '' : 'min-w-[600px]'}`}>
                        {/* Head */}
                        <div className='grid grid-cols-6 bg-light-gray py-3 text-center mb-1'>
                            <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                            <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Supplier</span>
                            <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>SKU</span>
                            <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Qty</span>
                            <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Remaining</span>
                            <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Status</span>
                        </div>

                        {/* Data */}
                        <div className={`${button ? '' : 'h-96 overflow-y-scroll'}`}>
                            {
                                filteredDues.map((stock) => (
                                    <div key={stock.id} className='grid grid-cols-6 my-0.5 text-center'>
                                        <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.name}</span>
                                        <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.supplier}</span>
                                        <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.sku}</span>
                                        <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.qty}</span>
                                        <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{stock.remaining}</span>
                                        <div className='flex flex-row gap-2  lg:gap-4 justify-start items-center bg-table sm:pl-1 lg:pl-8 xl:pl-14'>
                                            <div className={`${stock.remaining > stock.lowStock ? 'green-box' : stock.remaining <= stock.lowStock && stock.remaining > '0' ? 'yellow-box' : stock.remaining === '0' ? 'red-box' : null}`}></div>
                                            <span className='font-mont font-semibold text-[7px] sm:text-xs'>{stock.remaining > stock.lowStock ? 'Healthy Stock' : stock.remaining <= stock.lowStock && stock.remaining > '0' ? 'Low Stock' : stock.remaining === '0' ? 'Out of Stock' : null}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {/* print */}
                <div onClick={handlePrint} className={`black-bg w-1/2 sm:w-[17%] lg:w-[12%] py-1.5 rounded-lg text-center sm:hidden block mx-auto mt-6 ${button ? 'hidden' : 'block'}`}>
                    <button className="text-white text-xs font-mont font-semibold">Print</button>
                </div>
            </div>
        </div>
    );
}

export default AbdallahStockStatus
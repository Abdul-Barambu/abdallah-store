import React, { useState, useEffect, useRef } from 'react';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const CompanyChart = () => {
    const chartRef = useRef(null);

    // Full dataset
    const allLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const allSalesData = [3, 6, 9, 10, 5, 5, 3, 4, 2, 1, 6, 7];
    const allProfitsData = [3, 3, 3, 9, 11, 5, 6, 7, 6, 9, 10, 5];

    // State to manage the number of months to show
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const [monthsToShow, setMonthsToShow] = useState(8);

    // Update the number of months to show based on screen width
    useEffect(() => {
        const updateMonthsToShow = () => {
            if (window.innerWidth < 768) {
                setMonthsToShow(4); // Mobile view
            } else {
                setMonthsToShow(8); // Desktop view
            }
        };

        updateMonthsToShow();
        window.addEventListener('resize', updateMonthsToShow);

        return () => {
            window.removeEventListener('resize', updateMonthsToShow);
        };
    }, []);

    // Slice the data for the current view
    const currentLabels = allLabels.slice(currentMonthIndex, currentMonthIndex + monthsToShow);
    const currentSalesData = allSalesData.slice(currentMonthIndex, currentMonthIndex + monthsToShow);
    const currentProfitsData = allProfitsData.slice(currentMonthIndex, currentMonthIndex + monthsToShow);

    const borderRadius = window.innerWidth < 640 ? 6 : window.innerWidth < 1024 ? 10 : 15;
    const labelFontSize = window.innerWidth < 640 ? 11 : window.innerWidth < 1024 ? 14 : 14;

    // Data for the chart
    const data = {
        labels: currentLabels,
        datasets: [
            {
                label: 'Sales',
                data: currentSalesData,
                backgroundColor: 'black',
                borderRadius: borderRadius,
            },
            {
                label: 'Profits',
                data: currentProfitsData,
                backgroundColor: 'lightgray',
                borderRadius: borderRadius,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: labelFontSize,
                        family: 'Arial',
                        weight: 'bold',
                    },
                    color: 'black',
                },
                position: 'bottom',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'black',
                },
            },
            y: {
                grid: {
                    display: true,
                    dash: [10, 10],
                },
                ticks: {
                    display: false,
                },
            },
        },
    };

    // Next and Previous buttons handlers
    const handleNext = () => {
        if (currentMonthIndex + monthsToShow < allLabels.length) {
            setCurrentMonthIndex(currentMonthIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentMonthIndex > 0) {
            setCurrentMonthIndex(currentMonthIndex - 1);
        }
    };

    // Resize listener to update chart
    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.resize();
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const generateYears = (startYear, numberOfYears) => {
        const currentYear = new Date().getFullYear(); // Get the current year
        const start = Math.max(startYear, currentYear); // Start with the current year or the specified year, whichever is greater
        const years = [];

        for (let i = 0; i < numberOfYears; i++) {
            const year = start + i;
            years.push({
                id: i + 1,
                value: `${year}`,
                name: `${year}`
            });
        }

        return years;
    };

    // Usage example
    const years = generateYears(2024, 10);


    return (
        <div className='rounded-3xl mt-4 mx-4 mb-10 sm:-mx-[1px]'>
            <div className='pt-4 px-6 flex justify-between'>
                <span className='font-mont font-medium text-xs sm:text-lg'>Sales & Profits</span>
                <select name="chart" className='font-mont font-medium text-[10px] sm:text-sm month-gray py-2 px-3 rounded-lg outline-none'>
                    {
                        years.map((year, index) => {
                            return (
                                <option key={index} value={year.value}>{year.name}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className='flex items-center justify-between pt-10 pb-3'>
                <button
                    onClick={handlePrevious}
                    disabled={currentMonthIndex === 0}
                    style={{
                        padding: '7px',
                        backgroundColor: 'white',
                        border: '6px solid #ECECEC',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        marginLeft: -15,
                    }}
                >
                    <GoArrowLeft color='black' className='text-xs sm:text-[20px]' />
                </button>

                <div className='w-9/12 sm:w-11/12 h-[200px] sm:h-[300px] lg:h-[350px] xl:h-[450px]'>
                    <Bar ref={chartRef} data={data} options={options} />
                </div>


                <button
                    onClick={handleNext}
                    disabled={currentMonthIndex + monthsToShow >= allLabels.length}
                    style={{
                        padding: '7px',
                        backgroundColor: 'white',
                        border: '6px solid #ECECEC',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        marginRight: -15,
                    }}
                >
                    <GoArrowRight color='black' className='text-xs sm:text-[20px]' />
                </button>
            </div>
        </div>
    );
};

export default CompanyChart
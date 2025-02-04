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
import axios from 'axios';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const WholesaleCharts = () => {
    const chartRef = useRef(null);

    // Full dataset
    const allLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [jan, setJan] = useState('')
    const [feb, setFeb] = useState('')
    const [mar, setMar] = useState('')
    const [apr, setApr] = useState('')
    const [may, setMay] = useState('')
    const [jun, setJun] = useState('')
    const [jul, setJul] = useState('')
    const [aug, setAug] = useState('')
    const [sep, setSep] = useState('')
    const [oct, setOct] = useState('')
    const [nov, setNov] = useState('')
    const [dec, setDec] = useState('')
    const allSales = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];

    const [janP, setJanP] = useState('')
    const [febP, setFebP] = useState('')
    const [marP, setMarP] = useState('')
    const [aprP, setAprP] = useState('')
    const [mayP, setMayP] = useState('')
    const [junP, setJunP] = useState('')
    const [julP, setJulP] = useState('')
    const [augP, setAugP] = useState('')
    const [sepP, setSepP] = useState('')
    const [octP, setOctP] = useState('')
    const [novP, setNovP] = useState('')
    const [decP, setDecP] = useState('')
    const allProfits = [janP, febP, marP, aprP, mayP, junP, julP, augP, sepP, octP, novP, decP];

    const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
    const [monthsToShow, setMonthsToShow] = useState(8);

    // State to store the selected year
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        const updateMonthsToShow = () => {
            if (window.innerWidth < 768) {
                setMonthsToShow(4);
            } else {
                setMonthsToShow(8);
            }
        };

        updateMonthsToShow();
        window.addEventListener('resize', updateMonthsToShow);

        return () => {
            window.removeEventListener('resize', updateMonthsToShow);
        };
    }, []);

    const currentLabels = allLabels.slice(currentMonthIndex, currentMonthIndex + monthsToShow);
    const currentSalesData = allSales.slice(currentMonthIndex, currentMonthIndex + monthsToShow);
    const currentProfitsData = allProfits.slice(currentMonthIndex, currentMonthIndex + monthsToShow);

    const borderRadius = window.innerWidth < 640 ? 6 : window.innerWidth < 1024 ? 10 : 15;
    const labelFontSize = window.innerWidth < 640 ? 11 : window.innerWidth < 1024 ? 14 : 14;

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

    const generateYears = (startYear) => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = startYear; year <= currentYear; year++) {
            years.push({
                id: year - startYear + 1,
                value: `${year}`,
                name: `${year}`
            });
        }
        return years;
    };

    const years = generateYears(2022);

    const handleYearChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedYear(selectedValue);
        // console.log(selectedValue); // Log the selected year
    };

    // console.log(selectedYear)


    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }

    // all profits and sales
    useEffect(() => {
        if (selectedYear) {
            const allSales = () => axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/wholesale/monthly-sales/", {
                params: {
                    year: selectedYear
                },
                headers: headers
            })
                .then(response => {
                    // console.log(response)
                    setJan(response.data.monthly_sales.monthly_sales.January)
                    setFeb(response.data.monthly_sales.monthly_sales.February)
                    setMar(response.data.monthly_sales.monthly_sales.March)
                    setApr(response.data.monthly_sales.monthly_sales.April)
                    setMay(response.data.monthly_sales.monthly_sales.May)
                    setJun(response.data.monthly_sales.monthly_sales.June)
                    setJul(response.data.monthly_sales.monthly_sales.July)
                    setAug(response.data.monthly_sales.monthly_sales.August)
                    setSep(response.data.monthly_sales.monthly_sales.September)
                    setOct(response.data.monthly_sales.monthly_sales.October)
                    setNov(response.data.monthly_sales.monthly_sales.November)
                    setDec(response.data.monthly_sales.monthly_sales.December)
                }).catch(error => {
                    // console.log(error)
                })

            const allProfits = () => axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/wholesale/monthly-profits/", {
                params: {
                    year: selectedYear
                },
                headers: headers
            })
                .then(response => {
                    // console.log(response)
                    setJanP(response.data.monthly_profits.monthly_profits.January)
                    setFebP(response.data.monthly_profits.monthly_profits.February)
                    setMarP(response.data.monthly_profits.monthly_profits.March)
                    setAprP(response.data.monthly_profits.monthly_profits.April)
                    setMayP(response.data.monthly_profits.monthly_profits.May)
                    setJunP(response.data.monthly_profits.monthly_profits.June)
                    setJulP(response.data.monthly_profits.monthly_profits.July)
                    setAugP(response.data.monthly_profits.monthly_profits.August)
                    setSepP(response.data.monthly_profits.monthly_profits.September)
                    setOctP(response.data.monthly_profits.monthly_profits.October)
                    setNovP(response.data.monthly_profits.monthly_profits.November)
                    setDecP(response.data.monthly_profits.monthly_profits.December)
                }).catch(error => {
                    // console.log(error)
                })

            allSales();
            allProfits();
        }
    }, [selectedYear])


    return (
        <div className='bg-white rounded-3xl mt-4'>
            <div className='pt-4 px-6 flex justify-between'>
                <span className='font-mont font-medium text-xs sm:text-lg'>Sales & Profits</span>
                <select
                    name="chart"
                    value={selectedYear} // Bind the state value
                    className='font-mont font-medium text-[10px] sm:text-sm month-gray py-2 px-3 rounded-lg outline-none'
                    onChange={handleYearChange} // Handle change event
                >
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

export default WholesaleCharts;
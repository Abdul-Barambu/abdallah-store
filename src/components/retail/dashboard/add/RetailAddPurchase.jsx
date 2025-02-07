import React, { useEffect, useRef, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import SuccessAlert from './SuccessAlert';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaCaretDown } from "react-icons/fa";

const RetailAddPurchase = ({ setClicked }) => {

    const [alert, setAlert] = useState(false);
    const [amountPaid, setAmountPaid] = useState('')
    const [status, setStatus] = useState('')
    const [stocks, setStocks] = useState([])
    const [btn, setBtn] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(null); // Track open dropdown for each row
    const [searchTerm, setSearchTerm] = useState(""); // Search input state
    const dropdownRef = useRef(null);
    const [selectedStocks, setSelectedStocks] = useState({});

    const [rows, setRows] = useState([
        { id: 1, stockName: 0, stockPrice: 0, qty: '', discount: 0, totalPrice: 0 }
    ]);

    const handleAlert = () => {
        setAlert(!alert);
    };


    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAddRow = () => {
        const newRow = {
            id: rows.length + 1,
            stockName: 0,
            stockPrice: 0,
            qty: '',
            discount: 0,
            totalPrice: 0
        };
        setRows([...rows, newRow]);
    };

    const handleQtyChange = (e, rowId) => {
        const newQty = e.target.value; // Get the updated value from input
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === rowId ? { ...row, qty: newQty } : row
            )
        );
    };
    const handleDiscountChange = (e, rowId) => {
        const newDiscount = e.target.value; // Get the updated value from input
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === rowId ? { ...row, discount: newDiscount } : row
            )
        );
    };


    const handleDeleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleStatus = (e) => {
        const selectedValue = e.target.value;
        setStatus(selectedValue);
    };

    const handleStockSelect = (rowId, stockId, retailPrice) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === rowId
                    ? { ...row, stockId: stockId, stockPrice: retailPrice }
                    : row
            )
        );
    };

    // sum up all total
    const totalAmount = rows.reduce((acc, row) => acc + ((row.stockPrice - row.discount) * row.qty || 0), 0);

    // sum up all discount
    const totalDiscount = rows.reduce((acc, row) => acc + (parseFloat(row.discount) || 0), 0);


    // headers
    const Access = localStorage.getItem("access-token")
    const Refresh = localStorage.getItem("refresh-token")

    const headers = {
        Authorization: `Bearer ${Access}`
    }

    useEffect(() => {
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/stocks/available/", { headers })
            .then(response => {
                // console.log(response)
                setStocks(response.data)
            }).catch(error => {
                // console.log(error)
            })
    }, [])

    const handleAddPurchase = () => {
        setBtn(true)
        axios.post('https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/retail/purchase/', {
            items: rows.map(row => ({
                stock_id: row.stockId,
                quantity: row.qty,
                discount_price: row.discount
            })),
            amount_paid: amountPaid,
            status: status,
            date_of_purchase: new Date().toISOString().split('T')[0]
        }, { headers })
            .then(response => {
                // console.log(response)
                toast.success('Purchase added sucessfully')
                localStorage.setItem("stock-retail-purchase", JSON.stringify(response.data))
                setAlert(true)
                setBtn(false)
            }).catch(error => {
                // console.log(error)
                toast.error('Something went wrong, please try again')
                setBtn(false)
            })
    }

    return (
        <div className='bg-color-full px-4 sm:px-0'>
            <ToastContainer />
            {/* Back Button */}
            <div
                className='mt-4 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('RetailDashboard')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>

            {/* Inputs */}
            {/* <div className='mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8'>
                <div>
                    <p className='font-mont text-sm font-normal mb-2'>Wholesaler's Name</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='bg-white py-2 px-5 w-full font-mont text-sm rounded-lg outline-none font-medium' />
                </div>
                <div>
                    <p className='font-mont text-sm font-normal mb-2'>Phone Number</p>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' className='bg-white py-2 px-5 w-full font-mont text-sm rounded-lg outline-none font-medium' />
                </div>
            </div> */}

            {/* Stock List */}
            <div className='mt-6 overflow-x-auto'>
                <div className='min-w-[600px]'>
                    {/* Header */}
                    <div className='flex justify-between gap-2 bg-white py-3 px-5 mb-1'>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>S/N</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Stock Name</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Stock Price</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Stock Qty</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Discount</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Price</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'></span>
                    </div>

                    {/* Rows */}
                    <div>
                        {rows.map((row) => (
                            <div key={row.id} className="flex justify-between my-1 bg-white/[0.47]">
                                <span className="text-xs sm:text-sm font-mont py-4 px-5">{row.id}</span>

                                <span className="py-2 px-4 relative">
                                    {/* Selected Stock Name Display */}
                                    <div className='bg-white rounded-md sm:rounded-lg cursor-pointer flex gap-10 items-center px-5' onClick={() => setDropdownOpen(dropdownOpen === row.id ? null : row.id)}>
                                        <div
                                            className=" text-xs sm:text-sm py-3 font-mont outline-none "

                                        >
                                            {selectedStocks[row.id] || "Select a Product"}
                                        </div>
                                        <div>
                                            <FaCaretDown />
                                        </div>
                                    </div>

                                    {/* Dropdown with Search & Scroll */}
                                    {dropdownOpen === row.id && (
                                        <div className="relative mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg h-36 overflow-y-scroll">
                                            {/* Search Input */}
                                            <input
                                                type="text"
                                                placeholder="Search product..."
                                                className="w-full px-3 py-2 text-xs sm:text-sm border-b outline-none"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />

                                            {/* Scrollable Product List */}
                                            <div className="max-h-32 overflow-y-auto">
                                                {stocks
                                                    .filter((stock) =>
                                                        stock.stock_name.toLowerCase().includes(searchTerm.toLowerCase())
                                                    )
                                                    .map((stock) => (
                                                        <div
                                                            key={stock.id}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => {
                                                                handleStockSelect(row.id, stock.id, stock.wholesale_price);
                                                                setSelectedStocks((prev) => ({
                                                                    ...prev,
                                                                    [row.id]: stock.stock_name,
                                                                }));
                                                                setDropdownOpen(null); // Close dropdown
                                                                setSearchTerm(""); // Reset search
                                                            }}
                                                        >
                                                            {stock.stock_name}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </span>

                                <span className="text-xs sm:text-sm font-mont py-4 px-5">₦{Number(row.stockPrice).toLocaleString()}.00</span>

                                <span className="text-xs sm:text-sm font-mont py-2">
                                    <input
                                        type="text"
                                        value={row.qty}
                                        className="bg-white px-2 text-center text-xs sm:text-sm w-full py-3 outline-none rounded-md sm:rounded-lg"
                                        onChange={(e) => handleQtyChange(e, row.id)}
                                    />
                                </span>

                                <span className="text-xs sm:text-sm font-mont py-2">
                                    <input
                                        type="text"
                                        value={row.discount}
                                        className="bg-white px-2 text-center text-xs sm:text-sm w-full py-3 outline-none rounded-md sm:rounded-lg"
                                        onChange={(e) => handleDiscountChange(e, row.id)}
                                    />
                                </span>

                                <span className="text-xs sm:text-sm font-mont py-4 px-2">
                                    ₦{Number((row.stockPrice - row.discount) * row.qty).toLocaleString()}.00
                                </span>

                                <span className="py-4 px-5">
                                    <RiDeleteBin6Fill
                                        className="cursor-pointer icon-red text-lg"
                                        onClick={() => handleDeleteRow(row.id)}
                                    />
                                </span>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* Add Row Button */}
            <div className='bg-white text-center mx-auto py-2 cursor-pointer mt-3 w-1/2 sm:w-1/4 rounded-lg' onClick={handleAddRow}>
                <button className='font-mont text-sm'>Add</button>
            </div>

            {/* totals */}
            <div className='mt-20'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-0.5 mb-3 sm:mb-7'>
                    <div className='bg-white sm:bg-white/[0.47] py-4 sm:py-2 px-8 sm:px-14 flex justify-between items-center mb-3 sm:mb-0'>
                        <span className='font-mont text-[10px] sm:text-[8px] lg:text-xs font-medium'>TOTAL:</span>
                        <span className='font-mont text-[10px] sm:text-[8px] lg:text-xs font-semibold pr-1 sm:pr-10 xl:pr-20'>₦{Number(totalAmount).toLocaleString()}.00</span>
                    </div>
                    <div className='bg-white/[0.47] py-2 px-5 sm:px-8 lg:px-16 xl:px-28 flex justify-between items-center'>
                        <span className='font-mont text-[8px] lg:text-xs font-medium'>Discount Price</span>
                        <input type="text" value={totalDiscount} disabled placeholder='Discount Amount' className='py-2 px-5 font-mont text-xs lg:text-sm rounded-md outline-none bg-white text-center' />
                    </div>
                </div>
                {/* others */}
                <div className='sm:grid grid-cols-2 mb-3 sm:mb-2'>
                    <div></div>
                    <div className='bg-white/[0.47] py-2 px-5 sm:px-8 lg:px-16 xl:px-28 flex justify-between items-center'>
                        <span className='font-mont text-[8px] lg:text-xs font-medium'>Amount Paid</span>
                        <input type="text" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} placeholder='Amount Paid' className='py-2 px-5 font-mont text-xs lg:text-sm rounded-md outline-none text-center' />
                    </div>
                </div>
                <div className='sm:grid grid-cols-2'>
                    <div></div>
                    <div className='bg-white/[0.47] py-2 px-5 sm:px-8 lg:px-16 xl:px-28 flex justify-between items-center'>
                        <span className='font-mont text-[8px] lg:text-xs font-semibold uppercase'>Payment Status</span>
                        <select name="name" onChange={handleStatus} className='py-2 px-9 font-mont text-xs lg:text-sm rounded-md gray-text outline-none'>
                            <option value="">Payment Status</option>
                            <option value="On Credit">On Credit</option>
                            <option value="Fully Paid">Fully Paid</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* button */}
            <div className='flex justify-end'>
                <div className='black-bg mx-0.5 p-1 my-10 w-full sm:w-1/2 cursor-pointer' onClick={handleAddPurchase}>
                    <div className='border-receipt text-center py-3'>
                        <p className='text-white font-mont text-[11px] sm:text-base font-medium flex justify-center items-center'>{btn ? (<div className='loader-btn'></div>) : 'Add Purchase'}</p>
                    </div>
                </div>
            </div>

            {/* alert model */}
            {
                alert && (
                    <div className='center-proceed'>
                        <div className="is-proceed"></div>
                        <div className="center-content-proceed">
                            <SuccessAlert handleAlert={handleAlert} setClicked={setClicked} />
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default RetailAddPurchase
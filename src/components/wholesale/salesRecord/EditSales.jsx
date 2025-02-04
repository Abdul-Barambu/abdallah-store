import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import SuccessAlert from '../dashboard/add/SuccessAlert';
import EditSuccess from './EditSuccess';

const EditSales = ({ setClicked }) => {

    const purchase = JSON.parse(localStorage.getItem('Wholesale-purchases'));

    const [alert, setAlert] = useState(false);
    const [name, setName] = useState(purchase.buyer_name)
    const [phone, setPhone] = useState(purchase.buyer_phone)
    const [amountPaid, setAmountPaid] = useState(purchase.amount_paid)
    const [status, setStatus] = useState('')
    const [stocks, setStocks] = useState([])
    const [btn, setBtn] = useState(false)
    const [rows, setRows] = useState([])


    useEffect(() => {
        if (purchase && purchase.items) {
            setStocks(purchase.items); // Set stocks from localStorage
            setRows(
                purchase.items.map((item, index) => ({
                    id: index + 1,
                    stockId: item.id || "", // Set stockId from localStorage or empty
                    stockName: item.stock_name || "", // Set stockName from localStorage or empty
                    stockPrice: item.price + item.discount_price || "",
                    qty: item.quantity || "",
                    discount: item.discount_price || 0,
                    totalPrice: item.item_total || "",
                }))
            );
        }
    }, []);


    const handleAlert = () => {
        setAlert(!alert);
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

    const handleAddRow = () => {
        const newRow = {
            id: rows.length + 1,
            stockId: "", // Empty by default
            stockName: "",
            stockPrice: 0,
            qty: 0,
            discount: 0,
            totalPrice: 0,
        };
        setRows([...rows, newRow]); // Add the new row to the existing rows
    };


    const handleDeleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleStockSelect = (rowId, stockId, wholesalePrice) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === rowId
                    ? { ...row, stockId: stockId, stockPrice: wholesalePrice }
                    : row
            )
        );
    };

    const handleStatus = (e) => {
        const selectedValue = e.target.value;
        setStatus(selectedValue);
    };

    const totalDiscount = rows.reduce((total, row) => total + parseFloat(row.discount), 0);

    const wholesale_purchase = purchase.id

    // console.log(wholesale_purchase)

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

    const handleUpdatePurchase = () => {

        // if (rows.some((row) => !row.stockId || !row.qty)) {
        //     toast.error("Please fill in all required fields.");
        //     setBtn(false);
        //     return;
        // }

        setBtn(true)
        axios.put(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/wholesale/purchases/${wholesale_purchase}/update/`, {
            items: rows.map(row => ({
                stock_id: row.stockId,
                quantity: row.qty,
                discount_price: row.discount
            })),
            buyer_name: name,
            buyer_phone: phone,
            amount_paid: amountPaid,
            status: status,
            date_of_purchase: new Date().toISOString().split('T')[0]
        }, { headers })
            .then(response => {
                // console.log(response)
                toast.success('Updated sucessfully')
                localStorage.setItem("edit-wholesale-purchase", JSON.stringify(response.data))
                setAlert(true)
                setBtn(false)
            }).catch(error => {
                // console.log(error)
                toast.error('Something went wrong, please try again')
                setBtn(false)
            })
    }

    // sum total
    const totalAmount = rows.reduce((acc, row) => acc + ((row.stockPrice - row.discount) * row.qty || 0), 0);


    return (
        <div className='bg-color-full px-4 sm:px-0'>
            <ToastContainer />
            {/* Back Button */}
            <div
                className='mt-4 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer'
                onClick={() => setClicked('SalesRecord')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>

            {/* Inputs */}
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8'>
                <div>
                    <p className='font-mont text-sm font-normal mb-2'>Wholesaler's Name</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='bg-white py-2 px-5 w-full font-mont text-sm rounded-lg outline-none font-medium' />
                </div>
                <div>
                    <p className='font-mont text-sm font-normal mb-2'>Phone Number</p>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' className='bg-white py-2 px-5 w-full font-mont text-sm rounded-lg outline-none font-medium' />
                </div>
            </div>

            {/* Stock List */}
            <div className='mt-6 overflow-x-auto'>
                <div className='min-w-[600px]'>
                    {/* Header */}
                    <div className='flex justify-between bg-white py-3 px-5 mb-1'>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>S/N</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Stock Name</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Stock Price</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Stock Qty</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Discount</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'>Price</span>
                        <span className='font-mont font-semibold text-xs sm:text-sm'></span>
                    </div>

                    {/* Rows */}
                    {rows.map((row) => (
                        <div key={row.id} className='flex justify-between my-1 bg-white/[0.47]'>
                            <span className='text-xs sm:text-sm font-mont py-4 px-5'>{row.id}</span>
                            <span className='py-2 px-4'>
                                <select
                                    name="name"
                                    className="bg-white px-2 text-xs sm:text-sm w-full py-3 font-mont outline-none rounded-md sm:rounded-lg"
                                    value={row.stockId || ""} // Preselect stockId
                                    onChange={(e) => {
                                        const stockId = e.target.value;
                                        const selectedOption = e.target.options[e.target.selectedIndex];
                                        const wholesalePrice = selectedOption.getAttribute("data-wholesale-price");
                                        handleStockSelect(row.id, stockId, wholesalePrice);
                                    }}
                                >
                                    <option value="">-- Product Name --</option>

                                    {/* Check if data exists in localStorage */}
                                    {localStorage.getItem("purchase") ? (
                                        // Render options from localStorage
                                        JSON.parse(localStorage.getItem("purchase")).items.map((stock, index) => (
                                            <option
                                                key={`local-${index}`}
                                                value={stock.id} // Use the stock ID for value
                                                data-wholesale-price={stock.wholesale_price} // Store wholesale price as data attribute
                                            >
                                                {stock.stock_name} {/* Display the stock name */}
                                            </option>
                                        ))
                                    ) : (
                                        // Render options from the stocks array if localStorage is empty
                                        stocks.map((stock, index) => (
                                            <option
                                                key={`stocks-${index}`}
                                                value={stock.id} // Use the stock ID for value
                                                data-wholesale-price={stock.wholesale_price} // Store wholesale price as data attribute
                                            >
                                                {stock.stock_name} {/* Display the stock name */}
                                            </option>
                                        ))
                                    )}
                                </select>

                            </span>
                            <span className='text-xs sm:text-sm font-mont py-4 px-5'>₦{Number(row.stockPrice).toLocaleString()}.00</span>
                            <span className='text-xs sm:text-sm font-mont py-2'>
                                <input
                                    type="text"
                                    value={row.qty}
                                    className='bg-white px-2 text-center text-xs sm:text-sm w-full py-3 outline-none rounded-md sm:rounded-lg'
                                    onChange={(e) => handleQtyChange(e, row.id)}
                                />
                            </span>
                            <span className='text-xs sm:text-sm font-mont py-2'>
                                <input
                                    type="text"
                                    value={row.discount}
                                    className='bg-white px-2 text-center text-xs sm:text-sm w-full py-3 outline-none rounded-md sm:rounded-lg'
                                    onChange={(e) => handleDiscountChange(e, row.id)}
                                />
                            </span>
                            <span className='text-xs sm:text-sm font-mont py-4 px-2'>₦{Number((row.stockPrice - row.discount) * row.qty).toLocaleString()}.00</span>
                            <span className='py-4 px-5'>
                                <RiDeleteBin6Fill
                                    className='cursor-pointer icon-red text-lg'
                                    onClick={() => handleDeleteRow(row.id)}
                                />
                            </span>
                        </div>
                    ))}
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
                        <input type="text" value={totalDiscount} placeholder='Discount Amount' className='py-2 px-5 font-mont text-xs lg:text-sm rounded-md outline-none' />
                    </div>
                </div>
                {/* others */}
                <div className='sm:grid grid-cols-2 mb-3 sm:mb-2'>
                    <div></div>
                    <div className='bg-white/[0.47] py-2 px-5 sm:px-8 lg:px-16 xl:px-28 flex justify-between items-center'>
                        <span className='font-mont text-[8px] lg:text-xs font-medium'>Amount Paid</span>
                        <input type="text" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} placeholder='Amount Paid' className='py-2 px-5 font-mont text-xs lg:text-sm rounded-md outline-none' />
                    </div>
                </div>
                <div className='sm:grid grid-cols-2'>
                    <div></div>
                    <div className='bg-white/[0.47] py-2 px-5 sm:px-8 lg:px-16 xl:px-28 flex justify-between items-center'>
                        <span className='font-mont text-[8px] lg:text-xs font-semibold uppercase'>Payment Status</span>
                        <select name="name" onChange={handleStatus} className='py-2 px-9 font-mont text-xs lg:text-sm rounded-md gray-text outline-none'>
                            <option value={purchase.payment_status}>{purchase.payment_status}</option>
                            <option value="On Credit">On Credit</option>
                            <option value="Fully paid">Fully Paid</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* button */}
            <div className='flex justify-end'>
                <div className='black-bg mx-0.5 p-1 my-10 w-full sm:w-1/2 cursor-pointer' onClick={handleUpdatePurchase}>
                    <div className='border-receipt text-center py-3'>
                        <p className='text-white font-mont text-[11px] sm:text-base font-medium flex justify-center items-center'>{btn ? (<div className='loader-btn'></div>) : 'Save & Update'}</p>
                    </div>
                </div>
            </div>

            {/* alert model */}
            {
                alert && (
                    <div className='center-proceed'>
                        <div className="is-proceed"></div>
                        <div className="center-content-proceed">
                            <EditSuccess handleAlert={handleAlert} setClicked={setClicked} />
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default EditSales

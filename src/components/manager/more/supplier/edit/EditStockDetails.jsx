import axios from 'axios';
import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const EditStockDetails = ({ setClicked }) => {

  const list = JSON.parse(localStorage.getItem('ListOfStocks'))

  const [stockName, setStockName] = useState(list.stock_name)
  const [supplier, setSupplier] = useState(list.supplier_name)
  const [category, setCategory] = useState(list.category)
  const [quantity, setQUantity] = useState(list.quantity)
  const [sku, setSku] = useState(list.sku)
  const [date, setDate] = useState(list.date_of_purchase)
  const [price, setPrice] = useState(list.price)
  const [amountPaid, setAmountPaid] = useState(list.amount_paid)
  const [status, setStatus] = useState(list.payment_status)
  const [outstanding, setOutstanding] = useState(list.outstanding_balance)
  const [wholesaleActual, setWholesaleActual] = useState(list.wholesale_actual_price)
  const [retailActual, setRetailActual] = useState(list.retail_actual_price)
  const [wholesale, setWholesale] = useState(list.wholesale_price)
  const [wholesaleCap, setWholesaleCap] = useState(list.wholesale_cap_price)
  const [retail, setRetail] = useState(list.retail_price)
  const [retailCap, setRetailCap] = useState(list.retail_cap_price)
  const [lowStock, setLowStock] = useState(list.low_stock_threshold)
  const [outOfStock, setOutOfStock] = useState(list.out_of_stock_threshold)

  const [btn, setBtn] = useState(false)

  const handleStatus = (e) => {
    const selectedValue = e.target.value
    setStatus(selectedValue)
  }

  const stockId = list.id

  // header
  const accessToken = localStorage.getItem('access-token')
  const refreshToken = localStorage.getItem('refresh-token')

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  const handleUpdateStock = () => {
    setBtn(true)
    axios.put(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/stocks/${stockId}/`, {
      stock_name: stockName,
      supplier_name: supplier,
      sku: sku,
      quantity: quantity,
      category: category,
      price: price,
      payment_status: status,
      amount_paid: amountPaid,
      outstanding_balance: outstanding,
      wholesale_actual_price: wholesaleActual,
      wholesale_price: wholesale,
      wholesale_cap_price: wholesaleCap,
      retail_actual_price: retailActual,
      retail_price: retail,
      retail_cap_price: retailCap,
      date_of_purchase: date,
      low_stock_threshold: lowStock,
      out_of_stock_threshold: outOfStock
    }, { headers })
      .then(response => {
        console.log(response)
        toast.success('Updated Successfully')
        setBtn(false)
      }).catch(error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'Something went wrong, please try again'
        })
        setBtn(false)
      })
  }

  return (
    <div className='bg-color-full'>
      <ToastContainer />
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
          <p className='font-mont font-semibold text-lg sm:text-2xl'>Edit Stock Details</p>
          <p className='text-light-gray font-mont font-medium text-[10px] sm:text-xs mt-2'>Edit Product</p>
        </div>
        {/* info */}
        <div className='mt-7'>
          <div className='py-2 sm:py-6 grid grid-cols-1 sm:grid-cols-2'>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Stock Name</p>
              <input type="text" value={stockName} onChange={(e) => setStockName(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Supplier Name</p>
              <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Category</p>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Quantity</p>
              <input type="text" value={quantity} onChange={(e) => setQUantity(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>SKU</p>
              <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Date Of Purchase</p>
              <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Price</p>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Outstanding</p>
              <input type="text" value={outstanding} onChange={(e) => setOutstanding(e.target.value)} placeholder='Outstanding' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Amount Paid</p>
              <input type="text" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Outstanding</p>
              <input type="text" value={outstanding} onChange={(e) => setOutstanding(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Payment Status</p>
              <select name="paymentStatus" onChange={handleStatus} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4'>
                <option value="">{status}</option>
                <option value="On Credit">On Credit</option>
                <option value="Paid">Fully Paid</option>
              </select>
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Wholesale Actual Price</p>
              <input type="text" value={wholesaleActual} onChange={(e) => setWholesaleActual(e.target.value)} placeholder='Retail Price' className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Retail Actual Price</p>
              <input type="text" value={retailActual} onChange={(e) => setRetailActual(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
          </div>
          {/* prices */}
          <h1 className='font-mont font-semibold text-base sm:text-xl mb-3'>Selling Price</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 py-3'>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Wholesale Price</p>
              <input type="text" value={wholesale} onChange={(e) => setWholesale(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Wholesale Cap Price</p>
              <input type="text" value={wholesaleCap} onChange={(e) => setWholesaleCap(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Retail Price</p>
              <input type="text" value={retail} onChange={(e) => setRetail(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Retail Cap Price</p>
              <input type="text" value={retailCap} onChange={(e) => setRetailCap(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
          </div>
          {/* stock status */}
          <h1 className='font-mont font-semibold text-base sm:text-xl mb-3'>Stock Status Notification</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 py-3'>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Low Stock</p>
              <input type="text" value={lowStock} onChange={(e) => setLowStock(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
            {/* input */}
            <div className='mb-7'>
              <p className='mb-1 font-mont text-xs sm:text-sm font-medium'>Out of Stock</p>
              <input type="text" value={outOfStock} onChange={(e) => setOutOfStock(e.target.value)} className='bg-gray-view px-3 py-3 sm:py-2 rounded-lg font-mont text-xs sm:text-sm font-normal gray-text outline-none w-full sm:w-3/4' />
            </div>
          </div>
        </div>
        {/* button */}
        <div className='black-bg mt-8 text-center py-2.5 rounded-xl cursor-pointer' onClick={handleUpdateStock}>
          <button className='text-white text-sm font-mont font-medium'>
            {btn ? (<div className='loader-btn'></div>) : 'Save & Update'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditStockDetails

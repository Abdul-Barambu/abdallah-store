import React, { useEffect, useState } from 'react'
import { FaMoneyBills } from "react-icons/fa6";
import { RiArrowUpFill } from "react-icons/ri";
import { FaChartSimple } from "react-icons/fa6";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const Reports = ({ setClicked, handlePrint, button }) => {

  // pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const [email, setEmail] = useState('')
  const [chooseDate, setChooseDate] = useState('')
  const [sales, setSales] = useState('')
  const [profits, setProfits] = useState('')
  const [soldToday, setSoldToday] = useState([])
  const [loading, setLoading] = useState(false)
  const [btn, setBtn] = useState(false)

  const date = new Date()

  const currentDate = date.toISOString().split('T')[0]

  // header
  const accessToken = localStorage.getItem('access-token')
  const refreshToken = localStorage.getItem('refresh-token')

  const headers = {
    Authorization: `Bearer ${accessToken}`
  }

  const generatePDFReport = () => {
    const docDefinition = {
      content: [
        {
          text: `Daily Report (${currentDate})`,
          style: 'header',
        },
        {
          text: `Total Sales: ₦${Number(sales).toLocaleString()}.00`,
          style: 'subheader',
        },
        {
          text: `Total Profits: ₦${Number(profits).toLocaleString()}.00`,
          style: 'subheader',
        },
        {
          text: 'Products Sold Today',
          style: 'subheader',
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              [
                'Stock Name',
                'Type',
                'Qty/Unit Sold',
                'Price',
                'Date',
                'Payment Status',
              ],
              ...soldToday.map((product) => [
                product.stock_name,
                product.purchase_type,
                product.quantity,
                `₦${Number(product.total_price).toLocaleString()}.00`,
                product.purchased_at,
                product.status,
              ]),
            ],
          },
          layout: 'lightHorizontalLines',
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };

    return new Promise((resolve, reject) => {
      pdfMake.createPdf(docDefinition).getBlob((blob) => {
        if (blob) {
          resolve(blob); // Resolve with the Blob (PDF file)
        } else {
          reject('Error generating PDF');
        }
      });
    });
  };



  useEffect(() => {
    const dailySales = () => axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/daily-sales/", { headers })
      .then(response => {
        // console.log(response)
        setSales(response.data.total_sales)
      }).catch(error => {
        // console.log(error)
      })

    const dailyProfit = () => axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/daily-profits/", { headers })
      .then(response => {
        // console.log(response)
        setProfits(response.data.daily_total_profit)
      }).catch(error => {
        // console.log(error)
      })

    dailySales();
    dailyProfit();

  }, [])

  // stock sold today
  useEffect(() => {
    setLoading(true)
    axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/todays-purchases/", { headers })
      .then(response => {
        // console.log(response)
        setSoldToday(response.data.purchases)
        setLoading(false)
      }).catch(error => {
        // console.log(error)
        setLoading(false)
      })
  }, [])



  const handleSendEmailReport = async () => {
    setBtn(true);

    try {
      const pdfBlob = await generatePDFReport(); // Get the PDF as a Blob

      const formData = new FormData();
      formData.append('email', email); // Attach the recipient's email
      formData.append('message', 'Here is your daily report'); // The email body message
      formData.append('file', pdfBlob, `Report_${currentDate}.pdf`); // Attach the PDF file

      await axios.post('https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/inventory/send-email-report/', formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data', // Ensure the request is set to handle file uploads
        },
      });

      toast.success("Email sent successfully");
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Something went wrong, please try again',
      });
    } finally {
      setBtn(false);
    }
  };


  return (
    <div className='bg-color-full'>
      {/* <button
        className="black-bg text-white w-full sm:w-[17%] lg:w-[12%] text-sm font-mont font-semibold py-3 rounded-lg flex justify-center"
        onClick={generatePDFReport}
      >
        Download PDF Report
      </button> */}

      <ToastContainer />
      <div className='bg-white mt-4 rounded-xl py-5'>
        {/* text and cards */}
        <div className='text-center'>
          {/* text */}
          <div className='mb-9'>
            <h1 className='font-mont font-semibold text-base sm:text-2xl'>Daily Report ( {currentDate} )</h1>
          </div>
          {/* cards */}
          <div className='flex sm:flex-row flex-col justify-between items-center gap-5 mx-4 sm:mx-32 lg:mx-40 xl:mx-60'>
            {/* card */}
            <div className='flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-light-gray px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]'>
              <div>
                <div className='flex justify-center bg-light-gray p-2 rounded-xl w-10'>
                  <FaMoneyBills size={20} />
                </div>
                <p className='mt-3 font-medium font-mont sm:text-[10px] lg:text-sm xl:text-base'>Total Sales</p>
              </div>
              <div className='flex-grow bg-white px-5 py-5 rounded-3xl'>
                <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg'>₦{Number(sales).toLocaleString()}.00</p>
                <div className='flex flex-row items-center mt-4 px-1 sm:px-1 lg:px-2 sm:py-0 lg:py-1 increase'>
                  <RiArrowUpFill size={20} className='font-semibold green-text' />
                  <p className='font-semibold text-[13px] sm:text-[9px] lg:text-[10px] xl:text-xs green-text'>26%</p>
                </div>
              </div>
            </div>
            {/* card */}
            <div className='flex gap-6 sm:gap-4 lg:gap-5 xl:gap-10 bg-light-gray px-5 lg:px-8 py-6 rounded-3xl w-full h-[160px] sm:h-[150px] lg:h-[180px]'>
              <div>
                <div className='flex justify-center bg-light-gray p-2 rounded-xl w-10'>
                  <FaChartSimple size={20} />
                </div>
                <p className='mt-3 font-medium font-mont sm:text-[10px] lg:text-sm xl:text-base'>Total Profits</p>
              </div>
              <div className='flex-grow bg-white px-6 py-6 rounded-3xl'>
                <p className='font-mont font-semibold sm:text-[10px] lg:text-sm xl:text-lg'>₦{Number(profits).toLocaleString()}.00</p>
                <div className='flex flex-row items-center mt-4 px-1 sm:px-1 lg:px-2 sm:py-0 lg:py-1 increase'>
                  <RiArrowUpFill size={20} className='font-semibold green-text' />
                  <p className='font-semibold text-[13px] sm:text-[9px] lg:text-[10px] xl:text-xs green-text'>26%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* gray line */}
        <div className='w-full sm:w-[95%] h-8 mx-0 sm:mx-auto my-10' style={{ background: 'rgba(30, 30, 30, 0.38)' }}></div>
        {/* sales */}
        <div>
          <p className='mx-4 sm:ml-8 font-mont font-semibold text-sm sm:text-lg'>Products Sold Today</p>
          {/* list of products */}
          <div className={`${button ? '' : 'mt-3 sm:mt-6 mx-3 sm:mx-0 overflow-x-auto'}`}>
            {/* Wrapper for horizontal scroll */}
            <div className={`${button ? '' : 'min-w-[600px]'}`}>
              {/* Head */}
              <div className='grid grid-cols-6 bg-light-gray py-3 text-center mb-1'>
                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Stock Name</span>
                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Type</span>
                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Qty/Unit Sold</span>
                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Price</span>
                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Date</span>
                <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Payment Status</span>
              </div>

              {/* Data */}
              {
                loading ? (<div className='loader'></div>) : (
                  <div className={`${button ? '' : 'h-[500px] overflow-y-scroll'}`}>
                    {
                      soldToday.length > 0 ? (
                        soldToday.map((product) => (
                          <div key={product.id} className='grid grid-cols-6 my-0.5 text-center'>
                            <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>{product.stock_name}</span>
                            <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>{product.purchase_type}</span>
                            <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>{product.quantity}</span>
                            <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>₦{Number(product.total_price).toLocaleString()}.00</span>
                            <span className='bg-table text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium py-5 truncate'>{product.purchased_at}</span>
                            <div className='bg-table py-5'>
                              <span className={`text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium ${product.status === 'Fully Paid' ? 'fully-paid green-text' : 'on-credit icon-red'} truncate`}>{product.status}</span>
                            </div>
                          </div>
                        ))
                      ) : (<p className='font-mont text-center font-semibold mt-4'>No Record added</p>)
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
        {/* send email */}
        <div className={`mx-4 sm:mx-8 mt-10 ${button ? 'hidden' : 'block'}`}>
          <p className='font-mont font-semibold text-sm sm:text-lg'>Send Report via email</p>
          {/* email */}
          <div className='mt-3 flex flex-col sm:flex-row items-center gap-2'>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email here' className='bg-light-gray w-full sm:w-2/5 outline-none py-3 px-4 text-sm rounded-lg shadow border border-gray-300' />
            <button className="black-bg text-white w-full sm:w-[17%] lg:w-[12%] text-sm font-mont font-semibold py-3 rounded-lg flex justify-center" onClick={handleSendEmailReport}>{btn ? (<div className='loader-btn'></div>) : 'Send'}</button>
          </div>
        </div>

        {/* View Report */}
        {/* <div className={`mx-4 sm:mx-8 mt-14 ${button ? 'hidden' : 'block'}`}>
        <p className='font-mont font-semibold text-sm sm:text-lg'>View Report by date</p>
        <p className='font-mont font-medium text-xs sm:text-sm mt-3'>Choose date</p> */}
        {/* email */}
        {/* <div className='mt-1 flex flex-col gap-3'>
          <input type="date" value={chooseDate} onChange={(e) => setChooseDate(e.target.value)} className='bg-light-gray w-full sm:w-1/4 outline-none py-2 px-4 text-sm rounded-lg' />
          <button className="black-bg text-white w-full sm:w-[17%] lg:w-1/4 text-sm font-mont font-semibold py-3 rounded-lg">Apply</button>
        </div>
      </div> */}
        {/* download */}
        <div className={`mx-4 sm:mx-8 mt-16 mb-6 ${button ? 'hidden' : 'block'}`}>
          <p className='font-mont font-semibold text-sm underline cursor-pointer' onClick={handlePrint}>Download or print report</p>
        </div>
      </div>
    </div >
  )
}

export default Reports

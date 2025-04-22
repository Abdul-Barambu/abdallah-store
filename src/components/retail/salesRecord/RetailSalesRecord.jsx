import React, { useEffect, useState } from 'react'
// import { CiSearch } from "react-icons/ci";
import { IoEye } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri"
import axios from 'axios';
import Swal from 'sweetalert2';

const RetailSalesRecord = ({ setClicked }) => {
    const [searchValue, setSearchValue] = useState('');
    const [retailList, setRetailList] = useState([])
    const [loading, setLoading] = useState(false)


    // headers
    const Access = localStorage.getItem("access-token")
    const Refresh = localStorage.getItem("refresh-token")

    const headers = {
        Authorization: `Bearer ${Access}`
    }

    useEffect(() => {
        setLoading(true)
        axios.get("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/retail/purchase/", { headers })
            .then(response => {
                // console.log(response)
                setRetailList(response.data)
                setLoading(false)
            }).catch(error => {
                // console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Something went wrong, Please try again'
                })
            })
    }, [])

    // delete purchase
    const handleDeletePurchase = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Call the delete API after confirmation
                axios
                    .delete(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/retail/retail/delete_purchase/${id}/`, { headers })
                    .then((response) => {
                        // After successful deletion, update the state
                        setRetailList((prevPurchase) =>
                            prevPurchase.filter((purchase) => purchase.id !== id)
                        );

                        // Show success alert
                        Swal.fire({
                            title: "Deleted!",
                            text: "The Purchase record has been deleted.",
                            icon: "success",
                        });
                    })
                    .catch((error) => {
                        // Handle error and show error alert if deletion fails
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the expense.",
                            icon: "error",
                        });
                        setLoading(false)
                        // console.error("Error deleting expense:", error);
                    });
            }
        });
    };


    return (
        <div className='bg-color-dash mx-4 sm:mx-0'>
            {/* Top Section */}
            <div className='mt-5'>

                {/* Search Input */}
                {/* <div className='mt-8'>
                    <div className='relative flex items-center gap-2'>
                        {!searchValue && (
                            <CiSearch className='absolute left-24 sm:left-36 lg:left-40' size={15} />
                        )}
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className='font-mont font-medium w-full sm:w-[350px] lg:w-[400px] pl-10 pr-4 py-3 sm:py-2 bg-white rounded-xl outline-none text-center text-xs sm:text-base'
                        />
                        <div className='bg-white py-3 px-3 rounded-lg'>
                            <FaFilter className='text-sm' />
                        </div>
                    </div>
                </div> */}
            </div>

            {/* Table Section */}
            <div className='mt-6 overflow-x-auto'>
                {/* Wrapper for horizontal scroll */}
                <div className='min-w-[600px]'>
                    {/* Head */}
                    <div className='grid grid-cols-5 bg-white py-3 text-center mb-1'>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Product Name</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Date of Purchase</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Price</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Payment Status</span>
                        <span className='font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base'>Action</span>
                    </div>

                    {/* Data */}
                    {
                        loading ? (<div className='loader'></div>) : (
                            <div className='h-96 overflow-y-scroll'>
                                {
                                    retailList.length > 0 ? (
                                        retailList.map((list) => (
                                            <div key={list.id} className='grid grid-cols-5 my-0.5 text-center'>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>
                                                    {
                                                        list.items.map(item => (
                                                            <span key={item.stock_id} className='flex flex-col'>{item.stock_name}</span>
                                                        ))
                                                    }
                                                </span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'>{list.date_of_purchase}</span>
                                                <span className='bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate'> ₦{Number(list.total_price).toLocaleString()}.00</span>
                                                <div className='bg-white/[0.47] py-5'>
                                                    <span className={`text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium ${list.payment_status === 'Fully Paid' ? 'fully-paid green-text' : 'on-credit icon-red'} truncate`}>{list.payment_status}</span>
                                                </div>
                                                <div className='flex flex-row gap-4 justify-center items-center bg-white/[0.47]'>
                                                    <IoEye className='cursor-pointer' onClick={() => { setClicked("ViewRetailRecord"); localStorage.setItem("retail-list", JSON.stringify(list)) }} />
                                                    <MdEditSquare className='cursor-pointer icon-blue' onClick={() => { setClicked("EditRecord"); localStorage.setItem("edit-retail", JSON.stringify(list)) }} />
                                                    <RiDeleteBin6Fill className='cursor-pointer icon-red' onClick={() => handleDeletePurchase(list.id)} />
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
    )
}

export default RetailSalesRecord

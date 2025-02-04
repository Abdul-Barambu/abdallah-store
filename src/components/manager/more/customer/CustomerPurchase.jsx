import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoEye } from 'react-icons/io5';
import axios from 'axios';

const CustomerPurchase = ({ setClicked }) => {
    const [choose, setChoose] = useState('wholesalers');
    const [searchValue, setSearchValue] = useState('');
    const [wholesale, setWholesale] = useState([]);
    const [retail, setRetail] = useState([]);
    const [loading, setLoading] = useState(false);

    const filteredWholesale = wholesale.filter((list) =>
        list.buyer_name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const filteredRetail = retail.filter((list) =>
        list.payment_status.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Header
    const accessToken = localStorage.getItem('access-token');

    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                'https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/wholesale/wholesale-purchase-list',
                { headers }
            )
            .then((response) => {
                // console.log(response)
                setWholesale(response.data);
                setLoading(false);
            })
            .catch((error) => {
                // console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                'https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/retail/purchase/',
                { headers }
            )
            .then((response) => {
                // console.log(response)
                setRetail(response.data);
                setLoading(false);
            })
            .catch((error) => {
                // console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-color mx-4 sm:mx-0">
            {/* Choose */}
            <div className="mt-8 flex justify-center">
                <div className="bg-white gap-3 sm:gap-5 py-1 sm:py-2 px-1 sm:px-2 rounded-full flex">
                    <p
                        className={`font-mont text-xs sm:text-sm py-2.5 px-10 cursor-pointer ${choose === 'wholesalers' ? 'bg-light-gray border-choose-left font-medium' : ''
                            }`}
                        onClick={() => setChoose('wholesalers')}
                    >
                        Wholesalers
                    </p>
                    <p
                        className={`font-mont text-xs sm:text-sm py-2.5 px-10 cursor-pointer ${choose === 'retailers' ? 'bg-light-gray border-choose-right font-medium' : ''
                            }`}
                        onClick={() => setChoose('retailers')}
                    >
                        Retailers
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="mt-5 sm:flex justify-center">
                <div className="relative flex items-center gap-2">
                    {!searchValue && (
                        <CiSearch className="absolute left-24 sm:left-36 lg:left-40" size={15} />
                    )}
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="font-mont font-medium w-full sm:w-[350px] lg:w-[400px] pl-10 pr-4 py-3 sm:py-2 bg-white rounded-xl outline-none text-center text-xs sm:text-base"
                    />
                </div>
            </div>

            {/* Conditional Section */}
            {choose === 'wholesalers' && (
                <div className="mt-6 overflow-x-auto">
                    <div className="min-w-[600px]">
                        {/* Head */}
                        <div className="grid grid-cols-6 bg-white py-3 text-center mb-1">
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Wholesaler's Name
                            </span>
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Date of Purchase
                            </span>
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Description
                            </span>
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Price
                            </span>
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Payment Status
                            </span>
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Action
                            </span>
                        </div>

                        {/* Data */}
                        {loading ? (
                            <div className="loader"></div>
                        ) : (
                            <div className="h-96 overflow-y-scroll">
                                {
                                    wholesale.length > 0 ? (
                                        filteredWholesale.map((list) => (
                                            <div key={list.id} className="grid grid-cols-6 my-0.5 text-center">
                                                <span className="bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate">
                                                    {list.buyer_name}
                                                </span>
                                                <span className="bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate">
                                                    {list.date_of_purchase}
                                                </span>
                                                <span className="bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate">
                                                    {list.items.map((item, index) => (
                                                        <span key={index}>{item.stock_name}</span>
                                                    ))}
                                                </span>
                                                <span className="bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate">
                                                    ₦{Number(list.total_price).toLocaleString()}.00
                                                </span>
                                                <div className="bg-white/[0.47] py-5">
                                                    <span
                                                        className={`text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium ${list.payment_status === 'Fully Paid'
                                                            ? 'fully-paid green-text'
                                                            : 'on-credit icon-red'
                                                            } truncate`}
                                                    >
                                                        {list.payment_status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row gap-4 justify-center items-center bg-white/[0.47]">
                                                    <IoEye
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            setClicked('CustomerPurchaseReceipt');
                                                            localStorage.setItem('wholesalePurchases', JSON.stringify(list));
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    ) : (<p className='font-mont text-center font-semibold mt-4'>No Record added</p>)
                                }
                            </div>
                        )}
                    </div>
                </div>
            )}

            {choose === 'retailers' && (
                <div className="mt-6 overflow-x-auto">
                    <div className="min-w-[600px]">
                        {/* Head */}
                        <div className="grid grid-cols-5 bg-white py-3 text-center mb-1">
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Date of Purchase
                            </span>
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Description
                            </span>
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Price
                            </span>
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Payment Status
                            </span>
                            <span className="font-mont font-semibold text-[7px] sm:text-[10px] lg:text-sm xl:text-base">
                                Action
                            </span>
                        </div>

                        {/* Data */}
                        {loading ? (
                            <div className="loader"></div>
                        ) : (
                            <div className="h-96 overflow-y-scroll">
                                {
                                    retail.length > 0 ? (
                                        filteredRetail.map((list) => (
                                            <div key={list.id} className="grid grid-cols-5 my-0.5 text-center">
                                                <span className="bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate">
                                                    {list.date_of_purchase}
                                                </span>
                                                <span className="bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate">
                                                    {list.items.map((item, index) => (
                                                        <span key={index}>{item.stock_name}</span>
                                                    ))}
                                                </span>
                                                <span className="bg-white/[0.47] text-[8px] sm:text-[10px] lg:text-sm xl:text-base font-mont font-medium py-5 truncate">
                                                    ₦{Number(list.total_price).toLocaleString()}.00
                                                </span>
                                                <div className="bg-white/[0.47] py-5">
                                                    <span
                                                        className={`text-[8px] sm:text-[10px] lg:text-sm font-mont font-medium ${list.payment_status === 'Fully Paid'
                                                            ? 'fully-paid green-text'
                                                            : 'on-credit icon-red'
                                                            } truncate`}
                                                    >
                                                        {list.payment_status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row gap-4 justify-center items-center bg-white/[0.47]">
                                                    <IoEye
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            setClicked('CustomerRetailReceipt');
                                                            localStorage.setItem('RetailPurchases', JSON.stringify(list));
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    ) : (<p className='font-mont text-center font-semibold mt-4'>No Record added</p>)
                                }
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerPurchase;

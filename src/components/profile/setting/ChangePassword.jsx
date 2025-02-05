import axios from 'axios';
import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { toast, ToastContainer } from 'react-toastify';

const ChangePassword = ({ setClicked }) => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [btn, setBtn] = useState(false)

    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }


    const handleChangePassword = () => {
        setBtn(true)
        axios.post('https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/userauths/change-password/', {
            old_password: currentPassword,
            new_password: password,
            confirm_password: confirmPassword
        }, { headers })
            .then(response => {
                // console.log(response)
                toast.success('Password Changed Successfully')
                setBtn(false)
            }).catch(error => {
                // console.log(error)
                toast.error('Error occured, please try again')
                setBtn(false)
            })
    }

    return (
        <div className='bg-color-full'>
            <ToastContainer />
            {/* back */}
            <div
                className={`mt-4 mb-4 mx-4 sm:mx-0 flex items-center justify-center gap-3 bg-white w-28 py-3 sm:py-2 rounded-xl cursor-pointer`}
                onClick={() => setClicked('Settings')}
            >
                <GoArrowLeft className='text-xs sm:text-sm lg:text-xl' />
                <span className='font-mont font-medium text-xs sm:text-sm lg:text-base'>Back</span>
            </div>

            <div className='bg-white w-full sm:w-2/5 lg:w-1/3 mx-auto rounded-sm'>
                <div className='py-14 sm:py-10 px-5 sm:px-10'>
                    {/* texts */}
                    <div>
                        <p className='text-black font-mont font-semibold text-xl'>Change Password</p>
                    </div>
                    {/* fields */}
                    <div className='mt-7'>
                        <div>
                            <label className='text-black font-mont text-sm font-medium'>Current Password</label>
                            <input type="text" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder='Current Password' className='mt-1 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                        <div className='mt-5'>
                            <label className='text-black font-mont text-sm font-medium'>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='mt-1 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                        <div className='mt-5'>
                            <label className='text-black font-mont text-sm font-medium'>Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='mt-1 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                    </div>
                    {/* button */}
                    <div className='black-bg mt-8 text-center py-4 sm:py-3 rounded-xl cursor-pointer' onClick={handleChangePassword}>
                        <button className='text-white font-mont font-medium'>{btn ? (<div className='loader-btn'></div>) : 'Change Password'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword

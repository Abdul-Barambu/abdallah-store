import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const MyProfile = ({ setClicked }) => {

    const [name, setName] = useState(localStorage.getItem('full-name'))
    const email = localStorage.getItem('email')
    const [btn, setBtn] = useState(false)

    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }


    const handleUpdateProfile = () => {
        setBtn(true)
        axios.put(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/userauths/update-fullname/`, {
            full_name: name
        }, { headers })
            .then(response => {
                console.log(response)
                toast.success('Name updated successfully')
                setBtn(false)
            }).catch(error => {
                console.log(error)
                toast.error('Error occured, Please try again')
                setBtn(false)
            })
    }

    return (
        <div className='bg-color'>
            <ToastContainer />
            <div className='bg-white mt-14 pt-4 pb-7 px-5 sm:px-10 mx-0 sm:mx-20 h-screen sm:h-1/2'>
                <p className='mb-7 font-mont font-semibold'>My Profile</p>
                {/* inputs */}
                <div className='sm:grid grid-cols-2 gap-10'>
                    <div className='mb-10 sm:mb-0'>
                        <p className='mb-2 font-mont font-medium text-sm'>Name</p>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full px-5 font-mont text-sm font-medium bg-light-gray py-3 sm:py-2 rounded-lg' />
                    </div>
                    <div className='mb-14 sm:mb-0'>
                        <p className='mb-2 font-mont font-medium text-sm'>Email Address</p>
                        <input type="email" value={email} className='w-full px-5 font-mont text-sm font-medium bg-light-gray py-3 sm:py-2 rounded-lg' />
                    </div>
                    <div className='bg-black text-center text-white py-2 rounded-lg' onClick={handleUpdateProfile}>
                        <button className='font-mont font-medium text-sm'>{btn ? (<div className='loader-btn'></div>) : 'Update & Save'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile

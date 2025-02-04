import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Swal from 'sweetalert2'

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [btn, setBtn] = useState(false)
    const history = useHistory()

    const resetPasswordToken = localStorage.getItem('reset-password-token')
    const resetPasswordUid = localStorage.getItem('reset-password-uid')

    const handleResetPassword = () => {
        setBtn(true)
        axios.post(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/userauths/password-reset-confirm/${resetPasswordUid}/${resetPasswordToken}/`, {
            new_password: password,
            confirm_password: confirmPassword
        }).then(response => {
            // console.log(response)
            Swal.fire({
                icon: 'success',
                title: 'SUCCESS',
                text: 'Password reset successfully, Please proceed to login'
            }).then(() => {
                history.push('/')
            })
            setBtn(false)
        }).catch(error => {
            // console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Something went wrong, Please try again'
            })
            setBtn(false)
        })
    }

    return (
        <div className='bg-color sm:flex items-center justify-center'>
            <div className='bg-white w-full sm:w-3/5 rounded-sm'>
                <div className='py-40 sm:py-10 px-5 sm:px-20 lg:px-48'>
                    {/* texts */}
                    <div>
                        <p className='text-black font-mont font-medium text-4xl'>Reset Password</p>
                        <p className='text-light-gray font-mont font-medium pt-3 text-base'>Fill in the informations below</p>
                    </div>
                    {/* fields */}
                    <div className='mt-7'>
                        <div className='mt-3'>
                            <label className='text-black font-mont text-sm font-medium'>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='mt-1 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                        <div className='mt-3'>
                            <label className='text-black font-mont text-sm font-medium'>Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='mt-1 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                    </div>
                    {/* button */}
                    <div className='black-bg mt-8 text-center py-4 sm:py-3 rounded-xl cursor-pointer' onClick={handleResetPassword}>
                        <button className='text-white font-mont font-medium'>
                            {btn ? (<div className='loader-btn'></div>) : 'Reset'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword

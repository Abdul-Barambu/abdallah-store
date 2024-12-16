import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [btn, setBtn] = useState(false)

    const handleSendEmail = () => {
        setBtn(true)
        axios.post("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/userauths/password-reset/", {
            email: email
        }).then(response => {
            console.log(response)
            localStorage.setItem('reset-password-token', response.data.token)
            localStorage.setItem('reset-password-uid', response.data.uidb64)
            Swal.fire({
                icon: 'success',
                title: 'SUCCESS',
                text: 'A reset link has been sent to your email, follow the procedure to reset your password.'
            })
            setBtn(false)
        }).catch(error => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Email Not Found'
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
                        <p className='text-black font-mont font-medium text-3xl'>Forgot Password</p>
                        <p className='text-light-gray font-mont font-medium pt-3 text-sm'>Enter your email below</p>
                    </div>
                    {/* fields */}
                    <div className='mt-7'>
                        <div>
                            <label className='text-black font-mont font-medium'>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='mt-2 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                    </div>
                    {/* button */}
                    <div className='black-bg mt-8 text-center py-4 sm:py-3 rounded-xl cursor-pointer' onClick={handleSendEmail}>
                        <button className='text-white font-mont font-medium'>
                            {btn ? (<div className='loader-btn'></div>) : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

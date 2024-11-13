import React, { useState } from 'react'
import Swal from 'sweetalert2'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    
    const handleSendEmail = () => {
        Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: 'Reset password link has been sent to your email'
        })
    }

    return (
        <div className='bg-color flex items-center justify-center'>
            <div className='bg-white w-3/5 rounded-sm'>
                <div className='py-10 px-48'>
                    {/* texts */}
                    <div>
                        <p className='text-black font-mont font-medium text-3xl'>Forgot Password</p>
                        <p className='text-light-gray font-mont font-medium pt-3 text-sm'>Enter your email below</p>
                    </div>
                    {/* fields */}
                    <div className='mt-7'>
                        <div>
                            <label className='text-black font-mont font-medium'>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='mt-2 bg-light-gray w-full text-sm pl-5 py-2 font-mont rounded-xl outline-none' />
                        </div>
                    </div>
                    {/* button */}
                    <div className='black-bg mt-8 text-center py-2 rounded-xl cursor-pointer' onClick={handleSendEmail}>
                        <button className='text-white font-mont font-medium'>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

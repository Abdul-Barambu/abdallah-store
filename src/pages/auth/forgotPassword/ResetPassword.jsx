import React, { useState } from 'react'

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
                    <div className='black-bg mt-8 text-center py-4 sm:py-3 rounded-xl cursor-pointer'>
                        <button className='text-white font-mont font-medium'>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword

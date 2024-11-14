import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const handleForgotPassword = () => {
        history.push("/forgot-password")
    }

    return (
        <div className='bg-color sm:flex items-center justify-center'>
            <div className='bg-white w-full sm:w-3/5 rounded-sm'>
                <div className='py-40 sm:py-10 px-5 sm:px-20 lg:px-48'>
                    {/* texts */}
                    <div>
                        <p className='text-black font-mont font-medium text-4xl'>Login</p>
                        <p className='text-light-gray font-mont font-medium pt-3 text-base'>Log into your account</p>
                    </div>
                    {/* fields */}
                    <div className='mt-7'>
                        <div>
                            <label className='text-black font-mont font-medium'>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='mt-2 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                        <div className='mt-7'>
                            <label className='text-black font-mont font-medium'>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='mt-2 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                    </div>
                    {/* forgot password text */}
                    <div className='mt-3' onClick={handleForgotPassword}>
                        <p className='text-black font-mont font-semibold text-right cursor-pointer'>Forgot Password?</p>
                    </div>
                    {/* button */}
                    <div className='black-bg mt-8 text-center py-4 sm:py-3 rounded-xl cursor-pointer'>
                        <button className='text-white font-mont font-medium'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

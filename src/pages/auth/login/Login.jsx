import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [btn, setBtn] = useState(false)
    const history = useHistory()

    const handleForgotPassword = () => {
        history.push("/forgot-password")
    }

    const handleLogin = () => {
        setBtn(true)
        axios.post("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/userauths/login/", {
            email: email,
            password: password
        }).then(response => {
            // console.log(response)
            localStorage.setItem('access-token', response.data.access)
            localStorage.setItem('refresh-token', response.data.refresh)
            localStorage.setItem('full-name', response.data.full_name)
            localStorage.setItem('email', response.data.email)

            // roles
            if (response.data.role === 'manager') {
                history.push("/manager-dashboard")
            } else if (response.data.role === 'wholesaler') {
                history.push('wholesale-dashboard')
            } else if (response.data.role === 'retailer') {
                history.push('retail-dashboard')
            } else if (response.data.role === 'storekeeper') {
                history.push('store-dashboard')
            } else if (response.data.role === 'company') {
                history.push('company-dashboard')
            } else if (response.data.role === 'representative') {
                history.push('abdallah-dashboard')
            }else{
                console.log('Role not found')
            }

            setBtn(false)
        }).catch(error => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Invalid Email or Password'
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
                    <div className='black-bg mt-8 text-center py-4 sm:py-3 rounded-xl cursor-pointer' onClick={handleLogin}>
                        <button className='text-white font-mont font-medium'>
                            {btn ? (<div className='loader-btn'></div>) : 'Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

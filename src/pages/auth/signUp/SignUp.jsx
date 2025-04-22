import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')
    const [btn, setBtn] = useState(false) 

    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }

    useEffect(() => {

    }, [role])

    const handleResgisterUser = () => {
        setBtn(true)
        axios.post("https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/userauths/register/", {
            full_name: name,
            email: email,
            password: password,
            confirm_password: confirmPassword,
            role: role
        }).then(response => {
            // console.log(response)
            Swal.fire({
                icon: 'success',
                title: 'SUCCESS',
                text: 'Registration Successfully'
            })
            setBtn(false)
        }).catch(error => {
            // console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Something went wrong please try again'
            })
            setBtn(false)
        })
    }

    return (
        <div className='bg-color-full py-10'>
            <div className='bg-white w-full sm:w-3/5 mx-auto rounded-sm'>
                <div className='py-14 sm:py-10 px-5 sm:px-20 lg:px-48'>
                    {/* texts */}
                    <div>
                        <p className='text-black font-mont font-medium text-4xl'>Register</p>
                        <p className='text-light-gray font-mont font-medium pt-3 text-base'>Fill in the informations below</p>
                    </div>
                    {/* fields */}
                    <div className='mt-7'>
                        <div>
                            <label className='text-black font-mont text-sm font-medium'>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='mt-1 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                        <div className='mt-3'>
                            <label className='text-black font-mont text-sm font-medium'>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='mt-1 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                        <div className='mt-3'>
                            <label className='text-black font-mont text-sm font-medium'>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='mt-1 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                        <div className='mt-3'>
                            <label className='text-black font-mont text-sm font-medium'>Confirm Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='mt-1 bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont rounded-xl outline-none' />
                        </div>
                        {/* role */}
                        <div className='mt-7'>
                            <select name="role" onChange={handleRoleChange} className='bg-light-gray w-full text-sm pl-5 py-4 sm:py-3 font-mont font-medium rounded-xl outline-none'>
                                <option value="">----- Choose Role -----</option>
                                {/* <option value="manager">Manager</option> */}
                                <option value="wholesaler">Wholesale</option>
                                <option value="retailer">Retail</option>
                                <option value="storekeeper">Store</option>
                                <option value="representative">Representative</option>
                            </select>
                        </div>
                    </div>
                    {/* button */}
                    <div className='black-bg mt-8 text-center py-4 sm:py-3 rounded-xl cursor-pointer' onClick={handleResgisterUser}>
                        <button className='text-white font-mont font-medium'>
                            {btn ? (<div className='loader-btn'></div>) : 'Register'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp

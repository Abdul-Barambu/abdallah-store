import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCaretRight } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri"
import Swal from 'sweetalert2';

const Users = ({ setClicked }) => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    // header
    const accessToken = localStorage.getItem('access-token')
    const refreshToken = localStorage.getItem('refresh-token')

    const headers = {
        Authorization: `Bearer ${accessToken}`
    }

    useEffect(() => {
        setLoading(true)
        axios.get('https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/userauths/users/', { headers })
            .then(response => {
                // console.log(response)
                setUsers(response.data.users)
                setLoading(false)
            }).catch(error => {
                // console.log(error)
                setLoading(false)
            })
    }, [])

    // delete purchase
    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Call the delete API after confirmation
                axios
                    .delete(`https://aamsheiliagunicorn-sms-wsgi-application.onrender.com/userauths/delete-user/${id}/`, { headers })
                    .then((response) => {
                        // After successful deletion, update the state
                        setUsers((prevUser) =>
                            prevUser.filter((user) => user.id !== id)
                        );

                        // Show success alert
                        Swal.fire({
                            title: "Deleted!",
                            text: "This User record has been deleted.",
                            icon: "success",
                        });
                    })
                    .catch((error) => {
                        // Handle error and show error alert if deletion fails
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the expense.",
                            icon: "error",
                        });
                        // console.error("Error deleting expense:", error);
                    });
            }
        });
    };


    return (
        <div className='bg-color'>
            <div className='bg-white mt-14 pt-10 pb-7 px-5 sm:px-10 w-full sm:w-1/2 xl:w-2/5 mx-auto'>
                <p className='mb-7 font-mont font-semibold'>Users</p>
                {/* users */}
                <div className=''>
                    {
                        loading ? (<div className='loader'></div>) : (
                            users.map((user, index) => {
                                return (
                                    <div key={index} className='flex items-center justify-between mt-4 mb-10 sm:mb-0 w-full px-5 font-mont text-sm font-medium bg-light-gray py-3 sm:py-2.5 rounded-lg shadow'>
                                        <p className='font-mont font-medium text-sm'>{user.full_name}</p>
                                        <RiDeleteBin6Fill className='cursor-pointer icon-red' onClick={() => handleDeleteUser(user.id)} />
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Users
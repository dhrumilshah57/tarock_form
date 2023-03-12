import React from 'react'
import { useNavigate } from 'react-router-dom'
import './DropDownMenu.css'

function DropDownMenu() {

    const navigate = useNavigate()
    const logoutHandler = () => {
        localStorage.removeItem('auth')
        navigate("/", { replace: true })
    }


  return (
    <div className='flex flex-col dropDown dark:bg-[#21262D] dark:text-gray-500'>
        <ul className='flex flex-col gap-4'>
            <li><button onClick={logoutHandler} className='text-md w-full'>Logout</button></li>
        </ul>
    </div>
  )
}

export default DropDownMenu
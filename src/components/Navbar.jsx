import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <section className='flex flex-col'>
        <div className='flex flex-row bg-slate-300 p-[20px] justify-evenly'>
            <Link to="/">
                <p className='font-bold hover:underline text-[20px] '>All Courses</p>
            </Link>
            <Link to="/dashboard">
                <p className='font-bold hover:underline text-[20px] '>Dashboard</p>
            </Link>
        </div>
    
    </section>
  )
}

export default Navbar

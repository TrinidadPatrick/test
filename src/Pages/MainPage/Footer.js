import React from 'react'
import logo from "../../Utilities/Logo/Logo1.png"
import Facebook from '../MainPage/Components/FooterIMG/square-facebook.svg'
import Twitter from '../MainPage/Components/FooterIMG/square-x-twitter.svg'
import Instagram from '../MainPage/Components/FooterIMG/square-instagram.svg'
import MapIcon from '@mui/icons-material/Map';
import ContactsIcon from '@mui/icons-material/Contacts';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom'


const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <footer>
        {/* Main Section */}
        <div className='w-full h-full  flex flex-col items-start space-y-5 px-4 sm:px-0 lg:mx-0 lg:flex-row lg:justify-between lg:space-x-20 mt-5'>
            {/* Section 1 */}
            <section className=' w-56 p-1 text-left'>
                <img className='w-52' src={logo} />
                <p className='mt-4 text-[0.8rem] text-white font-medium'>Kanoah Service Finder is your trusted resources for discovering  and connecting with
                    a wide range of professional services.
                </p>
                <div className='flex space-x-5 mt-5'>
                    <img className='w-9 h-9 ' src={Facebook} />
                    <img className='w-9' src={Twitter} />
                    <img className='w-9' src={Instagram} />
                </div>
            </section>
            {/* Section 2 */}
            <section className=' flex flex-col space-y-5 w-56 p-1 text-left'>
                <h1 className='text-2xl text-white font-semibold'>Contact us</h1>
                <div className='flex text-white space-x-2'>
                    <MapIcon />
                <p className='text-white text-[0.8rem] '>San Bernardo St. Brgy Darasa Tanauan City, Batangas</p>
                </div>
                <div className='flex space-x-2'>
                <ContactsIcon className='text-white' />
                <p className='text-white text-[0.8rem]'>09914138519</p>
                </div>
                <div className='flex space-x-2'>
                    <EmailIcon className='text-white'/>
                <p className='text-white text-[0.8rem]'>KanoahSF@gmail.com</p>
                </div>
                
                
            </section>
            {/* Section 3 */}
            <section className=' p-1 text-left flex flex-col space-y-5'>
            <h1 className='text-2xl text-white font-semibold'>Useful Links</h1>
            <Link className='text-white text-[0.8rem] hover:underline' to="#" >About us</Link>
            <Link className='text-white text-[0.8rem] hover:underline' to="#" >Contact us</Link>
            <Link className='text-white text-[0.8rem] hover:underline' to="#" >Sign in</Link>
            <Link className='text-white text-[0.8rem] hover:underline' to="#" >Explore</Link>
                
            </section>
            {/* Section 4 */}
            <section className=' p-1 text-left flex flex-col space-y-5'>
            <h1 className='text-2xl text-white font-semibold'>Categories</h1> 
            <Link className='text-white text-[0.8rem] hover:underline' to="#" >Carwash</Link>
            <Link className='text-white text-[0.8rem] hover:underline' to="#" >Cleaning</Link>
            <Link className='text-white text-[0.8rem] hover:underline' to="#" >Plumbing</Link>
            <Link className='text-white text-[0.8rem] hover:underline' to="#" >Appliance</Link>
            <Link className='text-white text-[0.8rem] hover:underline' to="#" >Transportation</Link>
            </section>
        </div>

        <hr className='mt-3'></hr>
        {/* Copyright Section */}
        <div className='w-full h-full '>
        <p className='text-white mt-5'>Copyright &copy; All rights reserved {year}</p>
        </div>

    </footer>
  )
}

export default Footer
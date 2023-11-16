import React from 'react'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import http from '../../http';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Gallery from './Gallery';

const ServiceSettings = () => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [selectedSettings, setSelectedSettings] = useState(null)

    // Handle the selected settings options
    const handleSelectSettings = (value) => {
        localStorage.setItem('serviceSettings', value)
        window.location.reload()
    }

    // Get the selected settings from localstorage
    useEffect(() => {
      const selectedSettings = localStorage.getItem('serviceSettings')
      setSelectedSettings(selectedSettings)
    }, [])

    // check if user is logged In
    useEffect(()=>{
      const jwtToken = localStorage.getItem('token')
      
      if(jwtToken == undefined){
        navigate('/')
      }
      else{
        const userId = jwtDecode(jwtToken)._id
        http.get(`getUser/${userId}`).then((res)=>{
        if(res.data == null || res.data == undefined)
        {
          navigate('/')
        }
        else
        {
          setLoading(false)
        }
      }).catch((err)=>{
        console.log(err)
      })
      }
    },[])

  //  Log the user out
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (

        <div className='w-full h-screen'>
      {
        loading ? ("") :
        (
          // Main Container
    <div className='flex w-full'>
    {/* Left section */}
    <section className='w-[370px] h-screen bg-white hidden md:flex flex-col'>
    <div className='border-l-4 ps-2 ml-5 border-l-themeBlue mt-24'>
    <h1 className='text-3xl font-bold text-themeBlue '>Service Setting</h1>
    <p className='text-[0.79rem]'>Manage or edit your service here</p>
    </div>

    {/* Options */}
    <div className='flex flex-col items-start mt-10 space-y-6'>
    <div onClick={()=>{handleSelectSettings('MyService')}} className={`${selectedSettings == "MyService" ? "text-blue-800 bg-blue-100 border-r-4 border-r-blue-800 font-semibold" : ""} flex items-center space-x-2 hover:bg-blue-300 w-full py-4 px-5 cursor-pointer`}><PersonOutlinedIcon /><Link to="" className={`${selectedSettings == "MyService" ? "text-blue-800" : "text-gray-800"}`}>My Service</Link></div>
    <div onClick={()=>{handleSelectSettings('Bookings')}} className={`${selectedSettings == "Bookings" ? "text-blue-800 bg-blue-100 border-r-4 border-r-blue-800 font-semibold" : ""} flex items-center space-x-2 hover:bg-blue-300 w-full py-4 px-5 cursor-pointer`}><BookOnlineOutlinedIcon /><Link to="" className={`${selectedSettings == "Bookings" ? "text-blue-800" : "text-gray-800"}`}>Bookings</Link></div>
    <div onClick={()=>{handleSelectSettings('Booking History')}} className={`${selectedSettings == "Booking History" ? "text-blue-800 bg-blue-100 border-r-4 border-r-blue-800 font-semibold" : ""} flex items-center space-x-2 hover:bg-blue-300 w-full py-4 px-5 cursor-pointer`}><UpdateOutlinedIcon /><Link to="" className={`${selectedSettings == "Booking History" ? "text-blue-800" : "text-gray-800"}`}>Booking History</Link></div>
    <div onClick={()=>{handleSelectSettings('Gallery')}} className={`${selectedSettings == "Gallery" ? "text-blue-800 bg-blue-100 border-r-4 border-r-blue-800 font-semibold" : ""} flex items-center space-x-2 hover:bg-blue-300 w-full py-4 px-5 cursor-pointer`}><FavoriteOutlinedIcon /><Link to="" className={`${selectedSettings == "Gallery" ? "text-blue-800" : "text-gray-800"}`}>Gallery    </Link></div>
    
    </div>

    </section>


    {/* Right section */}
    <section className='w-full h-screen'>
    {selectedSettings == "Gallery" ? <Gallery /> : ""}
    </section>
    </div>
        )
      }
    
    </div>

  )
}

export default ServiceSettings
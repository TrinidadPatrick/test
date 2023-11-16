import React from 'react'
import Rating from '@mui/material/Rating';
import pic1 from './img/pic1.jpg'
import pic2 from './img/pic2.jpg'
import pic3 from './img/pic3.avif'
import pic4 from './img/pic4.jpg'
import pic5 from './img/pic5.jpg'
import pic6 from './img/pic6.jpg'
import profile from './img/Profile3.jpg'
import { styled } from '@mui/material/styles';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css'
import { useState, useEffect, useCallback, useRef } from 'react';
import 'react-gallery-carousel/dist/index.css';
import { FaInstagram, FaMapLocation, FaPhone, FaRegEnvelope, FaSquareFacebook } from 'react-icons/fa6';
import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Description from './Components/Description';
import Reviews from './Components/Reviews';
import { galleryImage } from './Components/ForGallery';
import ResponsiveGallery from 'react-responsive-gallery';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Footer from '../MainPage/Footer';




const ViewService = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = useState('Description')
  const [currentDay, setCurrentDay] = useState('')
  const schedule = [{day: "Monday", "startTime" : "9:00 AM", endTime : "8:00 PM"},
  {day: "Tuesday", "startTime" : "9:00 AM", "endTime" : "8:00 PM"},
  {day: "Wednesday", "startTime" : "9:00 AM", "endTime" : "8:00 PM"},
  {day: "Thursday", "startTime" : "9:00 AM", "endTime" : "8:00 PM"},
  {day: "Friday", "startTime" : "9:00 AM", "endTime" : "8:00 PM"},
  {day: "Saturday", "startTime" : "9:00 AM", "endTime" : "8:00 PM"},
  {day: "Sunday", "startTime" : "9:00 AM", "endTime" : "8:00 PM"}]

  const [description, setDescription] = useState(null)
  const [location, setLocation] = useState({
    longitude : null,
    latitude : null
  })

  // Images for gallery
  const images = [
    {
      original : pic1,
      thumbnail : pic1,
      originalClass: 'image-gallery-original', // Apply the custom CSS class for original image
      thumbnailClass: 'image-gallery-thumbnail', // Apply the custom CSS class for thumbnails
      
    },
    {
      original : pic2,
      thumbnail : pic2,
      originalClass: 'image-gallery-original', // Apply the custom CSS class for original image
    thumbnailClass: 'image-gallery-thumbnail', // Apply the custom CSS class for thumbnails
    },
    {
      original : pic3,
      thumbnail : pic3,
      originalClass: 'image-gallery-original', // Apply the custom CSS class for original image
    thumbnailClass: 'image-gallery-thumbnail', // Apply the custom CSS class for thumbnails
    },
    {
      original : pic4,
      thumbnail : pic4,
      originalClass: 'image-gallery-original', // Apply the custom CSS class for original image
    thumbnailClass: 'image-gallery-thumbnail', // Apply the custom CSS class for thumbnails
    },
    {
      original : pic5,
      thumbnail : pic5,
      originalClass: 'image-gallery-original', // Apply the custom CSS class for original image
    thumbnailClass: 'image-gallery-thumbnail', // Apply the custom CSS class for thumbnails
    },
    {
      original : pic6,
      thumbnail : pic6,
      originalClass: 'image-gallery-original', // Apply the custom CSS class for original image
    thumbnailClass: 'image-gallery-thumbnail', // Apply the custom CSS class for thumbnails
    },
  ]

  // Rating stars
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ffa534',
      fontSize: "medium"
    },
    '& .MuiRating-iconHover': {
      color: '#ffa534',
      
    },
    '& .MuiRating-iconEmpty': {
      color: '#ffa534',
      fontSize: "large"
      
    },

  });

  // For map location
  const [viewport, setViewPort] = useState({    
    width: "100%",
    height: "100%",
    zoom : 16
  })

  // Get my location
  useEffect(() => {
    // Use the Geolocation API to get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          
        },
        (error) => {
          // Handle any errors here
          console.error('Geolocation error:', error);
        }
      );
    } else {
      // Geolocation is not available in this browser
      console.error('Geolocation is not available.');
    }
  }, []);

  // convert long lat to place name
  const getPlaceNameFromLatLng = async () => {
    // Construct the MapQuest Geocoding API URL for reverse geocoding
    const geocodingUrl = `http://www.mapquestapi.com/geocoding/v1/reverse?key=znl7fsvPy4mHHjWLGW6ULUo6bOzXgwFz&location=${location.latitude},${location.longitude}`;
  
    // Make an HTTP GET request to the API
    await fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results[0] && data.results[0].locations) {
          const location = data.results[0].locations[0];
          const street = location.adminArea6
          const city = location.adminArea5
          const province = location.adminArea4
        } else {
          console.error('Geocoding failed. Check the API response.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // convert long lat to place name
  useEffect(()=>{
    if(location.longitude == null && location.latitude == null){
      
    }else{
      getPlaceNameFromLatLng()
    }
    
  },[location])

  // Get current Day name
  useEffect(()=>{
    const currentDate = new Date()
    const currentDay = currentDate.getDay()
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setCurrentDay(daysOfWeek[currentDay])
  },[])

  

  return (
    <>
    <div className='w-full h-full bg-[#f7f7f7] md:px-12 lg:px-20 xl:px-32 pb-10 pt-20 flex flex-col'>
        {/* Top Layer *******************************************************************/}
        <section className='w-full  h-fit flex flex-col xl:flex-row justify-between p-2 gap-1 mt-5' >

        {/* Left Side ********************************************************************/}
        <div className='w-full bg-white shadow-sm xl:w-[60%] rounded-lg h-fit  flex flex-col p-2 space-y-3'>
        {/* Header ********************************************************************/}
        <div className='flex justify-between w-full mx-auto'>
        {/* Title and rating */}
        <div className=''>
        <div className='flex justify-between'><span className='text-3xl font-semibold'>R & Next Carwash</span></div>
        {/* Ratings ********************************************************************/}
        <div className='flex  relative ml-0 space-x-1 justify-between items-center mt-5 w-full'>
        <div className='flex space-x-2'>
        <StyledRating className='relative left-[0.1rem]'  readOnly defaultValue={4.1} precision={0.1} icon={<StarRoundedIcon fontSize='medium' />  } emptyIcon={<StarRoundedIcon fontSize='medium' className='text-gray-300' />} />
        <div className='flex items-center space-x-2'>
        <p className='text-gray-400 text-sm font-medium'>(4)</p> 
        <p className='text-gray-300'>|</p>
        <p className='text-gray-700 text-sm pt-[2.5px] font-medium'>{"77 Reviews"}</p> 
        </div>
        </div>
        </div>
        </div>
        {/* Buttons */}
        <div className='flex flex-col space-y-2 '>
        <button className='text-lg font-semibold bg-green-500 h-full text-white w-36 rounded-[0.150rem]'>Chat now</button>
        <button className='text-lg font-semibold bg-themeOrange h-full text-white w-36 rounded-[0.150rem]'>Book Service</button>
        </div>
        </div>

        {/* Image Gallery Container */}
        <div className='w-full h-[fit]  flex items-center justify-center '>
        <div className='w-full relative z-10'>
          <ImageGallery 
          autoPlay={true} 
          slideDuration={500} 
          slideInterval={6000} 
          showFullscreenButton={false} 
          showPlayButton={false} 
          items={images}
          
          />
          </div>
        
        {/* <Carousel hasThumbnails={false} shouldLazyLoad={true} hasTransition={true} hasIndexBoard={false } playIcon={false} thumbnailHeight="80px" thumbnailClass="tmb" thumbnailWidth='150px'  images={images} style={{ height: "", width: "80%", display: "flex" }} /> */}
        </div>
        </div>


        {/* ************************************************************************************************************************************************************* */}
        {/* Right Side */}
        <div className='w-full xl:w-[450px] h-fit col-span-2 md:col-span-1 shadow-sm rounded-lg bg-white p-2 flex flex-col space-y-4'>
        {/* Header */}
        <div className='flex  bg-gray-100 p-2'>
        {/* Img container */}
        <div className='w-[100px] min-w-[100px]  flex justify-center items-center'>
        <img className='w-20 h-20 rounded-full object-cover' src={profile} />
        </div>
        {/* Personal Information */}
        <div className=' w-full  p-1 flex flex-col space-y-2 px-2'>
        <p className='flex items-center justify-start gap-2 text-gray-700'><AccountCircleOutlinedIcon fontSize="medium" className='text-gray-500 ' />John Patrick C. Trinidad</p>
        <p className='flex items-center justify-start gap-2 text-gray-700'><EmailOutlinedIcon fontSize="medium" className='text-gray-500 ' />Ptrinidad765@gmail.com</p>
        <p className='flex items-center justify-start gap-2 text-gray-700'><CallOutlinedIcon fontSize="medium" className='text-gray-500 ' />+63 991 413 8519</p>
        </div>
        </div>
        {/* Business Information */}
        <div className=' p-1'>
          <h1 className='text-xl font-semibold mb-3'>Service Contact</h1>
          {/* Accounts and social media */}
          <div className='flex flex-col space-y-3'>
          <p className=' tracking-wide text-sm flex items-center gap-2'><FaPhone className='text-gray-500' fontSize={15} /> 555-3327/09673143709</p>
          <p className=' tracking-wide text-sm flex items-center gap-2'><FaRegEnvelope className='text-gray-500' fontSize={20} /> KanoahSF@gmail.com</p>
          <p className=' tracking-wide text-sm flex items-center gap-2 text-blue-500 underline'><FaSquareFacebook className='text-gray-500' fontSize={20}  /> www.facebook.com/34124/asq3e</p>
          <p className=' tracking-wide text-sm flex items-center gap-2 text-blue-500 underline'><FaInstagram className='text-gray-500' fontSize={20}   /> www.instagram.com/341/asghtrq3e</p>
          </div>
          {/* Information */}
          <h1 className='text-xl font-semibold mb-3 mt-3'>Service Information</h1>
          {/* Payment methods */}
          <p className='font-medium'>Payment methods</p>
          <div className='flex mt-2 mb-2'>
          <p className='w-20 text-gray-700 bg-gray-50 border shadow-sm py-1 rounded-sm font-semibold mx-1 disabled cursor-text flex justify-center items-center gap-2 text-sm'>Paypal</p>
          <p className='w-20 text-gray-700 bg-gray-50 border shadow-sm py-1 rounded-sm font-semibold mx-1 disabled cursor-text flex justify-center items-center gap-2 text-sm'>Gcash</p>
          <p className='w-20 text-gray-700 bg-gray-50 border shadow-sm py-1 rounded-sm font-semibold mx-1 disabled cursor-text flex justify-center items-center gap-2 text-sm'>Cash</p>
          </div>

          <p className='font-medium'>Service Options</p>
          <div className='flex my-2'>
          <p className='w-32 text-gray-700 bg-gray-50 border shadow-sm py-1 rounded-sm font-semibold mx-1 disabled cursor-text flex justify-center items-center gap-2 text-sm'>Home Service</p>
          <p className='w-20 text-gray-700 bg-gray-50 border shadow-sm py-1 rounded-sm font-semibold mx-1 disabled cursor-text flex justify-center items-center gap-2 text-sm'>Walk in</p>
          </div>
          {/* Location */}
          <div className='flex flex-col  h-fit' style={{ position: 'relative' }}>
          <p className='text-start font-medium'>Location</p>
          <div className='flex items-center gap-2 text-gray-700 font-semibold'>
          <FaMapLocation className='text-black' />
            <a className=' cursor-pointer' onClick={()=>{window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_black');}}>B. Leviste Street Poblacion Malvar Batangas</a>
          </div>
          <ReactMapGL
          onClick={()=>{window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_black')}}
            draggable={false}
            onMove={evt => setViewPort(evt.viewport)}
            mapboxAccessToken="pk.eyJ1IjoicGF0cmljazAyMSIsImEiOiJjbG8ybWJhb2MwMmR4MnFyeWRjMWtuZDVwIn0.mJug0iHxD8aq8ZdT29B-fg"
            mapStyle="mapbox://styles/patrick021/clo2m5s7f006a01rf9mtv318u"
            style={{
              width: "250px",
              height: "150px",
              // position: "relative",
              borderRadius: "10px",
              marginBottom: "7px",
              top: "10px", // Use top instead of marginTop
              transition: "width 0.5s, height 0.5s, top 0.5s",
            }}
            {...viewport}
            latitude={location.latitude}
            longitude={location.longitude}
            >
            <Marker
            latitude={location.latitude}
            longitude={location.longitude}
            draggable={false}
            onDrag={evt => setLocation({longitude : evt.lngLat.lng, latitude : evt.lngLat.lat})}
            >
        
            </Marker>
            <GeolocateControl />
          </ReactMapGL>
        </div>
        </div>
        </div>

        </section>

        {/* Description reviews and services */}
        <section className='w-full   mt-10 p-2'>
          {/* Main Container */}
          <div className='misc_container bg-white rounded-md overflow-hidden'>
          {/* Buttons container */}
          <div className=' flex'>
            {/* Description Button */}
            <div className='border border-r-0 rounded-ss-md'>
            <button onClick={()=>{setSelectedOptions("Description")}} className='  px-10 py-3 flex items-center justify-center gap-1'><DescriptionOutlinedIcon /> Description</button>
            <div id="descriptionBtn" className={`${selectedOptions == "Description" ? "active" : ""} slidingBorder`}></div>
            </div>
            {/* Reviews Button */}
            <div className='border border-r-0'>
            <button  onClick={()=>{setSelectedOptions("Reviews")}} className=' px-10 py-3 flex items-center justify-center gap-1'><ReviewsOutlinedIcon /> Reviews</button>
            <div id="reviewsBtn" className={`${selectedOptions == "Reviews" ? "active" : ""} slidingBorder`}></div>
            </div>
            {/* Service Button */}
            <div className='border border-r-0'>
            <button onClick={()=>{setSelectedOptions("Services")}} className=' px-10 py-3 flex items-center justify-center gap-1'><MiscellaneousServicesOutlinedIcon /> Services</button>
            <div id="serviceBtn" className={`${selectedOptions == "Services" ? "active" : ""} slidingBorder`}></div>
            </div>
            
            <button className='border w-full'></button>
          </div>
          {/* Description container */}
          <article className='w-full py-2 px-5'>
          {selectedOptions == "Description" ? (<Description />) : selectedOptions == "Reviews" ? (<Reviews />) : ""}
          
          </article>
          </div>
        </section>
        
        {/* Schedule or business hours */}
        <section className='w-full   mt-10 p-2'>
          {/* Schedule container */}
        <article className='w-full mt-5'>
          <div className='misc_container py-2 px-5 bg-white rounded-md'>
          <h1 className='text-3xl font-semibold mt-4 mb-5'>Service Schedule</h1>
          <div className='grid grid-cols-5 gap-5 py-1 w-full'>
          {
            schedule.map((sched, index)=>{
              return(
                <div key={index} className={`sched_container ${sched.day == currentDay ? "border-2 border-blue-500" : ""} w-full flex flex-col justify-center items-center py-9 rounded-md`}>
                <CalendarMonthOutlinedIcon />
                <h1 className='text-xl font-semibold'>{sched.day}</h1>
                <div className='flex mt-2'>
                <div className='flex items-center space-x-1  px-2'><p className='text-lg font-normal text-gray-700'>{sched.startTime}</p></div>
                -
                <div className='flex items-center space-x-1  px-2'><p className='text-lg font-normal text-gray-700'>{sched.endTime}</p></div>
                </div>
                </div>
              )
            })
          }
          </div>
          </div>
          </article>
        </section>
        
        {/* Gallery */}
        <section className='w-full   mt-10 p-2'>
        <div className=' w-full max-h-[550px] bg-white rounded-lg h-[550px] border-2 px-6 relative'>
        <h1 className='text-4xl text-center font-semibold mt-0 bg-white p-4 sticky top-0 z-10'>Gallery</h1>
        <div className='galleryContainer bg-white mb-2 max-h-[460px] overflow-auto'>
        <ResponsiveGallery mediaStyle={{borderRadius : "5px"}} key={galleryImage} onClick={()=>{setOpen(true)}} mediaMaxWidth={{xxl: 100}} colsPadding={{xs:2,s:2,m:2,l:2, xl:2,xxl:2}} useLightBox={false} numOfMediaPerRow={{xs:1,s: 2,m:3, l: 3, xl:4 ,xxl : 4}} media={galleryImage} />
        </div>
        <Lightbox
        plugins={[Download,Fullscreen]}
        open={open}
        close={() => setOpen(false)}
        slides={galleryImage}
      />
      </div>
      </section>
       
    
    </div>

<footer className='w-full pb-10 bg-[#071B22] py-[1rem] sm:px-10 md:px-16 lg:px-36'>
<Footer />
</footer>
</>
  )
}

export default ViewService
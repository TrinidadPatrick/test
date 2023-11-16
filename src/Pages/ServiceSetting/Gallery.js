import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ResponsiveGallery from 'react-responsive-gallery';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { galleryImage } from '../ViewService/Components/ForGallery';


const Gallery = () => {
const galleryCount = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,29,20,21,22,23,24,25,26]

const CustomMedia = ({ index, media, margin, direction, top, left, onClick, customProps }) => (
    <div
      key={index}
      onClick={() => onClick(index)}
      style={{ margin, direction, top, left, position: 'relative' }}
      {...customProps}
    >
      <img {...media} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} />
      <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'rgba(0, 0, 0, 0.5)', padding: '8px', color: 'black', borderRadius: '0 0 5px 5px', textAlign: 'center' }}>
        Your Text Here
      </div>
    </div>
  );
  


  return (
    <div className='w-full bg-white h-full pt-20 flex flex-col p-5'>
    {/* Top Part */}
    <header className='text-center w-full'>
        <h1 className='text-3xl font-semibold'>Gallery</h1>
    </header>
    {/* Navigation */}
    <nav className='w-fullh-fit'>
        <ul className='flex'>
        {/* Search Field */}
        <li>
        <div className=" relative mx-auto text-gray-600">
        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search"/>
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-2 flex">
        <SearchOutlinedIcon />
        </button>
        </div>
        </li>
        {/* Upload Button */}
        <li className='ml-3'>
        <label htmlFor="fileInput" className={` bg-blue-500 h-full shadow-md flex items-center relative px-4 text-white font-medium text-center rounded cursor-pointer`}>
        Upload Image
        <input type="file" multiple accept="image/*" id="fileInput" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
        </label>
        </li>
        
        </ul>
    </nav>

    {/* Gallery Container */}
    <section className='w-full h-full border-2 mt-5 flex justify-center  p-1 max-h-full overflow-auto'>
    {/* Image Container */}
    <ResponsiveGallery
      CustomMedia={CustomMedia}
      mediaStyle={{ borderRadius: '5px', height: '150px', padding: '3px', backgroundColor: 'white', width: '200px', objectFit: 'contain', border: '2px solid lightGray', margin: '5px' }}
      mediaMaxWidth={{ xxl: 100 }}
      colsPadding={{ xs: 2, s: 2, m: 2, l: 2, xl: 2, xxl: 2 }}
      useLightBox={false}
      numOfMediaPerRow={{ xs: 1, s: 2, m: 3, l: 3, xl: 4, xxl: 5 }}
      media={galleryImage.map((image, index) => ({
        key: index,
        src: image.src,
        alt: `gallery-image-${index}`,
      }))}
    />

    </section>
    
    </div>
  )
}

export default Gallery
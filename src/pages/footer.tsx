import React from 'react'
import Link from 'next/link'

function Foot() {
  return (
    <div className='flex flex-col md:flex-row m-[20px] md:justify-between justify-center items-center '>
        <div className='flex flex-col justify-center items-center rounded-xl bg-slate-600/70  p-[16px] m-[20px] w-[240px] h-[200px]'>
            <div className="text-white font-semibold">WEB ADMINISTRATOR</div>
            <img
                src="/sir.jpeg"
                alt="Founder"
                className="rounded-full w-24 h-24 object-cover"
              />
             <p className="text-white font-medium m-[5px]">Saleem Mohammad</p>
             <p className="text-white font-medium m-[1px]">NIT MANIPUR ALUMNI </p>
             <p className="text-white font-medium m-[1px]">(Works at NIT HAMIRPUR)</p>
      </div>
       <div className='flex flex-col justify-center items-center rounded-xl bg-slate-600/70 p-[16px] m-[20px] w-[240px]  h-[200px]'>
            <div className="text-white font-semibold">SOCIAL MEDIA LINKS</div>
            <div className='flex flex-row m-[20px] '>
              <Link href="https://www.facebook.com/share/1AkZ1tK7b4/?mibextid=qi2Omg" target="_blank"><img
                src="/f-removebg-preview.png"
                alt="Founder"
                className="rounded-full w-12 h-12 object-cover "
              /> </Link>
               <Link href="https://www.instagram.com/rising_stars_of_lohar?igsh=YnozdjkybGlxZ3dq" target="_blank" ><img
                src="/insta-removebg-preview.png"
                alt="Founder"
                className=" w-12 h-9 object-fit mt-[6px]"
              /> </Link></div>
      </div>
       <div className='flex flex-col justify-center items-center rounded-xl bg-slate-600/70 p-[16px] m-[20px] w-[240px]  h-[200px]'>
            <div className="text-white font-semibold">ADDRESS</div>
            <p className='text-white'>Genta Kota Rajasthan</p>
            <div className="text-white font-semibold">CONTACT</div>
            <p className='text-white'>+91 93514 61155</p>
        </div>
    </div>
  )
}

export default Foot

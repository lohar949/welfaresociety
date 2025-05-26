import React from 'react'

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
      </div>
       <div className='flex flex-col justify-center items-center rounded-xl bg-slate-600/70 p-[16px] m-[20px] w-[240px]  h-[200px]'>
            <div className="text-white font-semibold">SOCIAL MEDIA LINKS</div>
            <img
                src="/sir.jpeg"
                alt="Founder"
                className="rounded-full w-24 h-24 object-cover"
              />
             <p className="text-white font-medium m-[5px]">Saleem Mohammad</p>
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

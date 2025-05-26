import { Oswald, Lobster, Fjalla_One } from 'next/font/google';
import Swipe from './swiper';
import Foot from './footer';
import Para from './para';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Person = {
  name: string;
  achievement: string;
  image: string;
};

type ApiResponse = {
  achievements: Person[];
  members: Person[];
  mentors: Person[];
  events: string[];
};

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '400', '700'],
  display: 'swap',
});

const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
});

const fjalla = Fjalla_One({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/fetch')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (<>
    <div>
      <div className="flex flex-col sm:flex-row items-center m-[10px]" id='loh'>
        <img src="/logo.jpeg" alt="Logo" width={100} height={100}
          className="rounded-full"
        />
        <p className={`text-4xl text-center xl:pl-[20vw] ${oswald.className}`}>Lohar samaj Education & welfare Society</p>
      </div>
      <div className='bg-neutral-100 m-[10px] h-[3px] rounded-sm'>
        <br />
      </div>
      <div>
        <div className={`sticky top-0 z-10 flex flex-row ml-[10px] mr-[10px] gap-2 ${fjalla.className}`}>
          <div className='border-2 p-[2px] border-dashed'>
            <Link rel="stylesheet" href="#loh">HOME</Link>
          </div>
          <div className='border-2 p-[2px] border-dashed'>
            <Link rel="stylesheet" href="#about">ABOUT US</Link>
          </div>
          <div className='border-2 p-[2px] border-dashed bg-red-300/50'>JOIN US</div>
          <div className='border-2 p-[2px] border-dashed bg-orange-300'>DONATION</div>
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px]`}>
          <p>EVENTS</p>
        </div>
        <div className='h-[60vh] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={data.events} type="event" />}
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px]`}>
          <p>ACHIEVERS</p>
        </div>
        <div className='h-[60vh] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={data.achievements} type="person" />}
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px]`}>
          <p>MENTORS</p>
        </div>
        <div className='h-[60vh] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={data.mentors} type="person" />}
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px]`}>
          <p>MEMBERS</p>
        </div>
        <div className='h-[60vh] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={data.members} type="person" />}
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px]`} id='about'>
          <p>ABOUT US</p>
        </div>
        <Para />
      </div>
      <div className='bg-slate-600/70 m-[10px] h-[3px] rounded-sm'>
        <br />
      </div>
      <Foot />
      <div className={`flex justify-center border-2 border-dashed bg-red-300/50 backdrop-blur-md m-[10px] ${fjalla.className}`}>
        JOIN US
      </div>
    </div>
  </>);
}

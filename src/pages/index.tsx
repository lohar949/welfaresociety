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
  const [error, setError] = useState<string | null>(null);

  // Add a helper function to check if an image URL is valid
  const isValidImageUrl = (url: string | null | undefined): boolean => {
    return typeof url === 'string' && url.trim().length > 0;
  };

  useEffect(() => {
    fetch('/api/fetch')
      .then(async res => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.details || 'Failed to fetch data');
        }
        return res.json();
      })
      .then(json => {
        // Initialize empty arrays if any data is missing
        const safeData: ApiResponse = {
          achievements: json.achievements || [],
          members: json.members || [],
          mentors: json.mentors || [],
          events: json.events || []
        };
        console.log('Received members data:', safeData.members);
        setData(safeData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
        // Initialize empty data on error
        setData({
          achievements: [],
          members: [],
          mentors: [],
          events: []
        });
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (<>
    <div>
      <div className="flex flex-col sm:flex-row items-center m-[10px]" id='loh'>
        {isValidImageUrl("/logo.jpeg") && (
          <img 
            src="/logo.jpeg" 
            alt="Logo" 
            width={100} 
            height={100}
            className="rounded-full"
          />
        )}
        <div className='flex flex-col'>
        <p className={`text-4xl text-center xl:pl-[20vw] ${oswald.className}`}>Lohar samaj Education & welfare Society</p> 
        <div className=' text-center xl:pl-[20vw]  '>Hum badlenge samaj shiksha aur seva ke saath</div> 
        </div>
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
          <div className='border-2 p-[2px] border-dashed bg-red-300/50'><Link href="https://docs.google.com/forms/d/e/1FAIpQLSeQSKkNImEk8TMJSWhi6hodyNi9C8l8v1d-yAqOxk2ixavrww/viewform?usp=preview" target="_blank">JOIN US</Link></div>
          <div className='border-2 p-[2px] border-dashed bg-orange-300'><Link href="https://docs.google.com/forms/d/e/1FAIpQLSeT_2tfsqPbbv7xjMAtajTLSe8zbHIg1sqs8Xjariavruy2jw/viewform?usp=header" target="_blank">DONATION</Link></div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className={`flex justify-center ${lobster.className} m-[10px]`}>
          <p>EVENTS</p>
        </div>
        <div className='relative h-[90vh] min-h-[600px] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={data.events} type="event" />}
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px]`}>
          <p>ACHIEVERS</p>
        </div>
        <div className='relative h-[90vh] min-h-[600px] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={data.achievements} type="person" />}
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px]`}>
          <p>MENTORS</p>
        </div>
        <div className='relative h-[90vh] min-h-[600px] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={data.mentors} type="person" />}
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px]`}>
          <p>MEMBERS</p>
        </div>
        <div className='relative h-[90vh] min-h-[600px] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
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
       <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeQSKkNImEk8TMJSWhi6hodyNi9C8l8v1d-yAqOxk2ixavrww/viewform?usp=preview" target='_blank'>JOIN US</Link>
      </div>
    </div>
  </>);
}

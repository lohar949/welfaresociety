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
  const [language, setLanguage] = useState('en');
  const [data, setData] = useState<any>(null);
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
  setData(json);
  setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
        // Initialize empty data on error
        setData({
          achievements: [],
          achievementsHindi: [],
          members: [],
          membersHindi: [],
          mentors: [],
          mentorsHindi: [],
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
      <div className="flex flex-col sm:flex-row  items-center m-[10px] md:px-[10px]" id='loh'>
        {isValidImageUrl("/logo.jpeg") && (
          <img 
            src="/logo.jpeg" 
            alt="Logo" 
            width={100} 
            height={100}
            className="rounded-full"
          />
        )}
        <div className='flex flex-col mr-auto'>
        <p className={`text-4xl text-center xl:pl-[20vw] ${oswald.className}`}>{language=="en"?"Lohar samaj Education & welfare Society":"लोहार समाज शिक्षा एवं कल्याण समिति"}</p>
        <div className=' text-center xl:pl-[20vw]  '>{language=="en"?"Hum badlenge samaj shiksha aur seva ke saath":"हम समाज को शिक्षा और सेवा के साथ बदलेंगे"}</div> 
        </div>
        
      </div>
     
      <div className='bg-neutral-100 m-[10px] h-[3px] rounded-sm'>
        <br />
      </div>
      <div>
        <div className={`sticky top-0 z-10 flex flex-row bg-white  ml-[10px] mr-[10px] gap-2 ${fjalla.className}`}>
          <div className='border-2 p-[2px] border-dashed border-gray-300 hover:bg-black hover:text-white content-center'>
            <Link rel="stylesheet" href="#loh" className='m-[2px]'>{language=="en"?"HOME":"मुखपृष्ठ"}</Link>
          </div>
          <div className='border-2 p-[2px] border-dashed border-gray-300  hover:bg-black hover:text-white content-center'>
            <Link rel="stylesheet" href="#about" className='m-[2px]'>{language=="en"?"ABOUT US":"हमारे बारे में"}</Link>
          </div>
          <div className='border-2 p-[2px] border-dashed bg-red-300/50 hover:bg-black hover:text-white content-center'><Link href="https://docs.google.com/forms/d/e/1FAIpQLSeQSKkNImEk8TMJSWhi6hodyNi9C8l8v1d-yAqOxk2ixavrww/viewform?usp=preview" target="_blank" className='m-[2px]'>{language=="en"?"JOIN US":"हमसे जुड़ें"}</Link></div>
          <div className='border-2 p-[2px] border-dashed bg-orange-300 hover:bg-black hover:text-white content-center'><Link href="https://docs.google.com/forms/d/e/1FAIpQLSeT_2tfsqPbbv7xjMAtajTLSe8zbHIg1sqs8Xjariavruy2jw/viewform?usp=header" target="_blank" className='m-[2px]'>{language=="en"?"DONATION":"दान"}</Link></div>
          <div className='border-2 p-[2px] border-dashed border-gray-300 hover:bg-black hover:text-white'>
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className='m-[2px]'
          >
            {language === 'en' ? 'Hindi' : 'English'}
          </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className={`flex justify-center ${lobster.className} m-[10px] text-4xl`}>
          <p>{language==="en" ? "EVENTS" : "कार्यक्रम"}</p>
        </div>
        <div className='relative h-[90vh] min-h-[600px] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={data.events} type="event" />}
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px] text-4xl`}>
          <p>{language==="en" ? "ACHIEVERS" : "उपलब्धि प्राप्तकर्ता"}</p>
          
        </div>
            <div className='flex flex-col items-center justify-center text-xl '>
              <div className='bg-orange-200 w-[50%] p-[5px] rounded-xl font-bold'>
            <div>{language==="en" ? "Achievers criteria- 5th & 8th class - A grade or B grade" : "उपलब्धि मानदंड- 5वीं और 8वीं कक्षा - A ग्रेड या B ग्रेड"}</div>
            <div>{language==="en" ? "10th,12th, Graduation and Post Graduation- Above 75%" : "10वीं, 12वीं, स्नातक और स्नातकोत्तर - 75% से अधिक"}</div>
            <div>{language==="en" ? "Note- Special recognition for Top 3 of Each class " : "नोट- प्रत्येक कक्षा के शीर्ष 3 के लिए विशेष मान्यता"}</div>
            <div>{language==="en" ? "Note- Special Recognition for social work like Blood donation etc" : "नोट- रक्तदान आदि जैसे सामाजिक कार्य के लिए विशेष मान्यता"}</div></div></div>
        <div className='relative h-[90vh] min-h-[600px] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={language === 'hi' ? data.achievementsHindi : data.achievements} type="person" />}
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px] text-4xl`}>
          <p>{language==="en" ? "MENTORS" : "मार्गदर्शक"}</p>
        </div>
        <div className='relative h-[90vh] min-h-[600px] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={language === 'hi' ? data.mentorsHindi : data.mentors} type="person" />}
        </div>
        <div className={`flex justify-center ${lobster.className} m-[10px] text-4xl`}>
          <p>{language==="en" ? "MEMBERS" : "सदस्य"}</p>
        </div>
        <div className='relative h-[90vh] min-h-[600px] ml-[10vw] mr-[10vw] rounded-xl shadow-md bg-orange-100/30 backdrop-blur-md'>
          {data && <Swipe items={language === 'hi' ? data.membersHindi : data.members} type="person" />}
        </div>
        <div className={`flex justify-center font-bold m-[10px] text-4xl`} id='about' >
          <p>{language==="en" ? "ABOUT US" : "हमारे बारे में"}</p>
        </div>
        <Para language={language} />
      </div>
      <div className='bg-slate-600/70 m-[10px] h-[3px] rounded-sm'>
        <br />
      </div>
      <Foot language={language} />
      <div className={`flex justify-center border-2 border-dashed bg-red-300/50 backdrop-blur-md m-[10px] hover:bg-black hover:text-white ${fjalla.className}`}>
       <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeQSKkNImEk8TMJSWhi6hodyNi9C8l8v1d-yAqOxk2ixavrww/viewform?usp=preview" target='_blank'>{language=="en"?"JOIN US":"हमसे जुड़ें"}</Link>
      </div>
    </div>
  </>);
}

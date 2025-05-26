import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

type Person = {
  name: string;
  achievement: string;
  image: string;
};

type SwipeProps = {
  items: (Person | string)[];
  type: 'person' | 'event';
};

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export default function Swipe({ items, type }: SwipeProps) {
  const eventItems = type === 'event' ? items as string[] : [];
  const personItems = type === 'person' ? items as Person[] : [];

  return (
    <div className="h-full rounded-xl p-5 relative">
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #000;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          transform: scale(0.7);
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }

        .swiper-button-next {
          right: 10px;
        }

        .swiper-button-prev {
          left: 10px;
        }

        .swiper-pagination-bullet {
          background-color: #000;
          opacity: 0.6;
        }

        .swiper-pagination-bullet-active {
          background-color: #000;
          opacity: 1;
        }
      `}</style>
      <Swiper
        className='bg-black/5 h-full rounded-xl'
        modules={[Navigation, Pagination, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          enabled: true,
          hideOnClick: false,
        }}
        effect={'fade'}
        fadeEffect={{
          crossFade: true
        }}
        centeredSlides={true}
        allowTouchMove={true}
        watchSlidesProgress={true}
      >
        {type === 'event' ? (
          eventItems.map((imageUrl, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center p-4 h-full">
              <div className="w-full h-full relative rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Event ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          personItems.map((item, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center justify-center p-4">
              <div className="w-full h-full flex flex-col items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-[70%] object-cover rounded-lg"
                />
                <h3 className="text-xl font-bold mt-4">{item.name}</h3>
                <p className="text-gray-600 mt-2">{item.achievement}</p>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  )
}



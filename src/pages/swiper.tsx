import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

type Person = {
  name: string
  achievement: string
  image: string | null
}

type SwipeProps = {
  items?: (Person | string)[]
  type: 'person' | 'event'
}

const isValidImageUrl = (url: string | null | undefined): boolean => {
  return typeof url === 'string' && url.trim().length > 0;
};

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )
}

export default function Swipe({ items = [], type }: SwipeProps) {
  const eventItems = type === 'event' ? (items as string[]).filter(url => isValidImageUrl(url)) : []
  const personItems = type === 'person' ? (items as Person[]) : []
  console.log('Swiper received items:', { type, itemsLength: items.length, items });
  const itemCount = type === 'event' ? eventItems.length : personItems.length

  return (
    <div className="h-full w-full rounded-xl p-5 relative">
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

        .swiper {
          height: 100% !important;
          min-height: 500px;
        }

        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100% !important;
          min-height: 500px;
        }

        .image-container {
          width: 100%;
          height: 100%;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .image-container img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        .achievement-box {
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          padding: 12px;
          margin-top: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-height: 120px;
          overflow-y: auto;
        }

        .achievement-box::-webkit-scrollbar {
          width: 6px;
        }

        .achievement-box::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .achievement-box::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 3px;
        }

        .achievement-box::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>

      <Swiper
        className="bg-black/5 h-full w-full rounded-xl"
        modules={[Navigation, Pagination, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        loop={itemCount > 1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          enabled: itemCount > 1,
          hideOnClick: false,
        }}
        effect={'fade'}
        fadeEffect={{
          crossFade: true,
        }}
        centeredSlides={true}
        allowTouchMove={itemCount > 1}
        watchSlidesProgress={true}
      >
        {type === 'event' ? (
          eventItems.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div className="image-container">
                {isValidImageUrl(imageUrl) && (
                  <img
                    src={imageUrl}
                    alt={`Event ${index + 1}`}
                    loading="lazy"
                  />
                )}
              </div>
            </SwiperSlide>
          ))
        ) : (
          personItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center w-full h-full p-4">
                <div className="image-container h-[50%] min-h-[300px]">
                  {item.image && isValidImageUrl(item.image) ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      loading="lazy" 
                      className="max-h-[300px] rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-4xl text-gray-400">{item.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="text-center mt-4 w-full px-4 h-[40%]">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  {item.achievement && (
                    <div className="achievement-box">
                      <p className="text-gray-600">{item.achievement}</p>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  )
}

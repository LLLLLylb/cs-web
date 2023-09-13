'use client';

import React, { useEffect } from 'react';
import { useStore } from 'zustand';
import Link from 'next/link';
import clsx from 'clsx';
import Slider from 'react-slick';
import { useWindowSize } from 'react-use';
 
import {Card, CardBody, CardFooter, Image, Skeleton} from "@nextui-org/react";
import { LiaAngleDoubleRightSolid } from 'react-icons/lia';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

export default function Xyxw() {

  const title = '学院新闻'
  const moreText = '更多'
  const router = useRouter();
  let list : any[] = [];
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/articles/menu/17?page=1&page_size=10&brief_length=10`, fetcher, { revalidateOnFocus: false });
  if (data) {
    list = data.data.data
    list = list.filter((item: { image: any; }) => item.image && item.image.startsWith('https://cs.mnnu.edu.cn')).slice(0,4);
  }
  const settings = {
    customPaging: function () {
      return (
        <button className="dot"></button>
      );
    },
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    vertical: true,
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000
  };
  const { width: screenWidth } = useWindowSize();


  return (
    <div className="container mx-auto lg:max-w-[554px] sm:max-w-[580px] max-w-[342px]">
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <img src="/images/Min.svg" alt="Icon" className="w-6 h-6 mr-1" />
            <h3 className="text-xl font-semibold relative">
              {title}
              <span className="absolute bottom-0 left-1/2 w-2/4 h-0.5 bg-primary-50"></span>
            </h3>  
        </div>
        <button className='text-primary-400 flex items-center text-sm self-end md:mb-0 md:ml-4' onClick={() => {
          router.push(`/catalogue/3/17/0`);}}>
          {moreText}
          <LiaAngleDoubleRightSolid/>
        </button>
      </div>

      
      {list.length > 0 ?
        (<div>
          {screenWidth <= 640 ? 
            (<div className="gap-2 sm:grid sm:grid-cols-2">
                <Slider {...settings}>
                  {list.map((item: {
                    id: any; title: string ; image: string | undefined; }, index: React.Key | null | undefined) => (
                    <Card className='shadow-xl rounded' key={index} isPressable onPress={() => {
                      // router.push(`/article/3/17/0/${item.id}`);
                      router.push(`/article/${item.id}`);
                    }}>
                      <CardBody className="overflow-visible p-0">
                        <Image
                          shadow="none"
                          radius="none"
                          width="100%"
                          alt={item.title}
                          className="w-full object-cover h-[190px]"
                          src={item.image}
                        />
                      </CardBody>
                      <CardFooter className="text-small justify-between">
                        <p className={clsx('text-default-500 line-clamp-2 text-ellipsis')} >{item.title}</p>
                      </CardFooter>
                    </Card>
                  ))}
                </Slider>
            </div>)
          : 
            (<div className="gap-2 sm:grid sm:grid-cols-2">
              {list.map((item: {
                id: any; title: string; image: string | undefined; }, index: React.Key | null | undefined) => (
                <Card className='shadow-xl rounded' key={index} isPressable onPress={() => {
                  // router.push(`/article/3/17/0/${item.id}`);
                  router.push(`/article/${item.id}`);
                }}>
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="none"
                      radius="none"
                      width="100%"
                      alt={item.title}
                      className="w-full object-cover lg:h-[175px] sm:h-[225px]"
                      src={item.image}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <p className={clsx('text-default-500 line-clamp-2 text-ellipsis')} >{item.title}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>)
          }
        </div>):
        (<div className="gap-2 sm:grid sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card className='shadow-xl rounded'>
              <CardBody className="overflow-visible p-0">
                <Skeleton className="w-full lg:h-[175px] sm:h-[225px]" />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <Skeleton className="h-10" />
              </CardFooter> 
          </Card>
        ))}
      </div>)
      }


      
    </div>

  );
}

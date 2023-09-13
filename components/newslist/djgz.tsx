'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from 'zustand';
import Link from 'next/link';
import clsx from 'clsx';

import Slider from 'react-slick';
import { useWindowSize } from 'react-use';
 
import {Card, CardBody, CardFooter, Image, Skeleton} from "@nextui-org/react";
import { LiaAngleDoubleRightSolid } from 'react-icons/lia';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';


export default function Djgz() {


  const title = '党建工作'
  const moreText = '更多'
  const router = useRouter();
  let list : any[] = [];
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/articles/menu/8?page=1&page_size=10&brief_length=10`, fetcher, { revalidateOnFocus: false });
  if (data) {
    list = data.data.data
    list = list.filter((item: { image: any; }) => item.image && item.image.startsWith('https://cs.mnnu.edu.cn')).slice(0,3);
  }



  return (
      <div className="container mx-auto  lg:max-w-[1027px] sm:max-w-[580px] max-w-[342px]">
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <img src="/images/Min.svg" alt="Icon" className="w-6 h-6 mr-1" />
              <h3 className="text-xl font-semibold relative">
                {title}
                <span className="absolute bottom-0 left-1/2 w-2/4 h-0.5 bg-primary-50"></span>
              </h3>  
          </div>
          <button className='text-primary-400 flex items-center text-sm self-end md:mb-0 md:ml-4' onClick={() => {
          router.push(`/catalogue/1/8/5`);}}>
            {moreText}
            <LiaAngleDoubleRightSolid/>
          </button>
        </div>


        {list.length > 0 ? (
          <div className="gap-4 grid grid-cols-2">
            {/* 第一行放一个元素 */}
            <div className="col-span-2">
              <Card shadow="none" radius="none" className="w-full" isPressable onPress={() => {
                      // router.push(`/article/1/8/5/${list[0].id}`);
                      router.push(`/article/${list[0].id}`);
                    }}>
                <CardBody className="overflow-visible p-0 relative">
                    <Image
                      shadow="none"
                      width="100%"
                      alt={list[0].title}
                      className="rounded w-full object-cover lg:h-[400px] sm:h-[309px] h-[190px]"
                      src={list[0].image}
                    />
                    <p className={clsx('hidden text-background leading-5 font-semibold absolute bottom-3 left-1/2 -translate-x-1/2 w-4/5 z-50  lg:line-clamp-2 text-ellipsis')}>{list[0].title}</p>
                  </CardBody>
                  <CardFooter className="text-small justify-start pl-0 pb-0 lg:hidden">
                    <img src="/images/djgzSide.png" alt="Icon" className='mr-3'/>
                    <p className={clsx('text-default-500 text-left line-clamp-2 text-ellipsis')}>{list[0].title}</p>
                  </CardFooter>
              </Card>
            </div>
            {list.slice(1).map((item, index) => (
              <Card shadow="none" radius="none" key={index} isPressable onPress={() => {
                // router.push(`/article/1/8/5/${item.id}`);
                router.push(`/article/${item.id}`);
              }}>
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="none"
                    width="100%"
                    alt={item.title}
                    className="rounded w-full object-cover lg:h-[206px] sm:h-[206px] h-[120px]"
                    src={item.image}
                  />
                </CardBody>
                <CardFooter className="text-small justify-start pl-0">
                  <img src="/images/djgzSide.png" alt="Icon" className='mr-3'/>
                  <p className={clsx('text-default-500 text-left line-clamp-2 text-ellipsis')}>{item.title}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="gap-4 grid grid-cols-2">
            <div className="col-span-2"> {/* 第一行放一个元素 */}
              <Card shadow="none" radius="none" className="w-full">
                <Skeleton className="rounded-lg">
                    <div className="lg:h-[400px] sm:h-[309px] h-[190px] rounded-lg bg-default-300"></div>
                </Skeleton>
              </Card>
            </div>
            <Card shadow="none" radius="none">
                <Skeleton className="rounded-lg">
                    <div className="lg:h-[206px] sm:h-[206px] h-[120px] rounded-lg bg-default-300"></div>
                </Skeleton>
            </Card>
            <Card shadow="none" radius="none">
                <Skeleton className="rounded-lg">
                    <div className="lg:h-[206px] sm:h-[206px] h-[120px] rounded-lg bg-default-300"></div>
                </Skeleton>
            </Card>
          </div> 
        )}

        
      </div>
    

  );
}

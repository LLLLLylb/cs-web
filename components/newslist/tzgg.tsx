'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import Link from 'next/link';
import clsx from 'clsx';
import { useWindowSize } from 'react-use';
import { LiaAngleDoubleRightSolid } from 'react-icons/lia';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@nextui-org/react';


export default function Tzgg() {

  const title = '通知公告'
  const moreText = '更多'
  const { width: screenWidth } = useWindowSize(); 
  const [len, setLen] = useState(6);
  const router = useRouter();
  let tzgglist : any[] = [];
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/articles/menu/18?page=1&page_size=10&brief_length=10`, fetcher, { revalidateOnFocus: false });
  if (data) {
    tzgglist = data.data.data
    screenWidth > 1024 ? tzgglist = tzgglist.slice(0,6) : tzgglist = tzgglist.slice(0,3);
  }
  useEffect(() => {
    if (screenWidth < 640) {
      setLen(3);
    }
  }, []);
  

  return (
    <div className="container mx-auto lg:max-w-[417px] sm:max-w-[580px] max-w-[342px] bg-primary">
        <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
                <img src="/images/Min.svg" alt="Icon" className="w-6 h-6 mr-1" />
                <h3 className="text-xl font-semibold relative">
                    {title}
                    <span className="absolute bottom-0 left-1/2 w-2/4 h-0.5 bg-primary-50"></span>
                </h3>
                
            </div>
            <button className='text-primary-400 flex items-center text-sm self-end md:mb-0 md:ml-4' onClick={() => {
              router.push(`/catalogue/3/18/1`);}}>
                {moreText}
                <LiaAngleDoubleRightSolid/>
            </button>
        </div>

      {tzgglist.length > 0 ?
        (<div className="grid grid-cols-1 gap-3 lg:gap-8 ">
          {tzgglist.map((item) => (
            <div key={item.id} className="flex items-center mb-2">
              <div className="w-[9.5%] sm:w-[5.5%] lg:w-[7.5%] border-2 border-solid border-paginationColor whitespace-nowrap text-center rounded-[3px] mr-[5px] text-xs font-roboto">
                <div className="bg-primary-50 text-white h-1/2 py-0.5">12月</div>
                <div className="bg-white text-primary-50 h-1/2 py-0.5">23</div>
              </div>
              <Link 
              // href={`/article/3/18/1/${item.id}`}
              href={`/article/${item.id}`} 
              className='w-[92.5%]'>
                {item.title}
              </Link>
            </div>
          ))}
        </div>
        ):(
        <div className="grid grid-cols-1 gap-3 sm:gap-10">
            {Array.from({ length: len }).map((_, index) => (
              <Skeleton className="h-12 w-full" />
            ))}
        </div>
        )
      }
    </div>
  );
}

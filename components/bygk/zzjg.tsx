'use client';

import { Pagination } from '@nextui-org/react';
import clsx from 'clsx';
import React from 'react';
import useSWR from 'swr';

const Zzjg = (
  props: { id: any;}
    ) => {
  let title = props.id == 14 ? '组织机构' : '师资队伍'
  let type = props.id == 14 ? 'zzjg' : 'szdw'
  let introduction 
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/articles/spec/${type}`, fetcher);
  if (data) {
    introduction = data.data
  }
  

  
  return (
    <div className='w-full sm:w-4/5 sm:pt-8 lg:pt-14'>
      <div className='sm:hidden self-start text-lg tracking-wider text-paginationColor  pb-0.5'>{title}</div>
      <img src="/images/catalogueLine.png" alt="Icon" className="sm:hidden mr-1 mb-4" />
      <div className='hidden sm:flex items-center justify-between mb-2 sm:mb-3'>
          <div className='flex items-center relative'>
              <h3 className="text-lg sm:text-xl font-semibold tracking-[5px] m-2.5">
                  {title}
              </h3>
              <div className="absolute -top-[6px] -left-[10px] w-8 h-8 border-solid border-4 border-transparent border-t-redCircle border-b-redCircle border-l-redCircle rounded-full bg-transparent rotate-45"></div>
          </div>
          <div className='w-2.5 h-0.5 bg-redLine flex-grow'></div>
      </div>


      <div className='flex tracking-widest leading-8 ml-4'>
            <div className='zzjg' dangerouslySetInnerHTML={{ __html: introduction }}></div>
      </div>

     

      <div className='hidden sm:flex items-center sm:mt-2'>
            <div className='w-2.5 h-0.5 bg-redLine flex-grow'></div>
            <div className='w-7 h-7  border-solid border-2 border-transparent border-t-redCircle border-r-redCircle bg-transparent rotate-45'></div>
            <div className='w-7 h-7  border-solid border-2 border-transparent border-t-redCircle border-r-redCircle bg-transparent rotate-45'></div>
      </div>
    </div>
    
  );
};

export default Zzjg;
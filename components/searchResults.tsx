'use client';

import React from 'react';
import { useStore } from 'zustand';
import {Pagination} from "@nextui-org/react";
import Link from 'next/link';
import clsx from 'clsx';

export default function SearchResults() {
 
    const totalPages = 100
    const handlePageChange = (pageNumber: number) => {
        console.log(pageNumber,'------')
    };
  const rcpylist = [
    {id:1,articleTitle:'4月28日，第四届“长城杯”信息安全铁人三项赛全国总决赛在福州新区数字中国会展中心潮平馆落下帷幕。来自我院信息安全特色团队的王健、祝梓文、王晨烨、黄春瑜、张儒钦和吴冰同学组成的队伍与中国科学技术大学、复旦大学、西北工业大学等实力强劲的队伍同台竞技，最终荣获总决赛三等奖的好成绩。',url:'/',articlePublishTime:'2023-04-01',img: "/images/Image.png",},
    {id:2,articleTitle:'闽南师范大学计算机学院面向2023届毕业生公开招聘科研助理拟录用名单公示',url:'/djgz',articlePublishTime:'2023-04-01',img: "/images/Image.png",},
    {id:3,articleTitle:'闽南师范大学计算机学院面向2023届毕业生公开招聘科研助理拟录用名单公示',url:'/djgz',articlePublishTime:'2023-04-01',img: "/images/Image.png",},
    
  ];
  

  return (
    <div className="container mx-auto lg:max-w-[1027px] sm:max-w-[580px] max-w-[342px]">
      

        <div className="grid grid-cols-1 gap-4">
            {rcpylist.map((item) => (
              <div key={item.id} className="flex items-center mb-2">
                <Link href={item.url}  className='flex border-b border-listGrayBorder pb-1' >
                    <div className="ml-4">
                        <p className={clsx("text-base sm:text-lg font-normal mb-2 w-3/5 mr-2.5 line-clamp-1 text-ellipsis")}>{rcpylist[0].articleTitle}</p>
                        <div className={clsx("text-sm text-briefText mb-2 mr-2.5 line-clamp-3 text-ellipsis")}>{rcpylist[0].articleTitle}</div>
                        <p className="text-xs text-rcpyTimeText">发表时间：{rcpylist[0].articlePublishTime}</p>
                    </div>
                </Link>
              </div>
            ))}
        </div>
        <div className='flex justify-center mt-4 sm:mt-2.5'>
            <button className='bg-background text-sm sm:text-base font-medium text-paginationColor border-solid rounded border border-paginationColor sm:px-2.5 mr-1 h-2.25' >首页</button>
            <Pagination
                radius={'sm'}
                total={totalPages}
                onChange={handlePageChange}
                classNames={{ item:['h-8','w-8','sm:h-[36px]','sm:w-[36px]'],cursor: ['bg-paginationColor','h-8','w-8','sm:h-[36px]','sm:w-[36px]']}}
            />
            <button className='bg-background text-sm sm:text-base font-medium text-paginationColor border-solid rounded border border-paginationColor sm:px-2.5 ml-1 h-2.25' >下一页</button>
        </div>     
    </div>
  );
}

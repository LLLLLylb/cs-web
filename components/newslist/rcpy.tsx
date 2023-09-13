'use client';

import React, { useEffect } from 'react';
import { useStore } from 'zustand';
import Link from 'next/link';
import clsx from 'clsx';
import { useWindowSize } from 'react-use';

import { LiaAngleDoubleRightSolid } from 'react-icons/lia';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@nextui-org/react';


export default function Rcpy() {
const { width: screenWidth } = useWindowSize();  

  const [selected, setSelected] = React.useState(true)
  const [catalog, setCatalog] = React.useState(5)
  const handleUndergraduateClick = () => {
    if (!selected) {
      setSelected(true);
      setCatalog(5)
    }
  };
  const handleGraduateClick = () => {
    if (selected) {
      setSelected(false);
      setCatalog(7)
    }
  };

  const title = '人才培养'
  const moreText = '更多'
  const router = useRouter();
  const [rcpylist, setRcpylist] = React.useState<any[]>([]);
  
  useEffect(() => {
    if (catalog) {
      // 构建请求的URL
      const apiUrl = `https://doc.yihuolu.cn/api/v2/articles/menu/${catalog}?page=1&page_size=10&brief_length=100`;

     // 发起请求
     fetch(apiUrl)
     .then(response => {
       if (!response.ok) {
         throw new Error('网络请求失败');
       }
       return response.json();
     })
     .then(data => {
       const newData = data.data.data.slice(0, 3);
       setRcpylist(newData);
     })
     .catch(error => {
       console.error('请求失败:', error);
     });
 }
}, [catalog]);

  

  return (
    <div className="container mx-auto lg:max-w-[1027px] sm:max-w-[580px] max-w-[342px]">
        <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
                <img src="/images/Min.svg" alt="Icon" className="w-6 h-6 mr-1" />
                <h3 className="text-xl font-semibold relative">
                    {title}
                    <span className="absolute bottom-0 left-1/2 w-2/4 h-0.5 bg-primary-50"></span>
                </h3>
                <div className='text-sm self-end text-grayText font-semibold'>
                      <a className={`mx-2.5 cursor-pointer ${selected ? 'text-activeText' : ''}`} onClick={handleUndergraduateClick}>本科生教育</a>
                      <a className={`cursor-pointer ${selected ?  "" : "text-activeText" }`} onClick={handleGraduateClick}>研究生教育</a>
                </div>
            </div>
            <button className='text-primary-400 flex items-center text-sm self-end md:mb-0 md:ml-4' onClick={() => {catalog === 5 ?
                router.push(`/catalogue/1/5/3`) : router.push(`/catalogue/1/7/4`)}}>
                {moreText}
                <LiaAngleDoubleRightSolid/>
            </button>
        </div>
        {rcpylist.length > 0 ?
          (<div>
            {screenWidth <= 1024 ? 
            (<div className="grid grid-cols-1 gap-4">
              {rcpylist.map((item) => (
                <div key={item.id} className="flex items-center mb-2">
                  <img src="/images/rcpyicon.svg" alt="Icon" className="w-6 h-6 mr-2.5 self-start mt-2" />
                  <Link href={
                    // catalog === 5 ? `/article/1/5/3/${item.id}` : `/article/1/5/3/${item.id}`
                    catalog === 5 ? `/article/${item.id}` : `/article/${item.id}`
                  }  
                    className='flex flex-grow justify-between border-b border-grayBorder pb-1 ' >
                    <div className='mr-2.5 line-clamp-2 text-ellipsis'>{item.title}</div>        
                    <div className='self-end text-xs text-primary-500 whitespace-nowrap '>
                      {item.date}
                    </div>
                  </Link>
                </div>
              ))}
            </div>)
          :
            (
              <div>
                <div className="flex items-center border border-primary-500 rounded h-[140px] hover:cursor-pointer" onClick={() => {catalog === 5 ?
                // router.push(`/article/1/5/3/${rcpylist[0].id}`) : router.push(`/article/1/7/4/${rcpylist[0].id}`)
                router.push(`/article/${rcpylist[0].id}`) : router.push(`/article/${rcpylist[0].id}`)
                }}>
                  {rcpylist[0].image ? (
                    <img src={rcpylist[0].image} alt="Image" className="w-48 h-full rounded-l" />
                  ) : null}
                  <div className="ml-4">
                    <p className={clsx("text-lg font-medium mb-2 w-3/5 mr-2.5 line-clamp-1 text-ellipsis")}>{rcpylist[0].title}</p>
                    <div className={clsx("text-sm text-primary-300 mb-2 mr-2.5 line-clamp-2 text-ellipsis")}>{rcpylist[0].brief}...</div>
                    <p className="text-xs text-primary-500">{rcpylist[0].date}</p>
                  </div>
                </div>
                <div className="flex items-center border border-primary-500 rounded my-6 h-[140px] hover:cursor-pointer" onClick={() => {catalog === 5 ?
                // router.push(`/article/1/5/3/${rcpylist[1].id}`) : router.push(`/article/1/7/4/${rcpylist[1].id}`)
                router.push(`/article/${rcpylist[1].id}`) : router.push(`/article/${rcpylist[1].id}`)
                }}>
                  <div className="ml-4">
                  <p className={clsx("text-lg font-medium mb-2 w-4/5 mr-2.5 line-clamp-1 text-ellipsis")}>{rcpylist[1].title}</p>
                    <div className={clsx("text-sm text-primary-300 mb-2 mr-2.5 line-clamp-2 text-ellipsis")}>{rcpylist[1].brief}...</div>
                    <p className="text-xs text-primary-500">{rcpylist[1].date}</p>
                  </div>
                </div>
                <div className="flex items-center border border-primary-500 rounded bg-background-100 h-[140px] hover:cursor-pointer" onClick={() => {catalog === 5 ?
                // router.push(`/article/1/5/3/${rcpylist[2].id}`) : router.push(`/article/1/7/4/${rcpylist[2].id}`)
                router.push(`/article/${rcpylist[2].id}`) : router.push(`/article/${rcpylist[2].id}`)
                }}>
                  {rcpylist[2].image ? (
                      <img src={rcpylist[2].image} alt="Image" className="w-48 h-full rounded-l" />
                    ) : null}
                  <div className="ml-4">
                  <p className={clsx("text-lg font-medium mb-2 w-3/5 mr-2.5 line-clamp-1 text-ellipsis")}>{rcpylist[2].title}</p>
                    <div className={clsx("text-sm text-primary-300 mb-2 mr-2.5 line-clamp-2 text-ellipsis")}>{rcpylist[2].brief}...</div>
                    <p className="text-xs text-primary-500">{rcpylist[2].date}</p>
                  </div>
                </div>
            </div>)
          }
          </div>) : 
          // 骨架
          (
            (<div>
              {screenWidth <= 1024 ? 
              (
                <div className="grid grid-cols-1 gap-3 sm:gap-10">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton className="h-12 w-full" />
                  ))}
                </div>
              )
              :
              (<div>
                <div className="flex items-center border border-grayBorder rounded h-[140px] hover:cursor-pointer">
                  <Skeleton className="w-48 h-full rounded-l" />
                  <div className="ml-4 flex-grow">
                    <Skeleton className="mb-2 w-3/6 mr-2.5" >
                      <div className="h-4 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="mb-2 w-9/12 mr-2.5" >
                      <div className="h-8 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="mb-2 w-1/12 mr-2.5" >
                      <div className="h-3 rounded-lg bg-default-200"></div>
                    </Skeleton>
                  </div>
                </div>
                <div className="flex items-center border border-grayBorder rounded h-[140px] hover:cursor-pointer">
                  <div className="ml-4 flex-grow">
                    <Skeleton className="mb-2 w-5/12 mr-2.5" >
                      <div className="h-4 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="mb-2 w-7/12 mr-2.5" >
                      <div className="h-8 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="mb-2 w-1/12 mr-2.5" >
                      <div className="h-3 rounded-lg bg-default-200"></div>
                    </Skeleton>
                  </div>
                </div>
                <div className="flex items-center border border-grayBorder rounded h-[140px] hover:cursor-pointer">
                  <Skeleton className="w-48 h-full rounded-l" />
                  <div className="ml-4 flex-grow">
                    <Skeleton className="mb-2 w-3/6 mr-2.5" >
                      <div className="h-4 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="mb-2 w-9/12 mr-2.5" >
                      <div className="h-8 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="mb-2 w-1/12 mr-2.5" >
                      <div className="h-3 rounded-lg bg-default-200"></div>
                    </Skeleton>
                  </div>
                </div>
              </div>)
              }
            </div>)
          )
        }
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import {Pagination, Skeleton} from "@nextui-org/react";
import Link from 'next/link';
import clsx from 'clsx';

import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {

  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1);
  const [resultList, setResultList] = useState([]);
  const [pages, setPages] = useState(1);
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/articles/search?page=1&${searchParams}`, fetcher, { revalidateOnFocus: false });
  
  useEffect(() => {
    console.log('data', data)
    if (data && data.code === 0) {
      setResultList(data.data.records);
      setPages(data.data.pages)
      
    }
    
  }, [data]);
  
  
  const handlePageChange = async (pageNumber: number) => {
    try {
      const url = `https://doc.yihuolu.cn/api/v2/articles/search?page=${pageNumber}&${searchParams}`;
      
      // 发起异步请求并等待响应
      const response = await fetcher(url);
      
      // 检查响应是否成功
      if (!response) {
        console.error('Failed to fetch data');
        return;
      }
      
      // 更新 list 状态
      setResultList(response.data.records);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    if (pageNumber === 1) {
      // 如果用户点击的是第一页按钮，执行跳转到第一页的操作
      setCurrentPage(1);
      // 这里可以添加具体的跳转逻辑，例如重新加载数据等
    } else {
      // 处理其他页码的逻辑
      setCurrentPage(pageNumber);
      // 这里可以处理跳转到其他页的逻辑，例如加载对应页的数据等
    }
};
  

  return (
    <div className="container mx-auto lg:max-w-[1027px] sm:max-w-[580px] max-w-[342px]">
      {data && data.code === 1  || data &&data.data.records.length < 1 ? (
        <div className="mt-8 text-md">
          <p className='mb-2'> 找不到和您的查询 " {searchParams.toString().replace("keyword=", "")} "  相符的新闻</p>
          <div className='flex flex-col '>
            <p className='mb-2'>建议：</p>
            <p className='border-b border-grayBorder mb-2'>请检查输入字词有无错误。</p>
            <p className='border-b border-grayBorder mb-2'>请换用另外的查询字词。</p>
            <p className='border-b border-grayBorder mb-2'>请改用较常见的字词。</p>
          </div>
        </div>
      ) : (
        // 正常数据渲染部分
        <>

      {resultList ?
        (<div className="grid grid-cols-1 gap-4">
            {resultList.map((item: { article_id: React.Key | null | undefined;  title: string; date: string; content: string;}) => (
            <div key={item.article_id} className="flex items-center mb-2">
                <Link href={`/article/${item.article_id}`}  className='flex border-b border-listGrayBorder pb-1' >
                    <div className="ml-4">
                        <div className='text-base sm:text-lg font-normal mb-2 w-3/5 mr-2.5 line-clamp-1 text-ellipsis' dangerouslySetInnerHTML={{ __html: item.title }}></div>
                        <div className='text-sm text-briefText mb-2 mr-2.5 line-clamp-3 text-ellipsis' dangerouslySetInnerHTML={{ __html: item.content }}></div>
                        <p className="text-xs text-rcpyTimeText">发表时间：{item.date}</p>
                    </div>
                </Link>
            </div>
            ))}
        </div>
            ): (
        <div className="grid grid-cols-1 sm:gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton className="h-12 w-full" />
            ))}
        </div>
        )}
      <div>
        {/* 列表长度大于0时才显示页码 */}
        {resultList.length > 0 && (
          <div className='flex justify-center mt-4 sm:mt-2.5'>
            <button
              onClick={() => handlePageChange(1)}
              className='bg-background-200 text-sm sm:text-base font-medium text-foreground-100 rounded sm:px-2.5 mr-1 h-2.25'
            >
              首页
            </button>
            <Pagination
              radius={'sm'}
              total={pages}
              page={currentPage}
              onChange={handlePageChange}
              classNames={{
                item: ['h-8', 'w-8', 'sm:h-[36px]', 'sm:w-[36px]'],
                cursor: ['bg-paginationColor', 'h-8', 'w-8', 'sm:h-[36px]', 'sm:w-[36px]'],
              }}
            />
            <button
              onClick={() =>
                handlePageChange(currentPage < pages ? currentPage + 1 : currentPage)
              }
              className='bg-background-200 text-sm sm:text-base font-medium text-foreground-100 rounded sm:px-2.5 ml-1 h-2.25'
            >
              下一页
            </button>
          </div>
        )}
      </div>
      </>
      )}  
    </div>
  );
}

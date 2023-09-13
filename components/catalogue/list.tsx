'use client';

import React, { useEffect, useState } from 'react';
import {Pagination, Skeleton} from "@nextui-org/react";
import Link from 'next/link';
import clsx from 'clsx';
import useSWR, { mutate } from 'swr';


const List = (
    props: { parentId: any; id: any; index: any}
) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [list, setList] = useState([]);
    const [title, setTitle] = useState('');
    const [pages, setPages] = useState(1);
    const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
    const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/articles/menu/${props.id}?page=1&page_size=10&brief_length=10`,fetcher, { revalidateOnFocus: false });

    useEffect(() => {
      if (data) {
        setList(data.data.data);
        setPages(data.data.pages)
      }

    }, [data]);

    // 请求分类标题
    useEffect(() => {
        const fetchMenuData = async () => {
          try {
            const menuResponse = await fetcher(`https://doc.yihuolu.cn/api/v2/menus/${props.id}`);
            if (menuResponse) {
              setTitle(menuResponse.data.name);
            }
          } catch (error) {
            console.error('Error fetching menu data:', error);
          }
        };
        fetchMenuData();
      }, [props.id]);
    
    // 页面切换
    const handlePageChange = async (pageNumber: number) => {
        try {
          const url = `https://doc.yihuolu.cn/api/v2/articles/menu/${props.id}?page=${pageNumber}&page_size=10&brief_length=10`;
          
          // 发起异步请求并等待响应
          const response = await fetcher(url);
          
          // 检查响应是否成功
          if (!response) {
            console.error('Failed to fetch data');
            return;
          }
          
          // 更新 list 状态
          setList(response.data.data);
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
    <div className="w-full sm:w-4/5 sm:pt-8 lg:pt-16">
        <div className='sm:hidden self-start text-lg tracking-wider text-paginationColor  pb-0.5'>新闻公告</div>
        <img src="/images/catalogueLine.png" alt="Icon" className="sm:hidden mb-4 mr-1" />
        <div className='hidden sm:flex items-center justify-between mb-2 sm:mb-3'>
            <div className='flex items-center relative'>
                <h3 className="text-lg sm:text-xl font-semibold tracking-[5px] m-2.5">
                    {title}
                </h3>
                <div className="absolute -top-[6px] -left-[10px] w-8 h-8 border-solid border-4 border-transparent border-t-redCircle border-b-redCircle border-l-redCircle rounded-full bg-transparent rotate-45"></div>
            </div>
            <div className='w-2.5 h-0.5 bg-redLine flex-grow'></div>
        </div>

        {list ?
        (<div className="grid grid-cols-1 sm:gap-4">
            {list.map((item: { id: React.Key | null | undefined;  title: string; date: string; }) => (
                <div key={item.id} className="flex items-center justify-center mb-2 sm:border-b border-listGrayBorder">
                    <img src="/images/catalogue.png" alt="Icon" className="sm:hidden mb-1 mr-1" />
                    {/* <Link href={`/article/${props.parentId}/${props.id}/${props.index}/${item.id}`}  className='w-full pb-1' > */}
                    <Link href={`/article/${item.id}`}  className='w-full pb-1' >
                        <div className='flex justify-between'>
                            <div className={clsx('w-8/12 text-base sm:text-lg font-medium mr-2.5 line-clamp-1 text-ellipsis', )}>{item.title}</div>        
                            <div className='text-xs sm:text-sm text-grayListdate whitespace-nowrap '>
                            {item.date}
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>) : (
            <div className="grid grid-cols-1 sm:gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton className="h-12 w-full" />
              ))}
            </div>
        )}

        <div>
          {/* 列表长度大于0时才显示页码 */}
          {list.length > 0 && (
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
        <div className='hidden sm:flex items-center mt-6 sm:mt-2.5'>
            <div className='w-2.5 h-0.5 bg-redLine flex-grow'></div>
            <div className='w-7 h-7  border-solid border-2 border-transparent border-t-redCircle border-r-redCircle bg-transparent rotate-45'></div>
            <div className='w-7 h-7  border-solid border-2 border-transparent border-t-redCircle border-r-redCircle bg-transparent rotate-45'></div>
        </div>
    </div>
  );
};

export default List;
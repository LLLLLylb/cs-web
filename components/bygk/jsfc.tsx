'use client';

import { Pagination } from '@nextui-org/react';
import clsx from 'clsx';
import { useWindowSize } from 'react-use';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const Jsfc = (
    // { people }
    ) => {
  const title = '教师风采'
  const [dataArray, setDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [people, setPeople] = useState([]);
  const { width: screenWidth } = useWindowSize(); 
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  const { data, error } = useSWR('https://doc.yihuolu.cn/api/v2/articles/menu/16?page=1&page_size=30&brief_length=10',fetcher, { revalidateOnFocus: false });
  
  useEffect(() => {
    if (screenWidth < 768) {
      setItemsPerPage(8);
    }
  }, []);
  useEffect(() => {
    if (data) {
      setDataArray((prevDataArray) => {
        const updatedDataArray = data.data.data.map((item: { id: number; order: number; }) => {
          if (item.id === 3) {
            item.order = 0;
          } else if (item.id === 4) {
            item.order = 1;
          } else if (item.id === 5) {
            item.order = 2;
          } else {
            item.order = item.id + 2;
          }
          return item;
        });
  
        updatedDataArray.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
  
        setPeople(updatedDataArray.slice(0, itemsPerPage));
        setPages(Math.ceil(parseInt(data.data.total) / itemsPerPage));
  
        return updatedDataArray;
      });
      
    }

  }, [data]);

    
  // 页面切换
  const handlePageChange = async (pageNumber: number) => {

    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = dataArray.slice(startIndex, endIndex); 
    setPeople(displayedData);


    
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
    <div className='w-full sm:w-4/5 sm:pt-8 lg:pt-16'>
      <div className='sm:hidden self-start text-lg tracking-wider   text-paginationColor  pb-0.5'>新闻公告</div>
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
        {people.map((person: { id: React.Key | null | undefined;  title: string; image: string; }) => (
          <div key={person.id} className="flex flex-col items-center" >
            <div className='border border-black p-3 shadow-custom flex flex-col items-center'>
              <div className="w-[90px] h-[120px] custom:w-[120px] custom:h-[160px] bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${person.image})` }}></div>
              <span className="text-center text-sm sm:text-base pt-1">{person.title}</span>
            </div>
            
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-4 sm:mt-10'>
            <button onClick={()=> handlePageChange(1)} className='bg-background-200 text-sm sm:text-base font-medium text-foreground-100
              rounded  sm:px-2.5 mr-1 h-2.25'>首页</button>
                <Pagination
                    radius={'sm'}
                    total={pages}
                    page={currentPage}
                    onChange={handlePageChange}
                    classNames={{ item:['h-8','w-8','sm:h-[36px]','sm:w-[36px]'],cursor: ['bg-paginationColor','h-8','w-8','sm:h-[36px]','sm:w-[36px]']}}
                />
            <button onClick={()=> handlePageChange((currentPage < pages ? currentPage + 1 : currentPage))} 
              className='bg-background-200 text-sm sm:text-base font-medium text-foreground-100
                rounded sm:px-2.5 ml-1 h-2.25' >
                下一页
            </button>
        </div>
      <div className='hidden sm:flex items-center mt-6 sm:mt-2.5'>
            <div className='w-2.5 h-0.5 bg-redLine flex-grow'></div>
            <div className='w-7 h-7  border-solid border-2 border-transparent border-t-redCircle border-r-redCircle bg-transparent rotate-45'></div>
            <div className='w-7 h-7  border-solid border-2 border-transparent border-t-redCircle border-r-redCircle bg-transparent rotate-45'></div>
      </div>
    </div>
    
  );
};

export default Jsfc;
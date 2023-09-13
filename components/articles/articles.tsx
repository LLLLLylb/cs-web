'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Breadcrumbs from './breadcrumbs';
import useSWR from 'swr';


const Articles = (
    // props: { parentId: any; catalogueId: any; id: any; index: any}
    props: {  id: any; }

) => {

      let articleData 
      const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
      const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/articles/${props.id}`, fetcher);
        if (data) {
            articleData = data.data
        }

  return (
    <div>
        {/* <Breadcrumbs parentId={props.parentId} catalogueId={props.catalogueId} index={props.index} id={props.id}/> */}
        
        {articleData ?
        (<div className="max-w-6xl mx-auto flex flex-col items-center justify-center  pt-3 sm:pt-8 p-10 rounded shadow sm:shadow-none">
            <div className='sm:hidden self-start text-lg tracking-wider mb-2 border-b text-paginationColor border-paginationColor pb-0.5'>新闻公告</div>
            <h1 className="text-lg sm:text-2xl font-semibold sm:font-bold mb-2">{articleData.title}</h1>
            <div className="text-sm sm:text-base text-gray-500 mb-2 border-b w-full border-listGrayBorder pb-1 flex justify-center">
                发布时间：{articleData.date} 
            </div>
            <div className='articles' dangerouslySetInnerHTML={{ __html: articleData.content }}></div>
            {articleData.attName && (
                <div className='self-start'>
                    附件
                    <a href="/" download>【{ articleData.attName }】</a>
                </div>
            )}
        </div>) : 
        (<p></p> )
        }
    </div>

  );
};

export default Articles;
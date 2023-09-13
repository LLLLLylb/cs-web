'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import useSWR from 'swr';



const Breadcrumbs = (
  props: { parentId: any; catalogueId: any; id: any; index: any}
) => {
  let ParentId = props.parentId
  let items 
  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  if (props.parentId == 1) {
    const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/menus/${props.catalogueId}`, fetcher);
    if (data) {
      items = data.data
    }
    ParentId = props.catalogueId
  }else{
    const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/menus/${props.parentId}`, fetcher);
    if (data) {
      items = data.data
    }
  }

  return (
    <nav className="text-sm sm:text-base sm:h-14 lg:h-20 bg-breadcrumbsBg hidden sm:flex">
      {items ?
      (<ol className="list-none flex items-center backdrop-filter backdrop-blur-sm sm:ml-14 lg:ml-56">
        <li className="mr-1 text-breadcrumbsText2">当前位置：
        <Link href='/' className="text-breadcrumbsText font-medium">
              首页&nbsp;&gt;&nbsp;
          </Link>
          <Link href={`/catalogue/1/${items.id}`} className="text-breadcrumbsText font-medium">
            {items.name}
          </Link>
        </li>
        {
          <li  className="flex items-center">
            {parseInt(props.parentId) !== 1 ? (
              <Link href={`/catalogue/${props.parentId}/${props.catalogueId}/${props.index}`} className="text-breadcrumbsText font-medium">&gt;&nbsp;{items.children[props.index].name}</Link>
            ) : (
              <p></p>
            )}
          </li>
        }
          <span className="mx-1 text-breadcrumbsText2 "> &gt; </span>
          <span className="text-breadcrumbsText2 ">正文</span>
      </ol>)
      :
      (<p></p>)
      }
    </nav>
  );
};

export default Breadcrumbs;
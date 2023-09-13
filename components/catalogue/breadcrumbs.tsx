'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import useSWR from 'swr';



const Breadcrumbs = (
  props: { parentId: any; id: any; index: any}
) => {
  
      let ParentId = props.parentId
      let items 
      const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
      if (props.parentId == 1) {
        const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/menus/${props.id}`, fetcher);
        if (data) {
          items = data.data
        }
        ParentId = props.id
      }else{
        const { data, error } = useSWR(`https://doc.yihuolu.cn/api/v2/menus/${props.parentId}`, fetcher);
        if (data) {
          items = data.data
        }
      }
  return (
    <nav className="text-sm sm:text-base h-6 self-end  sm:ml-52 lg:ml-64">
      {items ?
      (<ol className="list-none flex backdrop-filter backdrop-blur-sm">
        <li className="mr-1">
        <Link href='/' className="text-white font-semibold">
              首页&nbsp;&gt;&nbsp;
          </Link>
          <Link href={`/catalogue/1/${items.id}`} className="text-white font-semibold">
            {items.name}
          </Link>
        </li>
        {
          <li  className="flex items-center">
            {parseInt(props.parentId) !== 1 ? (
              <span className="text-white font-semibold">&gt;&nbsp;{items.children[props.index].name}</span>
            ) : (
              <p></p>
            )}
          </li>
        }
      </ol>)
      :
      (<p></p>)
      }
    </nav>
  );
};

export default Breadcrumbs;
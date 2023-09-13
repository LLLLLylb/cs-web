'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import useSWR from 'swr';
import { SelectItem } from '@nextui-org/react';

const VerticalNav = (
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
    
    <nav className="flex-col ml-5 hidden sm:flex sm:w-36 lg:w-52 absolute top-[64%] lg:top-3/4">
      {items  ?
        (<div>
          <div className="flex justify-center items-center text-white h-[55px] lg:h-[75px]  bg-[url('/images/SidebarNnavigationTitleV2.svg')] bg-cover">
          <Link href={`/catalogue/1/${items.id}/${props.index}`} className="hover:font-semibold w-full text-center	">
            {items.name}
          </Link>
          </div>
          <div>
            {items.children.map((item: { id: number; name: string;}, childIndex: number) => (
              <Link key={item.id} href={`/catalogue/${ParentId}/${item.id}/${childIndex}`} className={clsx("flex justify-center items-center h-12 lg:h-16 bg-primary-100 text-primary-50",
                  props.id == item.id ? 'bg-verticalNavSelect text-white' : '')}>
                  {item.name}
              </Link>
            ))}
        </div>
        </div> )
      :
            (<p></p> )}

    </nav>
  );
};

export default VerticalNav;
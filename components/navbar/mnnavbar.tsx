'use client';

import React, { useEffect, useState } from 'react';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from '@nextui-org/react';
import Link from 'next/link';
import Logo from './Logo';
import Search from './Search'
import clsx from 'clsx';
import useSWR, { mutate } from 'swr'
import { GoChevronDown, GoChevronUp, GoChevronRight } from 'react-icons/go';


export default function Mnnavbar() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuItemHoverStates, setMenuItemHoverStates] = useState<{ [key: number]: boolean }>({});
  const [subMenuStates, setSubMenuStates] = React.useState<Record<string, boolean>>({});

  const toggleSubMenu = (itemName: string | number) => {
    setSubMenuStates((prevStates) => ({
      ...prevStates,
      [itemName]: !prevStates[itemName],
    }));
  };

  const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
  const { data, error } = useSWR('https://doc.yihuolu.cn/api/v2/menus', fetcher, { revalidateOnFocus: false });
  
  let updatedData = []
  if (data) {
    updatedData = data.data.children.filter((item: { id: any; }) => item.id !== 5 && item.id !== 7);
    const newItem = { id: 5, name: '人才培养', show: true, type: "CATALOGUE", link: null, open_mode: "SELF", order: 4, parent_id: 1, children:[
        {id:5, name: '本科生教育', show: true, type: "CATALOGUE", link: null, open_mode: "SELF",},
        {id:7, name: '研究生教育', show: true, type: "CATALOGUE", link: null, open_mode: "SELF",}
    ]};
    updatedData.splice(3, 0, newItem);
  }


  

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='p flex items-center justify-between pt-5 pl-5 lg:pl-0 pr-6 mr-[34px]'>
        <Logo />
        <div className="flex items-center">
          <Search/>
          {/* 小屏导航 */}
          <Navbar classNames={{wrapper: ['w-0 px-0']}} className='w-0'>
            <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='custom:hidden ml-[10px]' />
            {data && data !== null ? 
            (<NavbarMenu className='gap-0 top-[4.5rem]'>
                <NavbarItem className='py-2 border-b border-grayBorder'>
                  <Link href='/' className="inline-flex items-center w-full h-full">首页</Link>
                </NavbarItem>

                {updatedData.map((item: { id: number; name: string; link: null | string ;children: { id: number; name: string; link: null | string }[]; }, index: number) => {
                    // const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false); // 独立的状态变量
                    const isSubMenuOpen = subMenuStates[item.name] || false;
                    
                    return (
                    <NavbarItem key={`${item.name}-${index}`} className='py-2 border-b border-grayBorder'>
                        {item.children?.length ? (
                        // 父级导航项
                        <div>
                            <div className='flex justify-between' 
                            onClick={(e) => {
                                e.stopPropagation(); // 阻止事件冒泡
                                toggleSubMenu(item.name);
                            }}>
                                    
                            <Link href={`/catalogue/${item.id}/${index}`}>
                                {item.name}
                            </Link>
                            {isSubMenuOpen ? (
                                <GoChevronUp />
                            ) : (
                                <GoChevronDown />
                            )}
                            </div>
                        
                            {isSubMenuOpen && (
                            // 子菜单项
                            <div className="mt-0 bg-white py- dark:bg-gray-800 dark:border-gray-700 flex flex-wrap">
                                {item.children.map((child: { id: number; name: string; link: null | string }, childIndex: number) => (
                                <Link
                                    href={`/catalogue/${child.id}/${childIndex}`}
                                    key={`${child.name}-${childIndex}`}
                                    className="flex justify-center items-center w-1/2 px-1 py-1 min-w-[79px]" // 每行两个，所以宽度设置为一半
                                >
                                    {child.name}
                                </Link>
                                ))}
                            </div>
                            )}

                        </div>
                        ) : (
                        // 无子菜单项
                        <div>
                          {item.link ? (
                            <Link href={item.link}  className="inline-flex items-center w-full" replace>{item.name}</Link>
                          ) : (
                            <Link href={`/catalogue/${item.id}`} className="inline-flex items-center w-full">{item.name}</Link>
                          ) }
                        </div>
                        )}
                    </NavbarItem>
                    );
                })}
            </NavbarMenu>)
            :
            (<p></p> )}

          </Navbar>
        </div>
      </div>

      <Navbar
        maxWidth='full'
        classNames={{
          wrapper: ['justify-center ba'],
        }}
        className={clsx('justify-center hidden custom:flex h-12 backdrop-blur-none bg-transparent')}
      >
        
        {data && data !== null ? 
        (<NavbarContent className='hidden gap-3 custom:flex' justify='center'>
          {/* 导航 */}
          <NavbarItem><Link href='/' className="inline-flex items-center">首页</Link></NavbarItem>
          {updatedData.map((item: { id: number; name: string; link: null | string ;children: { id: number; name: string; link: null | string }[]; }, index: number) => {

            const isHovered = menuItemHoverStates[index] || false;

            const handleMouseEnter = () => {
              setMenuItemHoverStates((prevState) => ({
                ...prevState,
                [index]: true,
              }));
            };

            const handleMouseLeave = () => {
              setMenuItemHoverStates((prevState) => ({
                ...prevState,
                [index]: false,
              }));
            };

            return (
              <NavbarItem key={`${item.name}-${index}`}>
                {item.children?.length ? (
                  // 有子菜单
                  <div
                    className="relative inline-block group"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/catalogue/1/${item.id}/${index}`}
                      className="inline-flex items-center transition transform-gpu duration-300"
                    >
                      {item.name}
                      {isHovered ? (
                        <GoChevronRight className="ml-1" />
                      ) : (
                        <GoChevronDown className="ml-1" />
                      )}
                    </Link>
                    {/* 子菜单 */}
                    <div className="absolute left-0 hidden mt-0 border-t-2 border-t-customBorder rounded-sm shadow space-y-1 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 group-hover:block">
                      {item.children.map((child: { id: number; name: string; link: null | string }, childIndex: number) => (
                        <Link
                          href={`/catalogue/${item.id}/${child.id}/${childIndex}`}
                          key={`${child.name}-${childIndex}`}
                          className="block px-1 py-1 min-w-[79px]"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  // 无子菜
                  <div>
                    {item.link ? (
                      <a href={item.link}  className="inline-flex items-center" target="_blank">{item.name}</a>
                    ) : (
                      <Link href={`/catalogue/1/${item.id}/0`} className="inline-flex items-center">{item.name}</Link>
                    ) }
                  </div>
                )}
              </NavbarItem>
            );
          })}
        </NavbarContent>)
        :
        (<p></p> )}


      </Navbar>
  </div>
  );
}

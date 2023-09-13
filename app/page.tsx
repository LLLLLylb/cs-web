'use client';

import React from 'react';
import Tzgg from '@/components/newslist/tzgg';
import Rcpy from '@/components/newslist/rcpy';
import Xyxw from '@/components/newslist/xyxw'
import Djgz from "@/components/newslist/djgz";
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import SearchResults from '@/components/searchResults';
import Link from 'next/link';


export default function Home() {
  return (
    <div className='max-w-6xl mx-auto bg-'>
      <ThemeSwitcher/>
      <div className='flex flex-col lg:flex-row'>
        <Xyxw/>
        <Tzgg/>
      </div>
      <Rcpy/>
       <Djgz/>
      {/* <SearchResults/> */}
    </div>
  )
}

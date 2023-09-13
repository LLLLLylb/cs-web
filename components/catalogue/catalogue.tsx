'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import List from './list';  
import Jsfc from '../bygk/jsfc';
import JsfcContent from '../bygk/jsfcContent';
import Byjj from '../bygk/byjj';
import Zzjg from '../bygk/zzjg';



const Catalogue = (
    props: { parentId: any; id: any; index: any},
) => {
    let componentToRender;

  // 使用条件语句根据不同的 id 值来选择组件
  if (props.id == 13 || props.id == 2) {
    componentToRender = <Byjj id={props.id}/>;
  } else if (props.id == 14 || props.id == 15) {
    componentToRender = <Zzjg id={props.id} />;
  } 
  else if (props.id == 16) {
    componentToRender = <Jsfc />;
  }
   else {
    componentToRender = <List parentId={props.parentId} id={props.id} index={props.index} />;
  }

  return (
    <div>
        <div className="flex justify-end  mx-auto lg:max-w-[1027px] sm:max-w-[580px] max-w-[342px]">
            {componentToRender}
        </div>
    </div>


  );
};

export default Catalogue;
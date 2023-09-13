'use client';

import { Pagination } from '@nextui-org/react';
import clsx from 'clsx';
import React from 'react';

const JsfcContent = (
    // { people }
    ) => {
  const title = '教师风采'
  const person = 
    {name:"林耀进", 
    image: "/images/lyj.jpg", 
    title: '个人简介',
    introduction: `林耀进，教授，计算机学院院长、福建省数据科学与智能应用高校重点实验室主任。
    合肥工业大学博士，天津大学博士后。曾获福建省百千万人才工程、福建省高层次人才、福建省优秀教师、
    福建省青年五四奖章、福建省高校新世纪优秀人才、福建省高校杰出青年科研人才等称号。
    中国人工智能学会粒计算与知识发现专委会常务委员，中国人工智能学会知识工程与分布智能专委会委员，
    福建省人工智能学会副理事长，福建省计算机学会常务理事，福建省中小学人工智能教指委委员。
    计算机科学与技术国家一流专业建设点负责人，福建省计算机科学与技术应用型学科带头人，
    福建省不确定信息处理专业硕士导师团队带头人。主要从事大数据知识发现与机器学习的研究，
    在该领域主持国家自然科学基金3项，参与国家自然科学基金4项，主持省级重点自然科学基金、
    重大教改项目各一项；在CVPR、IJCAI、软件学报、电子学报、TKDE、TKDD、TNNLS、TFS、PR等国内外
    著名会议期刊发表论文100多篇。获福建省科技进步奖一等奖项（排名第四）、三等奖一项（排名第一），
    福建省科协自然科学优秀论文一等奖、二等奖各1次、福建省教学成果奖二等奖2次（排名第1一次）。
    近三年主讲《数据挖掘》、《数据库原理及应用》、《大数据导论》等本科课程，发表教改论文数篇，
    教学过程中指导学生参加多种科技及大学生创新创业项目与竞赛，并多次获奖。`}
  

  
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
      <div className='sm:hidden flex justify-center font-semibold text-lg tracking-widest'>{person.name}</div>
      <div className='flex tracking-widest leading-8'>
        <div className="hidden w-1/6 sm:flex flex-col items-center">
              <div className="border border-black shadow-content w-[120px] h-[160px] bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${person.image})` }}></div>
              <span className="text-center mt-3">{person.name}</span>
        </div>
        <div className="sm:w-5/6 sm:ml-12">
          <div className='mb-6'>
            <p className='font-semibold text-lg'>{person.title}</p>
            <p className='tracking-wide indent-8 '>{person.introduction}</p>
          </div>
          <div  className='mb-6'>
            <p className='font-semibold text-lg'>{person.title}</p>
            <p className='tracking-wide indent-8'>{person.introduction}</p>
          </div>
        </div>
      </div>

     

      <div className='hidden sm:flex items-center mt-6 sm:mt-6'>
            <div className='w-2.5 h-0.5 bg-redLine flex-grow'></div>
            <div className='w-7 h-7  border-solid border-2 border-transparent border-t-redCircle border-r-redCircle bg-transparent rotate-45'></div>
            <div className='w-7 h-7  border-solid border-2 border-transparent border-t-redCircle border-r-redCircle bg-transparent rotate-45'></div>
      </div>
    </div>
    
  );
};

export default JsfcContent;
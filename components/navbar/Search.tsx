'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { SetStateAction, useState } from 'react';

export default function Logo() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push(`/search?keyword=${searchQuery}`);
  };
  const handleSearchIconClick = () => {
    // 在这里触发搜索事件，可以调用 handleSearchSubmit 函数或其他相关逻辑
    handleSearchSubmit({ preventDefault: () => {} });
  };

  return (
      <form onSubmit={handleSearchSubmit}>
        <Input
          classNames={{
            base: 'lg:max-w-[10rem] max-w-[5rem]',
            input: 'text-small',
            inputWrapper: 'h-1 border border-customBorder font-normal text-default-500 bg-default-backgroud dark:bg-default-500/20',
            innerWrapper: 'cursor-pointer'
          }}
          placeholder='搜索'
          endContent={<AiOutlineSearch  onClick={handleSearchIconClick}/>}
          size='sm'
          type='search'
          onChange={handleSearchInputChange}
        />
      </form>
  );
}

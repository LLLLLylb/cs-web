// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      The current theme is: {theme}
      <button className='text-primary-200' onClick={() => {setTheme('light');console.log('12312313', 12312313)} }>Light Mode &ensp;&ensp;</button>
      <button className='text-primary-200' onClick={() => setTheme('dark')}>Dark Mode</button>

        
    </div>
  )
};
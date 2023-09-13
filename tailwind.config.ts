import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'custom': '884px',
      },
      colors: {
        customBorder: '#291F64',
        grayBorder: '#F1F5F9',
        listGrayBorder: 'rgba(166, 166, 166, 1)',
        activeText: '#291F64',
        grayText: 'rgba(12, 7, 37, 0.20)',
        briefText: 'rgba(12, 7, 37, 0.80)',
        timeText: '#CBD5E1',
        rcpyTimeText: 'rgba(12, 7, 37, 0.50)',
        background: '#fdfdfd',
        grayBackground: '#F3F2F6',
        redLine: 'rgba(124, 0, 0, 1)',
        redCircle: '#7c0000',
        grayListTime: 'rgba(166, 166, 166, 1)',
        paginationColor: 'rgba(41, 32, 97, 1)',
        verticalNavSelect: 'rgba(41, 32, 97, 0.5)',
        verticalNavDeSelect: '#efefef',
        breadcrumbsBg:'rgba(220, 238, 245, 1)',
        breadcrumbsText:'rgba(42, 130, 228, 1)',
        breadcrumbsText2:'rgba(135, 149, 156, 1)'
      },
      boxShadow: {
        'custom': '10px 8px 2px rgba(41, 31, 100, 0.8)',
        'content': '6px 6px 1px rgba(41, 31, 100, 0.8)',
      },
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: {
              50:"#FDFDFD",
              100: "#f3f2f6",//人才培养
              200: '#f4f4f5',//页码
            }, 
            foreground: {
              50: "#0C0725",
              100: '#000',//页码
            }, 
            primary: {
              //... 50 to 900
              50: "#291F64", //蓝
              100: "#F3F2F6",//灰
              200: "#7C0000",//红
              300: 'rgba(12,7,37,0.8)', //brief
              400: 'rgba(12, 7, 37, 0.2)',//更多
              500: 'rgba(203, 213, 225, 1)',//日期
              DEFAULT:"#FDFDFD"
            },
          },
        },
        dark: {
          colors: {
            background: {
              50: "#050505",
              100: "rgba(30,26,41,1)",
              200: '#27272a',
            }, 
            foreground: {
              50: "#fafafa",
              100: '#fff',
            }, 
            primary: {
              //... 50 to 900
              50: "#291F64",
              100: "#1e1a29",
              200: "#ff6666",
              300: 'rgba(250,250,250,0.8)',
              400: 'rgba(250, 250, 250, 0.2)',
              500: 'rgba(203, 213, 225, 1)',

              DEFAULT:"#050505"
            },
          },
        },
      },
    }),
  ],
};
export default config;

import React from 'react';
import dynamic from 'next/dynamic';
// import HomeComponent from '@/components/home';
const HomeComponent = dynamic(() => import('@/components/home/index'), {
  ssr: false,
});

export default function Home() {
  return <HomeComponent />;
}

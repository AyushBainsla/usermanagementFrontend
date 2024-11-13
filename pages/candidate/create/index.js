import React from 'react';
import dynamic from 'next/dynamic';
// import HomeComponent from '@/components/home';
const CreateCandidateComponent = dynamic(() => import('@/components/home/CandidateForm'), {
  ssr: false,
});

export default function Home() {
  return <CreateCandidateComponent action={'view'}/>;
}

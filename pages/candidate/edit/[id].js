import React from 'react';
import dynamic from 'next/dynamic';
// import HomeComponent from '@/components/home';
const EditCandidateComponent = dynamic(() => import('@/components/home/CandidateForm'), {
  ssr: false,
});

export default function Home() {
  return <EditCandidateComponent action={'edit'}/>;
}

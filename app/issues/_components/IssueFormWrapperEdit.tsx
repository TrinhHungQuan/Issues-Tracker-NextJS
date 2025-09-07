'use client';

import dynamic from 'next/dynamic';
import IssueFormSkeleton from '@/app/issues/new/loading';

const IssueForm = dynamic(
  () => import('./IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);

export default IssueForm;
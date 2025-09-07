import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'
import IssueForm from '@/app/issues/_components/IssueFormWrapperEdit';

interface Props {
    params: Promise<{id: string}>
}

const EditIssuePage = async ({params}: Props) => {
    const {id} = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    });

    if (!issue) notFound();

    return (
        <IssueForm issue={issue}/>
    )
}

export default EditIssuePage
import Pagination from "@/app/components/Pagination";
import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnName, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import PageSizeSelect from "@/app/components/PageSizeSelect";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // ✅ Await searchParams since it's async
  const resolvedSearchParams = await searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status as Status)
    ? resolvedSearchParams.status
    : undefined;
  const where = { status };

  const orderBy =
    columnName.includes(resolvedSearchParams.orderBy) &&
    (resolvedSearchParams.direction === "asc" ||
      resolvedSearchParams.direction === "desc")
      ? { [resolvedSearchParams.orderBy]: resolvedSearchParams.direction }
      : undefined;

  const page = parseInt(resolvedSearchParams.page) || 1;
  const pageSize = parseInt(resolvedSearchParams.pageSize) || 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex className="flex-col gap-3">
      <IssueActions />
      <IssueTable searchParams={resolvedSearchParams} issues={issues} />
      <Flex className="gap-3">
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
        <PageSizeSelect />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;

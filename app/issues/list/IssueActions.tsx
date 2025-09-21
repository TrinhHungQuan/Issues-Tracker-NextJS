import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueAssigneeFilter from "./IssueAssigneeFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Flex gap="3">
        <Flex className="items-center gap-1">
          <Text className="text-sm">Assignee:</Text>
          <IssueAssigneeFilter />
        </Flex>
        <Flex className="items-center gap-1">
          <Text className="text-sm">Status:</Text>
          <IssueStatusFilter />
        </Flex>
      </Flex>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;

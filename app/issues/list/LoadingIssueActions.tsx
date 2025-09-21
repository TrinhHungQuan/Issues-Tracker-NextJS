import { Flex } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueActions = () => {
  return (
    <Flex justify="between" className="mb-4">
      <Flex gap="3">
        <Flex className="items-center gap-1">
          <Skeleton width={70} height={20} /> {/* "Assignee" */}
          <Skeleton width={120} height={30} /> {/* dropdown */}
        </Flex>
        <Flex className="items-center gap-1">
          <Skeleton width={50} height={20} /> {/* "Status" */}
          <Skeleton width={120} height={30} /> {/* dropdown */}
        </Flex>
      </Flex>
      <Skeleton width={100} height={36} /> {/* "New Issue" button */}
    </Flex>
  );
};

export default LoadingIssueActions;

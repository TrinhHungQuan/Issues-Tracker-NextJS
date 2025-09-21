"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueAssigneeFilter = () => {
  const { data: users, error, isLoading } = useUsers();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (isLoading && !users) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={searchParams.get("assigneeId") || "ALL"}
      onValueChange={(assigneeId) => {
        const params = new URLSearchParams(searchParams.toString());
        if (!assigneeId || assigneeId === "ALL") {
          params.delete("assigneeId");
        } else if (assigneeId === "UNASSIGNED") {
          params.set("assigneeId", "UNASSIGNED");
        } else {
          params.set("assigneeId", assigneeId);
        }

        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by assignee" />
      <Select.Content>
        <Select.Item value="ALL">All</Select.Item>
        <Select.Item value="UNASSIGNED">Unassigned</Select.Item>
        {users?.map((user) => (
          <Select.Item key={user.id} value={user.id}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["user"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default IssueAssigneeFilter;

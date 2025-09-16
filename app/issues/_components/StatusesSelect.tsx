import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
  status: Status;
  onChange?: (status: Status) => void;
}

const statuses: Record<Status, { label: string }> = {
  OPEN: { label: "Open" },
  IN_PROGRESS: { label: "In Progress" },
  CLOSED: { label: "Closed" },
};

const StatusesSelect = ({ issue, status, onChange }: Props) => {
  const changeStatus = async (newStatus: string) => {
    onChange?.(newStatus as Status);
  };
  return (
    <>
      <Select.Root
        value={status}
        defaultValue={issue.status}
        onValueChange={changeStatus}
      >
        <Select.Trigger placeholder="Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Statuses</Select.Label>
            {Object.entries(statuses).map(([key, { label }]) => (
              <Select.Item key={key} value={key}>
                {label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusesSelect;

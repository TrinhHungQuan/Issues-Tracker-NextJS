"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PageSizeSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSize = parseInt(searchParams.get("pageSize") || "10");

  const changeSize = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", value);
    params.set("page", "1");
    router.push("?" + params.toString());
  };
  return (
    <Select.Root value={currentSize.toString()} onValueChange={changeSize}>
      <Select.Trigger />
      <Select.Content>
        <Select.Item value="5">5</Select.Item>
        <Select.Item value="10">10</Select.Item>
        <Select.Item value="20">20</Select.Item>
        <Select.Item value="50">50</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default PageSizeSelect;

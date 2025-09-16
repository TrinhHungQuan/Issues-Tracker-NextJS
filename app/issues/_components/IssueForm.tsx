"use client";

import { Button, Callout, Select, Text, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/ValidationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue, Status } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";
import StatusesSelect from "./StatusesSelect";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="gap-3" onSubmit={onSubmit}>
        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-3">
            <TextField.Root
              defaultValue={issue?.title}
              placeholder="Title"
              {...register("title")}
            ></TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <SimpleMDE placeholder="Description" {...field} />
              )}
              defaultValue={issue?.description}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </div>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <StatusesSelect
                issue={issue!}
                status={field.value as Status}
                onChange={(val) => setValue("status", val)}
              />
            )}
          />
          <ErrorMessage>{errors.status?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting}>
          {issue ? "Udpate Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;

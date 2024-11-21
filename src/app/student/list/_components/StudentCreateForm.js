"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

const StudentCreateFormSchema = z.object({
  name: z.string().nonempty({ message: "Name is require data." }),
  major: z.string().nonempty({ message: "Major is require data." }),
  avatar: z.string().nonempty({ message: "Avatar is require data." }),
  email: z.string().nonempty({ message: "Email is require data." }),
});
const StudentCreateForm = () => {
  const queryClient = useQueryClient();
  const createStudent = async (newStudent) => {
    const res = await fetch("https://st-api.kaungmyatsoe.dev/api/v1/students", {
      method: "POST",
      headers: {
        key:
          "43/UgWoJWW8pXKRmM48xYp8uuIXXLaBM1USAblj50X5GrVUdaluW36lEjoAbylSL6m4g9OXOxb9p7teXUyph5w",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });
    const data = await res.json();
    return data;
  };

  const addStudentMutation = useMutation({
    mutationKey: ["create-student"],
    mutationFn: createStudent,
    onSuccess: (data) => {
      console.log(data);
      toast.dismiss();
      toast.success("Successfully Create Student!");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const form = useForm({
    resolver: zodResolver(StudentCreateFormSchema),
    defaultValues: {
      name: "",
      major: "0",
      avatar: "",
      email: "",
    },
    disabled: addStudentMutation.isPending,
  });

  const onSubmit = (values) => {
    console.log(values);
    toast.loading("Create Processing.....");
    addStudentMutation.mutateAsync(values);
  };
  return (
    <div>
      StudentCreateForm
      <div className=" w-[40%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="avatar"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="major"
              control={form.control}
              render={({ field }) => {
                console.log(field);
                return (
                  <FormItem>
                    <FormLabel>Major</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue="0"
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a major" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Select a major</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="math">Math</SelectItem>
                          <SelectItem value="physic">Physic</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button disabled={addStudentMutation.isPending}>
              {addStudentMutation.isPending && <Loader2Icon size={22} />} Add
              Student
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StudentCreateForm;

"use client";

import z from "zod/v4";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  endpoint: z.url({ message: "Please enter a valid url" }),
  method: z.enum(["GET", "PATCH", "PUT", "POST", "DELETE"]),
  body: z.string(),
});

interface ManualTriggerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof FormSchema>) => void;
  defaultEndpoint?: string;
  defaultMethod?: "GET" | "PATCH" | "PUT" | "POST" | "DELETE";
  defaultBody?: string;
}

export type HTTPNodeFormValues = z.infer<typeof FormSchema>;

export function HTTPRequestDialog({
  onOpenChange,
  open,
  onSubmit,
  defaultBody = "",
  defaultEndpoint = "",
  defaultMethod = "GET",
}: ManualTriggerDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      endpoint: defaultEndpoint,
      method: defaultMethod,
      body: defaultBody,
    },
    resolver: zodResolver(FormSchema),
  });

  const watchMethod = form.watch("method");
  const showBodyField = ["POST", "PATCH", "PUT"].includes(watchMethod);

  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    onSubmit(values);
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      form.reset({
        endpoint: defaultEndpoint,
        method: defaultMethod,
        body: defaultBody,
      });
    }
  }, [open, defaultBody, defaultEndpoint, defaultEndpoint, form]);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configure settings for the HTTP request node
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-xs">
                    The HTTP method that will be used for making a request
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint URL </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://api.example.com/users/{{httpResponse.data.id}}"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Static URL or use {"{{variables}}"} for simple use values or{" "}
                    {"{{json variables}}"} to stringify objects
                  </FormDescription>
                </FormItem>
              )}
            />

            {!!showBodyField && (
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Body </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-[120px]"
                        placeholder={`
                          {
                          "name": "John Doe",
                          "email": "{{trigger.email}}",
                          "metadata": "{{json some_variable}}"}'
                          }`}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      The request body. Use{`{{variable}}`} for dynamic values,
                      or
                      {`{{json variable}}`} to stringify JSON.
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="mt-4">
              <Button type="submit">Save Configuration</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

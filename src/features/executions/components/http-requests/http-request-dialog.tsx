"use client";

import z from "zod/v4";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
  endpoint: z.string().min(1, { message: "Please enter a valid url" }),
  method: z.enum(["GET", "PATCH", "PUT", "POST", "DELETE"]),
  body: z.string(),
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[$A-Za-z_][0-9A-Za-z_$]*$/, {
      message:
        "Variable name Must start with a letter or underscore May contain only letters, digits, and underscores after the first character",
    }),
});

export type HTTPNodeFormValues = z.infer<typeof FormSchema>;

interface ManualTriggerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof FormSchema>) => void;
  defaultValues?: Partial<HTTPNodeFormValues>;
}

export function HTTPRequestDialog({
  onOpenChange,
  open,
  onSubmit,
  defaultValues = {},
}: ManualTriggerDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      endpoint: defaultValues.endpoint || "",
      method: defaultValues.method || "GET",
      body: defaultValues.body || "",
      variableName: defaultValues.variableName || "",
    },
    resolver: zodResolver(FormSchema),
  });

  const watchMethod = form.watch("method");
  const watchVariableName = form.watch("variableName") || "myVariableName";
  const showBodyField = ["POST", "PATCH", "PUT"].includes(watchMethod);

  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    onSubmit(values);
    onOpenChange(false);
  };

  useEffect(() => {
    if (open) {
      form.reset({
        endpoint: defaultValues.endpoint || "",
        method: defaultValues.method || "GET",
        body: defaultValues.body || "",
        variableName: defaultValues.variableName || "",
      });
    }
  }, [open, defaultValues, form]);

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
              name="variableName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable Name </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="myVariable" />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Use this name to reference the result in other nodes{" "}
                    {`{${watchVariableName}.httpResponse.data}`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormMessage />
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
                  <FormMessage />
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
                    <FormMessage />
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

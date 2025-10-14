"use client";

import * as z from "zod/v4";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { Separator } from "@/components/ui/separator";
import { GithubIcon } from "@/components/ui/github-icon";
import { GoogleIcon } from "@/components/ui/google-icon";

const RegisterSchema = z
  .object({
    email: z.email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "The password should be atleast 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: RegisterSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Registering your account");
      setIsSubmitting(true);
      await authClient.signUp.email(
        {
          name: value.email.split("@")[0],
          email: value.email,
          password: value.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
            toast.dismiss(toastId);
            setIsSubmitting(false);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
            toast.dismiss(toastId);
            setIsSubmitting(false);
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6 h-screen justify-center w-full items-center">
      <Card className="border-none shadow-none md:w-xl w-full">
        <CardHeader className="text-center">
          <CardTitle>Get Started with Instrument!</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-4">
                <Button
                  className="w-full"
                  variant="outline"
                  disabled={isSubmitting}
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Continue with Github
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  disabled={isSubmitting}
                >
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground">
                <Separator decorative className="flex-1" />
                <span className="text-xs">OR</span>
                <Separator decorative className="flex-1" />
              </div>

              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="arno@mail.com"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder=""
                        autoComplete="off"
                        type="password"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="confirmPassword"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder=""
                        autoComplete="off"
                        type="password"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <div className="flex flex-col w-full gap-2">
            <Field>
              <Button
                disabled={isSubmitting}
                className=""
                type="submit"
                form="login-form"
              >
                Submit
              </Button>
            </Field>

            <div className="text-sm text-center">
              Already part of Instrument?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

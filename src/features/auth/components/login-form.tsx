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

const LoginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Please enter a valid password"),
});

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Verifying your Credentials");
      setIsSubmitting(true);
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            setIsSubmitting(false);
            toast.dismiss(toastId);
            router.push("/");
          },
          onError: (ctx) => {
            setIsSubmitting(false);
            toast.dismiss(toastId);
            toast.error(ctx.error.message);
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6 h-screen justify-center w-full items-center">
      <Card className="border-none shadow-none md:w-xl w-full">
        <CardHeader className="text-center">
          <CardTitle>Good to see you here!</CardTitle>
          <CardDescription>Login to continue</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form
            id="login-form"
            className="flex flex-col gap-4 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
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
            <FieldGroup>
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
            </FieldGroup>
            <Button
              disabled={isSubmitting}
              className="w-full"
              type="submit"
              form="login-form"
            >
              Submit
            </Button>

            <div className="text-sm text-center text-muted-foreground">
              New to Instrument?{" "}
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

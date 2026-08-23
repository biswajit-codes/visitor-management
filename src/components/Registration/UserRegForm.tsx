"use client";

import { userRegistrationSchema, UserRegistrationType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import createVisiter from "@/server/createVisiter";
import { useRouter } from "next/navigation";
import { toast } from "../shadcnui/toast";

const UserRegForm = () => {
  // const { push } = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<UserRegistrationType>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      purpose: "",
    },
    mode: "all",
  });

  const userRegHandeler = async (uData: UserRegistrationType) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { isSuccess, message } = await createVisiter(uData);

    if (isSuccess) {
      toast.add({
        type: "success",
        description: message,
      });
      reset();
      // push("/user");
    } else {
      toast.add({
        type: "error",
        description: "The event could not be created.",
        priority: "high",
      });
    }
  };

  return (
    <div className="w-full">
      {/* <Card> */}
      {/* <CardContent> */}
      {/* Header */}
      <div className="mb-5 text-center">
        <h1 className="text-foreground text-2xl font-bold tracking-tight">
          User Registration
        </h1>

        <p className="text-muted-foreground mx-auto mt-1.5 max-w-md text-sm leading-5">
          Fill in your information and our team will get back to you shortly.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(userRegHandeler)}>
        <FieldGroup className="gap-4">
          {/* Full Name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-foreground text-sm font-medium">
                  Full Name
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  className="border-input bg-background/80 h-10 shadow-sm"
                />

                {fieldState.invalid && (
                  <FieldError
                    className="text-destructive text-xs"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          {/* Email + Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1.5">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-foreground text-sm font-medium">
                    Email Address
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    inputMode="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                    className="border-input bg-background/80 h-10 shadow-sm"
                  />

                  {fieldState.invalid && (
                    <FieldError
                      className="text-destructive text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-1.5">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-foreground text-sm font-medium">
                    Phone Number
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="tel"
                    placeholder="9876543210"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={10}
                    aria-invalid={fieldState.invalid}
                    className="border-input bg-background/80 h-10 shadow-sm"
                  />

                  {fieldState.invalid && (
                    <FieldError
                      className="text-destructive text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Purpose */}
          <Controller
            name="purpose"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1.5">
                <FieldLabel
                  htmlFor={field.name}
                  className="text-foreground text-sm font-medium">
                  Purpose
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="What would you like to discuss?"
                  aria-invalid={fieldState.invalid}
                  className="border-input bg-background/80 h-10 shadow-sm"
                />

                {fieldState.invalid && (
                  <FieldError
                    className="text-destructive text-xs"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 mt-1 h-10 w-full font-semibold shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ?
              <span className="flex items-center justify-center gap-2">
                <span className="border-primary-foreground/30 border-t-primary-foreground h-4 w-4 animate-spin rounded-full border-2" />
                Submitting...
              </span>
            : <span className="flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Submit Registration
              </span>
            }
          </Button>
        </FieldGroup>
      </form>
      {/* </CardContent> */}
      {/* </Card> */}
    </div>
  );
};

export default UserRegForm;

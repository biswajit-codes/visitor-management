import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z.string().min(1, {
    error: "Full name is required",
  }),

  email: z.email({
    error: "Enter a valid email",
  }),

  purpose: z.string().min(1, {
    error: "Select your purpose",
  }),

  phone: z
    .string()
    .regex(/^\d{10}$/, { error: "Enter a valid 10-digit phone number" }),

  // currentTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
  //   error: "Enter a valid time (HH:mm)",
  // }),
});

export type UserRegistrationType = z.infer<typeof userRegistrationSchema>;

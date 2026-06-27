import { z } from "zod";

export const signupSchema = (t) => z.object({
  firstName: z.string().min(2, t("firstNameMin")),
  lastName: z.string().min(2, t("lastNameMin")),
  email: z.string().email(t("emailInvalid")),
  password: z.string().min(8, t("passwordMin")),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: t("passwordMismatch"),
  path: ["confirmPassword"],
});

export const loginSchema = (t) => z.object({
  email: z.string().email(t("emailInvalid")),
  password: z.string().min(1, t("passwordRequired")),
});
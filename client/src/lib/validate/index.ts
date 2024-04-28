import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(5, { message: "You should enter at least 5 characters" }).max(2200),
  password: z.string().min(5, { message: "You should enter at least 5 characters" }).max(2200)
})

export const registerSchema = z.object({
  username: z.string().min(5, { message: "You should enter at least 5 characters" }).max(2200),
  password: z.string().min(5, { message: "You should enter at least 5 characters" }).max(2200),
  role: z.string().min(1, { message: "You should enter a role" }).max(2200),
})

export const employeeAddSchema = z.object({
  name: z.string().min(5, { message: "You should enter at least 5 characters" }).max(2200),
  email: z.string().email({ message: "You should enter a valid email address" }).max(2200).optional().or(z.literal('')),
})
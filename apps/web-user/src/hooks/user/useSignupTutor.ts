import { createMutation } from "@/hooks/api/useApi"
import { useMutation } from "@tanstack/react-query"
import { TutorAccount } from "@repo/database/entities/tutorAccount"
import { z } from "zod"

export const signupSchema = z
  .object({
    Name: z.string().min(1, "Name is required"),
    Email: z.string().email("Valid email is required"),
    Password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please enter your confirmed password"),
  })
  .refine((data) => data.Password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  })

export type SignupSchemaType = z.infer<typeof signupSchema>

export function useSignupTutor() {
  return useMutation(
    createMutation<SignupSchemaType, TutorAccount>({
      path: "/api/signup-tutor",
      successToast: "Tutor account created",
    })
  )
}

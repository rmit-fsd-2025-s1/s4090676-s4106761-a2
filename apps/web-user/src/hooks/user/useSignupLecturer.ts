import { createMutation } from "@/hooks/api/useApi"
import { useMutation } from "@tanstack/react-query"
import { LecturerAccount } from "@repo/database/entities/lecturerAccount"
import { SignupSchemaType } from "./useSignupTutor"

export function useSignupLecturer() {
  return useMutation(
    createMutation<SignupSchemaType, LecturerAccount>({
      path: "/api/signup-lecturer",
      successToast: "Lecturer account created",
    })
  )
}

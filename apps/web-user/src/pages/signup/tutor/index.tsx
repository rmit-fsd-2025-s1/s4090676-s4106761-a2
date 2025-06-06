import { CentredFillLayout } from "@/layouts/CentredFillLayout"
import { Signup } from "@/features/Signup/Signup"
import { AccountType } from "@repo/types/enums"

export default function SignupRootRoute() {
  return (
    <CentredFillLayout>
      <Signup accountType={AccountType.TUTOR} />
    </CentredFillLayout>
  )
}

import { CentredFillLayout } from "@/layouts/CentredFillLayout"
import { Signup } from "@/features/Signup/Signup"

export default function SignupRootRoute() {
  return (
    <CentredFillLayout>
      <Signup accountType={AccountType.LECTURER} />
    </CentredFillLayout>
  )
}

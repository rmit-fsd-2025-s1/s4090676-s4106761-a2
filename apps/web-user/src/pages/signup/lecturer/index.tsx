import { CentredFillLayout } from "@/layouts/CentredFillLayout"
import { Signup } from "@/features/Signup/Signup"
import { AccountType } from "@/context/localstorage/enums"

export default function SignupRootRoute() {
  return (
    <CentredFillLayout>
      <Signup accountType={AccountType.LECTURER} />
    </CentredFillLayout>
  )
}

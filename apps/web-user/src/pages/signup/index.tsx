import { CentredFillLayout } from "@/layouts/CentredFillLayout";
import { PickType } from "@/features/Signup/PickType";

export default function SignupRootRoute() {
  return (
    <CentredFillLayout>
      <PickType />
    </CentredFillLayout>
  );
}

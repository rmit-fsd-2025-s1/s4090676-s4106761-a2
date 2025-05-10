import { Account } from "@/context/localstorage/types";
import { AccountType } from "@/context/localstorage/enums";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/localstorage/useUser";
import { toaster } from "@/components/ui/toaster";

export default function useRedirectUserPage() {
  const { push: navigate } = useRouter();
  const [userAccount] = useUser();

  return (user?: Account) => {
    switch (user?.type || userAccount?.type) {
      case AccountType.TUTOR:
        navigate("/tutor");
        break;
      case AccountType.LECTURER:
        navigate("/lecturer");
        break;
      default:
        toaster.create({
          description: "Account type is not defined. Please login again",
          type: "error",
        });
    }
  };
}

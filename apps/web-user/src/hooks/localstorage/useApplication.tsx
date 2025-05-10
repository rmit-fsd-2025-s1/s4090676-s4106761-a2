import { Application, UUID } from "@/context/localstorage/types";
import { useStore } from "@/hooks/localstorage/useStore";

/**
 * Get information on an application
 * Or update some part of the record
 */
export function useApplication(
  id: UUID,
): [
  Application | undefined,
  ((params: Partial<Application>) => void) | undefined,
] {
  const [applications, setApplication] = useStore("applications");

  const application = applications.find((a) => a.id === id);

  return [
    application,
    application &&
      ((newData: Partial<Application>) =>
        setApplication({
          ...application,
          ...newData,
        })),
  ];
}

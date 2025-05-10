import { useStore } from "@/hooks/localstorage/useStore";
import { AccountType } from "@/context/localstorage/enums";
import {
  LecturerAccount,
  TutorAccount,
  UUID,
} from "@/context/localstorage/types";

/**
 * Get information on the currently authenticated user
 * Or update some part of the record
 * Or pass an id and type to look up a user
 */
export function useUser(
  userIdParam?: UUID,
  userType?: AccountType,
): [
  typeof userData,
  ((params: Partial<Exclude<typeof userData, undefined>>) => void) | undefined,
] {
  const [tutors, setTutor] = useStore("tutorAccounts");
  const [lecturers, setLecturer] = useStore("lecturerAccounts");
  let [user] = useStore("authenticatedUser");

  if (userIdParam && userType) {
    user = { type: userType, id: userIdParam };
  } else if (!user) return [undefined, undefined];

  const userData = (user.type === AccountType.TUTOR ? tutors : lecturers).find(
    (r) => r.id === user.id,
  );

  if (!userData) return [undefined, undefined];

  return [
    userData,
    userData &&
      ((newData: Partial<typeof userData>) => {
        if (userData.type === AccountType.TUTOR) {
          setTutor({
            ...userData,
            ...(newData as TutorAccount),
          });
        } else {
          setLecturer({
            ...userData,
            ...(newData as LecturerAccount),
          });
        }
      }),
  ];
}

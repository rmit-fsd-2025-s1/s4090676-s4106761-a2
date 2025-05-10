import { TutorAccount } from "@/context/localstorage/types";
import { DetailedTableItem } from "@/components/DetailedTableItem";

const formatList = (items: string[] | undefined) =>
  items
    ? items.slice(0, -1).join(",") +
      (items.slice(0, -1).length ? " and " : "") +
      items.slice(-1)
    : "Not specified";

export function TutorName({ tutor }: { tutor: undefined | TutorAccount }) {
  const tutorData = tutor && {
    Name: tutor.name,
    Availability: tutor.availability ?? "Not specified",
    Skills: formatList(tutor.skills),
    Credentials: formatList(tutor.credentials),
  };

  return (
    <DetailedTableItem details={tutorData}>{tutor?.name}</DetailedTableItem>
  );
}

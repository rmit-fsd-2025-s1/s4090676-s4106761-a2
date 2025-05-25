import { TutorAccount } from "@repo/database/entities/tutorAccount"
import { DetailedTableItem } from "@/components/DetailedTableItem"

const formatList = (items: string[] | undefined) =>
  items
    ? items.slice(0, -1).join(",") +
      (items.slice(0, -1).length ? " and " : "") +
      items.slice(-1)
    : "Not specified"

export function TutorName({ tutor }: { tutor: TutorAccount }) {
  const tutorData = tutor && {
    Name: tutor.account.name,
    Availability: tutor.availability ?? "Not specified",
    Skills: formatList(tutor.skills),
    Credentials: tutor.credentials || "",
  }

  return (
    <DetailedTableItem details={tutorData}>
      {tutor?.account.name}
    </DetailedTableItem>
  )
}

import { useMemo } from "react"

/**
 * Get how frequently an application has been accepted
 * @param tutorId The ID of the user to target
 * @returns tutorAcceptedFrequency - The number of times a tutor has been accepted
 * @returns floatPercent - Expression of frequency as a 0-1 float of the most picked applicant
 * @returns [tutorAcceptedFrequency, floatPercent]
 */
export function useApplicantFrequency(
  targetTutor: UUID
): [number, number, Application[]] {
  // FIXME
  const applications = []

  const applicantHistory = useMemo(() => {
    const frequencies: { [tutor: UUID]: Application[] } = {}
    applications.forEach((application: Application) => {
      if (application.status === ApplicationStatus.ACCEPTED) {
        const records = frequencies[application.tutorId]
        if (records) records.push(application)
        else frequencies[application.tutorId] = [application]
      }
    })
    return frequencies
  }, [applications])

  // if there is no entries for an applicant set it to 0
  const targetFrequency = applicantHistory[targetTutor]?.length ?? 0
  // if there are no entries in the system divide by 1
  const targetFrequencyFloat =
    targetFrequency /
    (Math.max(...Object.values(applicantHistory).map((as) => as.length)) ?? 1)

  return [
    targetFrequency,
    targetFrequencyFloat,
    applicantHistory[targetTutor] ?? [],
  ]
}

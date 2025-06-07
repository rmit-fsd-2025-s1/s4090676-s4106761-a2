import { useQuery } from "@tanstack/react-query"

export const useTutors = () => {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/api/tutors")
      if (!res.ok) throw new Error("Failed to fetch tutors")
      return res.json()
    },
  })
}

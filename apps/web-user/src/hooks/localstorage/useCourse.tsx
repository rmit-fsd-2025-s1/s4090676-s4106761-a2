import { Course, UUID } from "@/context/localstorage/types";
import { useStore } from "@/hooks/localstorage/useStore";

/**
 * Get information on a course or modify it
 */
export function useCourse(
  id?: UUID,
): [Course | undefined, ((params: Partial<Course>) => void) | undefined] {
  const [courses, setCourse] = useStore("courses");

  const course = courses.find((a) => a.id === id);

  return [
    course,
    course &&
      ((newData: Partial<Course>) =>
        setCourse({
          ...course,
          ...newData,
        })),
  ];
}

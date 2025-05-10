import { CoursesBreadcrumb } from "@/features/Courses/CoursesBreadcrumb";
import { ReactNode } from "react";
import { Show } from "@chakra-ui/react";
import { CoursesTable } from "@/features/Courses/CoursesTable";

export function Courses({ children }: { children: ReactNode }) {
  return (
    <>
      <CoursesBreadcrumb />
      <Show when={!children} fallback={children}>
        <CoursesTable />
      </Show>
    </>
  );
}

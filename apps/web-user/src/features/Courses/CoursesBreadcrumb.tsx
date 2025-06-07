import { Breadcrumb, Card, Show } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Link from "next/link"
import styled from "@emotion/styled"
import { Course } from "@repo/database/entities/course"
import { useQuery } from "@tanstack/react-query"

const CardBody = styled(Card.Body)`
  padding: 7px 20px;
`

const CardRoot = styled(Card.Root)`
  margin-bottom: 20px;
`

export function CoursesBreadcrumb() {
  const {
    query: { courseId },
    isReady,
    pathname,
  } = useRouter()
  const { data: course, isSuccess } = useQuery<Course>({
    queryKey: ["/course", courseId],
  })

  if (!isReady && !isSuccess) return null

  return (
    <>
      <CardRoot>
        <CardBody>
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link asChild>
                  <Link href="/lecturer/courses">Courses</Link>
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Show when={courseId}>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link asChild>
                    <Link href={`/lecturer/applications/${courseId}`}>
                      {course?.code} Applicants
                    </Link>
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
              </Show>
              <Show when={pathname.includes("rank")}>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Link asChild>
                    <Link href={`/lecturer/applications/${courseId}/rank`}>
                      Rank Applicants
                    </Link>
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
              </Show>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </CardBody>
      </CardRoot>
    </>
  )
}

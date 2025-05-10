import { useStore } from "@/hooks/localstorage/useStore"
import { Card, For, Heading, List } from "@chakra-ui/react"

export function Applications() {
  const [courses] = useStore("courses")
  return (
    <List.Root>
      <For each={courses}>
        {(course) => (
          <List.Item asChild>
            <Card.Root>
              <Card.Header>
                <Heading size="sm">{course.name}</Heading>
              </Card.Header>
            </Card.Root>
          </List.Item>
        )}
      </For>
    </List.Root>
  )
}

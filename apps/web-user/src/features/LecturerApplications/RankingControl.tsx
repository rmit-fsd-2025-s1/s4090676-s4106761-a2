import { ButtonGroup, IconButton, Table } from "@chakra-ui/react"
import { UpArrowIcon } from "@/icons/UpArrow"
import { DownArrowIcon } from "@/icons/DownArrow"

export function RankingControl({ application }: { application: Application }) {
  const [{ applications }, writeData] = useLocalstorageContext()
  const index = applications.indexOf(application)

  const rankUp = () => {
    const newOrder = [...applications]
    // swap elements
    ;[newOrder[index - 1], newOrder[index]] = [
      newOrder[index],
      newOrder[index - 1],
    ]
    writeData({ key: "applications", data: newOrder })
  }

  const rankDown = () => {
    const newOrder = [...applications]
    ;[newOrder[index + 1], newOrder[index]] = [
      newOrder[index],
      newOrder[index + 1],
    ]
    writeData({ key: "applications", data: newOrder })
  }

  return (
    <Table.Cell>
      <ButtonGroup>
        <IconButton size="xs" disabled={index === 0} onClick={() => rankUp()}>
          <UpArrowIcon />
        </IconButton>
        <IconButton
          size="xs"
          disabled={index === applications.length - 1}
          onClick={() => rankDown()}
        >
          <DownArrowIcon />
        </IconButton>
      </ButtonGroup>
    </Table.Cell>
  )
}

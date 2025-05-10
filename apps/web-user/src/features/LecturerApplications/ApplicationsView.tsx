import { Card, HStack, RadioCard, Separator, Show, Text } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { ApplicationsTable } from "@/features/LecturerApplications/ApplicationsTable"
import { ZodForm } from "@/components/hookform/ZodForm"
import { TextInput } from "@/components/hookform/TextInput"
import { RadioCards } from "@/components/hookform/RadioCards"
import { RadioCardItem } from "@/components/RadioCardItem"
import styled from "@emotion/styled"
import {
  ApplicationFilterSorts,
  applicationFilterSortZ,
  SortModes,
} from "@/hooks/applications/useApplications"

const SortItem = styled(RadioCardItem)`
    & > div {
        padding: 5px 10px;
    }
`

/**
 * @param controls filter and sorting defaultFilters
 * @param selectionState useState() for tracking selected rows
 */
export function ApplicationsView ({ defaultFilters, selectionState }: {
  defaultFilters?: ApplicationFilterSorts,
  selectionState?: [string[], Dispatch<SetStateAction<string[]>>]
}) {

  return (
    <Card.Root variant="outline">
      <Card.Body>
        {/*
          All filters and defaultFilters are implemented in useApplications and controlled through this ZodForm
          The zod form acts as a context provider to any components that need to know about the filters/sort.
          useApplications reads the form context and is able to perform the described sorts and filters.
         */}
        <ZodForm schema={applicationFilterSortZ} defaults={defaultFilters}>
          <TextInput
            name="search"
            hideLabel
            placeholder="Search (implementation pending in useApplications. and it needs a magnifying glass.)"
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <HStack alignItems="center" style={{ marginBottom: 20 }}>
            <RadioCards
              name="sort"
              fitContent
              style={{ width: "fit-content" }}
            >
              <HStack>
                <RadioCard.Label>Sort by: </RadioCard.Label>
                {/* The lecturer may not rank the applications while not looking at the full list
                  as when returning to the all applications view the order would be deeply unclear
              */}
                <Show when={!defaultFilters?.courseId}>
                  <SortItem value={SortModes.RANK}>
                    <RadioCard.ItemText>Rank</RadioCard.ItemText>
                  </SortItem>
                </Show>
                <SortItem value={SortModes.COURSE}>
                  <RadioCard.ItemText>Course</RadioCard.ItemText>
                </SortItem>
                <SortItem value={SortModes.AVAILABILITY}>
                  <RadioCard.ItemText>Availability</RadioCard.ItemText>
                </SortItem>
              </HStack>
            </RadioCards>
            <Separator orientation="vertical" height="4"/>
            <Text textStyle="sm" style={{ opacity: 0.7 }}>Click cells to see more information</Text>
          </HStack>
          <ApplicationsTable selectionState={selectionState}/>
        </ZodForm>
      </Card.Body>
    </Card.Root>
  )
}

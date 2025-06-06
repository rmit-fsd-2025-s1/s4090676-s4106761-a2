import { HStack, Icon, RadioCard } from "@chakra-ui/react"
import { TutorIcon } from "@/icons/Tutor"
import { LecturerIcon } from "@/icons/Lecturer"
import { RadioCards } from "@/components/hookform/RadioCards"
import { RadioCardItem } from "@/components/RadioCardItem"

export function AccountTypePicker() {
  return (
    <RadioCards name="type" orientation="vertical" align="center">
      <RadioCard.Label>Select account type</RadioCard.Label>
      <HStack>
        <RadioCardItem value={AccountType.TUTOR}>
          <Icon fontSize="2xl" color="fg.muted" mb="2">
            <TutorIcon />
          </Icon>
          <RadioCard.ItemText>Tutor</RadioCard.ItemText>
        </RadioCardItem>
        <RadioCardItem value={AccountType.LECTURER}>
          <Icon fontSize="2xl" color="fg.muted" mb="2">
            <LecturerIcon />
          </Icon>
          <RadioCard.ItemText>Lecturer</RadioCard.ItemText>
        </RadioCardItem>
      </HStack>
    </RadioCards>
  )
}

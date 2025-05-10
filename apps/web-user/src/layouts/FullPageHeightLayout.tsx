import { Flex } from "@chakra-ui/react"
import styled from "@emotion/styled"

/**
 * Some pages benefit do not have enough height to push the footer to the bottom of the page
 * This component enforces the height and centres the page content
 * This component is used in AppLayout.tsx
 */
export const FullPageHeightLayout = styled(Flex)`
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
    align-items: center;
`

import { Button, Heading, Box, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"

export default function Home() {
  return (
    <>
      {/* Main content with background image */}
      <div
        style={{
          backgroundImage: 'url("/backgroundImage2.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          zIndex: 0,
          height: "80vh",
        }}
      >
        {/* Semi-transparent overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: -1,
          }}
        />


        <Text fontSize="4xl" fontWeight="bold" my={4} zIndex={1} position="relative">Tutor Matching made easy</Text>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={8}
          justify="center"
          align="center"
          mt={4}
          zIndex={1}
          position="relative"
        >
          {/* Tutor Section */}
          <Box textAlign="center">
            <img
              src="/tutorImage.jpg"
              alt="Tutor helping a student"
              style={{
                maxWidth: '100%',
                width: '600px',
                height: 'auto',
                borderRadius: '8px',
                border: '2px solid black', // Added black border
              }}
            />
            <Button asChild size="lg" rounded="full" mt={4}>
              <Link href="/infoTutor">TutorMatch for Tutors</Link>
            </Button>
          </Box>

          {/* Lecturer Section */}
          <Box textAlign="center">
            <img
              width={600}
              src="/lecturer.jpg"
              alt="Lecturer teaching"
              style={{
                maxWidth: '100%',
                width: '600px',
                height: 'auto',
                borderRadius: '8px',
                border: '2px solid black',
              }}
            />
            <Button asChild size="lg" rounded="full" mt={4}>
              <Link href="/infoLecturer">TutorMatch for Lecturers</Link>
            </Button>
          </Box>
        </Flex>
      </div>

      {/* Content without background */}
      <div
        style={{
          backgroundColor: "",
          padding: "40px 20px",
          zIndex: 1,
        }}
      >
        {/* Additional content can go here */}
        <Heading size="5xl">What We Can Offer You</Heading>
        <Text mt={4} fontSize="xl" >Tutors, Lecturers. All just a click away. Whether you're looking to fill up a lecture hall</Text>
      </div>
    </>
  )
}

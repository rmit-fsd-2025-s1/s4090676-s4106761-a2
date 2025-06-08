import { useSuspenseQuery } from "@apollo/client"
import { echo } from "@/queries/echo"

export default function Home() {
  const { data } = useSuspenseQuery(echo)

  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Welcome to the admin area</h1>
      <p>{data.echo}</p>
    </>
  )
}

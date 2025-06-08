import { useMutation, useSubscription, useSuspenseQuery } from "@apollo/client"
import { ECHOMUT, ECHOQUERY, ECHOSUB } from "@/queries/ECHOQUERY"

export default function Home() {
  const { data } = useSuspenseQuery(ECHOQUERY)
  const {
    data: echoSub,
    loading,
    error,
  } = useSubscription(ECHOSUB, {
    onData: (data) => {
      console.log("Subscription data received:", data)
    },
    onError: (error) => {
      console.error(error)
    },
  })
  const [echoString] = useMutation(ECHOMUT)

  const randStr = (Math.random() + 1).toString(36).substring(7)

  return (
    <>
      <h1 style={{ fontSize: "2rem" }}>Welcome to the admin area</h1>
      <p>{data.echo}</p>
      <button
        onClick={() => {
          console.log("clicked button")
          echoString({
            variables: { string: randStr },
          }).then((res) => {
            console.log(res)
          })
        }}
      >
        Push random string to echo mutation
      </button>
      <h2 style={{ fontSize: "1.5rem" }}>Echo subscription:</h2>
      <p>{echoSub?.echoSubscription ?? "Loading..."}</p>
    </>
  )
}

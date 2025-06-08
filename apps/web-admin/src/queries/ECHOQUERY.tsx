import { gql } from "@/__generated__"

export const ECHOQUERY = gql(`
    query EchoQuery {
        echo(string: "Hello World")
    }
`)

export const ECHOSUB = gql(`
  subscription EchoSubscription {
    echoSubscription(id: "hi")
  }
`)

export const ECHOMUT = gql(`
  mutation EchoMutation($string: String!) {
    echo(string: $string)
  }
`)

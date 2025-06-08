import { gql } from "@/__generated__"

export const echo = gql(`
    query EchoQuery {
        echo(string: "Hello World")
    }
`)

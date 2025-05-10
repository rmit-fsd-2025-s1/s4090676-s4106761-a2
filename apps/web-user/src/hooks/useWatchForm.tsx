import { FieldValues, useFormContext } from "react-hook-form"

export function useWatchForm<t extends FieldValues> () {
    const { watch } = useFormContext()
    return watch() as t
}

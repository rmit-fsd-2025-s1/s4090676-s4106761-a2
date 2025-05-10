"use client"
import React, {
  ActionDispatch,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react"
import { setUpLocalstorage } from "./defaults"
import { LocalstorageSchema } from "@/context/localstorage/types"

// I would use a ts generic, but it seems to strip it and convert it to this when wrapped in the ActionDispatch
type LocalstorageAction = {
  key: keyof LocalstorageSchema
  data: LocalstorageSchema[keyof LocalstorageSchema]
}

const LocalstorageCtx = createContext<
  [LocalstorageSchema, ActionDispatch<[LocalstorageAction]>] | undefined
>(undefined)

/**
 * A reducer to encapsulate any localstorage writes to keep them tracked in state
 * @param state tracked by react
 * @param key the localstorage key
 * @param data the data as a javascript object, which is then converted to JSON and written
 */
function localstorageReducer<
  k extends keyof LocalstorageSchema,
  v = LocalstorageSchema[k],
>(state: LocalstorageSchema, { key, data }: { key: k; data: v }) {
  localStorage.setItem(key, JSON.stringify(data))
  return {
    ...state,
    [key]: data,
  }
}

export function LocalstorageProvider({
  children,
  testing,
}: {
  children: React.ReactNode
  testing?: boolean
}) {
  /*
    Run the local storage setup only once to determine the state of the storage
    and set any defaults
   */
  // strictly run once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialLocalstorage = useMemo(() => setUpLocalstorage(testing), [])

  /*
    From here on out any local storage data should be read from data to keep everything in sync.
    It is provided to the whole app with context.
   */
  const [datastore, writeData] = useReducer(
    localstorageReducer,
    initialLocalstorage
  )

  return (
    <LocalstorageCtx.Provider value={[datastore, writeData]}>
      {children}
    </LocalstorageCtx.Provider>
  )
}

/**
 * utility method for type guarding against an undefined context
 * @returns [datastore, refreshData] - datastore: mirror of localstorage; refreshData(key) - update mirror
 */
export function useLocalstorageContext() {
  const context = useContext(LocalstorageCtx)
  if (context === undefined) {
    throw new Error("Must be used within LocalstorageProvider")
  }
  return context
}

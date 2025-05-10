import { LocalstorageSchema } from "@/context/localstorage/types"
import { useLocalstorageContext } from "@/context/localstorage/LocalstorageProvider"
import { ItemOfArray } from "@/types/util"

/**
 * Fetch and write data to/from localstorage by key
 */
export function useStore<
  k extends keyof LocalstorageSchema,
  v extends LocalstorageSchema[k] = LocalstorageSchema[k]
> (key: k): [v, (item: Exclude<ItemOfArray<v>, string>) => void] {
  const [datastore, writeData] = useLocalstorageContext()

  /**
   * Gather round for a story...
   * datastore is an object that changes on every write to localstorage,
   * that is, Object.is(a, b) will return false every time data is written to localstorage.
   * This is true.
   * BUT though the reference to the object itself changes the values of each item
   * is a reference that does not.
   * I assumed useEffect(,[datastore[key]]) would mean that every time a change is made to that key
   * in localstorage, the dependency array would know to fire the setup parameter of useEffect(),
   * that is, Object.is(a, b) would return false on every update to an array.
   * I originally wrote const itemsToWrite = storeValue - which simply copies the array reference.
   * The solution is to clone the underlying data structure, in the same way that writeData uses a spread
   * to create a new object reference.
   *
   * This manifested as a unique issue: The data rendered on the page that was directly dependent on datastore[key]
   * would correctly update but the dependency array would not fire any dependant events. Object.is() after initialisation
   * of defaults was always true!
   */

  return [
    datastore[key] as v,
    (item: Exclude<ItemOfArray<v>, string>) => {
      const storeValue = datastore[key] as LocalstorageSchema[k]
      if (Array.isArray(storeValue)) {
        const targetItem = storeValue
          .find(activeItem => activeItem.id === item?.id)
        // clone the array into a new reference instead of just copying the reference for the reason above.
        const itemsToWrite = [...storeValue]
        if (targetItem) {
          itemsToWrite[itemsToWrite.indexOf(targetItem)] = item
        } else {
          itemsToWrite.push(item)
        }
        writeData({ key, data: itemsToWrite })
      } else {
        writeData({ key, data: item as LocalstorageSchema[k] })
      }
    },
  ]
}

import { useMemo } from "react";

export const useFilteredArr = (ordersInformation , filterBy ) => {
    const filteredArr = useMemo(() => {
      if (ordersInformation !== null && ordersInformation){
        return ordersInformation.filter((e) =>
          e.taskName.toLowerCase().includes(filterBy.toLowerCase())
        );
      }
      return null
      }, [filterBy, ordersInformation]);
    return filteredArr
}
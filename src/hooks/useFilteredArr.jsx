import { useMemo } from "react";

export const useFilteredArr = (ordersInformation , filterBy ) => {
    const filteredArr = useMemo(() => {
      if (ordersInformation !== null && ordersInformation){
        console.log(ordersInformation)
        let stepOne = ordersInformation.filter((e) => e.status === "active")
        console.log(stepOne)
        let stepTwo = stepOne.filter((e) =>
          e.taskName.toLowerCase().includes(filterBy.toLowerCase())
        );
        return stepTwo
      }
      return null
      }, [filterBy, ordersInformation]);
    return filteredArr
}
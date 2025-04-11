import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useFilteredArray = ({filteredArr, filters}) => {
    const tonConstant = useSelector((state) => state.ton.value);
    const secFilteredArray = useMemo(() => {
    let copy = [...filteredArr];
    if (filters.category.id !== -1) {
      if (filters.subCategory.id !== -1) {
        return copy.filter((e) => {
          return (
            e.category === filters.category.id &&
            e.subCategory === filters.subCategory.id &&
            e.tonValue * tonConstant >= filters.price
          );
        });
      } else {
        return copy.filter((e) => {
          return (
            e.category === filters.category.id &&
            e.tonValue * tonConstant >= filters.price
          );
        });
      }
    } else {
      return copy.filter((e) => {
        return e.tonValue * tonConstant >= filters.price;
      });
    }
  }, [filteredArr, filters, tonConstant]);

  return secFilteredArray;

};

export default useFilteredArray;
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useFilteredArray = ({filteredArr, filters}) => {
    const tonConstant = useSelector((state) => state.ton.value);
    const subCategorysIds = filters.subCategory ? filters.subCategory.map((e) => e.id) : null
    const secFilteredArray = useMemo(() => {
    let copy = [...filteredArr];
    if (filters.category.id !== -1) {
      if (filters.subCategory) {
        return copy.filter((e) => {
          return (
            e.category === filters.category.id &&
            subCategorysIds.indcludes(e.subCategory.id) &&
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
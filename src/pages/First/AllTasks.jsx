import React, { memo, useCallback, useEffect, useMemo} from "react";
import FirstMain from "../../components/First/FirstMain/FirstMain";
import FirstTop from "../../components/First/FirstMain/FirstTop";
import FirstLoader from "../../loaders/FirstLoader";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, fetchTasksInformation } from "../../store/information";
import CategoryBlock from "../../components/First/CategoryBlock/CategoryBlock";
import InputBlock from "../../components/First/CategoryBlock/InputBlock";
// let count = 0
const AllTasks = ({
  setDetailsActive,
  setMenuActive,
  setSliderActive,
  ordersInformation,
  filterBy,
  setFilterBy,
  setCategoryOpen,
  filters,
  setFilters,
  setSubCategory
}) => {
  // count += 1
  // console.warn('РЕНДЕР' + count )



  const orderStatus = useSelector((state) => state.information.orderStatus)





  

  // const orderStatus = useSelector((state) => state.information.orderStatus);



  console.log(orderStatus)









  const userInfo = useSelector((state) => state.telegramUserInfo);

  


  const tonConstant = useSelector((state) => state.ton.value);

  console.log(ordersInformation, orderStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasksInformation(1));
    return () => {
      dispatch(changeStatus(null));
    };
  }, [dispatch]);

  const openCategoryFunc = useCallback( () => {
    setCategoryOpen(true)
  } , [] )

  const openSubCategoryFunc = useCallback( () => {
    setSubCategory(true)
  } , [] )

  const setValueFunc = useCallback( (value) => {
    let copy = value


      if (value[0] === "0"){
        copy = copy.slice(1)
      }
      copy = copy.replace(/\s+/g, '');
      if (!isNaN(copy) && copy.length < 5){
        setFilters((value) => ({...value , price : Number(copy)}))
      }
    
  }, [setFilters] )

  console.warn(filters)

  return (
    <div className="AllTasks">
      <FirstTop
        filteredBy={filterBy}
        setMenuActive={setMenuActive}
        setFilterBy={setFilterBy}
        userInfo={userInfo}
      />
              <div className="filtration-container">
          <CategoryBlock func={openCategoryFunc} name={"Категория"} value={filters.category.category}/>
          <CategoryBlock func={openSubCategoryFunc} name={"Подкатегория"}  value={filters.subCategory.subCategory}/>
          <InputBlock setValue={setValueFunc} value={String(filters.price)} />
        </div>

      { (orderStatus === 'complete' || orderStatus === 'all') && tonConstant !== 0 ? (
        <>
          <FirstMain
            // style={isMenuActive ? { background: "rgba(0,0,0,0.5)" } : {}}
            orderStatus = {orderStatus}
            setDetailsActive={setDetailsActive}
            ordersInformation={ordersInformation}
            setSliderActive = {setSliderActive}
          />

        </>
      ) : (
        <FirstLoader />
      )}

    </div>
  );
};

export default memo(AllTasks);

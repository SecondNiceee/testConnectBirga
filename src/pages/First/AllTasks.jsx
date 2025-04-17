import React, { forwardRef, memo, useCallback, useEffect} from "react";
import FirstMain from "../../components/First/FirstMain/FirstMain";
import FirstTop from "../../components/First/FirstMain/FirstTop";
import FirstLoader from "../../loaders/FirstLoader";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, fetchTasksInformation } from "../../store/information";
import CategoryBlock from "../../components/First/CategoryBlock/CategoryBlock";
import InputBlock from "../../components/First/CategoryBlock/InputBlock";
import translation from "../../functions/translate";
// let count = 0
const AllTasks = forwardRef(({
  setDetailsActive,
  setMenuActive,
  ordersInformation,
  filterBy,
  setFilterBy,
  setCategoryOpen,
  filters,
  setFilters,
  setSubCategory
} , ref) => {



  const orderStatus = useSelector((state) => state.information.orderStatus)

  const userInfo = useSelector((state) => state.telegramUserInfo);


  const tonConstant = useSelector((state) => state.ton.value);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasksInformation(1));
    return () => {
      dispatch(changeStatus(null));
    };
  }, [dispatch]);

  const openCategoryFunc = useCallback( () => {
    setCategoryOpen(true)
  } , [setCategoryOpen] )

  const openSubCategoryFunc = useCallback( () => {
    setSubCategory(true)
  } , [setSubCategory] )

  const setValueFunc = useCallback( (value) => {
    let copy = value


      if (value[0] === "0"){
        copy = copy.slice(1)
      }
      copy = copy.replace(/\s+/g, '');
      if (!isNaN(copy) && copy.length < 7){
        setFilters((value) => ({...value , price : Number(copy)}))
      }
    
  }, [setFilters] )

  function format(e){
    if (translation(e).length < 7){
      return translation(e).trim()
    }
    return translation(e).slice(0, 7).trim() + ".."
  }


  console.log(filters)
  return (
    <div className="AllTasks">
      <FirstTop
        filteredBy={filterBy}
        setMenuActive={setMenuActive}
        setFilterBy={setFilterBy}
        userInfo={userInfo}
      />
              <div className="filtration-container">
          <CategoryBlock func={openCategoryFunc} name={"Категория"} value={format(filters.category.category)}/>
          <CategoryBlock func={openSubCategoryFunc} name={"Подкатегория"}  value={filters.subCategory ? format(filters.subCategory[0].subCategory) : "Все"}/>
          <InputBlock setValue={setValueFunc} value={String(filters.price)} />
        </div>

      { (orderStatus === 'complete' || orderStatus === 'all') && tonConstant !== 0 ? (
        <>
          <FirstMain
            // style={isMenuActive ? { background: "rgba(0,0,0,0.5)" } : {}}
            orderStatus = {orderStatus}
            setDetailsActive={setDetailsActive}
            ordersInformation={ordersInformation}
          />                                     
        </>
      ) : (
        <FirstLoader  />
      )}

    </div>
  );
} );

export default memo(AllTasks);

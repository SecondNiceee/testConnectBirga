import React, { useCallback, useMemo, useState } from 'react';
import Top from '../../components/UI/Top/Top';
import useListner from '../../hooks/useListner';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuActive } from '../../store/menuSlice';
import FullPicker from '../../components/UI/FullPicker/FullPicker';
import Choicer from '../../components/SavedPage/Choicer/Choicer';



const values = ["Заказы" , "Отклики", "Кейсы"]
const keys = ["advertisment", "responces" , "cards"]
const SavedPage = () => {



    const isMenuActive = useSelector((state) => state.menu.value);
    const dispatch = useDispatch()
    const [nowKey, setNowKey] = useState("advertisment")


    const GreyIntWidth = useMemo(() => {
        return (document.documentElement.clientWidth - 36 ) / 3;
      }, []);
      const GreyWidth = useMemo(() => {
        return GreyIntWidth.toString() + "px";
      }, [GreyIntWidth]);
    

    const setMenuActive = useCallback(
      (set) => {
        dispatch(changeMenuActive(set));
      },
      [dispatch]
    );

    useListner({
        isMenuActive,
        setMenuActive,
        // setDetailsActive,
        // isDetailsActive,
      });

    return (
        <div className='saved-wraper'>
            <Top setMenuActive={setMenuActive} name={"Сохраненное"} className={"saved-top-wrapper"} />
            <FullPicker GreyIntWidth={GreyIntWidth} GreyWidth={GreyWidth}  nowKey={nowKey} setNowKey={setNowKey} values={values} keys={keys} />

            <Choicer keys={keys} nowKey={nowKey} />
        </div>
    );
};

export default SavedPage;
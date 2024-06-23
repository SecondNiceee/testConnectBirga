import React, { useCallback } from 'react';
import Top from '../MyAds/components/Top';
import { useDispatch, useSelector } from 'react-redux';
import AdCreateFunc from '../../components/UI/AdCreateFunc/AdCreateFunc';
import GreyText from '../../components/UI/GreyText/GreyText';

const AllShablons = () => {
    const dispatch = useDispatch()
    const isMenuActive = useSelector((state) => state.menu.value);
    const setMenuActive = useCallback( (arg) => {
        dispatch(changeMenuActive(arg));
      } , [dispatch]  )
    return (
        <div className='shablon-wrapper'>
            <Top setMenuActive = {setMenuActive} name = {"Шаблоны откликов"} />
            <AdCreateFunc className = "all-shablons-func"  text={"Создать новый отклик"} />
            <GreyText className={"shablon-wrapper-grey"}>АКТУАЛЬНЫЕ ШАБЛОНЫ</GreyText>
        </div>
    );
};

export default AllShablons;
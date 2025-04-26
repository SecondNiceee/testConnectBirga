import React, { useState } from 'react';
import Text from '../../components/Text/Text';
import Cap from '../../components/UI/Cap/Cap';
import Categories from '../AdCreatingOne/ui/components/Categories/Categories';
import DescriptionAndPhoto from '../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto';
import ChoiceCategory from '../AdCreatingOne/ui/components/ChoiceCategory/ChoiceCategory';
import BaidgeCategories from './ui/BaidgeCategories';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

const BaidgeCreaitingOne = ({taskInformation, setDescription, description}) => {

    const categorys = useSelector((state) => state.categorys.category)

    const professions = useSelector((state) => state.profession.professions)

    const [isCategoryOpen, setCategoryOpen] = useState(false); 

    const [categoryInformation, setCategoryInformation] = useState({category : categorys[0], profession : {profession : "Привет"}})

    return (
        <>
        
        <div className="pt-[16px] px-[16px] min-w-[100vw] bg-[#18222d] flex flex-col h-[100vh] overflow-y-scroll pb-[100px]">
            <Cap steps={2} className={"mt-[4px] flex items-center"} step={1} > 
                <Text className = {"font-sf-pro-display-600 text-[20px] font-semibold text-white"}> Создайте объявление </Text>{" "}
            </Cap>
            <BaidgeCategories className={"mt-[18px]"} down='Профессия' categoryInformation={categoryInformation} />
            <DescriptionAndPhoto className={"mt-[18px]"} titleStyles={{
                color : "#DAF5FE"
            }} textTitle={"Краткое резюме"} textPlaceholder={"Краткое резюме"} setText={setDescription} isFileInput = {false} text={description} />
            <p className='font-sf-pro-display-400 mt-[5px] text-[13px] leading-[16px] mx-auto text-[#daf5fe]'>
                Вкратце расскажите о себе и своем опыте работы.
            </p>
        </div>
        
        <CSSTransition
        in={isCategoryOpen}
        timeout={0}
        mountOnEnter
        unmountOnExit
      >
        <ChoiceCategory
          style = {{top:document.documentElement.scrollTop + "px"}}
          taskInformation={categoryInformation}
          setTaskInformation={setCategoryInformation}
          setCatagoryChoiceOpen={setCategoryOpen}
          categorys={categorys}
        />
      </CSSTransition>
        </>
    );
};

export default BaidgeCreaitingOne;
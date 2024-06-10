import React, { useEffect, useMemo, useState } from 'react';

import rightArrow from '../../images/icons/rightArrow.svg'
import OneInput from '../../components/UI/OneInput/OneInput';
import BackButton from '../../constants/BackButton';
const ChoiceSubCategory = ({taskInformation , setSubcategoryChoiceOpen , setTaskInformation}) => {
    const subCategorys = {design1 : [
        'Фирменный стиль, логотипы, визитки',
        'Полиграфический дизайн',
        'Иллюстрации, живопись, граффити',
        'Дизайн сайтов и приложений',
        'Интернет-баннеры, оформление соц. сетей',
        '3D-графика, анимация',
        'Наружная реклама, стенды, pos-материалы',
        'Архитектура, интерьер, ландшафт',
        'Чето еще че-то еще и тд и тп'
    ] ,
    design2 : [
        'Элемент дизайна 2 ',
        'Элемент дизайна 2 ',
        'Элемент дизайна 2 ',
        'так далее',
        'Элемент дизайна 2 ',
        'Элемент дизайна 2 ',
        'Элемент дизайна 2 ',
        'Элемент дизайна 2 ',
        'Элемент дизайна 2 '
    ],
    design3 : [
        'Элемент дизайна 3 ',
        'Элемент дизайна 3 ',
        'Элемент дизайна 3',
        'так далее',
        'Элемент дизайна 3 ',
        'Элемент дизайна 3 ',
        'Элемент дизайна 3 ',
        'Элемент дизайна 3 ',
        'Элемент дизайна 3 '
    ],
    design4 : [
        'Элемент дизайна 4 ',
        'Элемент дизайна 4 ',
        'Элемент дизайна 4',
        'так далее',
        'Элемент дизайна 4 ',
        'Элемент дизайна 4 ',
        'Элемент дизайна 4 ',
        'Элемент дизайна 4 ',
        'Элемент дизайна 4 '
    ],
    design5 : [
        'Элемент дизайна 5 ',
        'Элемент дизайна  5',
        'Элемент дизайна 5',
        'так далее',
        'Элемент дизайна 5 ',
        'Элемент дизайна 5 ',
        'Элемент дизайна 5 ',
        'Элемент дизайна 5 ',
        'Элемент дизайна 5 '
    ],
    design6 : [
        'Элемент дизайна 6 ',
        'Элемент дизайна 6',
        'Элемент дизайна 6',
        'так далее',
        'Элемент дизайна 6 ',
        'Элемент дизайна 6 ',
        'Элемент дизайна 6 ',
        'Элемент дизайна 6 ',
        'Элемент дизайна 6 '
    ]
    }

    let k = taskInformation.category.value

    const subCategory = subCategorys[k]

    const [inputValue , setInputValue] = useState('')

    const sortSubCategory = useMemo(() => {
            let n = subCategory.filter((e) => {
                    return (e.includes(inputValue))
            } )
            return n
    
    } , [inputValue, subCategory ]    )

    function closeSebCategory(){
        setSubcategoryChoiceOpen(false)
    }

    useEffect( () => {
        BackButton.onClick(closeSebCategory)
        return () => {
            BackButton.offClick(closeSebCategory)
        }
    } )

    return (
    <div className="subCategory__container">
      <OneInput
        placeholder="Поиск по заданиям"
        inputValue={inputValue}
        setInputValue={setInputValue}
        className='subCategory__oneInput'
      />
      <div className="sub__block">
            <div className="sub__wrapper">
                    {sortSubCategory.map((e, id) => {
                        return (
                            <div key={id}  className="SubBlock" onClick={() => {
                                setTaskInformation( {...taskInformation , subCategory : e})
                                setSubcategoryChoiceOpen(false)}} >

                                    <p>{e}</p>
                                    <img className='arrowRight' src={rightArrow} alt="" />
                            </div>
                        )
                    })}
            </div>
      </div>
    </div>
    );
};

export default ChoiceSubCategory;
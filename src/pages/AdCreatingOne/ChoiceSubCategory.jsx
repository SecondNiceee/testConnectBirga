import React, { useEffect, useMemo, useState } from 'react';

import rightArrow from '../../images/icons/rightArrow.svg'
import OneInput from '../../components/UI/OneInput/OneInput';
import BackButton from '../../constants/BackButton';
const ChoiceSubCategory = ({taskInformation , setSubcategoryChoiceOpen , setTaskInformation, subCategorys}) => {


    subCategorys = subCategorys.filter(e => e.category.id === taskInformation.category.id)


    let k = taskInformation.category.value

    const subCategory = subCategorys[k]

    const [inputValue , setInputValue] = useState('')

    // const sortSubCategory = useMemo(() => {
    //         let n = subCategory.filter((e) => {
    //                 return (e.includes(inputValue))
    //         } )
    //         return n
    
    // } , [inputValue, subCategory ]    )

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
                    {subCategorys.map((e, id) => {
                        return (
                            <div key={id}  className="SubBlock" onClick={() => {
                        
                                    setTaskInformation( {...taskInformation , subCategory : e})
                                    setSubcategoryChoiceOpen(false)}} >

                                    <p>{e.subCategory}</p>
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
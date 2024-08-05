import React, { useEffect, useMemo, useState } from 'react';

import rightArrow from '../../images/icons/rightArrow.svg'
import OneInput from '../../components/UI/OneInput/OneInput';
import BackButton from '../../constants/BackButton';
const ChoiceSubCategory = ({taskInformation , setSubcategoryChoiceOpen , setTaskInformation, subCategorysPar}) => {



    useEffect( () => {
        function closeFunction(){
          setSubcategoryChoiceOpen(false)
        }
        BackButton.show()
        BackButton.onClick(closeFunction)
        return () => {
          BackButton.offClick(closeFunction)
          BackButton.hide()
        }
        // eslint-disable-next-line
      } , [] )

    const subCategorys = useMemo( () => {
        let subCategorysCopy = []
        if (taskInformation.category.category !== "Другое"){
    
            subCategorysCopy = [...subCategorysPar].filter(e => e.category.id === taskInformation.category.id && e.subCategory !== 'Другое')
            subCategorysCopy.push(subCategorysPar.find(e => taskInformation.category.id === e.category.id && e.subCategory === 'Другое'))
        }
        else{

            subCategorysCopy.push(subCategorysPar.find(e => taskInformation.category.id === e.category.id && e.subCategory === 'Другое'))

        }
        return subCategorysCopy
    } , [subCategorysPar, taskInformation] )



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
      <div className="sub__block" style={{
        paddingBottom : "20px"
      }}>
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
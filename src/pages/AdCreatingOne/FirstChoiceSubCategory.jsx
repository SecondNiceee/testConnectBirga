import React, { useEffect, useMemo, useState } from 'react';

import rightArrow from '../../images/icons/rightArrow.svg'
import OneInput from '../../components/UI/OneInput/OneInput';
import BackButton from '../../constants/BackButton';
import Text from '../../components/Text/Text';
import translation from '../../functions/translate';
const place = translation("Поиск по подкатегориям")
const FirstChoiceSubCategory = ({taskInformation , setSubcategoryChoiceOpen , setTaskInformation, subCategorysPar , ...props}) => {


  useEffect( () => {
    const First = document.documentElement.querySelector(".First")
    First.style.overflowY = "hidden"
    return () => {
       First.style.overflowY = "scroll"
    }
  } , [] )
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




    const subCategorys = useMemo(() => {
      let copy = subCategorysPar.filter(e => e.category.id === taskInformation.category.id && e.subCategory !== "Другое")
      copy.unshift({id : -1, subCategory : "Все"})
        return copy
        // eslint-disable-next-line
    }, [])

    const [inputValue , setInputValue] = useState("")

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
    console.log(subCategorys)
    const filteredSubCategorys = useMemo( () => {
      console.log(subCategorys)
      console.log(subCategorys.filter(e => translation(e.subCategory).includes(inputValue)))
      return subCategorys.filter( e => translation(e.subCategory).includes(inputValue) )
    } , [inputValue , subCategorys] )
    return (
    <div {...props} className="subCategory__container">
      <OneInput
        placeholder={place}
        inputValue={inputValue}
        setInputValue={setInputValue}
        className='subCategory__oneInput'
      />  
      <div className="sub__block">
            <div className="sub__wrapper">
                    {filteredSubCategorys.map((e, id) => {
                        return (
                            <div key={id}  className="SubBlock" onClick={() => {
                        
                                    setTaskInformation( {...taskInformation , subCategory : e})
                                    setSubcategoryChoiceOpen(false)}} >

                                    <Text>{e.subCategory}</Text>
                                    <img className='arrowRight' src={rightArrow} alt="" />
                            </div>
                        )
                    })}
            </div>
      </div>
    </div>
    );
};

export default FirstChoiceSubCategory;
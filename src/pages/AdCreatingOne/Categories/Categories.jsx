import React from 'react';
import cl from './Categories.module.css'

const Categories = ({className , taskInformation, setCatagoryChoiceOpen , setSubcategoryChoiceOpen, categorys, subCategorys, categoryOnly  }) => {
    function format(arg){
        if(arg){

            let str = arg.split(' ')
            let rezult = ''
            for (let word of str){
                if (rezult.length < 20){
                    rezult+=word + ' '
                }
                else{
                    rezult = rezult.slice(0 , rezult.length - 1)
                    if(rezult[rezult.length-1] === ','){
                        rezult = rezult.slice(0 , rezult.length - 1)
                    }
                    rezult += '..'
                    break
                }
            }

            return(rezult)
        }
        return ''
    }
    return (
        <div className = { className ? [cl.Categories , className].join(' ') : cl.Categories   }>
            <div className={cl.Categories__block}>
                <p>Категория</p>
                <p  onClick={(e) => {setCatagoryChoiceOpen(true)}} className = {[cl.Category__link , cl.quest].join(' ')} href="">{taskInformation.category.category ? taskInformation.category.category : ''}</p>
            </div>
            {categoryOnly ? <></> :
            <>
            <hr className={cl.line} />

            <div className={cl.Categories__block}>
                <p>Подкатегория</p>
                <p  onClick={() => {setSubcategoryChoiceOpen(true)}} className={cl.Category__link} href="">{taskInformation.subCategory.subCategory ? format(taskInformation.subCategory.subCategory) : ''}
                {/* {taskInformation.subCategory=== 'Выбрать' ? '' : '.'} */}
                </p>
            </div>
            </>
            }
        </div>
    );
};

export default Categories;
import React, { useCallback, useEffect, useState } from 'react';
import Cap from '../../components/UI/Cap/Cap';
import BaidgeCreatingLink from './ui/BaidgeCreatingLink';
import Text from '../../components/Text/Text';
import DescriptionAndPhoto from '../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto';
import { showAllert } from '../../functions/showAlert';

const BaidgeCreatingTwo = ({setLinks, links, taggsText, setTaggsText, setTaggs, taggs}) => {



    const changeLinksHandler = useCallback( (id) => (text) => {
        console.log(text)
        setLinks((value) => ([...value.map( (link, index) => {
            if (index === id) {
                return text
            }
            return link;
        } )]))
    } , [setLinks] )

    const addLink = () => {
        if (links.length === 5){
            showAllert("Максимум 5 ссылок")
        }
        else{
            setLinks((value) => ([...value, ""]))
        }
    } 


    const deleteLink = (index) => () => {
        setLinks((value) => ([...value].filter((link, id) => {
            console.log(id)
            return id !== index;
        })))
    }

    
    useEffect( () => {
        const splitedTaggs = taggsText.split(',').map((word, i) => word.trim()).filter((word) => word.length > 0)
        setTaggs(splitedTaggs)
    } , [taggsText, setTaggs] )

    const setTaggsFunction = (value) => {
        const LsplitedTaggs = taggsText.split(',').map((word, i) => word.trim()).filter((word) => word.length > 0)
        const legthsOfTaggs = LsplitedTaggs.map( (word) => word.length )
        const counterOfTaggs = LsplitedTaggs.length;
        
        const firstConfition = counterOfTaggs > 5 && value.length > taggsText.length;
        const secondCondition = Math.max(...legthsOfTaggs) > 20 && value.length > taggsText.length;
        if (firstConfition || secondCondition){

        }
        else{
            setTaggsText(value)
        }
    }

    const isAddActive = links.length !== 5;


    return (
        <div className="pt-[16px] min-w-[100vw] px-[16px] bg-[#18222d] flex flex-col h-[100vh] overflow-y-scroll pb-[100px]">
            <Cap steps={2} className={"mt-[4px] flex items-center"} step={2} > 
                <Text className = {"font-sf-pro-display-600 text-[20px] font-semibold text-white"}> Создайте объявление </Text>{" "}
            </Cap>

            <DescriptionAndPhoto   className={"mt-[18px]"} titleStyles={{
                color : "#DAF5FE"
            }} textTitle={"ТЭГИ"} textPlaceholder={"Презентации, motion, UX, 3D"} setText={setTaggsFunction} isFileInput = {false} text={taggsText} />
            
            <p className='font-sf-pro-display-400 mt-[5px] ml-[16px] text-[13px] leading-[16px] mx-auto text-[#daf5fe]'>
                Введите теги через запятую (например: логотип, брендинг, figma), но не больше 6-ти.
            </p>

            {
                taggs.length!==0 &&  <div className='flex mt-[18px] flex-wrap gap-[6px]'>
                {taggs.map((tag, index) => (
                    <div className='flex py-[7px] px-[12px] rounded-[8.35px] border-solid border-[1px] border-telegram'>
                        <p className='font-sf-pro-display leading-[17px] text-[15px] text-white'>{tag}</p>
                    </div>
                ))}
            </div>
            }

            <div className='flex flex-col gap-2 mt-[18px]'>
                <p className='mr-4 ml-[16px] font-sf-pro-display text-[13px] leading-4 text-[#DAF5FE]'>
                    ССЫЛКИ
                </p>
                <div className='flex flex-col w-full gap-2'>
                    {links.map( (link, index) => (
                        <BaidgeCreatingLink addLink={addLink} isAddActive = {isAddActive} deleteLink={deleteLink(index)} setLinks={setLinks} key={index} index={index} setText={changeLinksHandler(index)} text={link} />
                    ) )}
                </div>
            </div>


        </div>
    );
};

export default BaidgeCreatingTwo;
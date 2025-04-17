import React from 'react';
import useIsNeededToFill from './hooks/useIsNeededToFill';
import useIsNeededToActive from './hooks/useIsNeededToActive';

const NewOption = ({text, isNededToFill, imgPath, neededActiveButton, isNeededBorder, isAloneElement}) => {
    const IsNeededToFillJsxComponent = useIsNeededToFill({isNededToFill})
    const isNeededActiveJsxComponent = useIsNeededToActive({isNeededToActive : neededActiveButton})
    return (
        <div className={`flex ${isAloneElement ? "pl-[19px] rounded-[12px]" : "ml-[19px]"} ${isNeededBorder ? "border-[#606060] border-b-[0.5px]" : ""} border-solid bg-[#20303f]  pr-[16px] py-[8px] items-center`}>

            <img src={imgPath} alt="" />

            <div className="flex gap-[7px] items-center ml-[19px]">
                <p className="font-sf-pro-display-400 text-[17px] text-white">{text}</p>
                {IsNeededToFillJsxComponent}
                {isNeededActiveJsxComponent}
            </div>

            <img className="ml-auto"  src={"/images/newProfile/leftArrow.svg"} alt="" />

        </div>
    );
};

export default NewOption;
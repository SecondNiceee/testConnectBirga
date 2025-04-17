import React from 'react';

const useIsNeededToActive = ({isNeededToActive}) => {
    if (isNeededToActive){
        return (
            <div className='py-[3px] px-[4px] bg-[#2ea5ff] rounded-[5px]'>
                <p className='font-sf-pro-display-700 text-[10px] tracking-wider font-bold leading-[12px] uppercase text-white'>активна</p>
            </div>
        )
    }
    return null
};

export default useIsNeededToActive;
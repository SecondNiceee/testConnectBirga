import React from 'react';

const useIsNeededToActive = ({isNeededToActive}) => {
    if (isNeededToActive){
        return (
            <div className='py-[3px] px-[4px] bg-[#2ea5ff] rounded-[5px]'>
                <p className='font-bold text-white font-sf-pro-display uppercase text-[9px]'>активна</p>
            </div>
        )
    }
    return null
};

export default useIsNeededToActive;
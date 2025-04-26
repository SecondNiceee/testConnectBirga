import React from 'react';

const NitcheRating = ({nitcheRating}) => {
    return (
        <div className="flex ml-[23px] mt-[23px] flex-col gap-[5px] my-auto">
        <h2 className="font-sf-pro-display-600 text-[17px]  text-white leading-[18px]">
          #{nitcheRating }
        </h2>
        <p className="font-sf-pro-display max-w-[80px] text-[13px] tracking-wide text-white leading-[16px]">
          в рейтинге по нише
        </p>
      </div>
    );
};

export default NitcheRating;
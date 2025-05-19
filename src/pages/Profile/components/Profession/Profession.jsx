import React from 'react';

const Profession = ({professtion}) => {
    return (
        <div className="py-[3px] px-[9px] rounded-[7px] bg-[#FFD60A1A] w-fit">
        <p className="font-sf-pro-display tracking-wide text-[14px] text-[#ffd60a]">
          {professtion ?? "Не указана профессия"}
        </p>
      </div>
    );
};

export default Profession;
import  { memo } from "react";
import { openLink } from "../../../functions/openLink";

const GoToMessageButton = ({link, className}) => {
  return (
    <div onClick={() => {openLink(`https://t.me/${link}`)}} className={`w-full cursor-pointer py-[11px] justify-center items-center gap-1 flex bg-telegram rounded-[11.67px] ${className}`}>
      <p className="text-white items-center font-sf-pro-display-600  leading-[15.643px] tracking-[0.34px]">
        Перейти в сообщения
      </p>
      <img
        className="w-[27px] h-[27px]"
        src="/images/Baidge/message.svg"
        alt=""
      />
    </div>
  );
};

export default memo(GoToMessageButton);

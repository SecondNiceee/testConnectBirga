import { useMemo } from "react";
const useGetNitcheIcon = ({className = "", nitchRating }) => {
    const nitchIcon = useMemo( () => {
        if (nitchRating === 1){
            return <img alt="rating-icon" className={className} src="/images/Rating/nitche-top1.svg" /> 
        }
        if (nitchRating === 2){
            return <img alt="rating-icon" className={className} src="/images/Rating/nitche-top2.svg" /> 
        }
        if (nitchRating === 3){
            return <img alt="rating-icon" className={className} src="/images/Rating/nitche-top3.svg" /> 
        }
        if (nitchRating < 51 && nitchRating > 3){
            return (<div className="relative">
                <p className="absolute bottom-[22px] left-1/2 -translate-x-1/2 leading-[55px] font-sf-pro-display-700 text-[25px] text-[#21303F]"></p>
            <img alt="rating-icon" className={className} src={"/images/Rating/nitche-top1-50.svg"} />
            </div>) 
        }
        return null;
    }, [] )
    return {nitchIcon, className, nitchRating};
};

export default useGetNitcheIcon;
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
            return <img alt="rating-icon" className={className} src={"/images/Rating/nitche-top1-50.svg"} />
        }
        return null;
    }, [] )
    return {nitchIcon, className, nitchRating};
};

export default useGetNitcheIcon;
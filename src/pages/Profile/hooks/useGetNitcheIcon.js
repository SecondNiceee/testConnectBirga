import { useMemo } from "react";
const useGetNitcheIcon = ({className = "", textClassName, nitchRating }) => {
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
                <p className={textClassName}>{nitchRating}</p>
            <img alt="rating-icon" className={className} src={"/images/Rating/nitche-top1-50.svg"} />
            </div>) 
        }
        return null;
    }, [className, nitchRating, textClassName] )
    return {nitchIcon, className, nitchRating};
};

export default useGetNitcheIcon;
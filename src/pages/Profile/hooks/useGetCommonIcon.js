import { useMemo } from "react";
const useGetCommonIcon = ({className = "", textClassName = "", commonRating }) => {
    const commonIcon = useMemo( () => {
        if (commonRating === 1){
            return <img alt="rating-icon" className={className} src="/images/Rating/common-top1.svg" /> 
        }
        if (commonRating === 2){
            return <img alt="rating-icon" className={className} src="/images/Rating/common-top2.svg" /> 
        }
        if (commonRating === 3){
            return <img alt="rating-icon" className={className} src="/images/Rating/common-top3.svg" /> 
        }
        if (commonRating < 51 && commonRating > 3){
            
            return (<div className="relative">
                <p className={textClassName}>{commonRating}</p>
            <img alt="rating-icon" className={className} src={"/images/Rating/common-top1-50.svg"} />
            </div>) 
        }
        return null;
    }, [commonRating, className, textClassName] )
    return {commonIcon};
};

export default useGetCommonIcon;
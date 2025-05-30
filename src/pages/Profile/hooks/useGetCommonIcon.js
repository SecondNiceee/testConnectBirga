import { useMemo } from "react";
const useGetCommonIcon = ({className = "", commonRating }) => {
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
            return <img alt="rating-icon" className={className} src={"/images/Rating/common-top1-50.svg"} />
        }
        return null;
    }, [commonRating, className] )
    return {commonIcon};
};

export default useGetCommonIcon;
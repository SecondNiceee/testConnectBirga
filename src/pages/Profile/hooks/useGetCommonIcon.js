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
            
            return (<div className="relative">
                <p className="absolute bottom-[22px] left-1/2 -translate-x-1/2 leading-[55px] font-sf-pro-display-700 text-[25px] text-[#21303F]"></p>
            <img alt="rating-icon" className={className} src={"/images/Rating/common-top1-50.svg"} />
            </div>) 
        }
        return null;
    }, [commonRating, className] )
    return {commonIcon};
};

export default useGetCommonIcon;
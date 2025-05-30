import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../../store/information";
import { useMemo } from "react";
import StarIcon from "../../../images/icons/Star.svg"

const useGetBaidgeOprionsConfig = ({userInfo}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baidgeOptionsConfig = useMemo( () => {
    return (
        [
            {
                imgPath : "/images/Baidge/feedback-icon.svg",
                text : "Отзывы",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {},
                node : <div className="flex items-center gap-[6.67px]">
                    <div className="flex items-center gap-[5px]">
                        <img alt="#" src={StarIcon} className="w-[15.94px] h-[15.23px]" />
                        <p className="text-white font-sf-pro-display-400 text-[17.33px]">5.0</p>
                    </div>
                    <p className="text-[17.33px] font-normal font-sf-pro-display-400 text-[#DAF5FE]">(17)</p>
                </div>
            },
            {
                imgPath : "/images/Baidge/portfolioIcon.svg",
                text : "Портфолио",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    dispatch(setUser(userInfo))
                    navigate("/cardsPage")
                },
                numberNearToArrow : userInfo?.profile.cards.length
            },
            {
                imgPath : "/images/Baidge/StatisticIcon.svg",
                text : "Подробнее",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    dispatch(setUser(userInfo))
                    navigate("/statistik")
                },
                numberNearToArrow : null
            }
        ]
    );
    }, [navigate, dispatch, userInfo] )

    return baidgeOptionsConfig
};

export default useGetBaidgeOprionsConfig;
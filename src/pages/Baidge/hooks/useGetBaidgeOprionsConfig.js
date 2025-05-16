import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../../store/information";

const useGetBaidgeOprionsConfig = ({userInfo}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        [
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
                text : "Статистика",
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
};

export default useGetBaidgeOprionsConfig;
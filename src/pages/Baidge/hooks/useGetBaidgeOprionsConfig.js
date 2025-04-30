
const useGetBaidgeOprionsConfig = ({setStatistikOpened, userInfo, setPortfoliosOpened}) => {
    return (
        [
            {
                imgPath : "/images/Baidge/portfolioIcon.svg",
                text : "Портфолио",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {setPortfoliosOpened(true)},
                numberNearToArrow : userInfo?.profile.cards.length
            },
            {
                imgPath : "/images/Baidge/StatisticIcon.svg",
                text : "Статистика",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {setStatistikOpened(true)},
                numberNearToArrow : null
            }
        ]
    );
};

export default useGetBaidgeOprionsConfig;
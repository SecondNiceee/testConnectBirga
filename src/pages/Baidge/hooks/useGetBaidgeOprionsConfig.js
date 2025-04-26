
const useGetBaidgeOprionsConfig = ({setStatistikOpened}) => {
    return (
        [
            {
                imgPath : "/images/Baidge/portfolioIcon.svg",
                text : "Портфолио",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {},
                numberNearToArrow : 2
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
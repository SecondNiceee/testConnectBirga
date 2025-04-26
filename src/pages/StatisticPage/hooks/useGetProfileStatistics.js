import formatNumberWithSpaces from "../../../functions/formateMoneyWithSpace";
import getYearWord from "../../../functions/getYearWord";

const useGetProfileStatistics = ({userConfig, cards }) => {
    console.log(cards)
    const numberOfCardsWatches = cards.reduce((acc, curValue, index, array) => {
        return acc + curValue.watches
        } , 0)
    console.log(numberOfCardsWatches)
    return [
        {
            title : "Позиция в общем рейтинге",
            text : "#" + userConfig.positionOfCommonRating
        },
        {
            title : "Позиция в рейтинге по нише",
            text : "#" + userConfig.positionOfNitcheRating
        },
        {
            title : "Очков рейтинга",
            text : formatNumberWithSpaces(userConfig.ratingCounter)
        },
        {
            title : "Просмотров профиля",
            text : formatNumberWithSpaces(userConfig.profileWatches)
        },
        {
            title : "Просмотров кейсов",
            text : "-"
        },
        {
            title : "Лайков профиля",
            text : formatNumberWithSpaces(userConfig.counterOfLikes)
        },
        {
            title : "Стаж/Опыт работы",
            text : getYearWord(userConfig.stage)
        }
    ]
};

export default useGetProfileStatistics;
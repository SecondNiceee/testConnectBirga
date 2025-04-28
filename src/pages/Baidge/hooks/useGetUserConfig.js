import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useGetUserPhotoLink from "../../../hooks/useGetUserPhotoLink";
import { getCounterOfResponses } from "../../../functions/api/getCounterOfResponses";

const useGetUserConfig = ({ isMyBaidge, gotenConfig }) => {

  const photoLink = useGetUserPhotoLink();

  const userInfo = useSelector((state) => state.telegramUserInfo);

  const [counterOfResponses, setCounterOfResponses] = useState(null)

  useEffect( () => {
    if (userInfo.id){
      getCounterOfResponses(userInfo.id).then((value) => setCounterOfResponses(value)).catch((e) => setCounterOfResponses("-"))
    }
  } , [setCounterOfResponses, userInfo.id] )

  const links = [   // Всегда первая ссылка должна быть на мой тг 
    "https://t.me/Nick",
    "https://www.behance.net/",
    "https://dribbble.com/",
    "https://www.artstation.com/",
    "https://www.deviantart.com/",
    "https://ru.pinterest.com/",
    "https://github.com/",
    "https://gitlab.com/",
    "https://bitbucket.org/",
    "https://codepen.io/",
    "https://replit.com/",
    "https://www.youtube.com/",
    "https://vimeo.com/",
    "https://www.tiktok.com/",
    "https://www.instagram.com",
    "https://t.me/rinazqq",
    "https://www.linkedin.com/",
    "https://hh.ru/",
    "https://www.notion.com/",
    "https://tilda.cc/ru/",
    "https://readymag.com",
    "https://webflow.com/",
    "https://www.framer.com/",
    "https://www.figma.com/"
  ]

  const userConfig = useMemo(() => {
    if (gotenConfig) {
      return gotenConfig;
    }
    if (isMyBaidge) {
      if (!userInfo.id || !userInfo.profession){
        return null;
      }
      return {
        counterOfLikes: userInfo.userLikes.length,
        positionOfNitcheRating: "-",
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        photoUrl: photoLink,
        positionOfCommonRating : "-",
        profession: userInfo.profession.profession,
        profileWatches: userInfo.views,
        isLikeActive: false,
        ratingCounter : userInfo.rating,
        aboutMe: userInfo.profile.about ,
        telegramProfileLink: userInfo.link,
        links : userInfo.links,
        stage : userInfo.stage,
        completedTasks : userInfo.completedTasks,
        secureTask : "-",
        numberOfResponses : counterOfResponses,
        customerOffers : "-",
        taggs : userInfo.taggs
      };
    }
    return {
      counterOfLikes: 0,
      positionOfNitcheRating: 12,
      positionOfCommonRating : 1,
      firstName: "Кто кто",
      lastName: "Кто",
      photoUrl: photoLink,
      profession: "не знаю",
      profileWatches: 1000,
      isLikeActive: true,
      ratingCounter : 10,
      aboutMe: `Привет это я Коля тут долгий текст так - то , но это по факту так нужно нужно ахахаха! Я легенда как цой, но такой молодой
            Привет это я Коля тут долгий текст так - то , но это по факту так нужно нужно ахахаха! Я легенда как цой, но такой молодой
            Привет это я Коля тут долгий текст так - то , но это по факту так нужно нужно ахахаха! Я легенда как цой, но такой молодой`,
      taggs: ["Коля", "Николя", "Капсула", "Как", "Что "],
      links : links,
      stage : 20,
      completedTasks : 2 ,
      secureTask :1,
      numberOfResponses : 0,
      customerOffers : 13
    };
  }, [userInfo, photoLink, gotenConfig]);

  return userConfig;
};

export default useGetUserConfig;

import { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import BaidgeWithProfile from "./components/BaidgeWithProfile";
import BaidgeWithoutProfile from "./components/BaidgeWithoutProfile";
import { useParams } from "react-router";
import { findUserById } from "../../functions/api/findUserById";
import menuController from "../../functions/menuController";

// id : userConfig.id,
// counterOfLikes: userInfo.userLikes.length,
// positionOfNitcheRating: "-",
// firstName: userInfo.firstName,
// lastName: userInfo.lastName,
// photoUrl: photoLink,
// positionOfCommonRating : "-",
// profession: userInfo.profession.profession,
// profileWatches: userInfo.views,
// isLikeActive: userInfo.userLikes.includes(userInfo.id),
// ratingCounter : userInfo.rating,
// aboutMe: userInfo.profile.about ,
// telegramProfileLink: userInfo.link,
// links : userInfo.links,
// stage : userInfo.stage,
// completedTasks : userInfo.completedTasks,
// secureTask : "-",
// numberOfResponses : counterOfResponses,
// customerOffers : "-",
// taggs : userInfo.taggs

// const params = { id: 2 };
// const params = null

// УЧТИ НУЖНО ДОНАСТРОИТЬ ЛАЙК
const Baidge = () => {

  const me = useSelector((state) => state.telegramUserInfo);

  const {id} = useParams();

  const [userInfo, setUserInfo] = useState(null);

  useEffect( () => {
    menuController.showMenu();
  }, [] );

  useEffect(() => {
    if (id) {
      findUserById(id).then( (user) => {setUserInfo(user)} )
    } else {
      setUserInfo(me);
    }
  }, [ me, id]);


  if (!userInfo || userInfo.id === null) {
    return <MyLoader />;
  }
  return (
    <>
      {/* <button onClick={fowardFunction} className="fixed left-1/2 bottom-1/3 z-[1000]">MAIN BUTTON</button> */}
      {userInfo.profession ? (
        <BaidgeWithProfile
          userInfo={userInfo}
        />
      ) : (
        <BaidgeWithoutProfile userInfo={userInfo} />
      )}

    </>
  );
};

export default Baidge;

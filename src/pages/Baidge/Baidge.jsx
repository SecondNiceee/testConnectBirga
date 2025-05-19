import { useCallback, useEffect, useRef, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import BaidgeWithProfile from "./components/BaidgeWithProfile";
import BaidgeWithoutProfile from "./components/BaidgeWithoutProfile";
import { useParams } from "react-router";
import { findUserById } from "../../functions/api/findUserById";
import menuController from "../../functions/menuController";
import MainButton from "../../constants/MainButton";
import { putUserInfo } from "../../store/telegramUserInfo";
import { apiRating } from "../../functions/api/ApiRating";

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

  console.log(me);

  useEffect(() => {
    if (id) {
      findUserById(id).then( (user) => {setUserInfo(user)} )
    } else {
      setUserInfo(me);
    }
  }, [ me, id]);

  useEffect( () => {
    MainButton.hide();
    
  }, [] )

  const dispatch = useDispatch();

  const addWatch = useCallback( async () => {
    if (userInfo){
      dispatch(putUserInfo([{
        views : userInfo.views + 1
      }, userInfo.id]))
    }
  }, [dispatch, userInfo] )



  useEffect( () => {
    if (userInfo && userInfo.id && me.id ){
      if (userInfo.id !== me.id){
        addWatch();
      }
    }
  } , [userInfo, me, addWatch])


  if (!userInfo || userInfo.id === null) {
    return <MyLoader />;
  }
  return (
    <>
      {/* <button onClick={fowardFunction} className="fixed left-1/2 bottom-1/3 z-[1000]">MAIN BUTTON</button> */}
      {true? (
        <BaidgeWithProfile
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
      ) : (
        <BaidgeWithoutProfile userInfo={userInfo} />
      )}

    </>
  );
};

export default Baidge;

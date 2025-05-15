import React, { useCallback, useEffect, useState } from "react";
import {useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import useSlider from "../../hooks/useSlider";
import CssTransitionSlider from "../../components/UI/PhotosSlider/CssTransitionSlider";
import { getUserWithoutCards } from "../../functions/api/getUserWithoutCards";
import { getCardByUserId } from "../../functions/api/getCardsByUserId";
import { getAdvertisementsByUserId } from "../../functions/api/getAdvertisementsByUserId";
import BaidgeWithProfile from "./components/BaidgeWithProfile";
import BaidgeWithoutProfile from "./components/BaidgeWithoutProfile";

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
const Baidge = ({ gotenUserId, setBaidgeClose, className }) => {
  const me = useSelector((state) => state.telegramUserInfo);

  const [userInfo, setUserInfo] = useState(null);

  console.log(gotenUserId);

  const getUserInformation = useCallback(async () => {
    const user = await getUserWithoutCards(gotenUserId);
    if (user.profession) {
      const cards = await getCardByUserId(gotenUserId);
      user.cards = cards;
      return user;
    } else {
      const userAdvertisements = await getAdvertisementsByUserId(gotenUserId, 1, 1);
      user.advertisements = userAdvertisements;
      return user;
    }
  }, [gotenUserId]);

  useEffect(() => {
    if (gotenUserId) {
      getUserInformation().then((user) => setUserInfo(user));
    } else {
      setUserInfo(me);
    }
  }, [gotenUserId, me, getUserInformation]);

  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  if (!userInfo || userInfo.id === null) {
    return <MyLoader className = {className} />;
  }
  return (
    <>
      {/* <button onClick={fowardFunction} className="fixed left-1/2 bottom-1/3 z-[1000]">MAIN BUTTON</button> */}
      {userInfo.profession ? (
        <BaidgeWithProfile
          isSliderOpened={isSliderOpened}
          setBaidgeClose={setBaidgeClose}
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSlideOpened={setSlideOpened}
          userInfo={userInfo}
          className={className}
        />
      ) : (
        <BaidgeWithoutProfile className = {className} userInfo={userInfo} />
      )}

      <CssTransitionSlider
      className={className}
        blockerAll={true}
        blockerId={""}
        isSliderOpened={isSliderOpened}
        leftPosition={0}
        renderMap={photos}
        setSliderOpened={setSlideOpened}
        sliderIndex={photoIndex}
        swiperId={"1"}
        top={0}
      />
    </>
  );
};

export default Baidge;

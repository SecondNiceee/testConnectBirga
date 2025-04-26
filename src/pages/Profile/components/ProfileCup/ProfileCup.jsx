import React from "react";
import { useSelector } from "react-redux";
import userPhoto from "../../../../images/userPhoto/user.png";
import Text from "../../../../components/Text/Text";
import "../../../../scss/main.css";

const ProfileCup = () => {
  const userInfo = useSelector((state) => state.telegramUserInfo);
  return (
    <div className="flex flex-col w-[100%] items-center justify-center">
      <img
        style={{ objectFit: "cover" }}
        src={
          userInfo.photo.length > 0
            ? userInfo.photo.split("https://").length === 2
              ? userInfo.photo  
              : `${process.env.REACT_APP_HOST}/${userInfo.id}/${userInfo.photo}`
            : userPhoto
        }
        className="profile__icon icon"
        alt=""
      />

      <Text className="urName" id="Name">
        {userInfo.firstName.length > 22
          ? userInfo.firstName.slice(0, 22) + ".."
          : userInfo.firstName}
      </Text>
    </div>

  );
};

export default ProfileCup;

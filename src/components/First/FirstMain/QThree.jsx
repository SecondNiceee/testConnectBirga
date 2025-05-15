import React, { memo } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import { addWatch } from "../../../store/watchedAds";
import { useNavigate } from "react-router";

const QThree = ({isMyAds , isResponce, isButton, index, dispatch, id }) => {
  const navigate = useNavigate();
  return (
    <>
      {!isMyAds && !isResponce ? (
        <MyButton
        hard = {true}
          style={isButton ? {} : { display: "none" }}
          onClick={(e) => {
            
            dispatch(addWatch(id));
            navigate(`/FirstDetails/${id}`)
          }}
        >
          Подробнее
        </MyButton>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(QThree);

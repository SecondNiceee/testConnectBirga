import { memo } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import { useNavigate } from "react-router";

const QThree = ({isMyAds , isResponce, isButton, setDetailsActive, index, dispatch, id }) => {
  return (
    <>
      {!isMyAds && !isResponce ? (
        <MyButton
        hard = {true}
          style={isButton ? {} : { display: "none" }}
          onClick={setDetailsActive}
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

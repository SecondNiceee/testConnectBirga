import React, { useCallback } from "react";

import FirstBlock from "../../../components/First/FirstMain/FirstBlock";
import AdCreateFunc from "../../../components/UI/AdCreateFunc/AdCreateFunc";
import { deleteAd } from "../../../store/information";
const PickerContent = ({
  myAdsArray,
  nowValue,
  setSecondPage,
  setDetailsActive,
  setDetails,
  dispatch,
  setSliderAcitve,
}) => {
  console.log(setSliderAcitve);
  const deleteFunction = useCallback(
    (e) => {
      window.Telegram.WebApp.showPopup(
        {
          title: "Удалить?",
          message: "Вы хотите удалить это задание?",
          buttons: [
            { id: "save", type: "default", text: "Да" },
            { id: "delete", type: "destructive", text: "Нет" },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete" || buttonId === null) {
          }
          if (buttonId === "save") {
            dispatch(deleteAd(e.id));
          }
        }
      );
    },
    [dispatch]
  );

  console.log(nowValue);

  return (
    <div
      className="PickerContent"
      style={
        nowValue === "customer"
          ? { transform: "translateX(-50%)" }
          : { transform: "translateX(0%)" }
      }
    >
      <div className="picker__block">
        <p>привет</p>
      </div>

      <div className="picker__block">
        <AdCreateFunc text={"Создать объявление"} link={"/AdCreating"} />
        {/* <Link to="/AdCreating" className="AdCreactingFunction">
            <img src={plus} alt="" />
            <p>Создать объявление</p>
          </Link> */}
        <div className="AdsContainer">
          {myAdsArray.map((e, i) => {
            return (
              <div
                key={i}
                className="block"
                onClick={(p) => {
                  if (
                    p.target.closest(".FirstMain__bottom-right") === null &&
                    p.target.closest(".first__photos") === null
                  ) {
                    //  setTask(e);
                    setSecondPage({ isActive: true, task: e, index: i });
                  }
                }}
              >
                <FirstBlock
                  setSlideActive={setSliderAcitve}
                  myAdsFunc={(value) => {
                    setSecondPage({ isActive: true, task: e, index: i });
                  }}
                  isMyAds={true}
                  deleteFunction={() => {
                    deleteFunction(e);
                  }}
                  key={i}
                  isButton={true}
                  // setDetailsActive={() => {
                  //   setDetails({
                  //     isActive : true,
                  //     task : myAdsArray[i],
                  //     index : i
                  //   })

                  // }}
                  {...e}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PickerContent;

import React, { memo, useCallback, useEffect, useState } from "react";

import FirstBlock from "../../../components/First/FirstMain/FirstBlock";
import AdCreateFunc from "../../../components/UI/AdCreateFunc/AdCreateFunc";
import { deleteAd } from "../../../store/information";
import { useDispatch, useSelector } from "react-redux";
import ResponseBlock from "../../../components/MyAds/ResponseBlock";
import ShowMyResponse from "../../../components/MyAds/ShowMyResponse/ShowMyResponse";
import { CSSTransition } from "react-transition-group";
import BackButton from "../../../constants/BackButton";
import FirstDetails from "../../../components/First/FirstDetails/FirstDetails";
const PickerContent = ({
  myAdsArray,
  nowValue,
  setSecondPage,
  setSliderAcitve,
}) => {
  const dispatch = useDispatch();
  console.log("рендер ферста");
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

  const responsesArr = useSelector((state) => state.responses.responses);
  const [myResponse, setMyResponse] = useState({
    isOpen: false,
    id: 0,
  });
  const [details, setDetails] = useState({
    isOpen : false,
    id : 0
  })
  console.log(responsesArr);

  const buttonFunction = useCallback( (index) => {
      setMyResponse({isOpen : true , id : index})
  } , []  )


  useEffect( () => {
    function goBack(){
      if (details.isOpen){
        setDetails( (value) => ({...value , isOpen : false}) )
      }
      else{
        if (myResponse.isOpen){
          setMyResponse( (value) => ({...value , isOpen : false}) )
        }
      }
    }
    if (myResponse.isOpen){
      BackButton.onClick(goBack)
      BackButton.show()
    }
    else{
      BackButton.hide()
      BackButton.offClick(goBack)
    }
  
  } , [myResponse.isOpen, details.isOpen] )

  const openDetails = useCallback( (index) => {
    setDetails({isOpen : true, id : index})
  } , [] )
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
        <div className="AdsContainer">
          {responsesArr.map((e, i) => {
            return <ResponseBlock  func={buttonFunction} index={i}  buttonText={"МОЙ ОТКЛИК"} task={e} {...e.advertisement} />;
          })}
        </div>
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
                  //   // setDetails({
                  //   //   isActive : true,
                  //   //   task : myAdsArray[i],
                  //   //   index : i
                  //   // })

                  // }}
                  {...e}
                />
              </div>
            );
          })}
        </div>
      </div>

      <CSSTransition
        in={myResponse.isOpen}
        timeout={400}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
  
      >
        <ShowMyResponse index={myResponse.id} openDetails = {openDetails} response={responsesArr[myResponse.id]} />
      </CSSTransition>


      <CSSTransition
            in={details.isOpen}
            timeout={400}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
          >
            <FirstDetails
              style = {{
                left : "-16px",
                top : "-248px",
                width : "100vw"
              }}
              // className={}
              orderInformation={responsesArr[details.id].advertisement  }

            />
        </CSSTransition>



    </div>
  );
};

export default memo(PickerContent);

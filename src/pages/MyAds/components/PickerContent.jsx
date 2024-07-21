import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { deleteAd } from "../../../store/information";
import { useDispatch, useSelector } from "react-redux";
import ShowMyResponse from "../../../components/MyAds/ShowMyResponse/ShowMyResponse";
import { CSSTransition } from "react-transition-group";
import BackButton from "../../../constants/BackButton";
import FirstDetails from "../../../components/First/FirstDetails/FirstDetails";
import PickerTwo from "./PickerTwo";
import PickerOne from "./PickerOne";
import { clearResponses, fetchResponses } from "../../../store/responses";
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

  const filteredResponses = useMemo( () => {
      return responsesArr.sort((a,b) => {
        let order = {"inProcess" : 1 , "watched" : 2 , "" : 3, "completed" :}
        return order[a.isWatched] - order[b.isWatched]
      })
  } , [responsesArr] )
  
  console.log(responsesArr)
  const [myResponse, setMyResponse] = useState({
    isOpen: false,
    id: 0,
  });
  const [details, setDetails] = useState({
    isOpen : false,
    id : 0
  })

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
      

      <PickerOne nowValue = {nowValue}  responsesArr = {filteredResponses} buttonFunction = {buttonFunction} />

      <PickerTwo myAdsArray={myAdsArray} setSecondPage = {setSecondPage} setSliderAcitve = {setSliderAcitve} deleteFunction = {deleteFunction} />

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
              orderInformation={responsesArr[details.id] ? responsesArr[details.id].advertisement : ""  }

            />
        </CSSTransition>



    </div>
  );
};

export default memo(PickerContent);

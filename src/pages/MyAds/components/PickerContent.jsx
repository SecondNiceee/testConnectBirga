import React, { memo, useCallback, useEffect, useRef, useState } from "react";

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

  const me = useSelector(state => state.telegramUserInfo)

  const interRef = useRef(null)
  console.log(interRef)

  const [page, setPage] = useState(1)

  // useEffect( () => {
  //   if (nowValue === "freelancer" ){
  //     dispatch(fetchResponses(me))
  //   }
  // } , [nowValue] )


  const responsesStatus = useSelector(state => state.responses.status)


  useEffect( () => {
    if (nowValue!== "freelancer"){
      dispatch(clearResponses())
    }
  } , [nowValue] )

  const  getMore = useCallback( async () => {
    dispatch(fetchResponses([me,page]))
    setPage(page + 1)
}, [page, setPage , dispatch] )

const onIntersaction = useCallback( (entries) => {
    const firtEntry = entries[0]
    if (firtEntry.isIntersecting && responsesStatus !== 'all'){
      getMore()
    } 
}, [responsesStatus, getMore] )



  useEffect( () => {
    const observer = new IntersectionObserver(onIntersaction)
    if (observer && interRef.current){
      observer.observe(interRef.current)
    }
    return () => {
      observer.disconnect()
    }
  } , [responsesArr])


  return (
    <div
      className="PickerContent"
      style={
        nowValue === "customer"
          ? { transform: "translateX(-50%)" }
          : { transform: "translateX(0%)" }
      }
    >
      

      <PickerOne status = {responsesStatus}  ref={interRef} responsesArr = {responsesArr} buttonFunction = {buttonFunction} />

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

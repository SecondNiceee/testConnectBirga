import React, { useCallback, useMemo, useState } from "react";

// import myImage from '../../images/desccription.png'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMenuActive } from "../../store/menuSlice";
import useListner from "../../hooks/useListner";
import "./MyAds.css";

import { motion } from "framer-motion";
import LastAds from "./components/LastAds";
import MyAdOne from "./components/MyAdOne";
import AboutReaction from "./components/AboutReaction";
import AboutOne from "./components/AboutOne";
import { CSSTransition } from "react-transition-group";
import SliderMain from "../../components/UI/Swiper/SliderMain";
import sortFiles from "../../functions/sortFiles";
import { putMyTask } from "../../store/information";
import AdCreatingOne from "../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { useButton } from "../../hooks/MyAds/useButton";
import { useSave } from "../../hooks/MyAds/useSave";
import pagesHistory from "../../constants/pagesHistory";
import CardPage from "../CardPage/CardPage";
import ShowMyResponse from "../../components/MyAds/ShowMyResponse/ShowMyResponse";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import { deleteResponse } from "../../store/responses";

// const LastAds = lazy( () => import ("./components/LastAds") )
// const MyAdOne = lazy( () => import ("./components/MyAdOne") )
// const AboutOne = lazy( () => import ("./components/AboutOne") )
// const AboutReaction = lazy( () => import ("./components/AboutReaction") )


let localAboutReaction;
let localSecondPage;
let localIsOpen;
let localDetails;
let detailsVar;
const MyAds = () => {



  
  const [valueOne , setValueOne] = useState("all")

  const [valueTwo , setValueTwo] = useState("all")



  const responsesArr = useSelector((state) => state.responses.responses);

  const sortedResponses = useMemo( () => {
    let copy = [...responsesArr]
      return copy.sort((a,b) => {
        let order = {"inProcess" : 1 , "watched" : 2 , "" : 3, "completed" : 4}
        return order[a.isWatched] - order[b.isWatched]
      })
  } , [responsesArr] )

  const filteredResponses = useMemo( () => {
    switch (valueOne){
      case "all":
        return sortedResponses
      case "inProcess":
        return sortedResponses.filter(e => e.isWatched === "inProcess")
      case "watched": 
        return sortedResponses.filter(e => e.isWatched === "watched")
      case "unWatched":
        return sortedResponses.filter(e => e.isWatched === "")
      case "completed":
        return sortedResponses.filter(e => e.isWatched === "completed")
      default : 
        alert("Что - то пошло не так MyAds")
    }
  } , [sortedResponses , valueOne]  )




  const isMenuActive = useSelector((state) => state.menu.value);
  const dispatch = useDispatch()

  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );
  


  const [details, setDetails] = useState({
    isActive: false,
    task: {
      id: "",
      taskName: "",
      taskDescription: "",
      deadline: 1,
      category: 1,
      subCategory: 1,
      price: 2000,
      time: { start: "", end: "" },
      photos: [],
      photosNames: [],
    },
  });

  detailsVar = details;
  
  const myAdsArray = useSelector((state) => state.information.myAdsArray);


  
  
  const [secondPage, setSecondPage] = useState({
    isActive : false,
    task : myAdsArray[0],
    index : 0
  }
  );
  const [openAboutReaction, setOpenAboutReaction] = useState({
    isActive : false,
    responce : null
  });

  const [oneCards, setOneCard] = useState({
    isOpen : false,
    card : {}
  })



  function checkMistakes(changingTask) {
    let taskName = false;
    let timeError = false;
    if (changingTask.taskName.length < 5) {
      taskName = true;
    }

    if (changingTask.time.end.length > 0) {
      if (changingTask.time.end < changingTask.time.start) {
        timeError = true;
      }
    }
    let rezult = { taskName: taskName, timeError: timeError };


    setMistakes(rezult);
    return Object.values(rezult).every((value) => value === false);
  } 



  const [isOpen, setOpen] = useState({ isActive: false, responce: {
    information: "",
    photos: [],
    user: {
        id: 0,
        fl: "",
        photo: "",
        about: "",
        stage: null,
    }
  } });

  localAboutReaction = openAboutReaction;
  localIsOpen = isOpen;
  localSecondPage = secondPage;
  localDetails = details



  console.log(pagesHistory)

  const navigate = useNavigate();

  const [sliderActive , setSliderActive] = useState({
    isActive : false,
    photos : [],
    index : 0
  })
  console.log(details)
  const save = useSave({
    detailsVar,
    myAdsArray,
    secondPage,
    checkMistakes,
    sortFiles,
    dispatch,
    putMyTask,
    setDetails,
    details
  })// функция сохранения , а также модалка телеграма



  const [myResponse, setMyResponse] = useState({
    isOpen: false,
    id: 0,
  });
  const [detailsTwo, setDetailsTwo] = useState({
    isOpen : false,
    id : 0
  })

  const openDetails = useCallback( (index) => {
    setDetailsTwo({isOpen : true, id : index})
  } , [] )


  useButton({
    setMyResponse : setMyResponse,
    myResponse : myResponse,
    setDetailsTwo : setDetailsTwo,
    detailsTwo : detailsTwo, 
    oneCards : oneCards,
    sliderActive : sliderActive,
    localDetails : localDetails,
    localAboutReaction : localAboutReaction,
    localIsOpen : localIsOpen,
    setOpen : setOpen,
    setSecondPage : setSecondPage,
    navigate : navigate,
    setOpenAboutReaction : setOpenAboutReaction,
    setSliderActive : setSliderActive,
    openAboutReaction : openAboutReaction,
    isOpen : isOpen,
    details : details,
    secondPage : secondPage,
    localSecondPage : localSecondPage,
    setDetails : setDetails,
    save : save,
    setOneCard : setOneCard
  })


  function setDetailsActive(value) {
    setDetails({ ...details, isActive: value });
  }

  useListner({
    isMenuActive,
    setMenuActive,
    setDetailsActive,
    isDetailsActive: details.isActive,
    isOpen,
  });


  const [mistakes, setMistakes] = useState({
    taskName: false,
    timeError: false,
  }); // контролер ошибок

  



  const setChangingTask = useCallback( (e) => {
    setDetails( (value) =>  ({...value , task : e}))
  }, [setDetails] ) 
  const [nowValue , setNowKey] = useState('customer')



  // const sortedArray = useMemo( () => {
  //   let copy = [...myAdsArray]

  //     return copy.sort( (a , b) => {
  //       let order = {"inProcess" : 0 , "active" : 1, "completed" : 2 }
  //       return order[a.status] - order[b.status]
  //     } )
    
  // } , [myAdsArray , nowValue] )

  const filteredArray = useMemo( () => {
    switch (valueTwo){
      case "all":
        return myAdsArray
      case "active":
        return myAdsArray.filter((e, i) => {
          return e.status === "active"
        })
      case "inProcess":
        return myAdsArray.filter(e => e.status === "inProcess")
      case "completed":
        return myAdsArray.filter(e => e.status === "completed")
      default : 
        alert("Что - то пошло не так MyAds второй")
    }
  } , [myAdsArray , valueTwo] )

//   useEffect( () => {
//     document.documentElement.style.overflowY = 'scroll'
//     document.documentElement.style.marginTop = '40px'
//     setTimeout( () => {

//       window.scrollTo({
//         top: 40,
//         behavior: "smooth",
//       });
//        document.documentElement.style.overflowY = 'hidden'
//     }, 350 )

// },[] )

  


  









  const deleteFunction = useCallback( (index) => {
    setMyResponse((value) => ({...value , isOpen : true}))
    dispatch(deleteResponse(index))
} , [setMyResponse , dispatch])


  console.log(myResponse)


  return (
    <>
      {myAdsArray[0] === null ? (
        <></>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="MyAdsContainer"
        >
          <button  style={{
        position : 'fixed',
        left : '50%',
        zIndex : 1500
      }} onClick={() => {
       save()
      }}>SAVE</button>


          <MyAdOne
          responsesArr = {filteredResponses}
          myResponse = {myResponse}
          setMyResponse = {setMyResponse}
          details = {detailsTwo}
            setOneValue = {setValueOne}
            setTwoValue = {setValueTwo}
            nowValue={nowValue}
            valueTwo={valueTwo}
            valueOne = {valueOne}
            setNowKey={setNowKey}
            setSliderActive = {setSliderActive}
            myAdsArray={filteredArray}
            setSecondPage={setSecondPage}
            setDetails={setDetailsTwo}
            setMenuActive={setMenuActive}
          />





        <CSSTransition classNames="details" in={details.isActive} timeout={300}
          mountOnEnter unmountOnExit>
            <AdCreatingOne
              mistakes={mistakes}
              className="AdCreatingMy"
              taskInformation={details.task}
              setTaskInformation={setChangingTask}
              MyInformation={true}
              isDetailsActive={details.isActive}
            />
          </CSSTransition>

          <CSSTransition
            classNames="aboutOne"
            in={secondPage.isActive}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            <AboutOne
            setSliderAcitve={setSliderActive}
            setDetails={setDetails}
              setSecondPage={setSecondPage}
              setOpen={setOpen}
              task={filteredArray[secondPage.index]}
              setMenuActive={setMenuActive}
              openAboutReactionFunc={setOpenAboutReaction}
            />
          </CSSTransition>



          <CSSTransition
            classNames="left-right"
            in={isOpen.isActive}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <LastAds
            setSliderActive = {setSliderActive}
            responce = {isOpen.responce}
              openAboutReactionFunc={setOpenAboutReaction}

            />
          </CSSTransition>
          <CSSTransition
            classNames="left-right"
            in={oneCards.isOpen }
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
           <CardPage card={oneCards.card} />
          </CSSTransition>


          <CSSTransition
            classNames="left-right"
            in={openAboutReaction.isActive}
            timeout={0}
            mountOnEnter
            unmountOnExit
          >
            <AboutReaction setOneCard = {setOneCard} setSliderActive={setSliderActive} responce = {openAboutReaction.responce}   />
          </CSSTransition>



          <CSSTransition
        in={myResponse.isOpen}
        timeout={400}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
  
      > 
        <ShowMyResponse deleteFunction = {deleteFunction}  index={myResponse.id} openDetails = {openDetails} response={responsesArr[myResponse.id]} />
      </CSSTransition>


      <CSSTransition
            in={detailsTwo.isOpen}
            timeout={400}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
          >
            <FirstDetails
              // className={}
              orderInformation={responsesArr[detailsTwo.id] ? responsesArr[detailsTwo.id].advertisement : ""  }

            />
        </CSSTransition>




          <SliderMain setSliderActive={setSliderActive} sliderActive={sliderActive} />
        </motion.div>
      )}
    </>
  );
};

export default MyAds;

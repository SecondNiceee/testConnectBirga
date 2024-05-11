import React, { useState , memo} from "react";
import Burger from "../../../components/UI/Burger/Burger";
import MyAdsBlock from "./MyAdsBlock";
import PickerContent from "./PickerContent";
import AdCreatingOne from "../../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { CSSTransition } from "react-transition-group";
import Top from "./Top";


const MyAdOne = ({
  myAdsArray,
  setTask,
  goForward,
  setDetailsActive,
  setMyAdsArray,
  isDetailsActive,
  setMenuActive, 
}) => {

    const [index, setIndex] = useState(0);
    console.log('рендер')


    function setMyArray(par) {
        console.log(par);
        setMyAdsArray(
          [...myAdsArray].map((e, i) => {
            if (i === index) {
              return par;
            }
            return e;
          })
        );
        console.log(myAdsArray);
      }
  return (
    <div className="my-ad-one">
      <Top name={'Мои задания'} setMenuActive={setMenuActive}/>

      <MyAdsBlock
        deals={1}
        finishedDeals={"70%"}
      />
      <PickerContent
        myAdsArray={myAdsArray}
        setTask={setTask}
        goForward={goForward}
        setDetailsActive={setDetailsActive}
        setIndex={setIndex}
      />

      <CSSTransition classNames="details" in={isDetailsActive} timeout={0}>
        <AdCreatingOne
          className="AdCreatingMy"
          taskInformation={myAdsArray[index]}
          setTaskInformation={setMyArray}
          MyInformation={true}
        />
      </CSSTransition>
    </div>
  );
};

export default memo(MyAdOne);

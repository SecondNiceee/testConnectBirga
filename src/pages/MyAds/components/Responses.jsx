import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Reaction from "./Reaction";
import ModalChoicer from "../../../components/UI/ModalChoicer/ModalChoicer";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import ReactionSuspense from "./ReactionSuspense";
import MyAnimation from "./MyAnimation";

const height = {height : 'calc(100vh - 330px)'}
const Responses = ({
  setFilterBy,
  responces,
  values,
  names,
  openAboutReactionFunc,
  setSliderActive,
  setOpen,
  getMore
}) => {


  const me = useSelector(state => state.telegramUserInfo)
  const [page , setPage] = useState(2)
  const orderStatus = useSelector(state => state.responses.responsesByAStatus)
  const elementRef = useRef(null)


  // const getMore = useCallback(async () => {
  //   dispatch(fetchResponses([me,page]));
  //   setPage(page + 1);
  // }, [page, setPage, dispatch, me]);

  const onIntersaction = useCallback(
    (entries) => {

      const firtEntry = entries[0];

      if (firtEntry.isIntersecting && orderStatus !== "all") {
        getMore(page, setPage);
      }
    },
    [orderStatus, getMore, page, setPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersaction);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, [responces]);

  return (
    <>
      <ModalChoicer
        setValue={(value) => {
          setFilterBy(value);
        }}
        className={"MyAds-choicer"}
        values={values}
        names={names}
        defaultValue={values[0]}
      />

      {responces.length > 0 ?
      <>
      {responces.map((e, i) => {
        return (
          <ReactionSuspense
            openAboutReactionFunc={openAboutReactionFunc}
            setSliderActive={setSliderActive}
            responce={e}
            setOpen={setOpen}
          />
        );
      })}
</>
      :
      <MyAnimation style = {height} text="Нету откликов на задание" />
    }


      {orderStatus !== "all" &&  <MyLoader ref={elementRef}  style = {{ height : "90px" , marginLeft : "-16px"}} />}
    </>
  );
};

export default memo(Responses);

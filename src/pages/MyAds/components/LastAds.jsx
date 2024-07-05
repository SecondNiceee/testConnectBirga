import React, { useCallback, useEffect, useMemo, useState } from "react";

import WhiteBlock from "./WhiteBlock";

import LastTop from "./LastTop";
import LastImages from "./LastImages";
import LastSertificates from "./LastSertificates";
import Cap from "../../../components/UI/Cap/Cap";
import Top from "../../../components/UI/Top/Top";
import ReactionBlock from "./ReactionBlock";
import Reaction from "./Reaction";
import AboutMain from "./AboutMain";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../../store/menuSlice";
import options from "../../../constants/options";
let start;
let move;
const LastAds = ({
  setSliderActive,
  sliderActive,
  aboutReaction,
  isOpen,
  setOpen,
  openAboutReactionFunc,
  openAboutReaction,
  name,
  photo,
  text,
  stage,
  images,
  responce
}) => {
  const dispatch = useDispatch()

  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );

  // useEffect(() => {
  //   document.documentElement.style.overflow = "clip";
  //   document.documentElement.style.marginTop = "150px";

  //   window.scrollTo(0, 150);
  //   return () => {
  //     window.scrollTo(0, 8);
  //     document.documentElement.style.marginTop = "8px";
  //     document.documentElement.style.overflow = "auto";
  //     start = 0;
  //     move = 0;
  //   };
  // }, []);

  // const [transform, setTransform] = useState(0);
  // const [transition, setTransition] = useState("0.4s");
  // function startHandler(e) {
  //   if (isOpen && e.target.closest(".bottom__one") === null) {
  //     setTransition("0s");
  //     start = e.touches[0].pageY;
  //   }
  // }
  // function moveHandler(e) {
  //   if (
  //     isOpen &&
  //     e.target.closest(".bottom__one") === null &&
  //     e.target.closest(".last-images") === null &&
  //     e.target.closest(".last-sertificates") === null
  //   ) {
  //     move = e.touches[0].pageY;

  //     if (move - start <= 0) {
  //       setTransform(0);
  //     } else {
  //       setTransform(move - start);
  //     }
  //   }
  // }
  // function endHandler(e) {
  //   if (
  //     isOpen &&
  //     e.target.closest(".bottom__one") === null &&
  //     e.target.closest(".last-images") === null &&
  //     e.target.closest(".last-sertificates") === null
  //   ) {
  //     setTransition("0.3s");
  //     if (!openAboutReaction) {
  //       if (move - start > 80) {
  //         setOpen({...isOpen , isActive : false});
  //       } else {
  //         setTransform(0);
  //       }
  //     }
  //     move = 0;
  //     start = 0;
  //   }
  // }

  // useEffect( () => {

  //     window.removeEventListener('touchstart' , startHandler)
  //     window.removeEventListener('touchmove' , moveHandler)
  //     window.removeEventListener('touchend' , endHandler)
  //     window.addEventListener('touchstart' , startHandler )
  //     window.addEventListener('touchmove' , moveHandler)
  //     window.addEventListener('touchend', endHandler )
  //     return () => {
  //         window.removeEventListener('touchstart' , startHandler)
  //         window.removeEventListener('touchmove' , moveHandler)
  //         window.removeEventListener('touchend' , endHandler)
  //     }
  // }, [isClosed] )

  // const style = useMemo(() => {
  //   if (!isOpen) {
  //     return {
  //       transform: "translate3d(0% , 0 , 0)",
  //       transition: "transform 0.4s bottom 0.4s",
  //     };
  //   }
  //   return {
  //     transform: "translate3d(0% , " + transform.toString() + "px , 0)",
  //     transition: "transform" + transition + "bottom 0.4s",
  //   };
  // }, [isOpen, transform, transition]);


  return (
    <div
      className={"last-ads"}
    >
      <Top setMenuActive={setMenuActive} className={"last-top"} name={"Отклики"} />

      {/* <LastTop name = {name} photo = {photo} stage = {stage} openAboutReactionFunc={openAboutReactionFunc} /> */}

      <Reaction setSliderActive={setSliderActive}  openAboutReactionFunc = {openAboutReactionFunc} put={true} responce={responce} />
      
      {/* <LastImages images = {images} /> */}
      

      {/* <LastSertificates /> */}
      <TextAboutMe textareaClassName={"new-textarea"} style = {
        {
          marginTop : "8px"
        }
      } aboutU={responce.information} />

      <p className="creationTime">{ "Создано " + new Date(responce.createdAt).toLocaleString("ru", options)}</p>

      
{/* 
      <textarea className="last-textarea" name="" id="" value={text} /> */}
    </div>
  );
};

export default LastAds;

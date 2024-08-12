import React, { useCallback, useEffect, useState } from "react";



import AboutTop from "./AboutTop";
import AboutInfo from "./AboutInfo";
import AboutMain from "./AboutMain";
import ExampleWorks from "./ExampleWorks";
import { memo } from "react";
import axios from "axios";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import Stage from "../../../components/UI/Stage/Stage";
import Compact from "../../../components/UI/Compact/Compact";
import { useDispatch } from "react-redux";
import { changeMenuActive } from "../../../store/menuSlice";
import makeNewFile from "../../../functions/newMakeFile";

const AboutReaction = ({ responce , setOneCard,   ...props}) => {
  const dispatch = useDispatch()
  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );

  const [cards , setCards] = useState(null)
  useEffect( () => {
    async function getAllCards(){
      let localCards = []
      try{

        let allCards = await axios.get("https://back-birga.ywa.su/card/findByUser" , {
            params : {
                userId : responce.user.id
            }
        })

        
        for (let e of allCards.data){

          let files = await makeNewFile(e.folder , e.photos)
          localCards.push({
              id : e.id,
              title : e.title,
              description : e.description,
              behanceLink : e.behance,
              dribbbleLink : e.dribble,
              dropfileLink : e.dropFile,
              photosNames : e.photos,
              photos : files
          })
        }
    
      return localCards


      }
      catch(e){
        window.Telegram.WebApp.showAlert(e)
        console.log(e)
      }



    }
    getAllCards().then((value) => {
      setCards(value)
    })
    // eslint-disable-next-line
  } , [])

  const openFunc = useCallback( (par) => {
    setOneCard({isOpen : true, card : par})
  } , [setOneCard])


  return (
    <div className="aboutReaction" {...props}>



      <AboutTop responce={responce} />

      <AboutInfo responce={responce} />

      <AboutMain aboutU = {responce.user.about}  />

      <Compact className={"stage-compact"} title = {"Стаж работы"}>
        <Stage numberB={responce.user.stage} />
      </Compact>
    

      {cards === null ? <MyLoader/> :
      <ExampleWorks openFunc={openFunc}   cards={cards}/>}



    </div>
  );
};
export default memo(AboutReaction);

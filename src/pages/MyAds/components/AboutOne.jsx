import React, { useEffect, useState } from 'react';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import { memo } from 'react';
import Top from '../../../components/UI/Top/Top';
import ReactionBlock from './ReactionBlock';
import axios from 'axios';
import MyLoader from '../../../components/UI/MyLoader/MyLoader';
import makeFile from '../../../functions/makeFile';




const AboutOne = ({task, setMenuActive, goForward, setOpen }) => {
  const [responces , setResponces] = useState(null)
  useEffect( () => {
    async function getIt(id){
      let im = await axios.get("https://back-birga.ywa.su/response/findByAdvertisement" , {
        params : {
          advertisementId : id
        }
      })
      let responces = im.data
      console.log(responces)
      responces.forEach((e, i) => {
        let photos = []
        if (e.files){
          photos = makeFile(e.files, Array(e.files.length))
        }
        responces[i].photos = photos
      })


      
      

      return responces
  }

  console.log(responces)

  getIt(task.id).then( (resp) => {
    console.log(resp)
    setResponces(resp)
  } )

  } , []  )
    return (
        <div className="aboutOne" style={{
        }}>
          
          <Top name={'Отклики'} setMenuActive={setMenuActive}/>

        {task ? 
        <FirstBlock isButton={true} isMyAds={true}  className={'FirstAdsBlock'}  {...task} />
      :
      ""
      }
          
          {responces === null ? 
          <MyLoader style = {
            {
              height : "calc(100vh - 456px)",
              position : "fixed",
              left : 0
            }
          } />
          :
          <ReactionBlock responces = {responces} setOpen={setOpen} goForward = {goForward} />
          }
      
          

          

        </div>
    );
};

export default memo(AboutOne);
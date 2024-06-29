import React, { useEffect, useState } from 'react';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import { memo } from 'react';
import Top from '../../../components/UI/Top/Top';
import ReactionBlock from './ReactionBlock';
import axios from 'axios';
import MyLoader from '../../../components/UI/MyLoader/MyLoader';




const AboutOne = ({task, setMenuActive, goForward, setOpen }) => {
  const [responces , setResponces] = useState(null)
  useEffect( () => {
    async function getIt(id){
      let im = await axios.get("https://back-birga.ywa.su/response/findByAdvertisement" , {
        params : {
          advertisementId : id
        }
      })
      return im.data
  }

  getIt(task.id).then( (resp) => {
    setResponces(resp)
  } )
  } , []  )
    return (
        <div className="aboutOne" style={{
        }}>
          
          <Top name={'Отклики'} setMenuActive={setMenuActive}/>

        {task ? 
        <FirstBlock isMyAds={true}  className={'FirstAdsBlock'}  {...task} />
      :
      ""
      }
          
          {responces === null ? 
          <MyLoader />
          :
<ReactionBlock responces = {task.responces} setOpen={setOpen} goForward = {goForward} />
          }
      
          

          

        </div>
    );
};

export default memo(AboutOne);
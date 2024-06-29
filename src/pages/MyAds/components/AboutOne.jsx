import React from 'react';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import { memo } from 'react';
import Top from '../../../components/UI/Top/Top';
import ReactionBlock from './ReactionBlock';
const AboutOne = ({task, setMenuActive, goForward, setOpen }) => {
  console.log(task)
  console.log(task)
    return (
        <div className="aboutOne" style={{
        }}>
          
          <Top name={'Отклики'} setMenuActive={setMenuActive}/>

        {task ? 
        <FirstBlock isMyAds={true}  className={'FirstAdsBlock'}  {...task} />
      :
      ""
      }
          
 
          <ReactionBlock responces = {task.responces} setOpen={setOpen} goForward = {goForward} />

          

        </div>
    );
};

export default memo(AboutOne);
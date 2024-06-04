import React from 'react';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import { memo } from 'react';
import Top from './Top';
import ReactionBlock from './ReactionBlock';
import LastAds from './LastAds';
const AboutOne = ({task, setMenuActive, goForward, setClosed }) => {
  
  console.log('рендер')
    return (
        <div className="aboutOne" style={{
          position : 'relative'
        }}>
          
          <Top name={'Мои задания'} setMenuActive={setMenuActive}/>

        {task ? 
        <FirstBlock  className={'FirstAdsBlock'}  {...task} />
      :
      ""
      }
          
 
          <ReactionBlock setClosed={setClosed} goForward = {goForward} />

          

        </div>
    );
};

export default memo(AboutOne);
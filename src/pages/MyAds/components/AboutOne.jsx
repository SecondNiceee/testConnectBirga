import React from 'react';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import { memo } from 'react';
import Top from './Top';
import ReactionBlock from './ReactionBlock';
import LastAds from './LastAds';
const AboutOne = ({task, setMenuActive, goForward, setClosed }) => {
  
    return (
        <div className="aboutOne" style={{
          position : 'relative'
        }}>
          
          <Top name={'Мои задания'} setMenuActive={setMenuActive}/>


          <FirstBlock  className={'FirstAdsBlock'}  {...task} />
 
          <ReactionBlock setClosed={setClosed} goForward = {goForward} />

          

        </div>
    );
};

export default memo(AboutOne);
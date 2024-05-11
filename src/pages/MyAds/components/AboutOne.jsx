import React from 'react';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import { memo } from 'react';
import Top from './Top';
import ReactionBlock from './ReactionBlock';
import LastAds from './LastAds';
const AboutOne = ({task, setMenuActive, goForward, setClosed , isClosed , aboutReaction , openAboutReactionFunc , openAboutReaction}) => {
  
    return (
        <div className="aboutOne" style={{
          position : 'relative'
        }}>
          
          <Top name={'Мои задания'} setMenuActive={setMenuActive}/>


          <FirstBlock  className={'FirstAdsBlock'}  {...task} />
 
          <ReactionBlock setClosed={setClosed} goForward = {goForward} />

          <LastAds openAboutReaction = {openAboutReaction} openAboutReactionFunc = {openAboutReactionFunc} isClosed={isClosed} setClosed = {setClosed} aboutReaction={aboutReaction} />

        </div>
    );
};

export default memo(AboutOne);
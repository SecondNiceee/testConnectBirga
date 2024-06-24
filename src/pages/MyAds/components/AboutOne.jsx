import React from 'react';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import { memo } from 'react';
import Top from '../../../components/UI/Top/Top';
import ReactionBlock from './ReactionBlock';
const AboutOne = ({task, setMenuActive, goForward, setOpen }) => {
    return (
        <div className="aboutOne" style={{
        }}>
          
          <Top name={'Мои задания'} setMenuActive={setMenuActive}/>

        {task ? 
        <FirstBlock  className={'FirstAdsBlock'}  {...task} />
      :
      ""
      }
          
 
          <ReactionBlock setOpen={setOpen} goForward = {goForward} />

          

        </div>
    );
};

export default memo(AboutOne);
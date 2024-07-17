import React, { memo, useCallback } from 'react';
import cl from './SavedResponse.module.css'
import FirstBlock from '../../First/FirstMain/FirstBlock';
import Reaction from '../../../pages/MyAds/components/Reaction';
import TextAboutMe from '../../UI/AboutMeText/TextAboutMe';
import options from '../../../constants/options';
import formatDate from '../../../functions/makeDate';
const SavedResponse = ({ response, setProfileOpen}) => {
    console.log(response)
    const openAboutReactionFunc = useCallback( () => {
        setProfileOpen(true)
    }  , [response.user.link])
    return (
        <div className={cl.wrapper}>
            <FirstBlock task={response.advertisement}  {...response.advertisement} />
            <Reaction openAboutReactionFunc={openAboutReactionFunc} blue = {true}  put={true} responce={response} />
            <TextAboutMe textareaClassName={"new-textarea"}  aboutU={response.information} />
      <p style={{marginTop : "0px"}} className="creationTime">{ "Создано " + formatDate(new Date(response.createdAt))}</p>
        </div>
    );
};

export default memo(SavedResponse);
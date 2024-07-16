import React from 'react';
import ResponseBlock from '../../../components/MyAds/ResponseBlock';
import { useLottie } from 'lottie-react';
import sad from '../../../animation/sadAnimation.json'
import MyAnimation from './MyAnimation';
import MyResponses from './MyResponses';

const PickerOne = ({responsesArr, buttonFunction}) => {


    return (
        <div className="picker__block">
            {responsesArr.length === 0 ? 
                <MyAnimation/> 
            :
                <MyResponses responsesArr = {responsesArr} buttonFunction = {buttonFunction} />
             }
      </div>
    );
};

export default PickerOne;
import React from 'react';
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
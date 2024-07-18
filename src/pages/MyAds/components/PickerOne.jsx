import React, { forwardRef } from 'react';
import MyAnimation from './MyAnimation';
import MyResponses from './MyResponses';
import MyLoader from '../../../components/UI/MyLoader/MyLoader';

const PickerOne = forwardRef(({responsesArr, buttonFunction, status} , ref) => {


    return (

        <>
        {status === "pending" ? 
        <MyLoader />
        :

        <div className="picker__block">
            {responsesArr.length === 0 ? 
                <MyAnimation/> 
            :
                <MyResponses  responsesArr = {responsesArr} buttonFunction = {buttonFunction} />
             }
             <div ref={ref} className="intersection-block">

             </div>
      </div>
        }
        </>
    );
} );

export default PickerOne;
import React from "react";
import sad from '../../../animation/sadAnimation.json';
import { useLottie } from "lottie-react";
const MyAnimation = () => {

    const options = {
        animationData: sad,
        loop: true,
        style : {

            display : "flex",
            justifyContent : "center",
            marginLeft : "auto",
            marginRight : "auto",
            width : "150px"
        }
        
      };

      const { View } = useLottie(options);
  return (
    <div className="animation-block">
      {View}
      <p className="animation-text">Вы не откликнулись ни на одно задание </p>
    </div>
  );
};

export default MyAnimation;

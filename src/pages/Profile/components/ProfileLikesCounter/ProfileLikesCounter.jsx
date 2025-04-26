import React, { useEffect, useRef, useState } from 'react';
import Heart from '../Heart/Heart';
import ClickedHeart from '../ClickedHeart/ClickedHeart';
import "../ClickedHeart/ClickHeart.css";

const ProfileLikesCounter = ({likesCounter, isBaidge, isLikeActive}) => {

    const [localStateOfLikeActive, setLocalStateOfLikeActive] =  useState(isLikeActive)

    const [animation, setAnimation] = useState(0)

    const animationRef = useRef(null)

    const clickHandler = () => {
        if (!localStateOfLikeActive){
          setAnimation(1)
        }
        else{
          setAnimation(0)
        }
        setLocalStateOfLikeActive((value) => !value)
    }

    useEffect( () => {
      if (animation > 0){
        animationRef.current?.classList.add("zoomAnimate")
      }
      else{
        animationRef.current?.classList.remove("zoomAnimate")
      }
    }, [animation] )

    if(isBaidge){
      return (
        <div className='flex items-center gap-[6.67px] mt-auto mb-[2px]'>
          <p className={`font-sf-pro-display font-medium text-[17px] ${!localStateOfLikeActive ? 'text-[#b5ced9]' : 'text-[#ff4949]'}`}>
            {likesCounter}
          </p>
          <div ref={animationRef} onClick={clickHandler} className='flex relative justify-center rounded-full items-center bg-[#18222d] w-[30px] h-[30px]'>
              <ClickedHeart isActiveHeart={localStateOfLikeActive}  />
          </div>
        </div>
      )
    }
    return (
        <div className="flex items-center gap-[6.67px] mt-auto mb-[2px]">
        <p className="font-sf-pro-display font-medium text-[17px] text-[#b5ced9]">
          {likesCounter}
        </p>
        <Heart />
      </div>
    );
};

export default ProfileLikesCounter;
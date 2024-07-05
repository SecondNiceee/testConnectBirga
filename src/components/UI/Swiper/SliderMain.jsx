import React, { useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import SwiperComponent from './Swiper';

const SliderMain = ({sliderActive, setSliderActive}) => {
    const setClose = useCallback( () => {
            setSliderActive({...sliderActive , isActive : false })
    } , [sliderActive, setSliderActive])
    return (
        <CSSTransition
        in = {sliderActive.isActive}
        classNames={"slider-appear"}
        timeout={0}
        mountOnEnter
        unmountOnExit
        >
    
           <SwiperComponent setClose={setClose} photos={sliderActive.photos} index={sliderActive.index} />
        </CSSTransition>
    );
};

export default SliderMain;
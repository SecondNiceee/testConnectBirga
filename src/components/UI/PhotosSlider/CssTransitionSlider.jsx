import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PhotosSlider from './PhotosSlider';

const CssTransitionSlider = ({isSliderOpened, setSliderOpened, top , leftPosition, blockerAll, blockerId, sliderIndex, swiperId, renderMap  }) => {
    return (
        <CSSTransition in = {isSliderOpened} timeout={0} unmountOnExit mountOnEnter>
            <PhotosSlider top = {top} setSliderOpened = {setSliderOpened} left = {leftPosition}  blockerAll = {blockerAll}  blockerId = {blockerId} sliderIndex = {sliderIndex} swiperId = {swiperId} renderMap = {renderMap}  />
        </CSSTransition>
    );
};

export default CssTransitionSlider;
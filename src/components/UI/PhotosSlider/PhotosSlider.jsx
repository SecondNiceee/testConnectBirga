import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import MainButton from '../../../constants/MainButton';

let overflowYValue;
const PhotosSlider = forwardRef(({ swiperId, renderMap, sliderIndex, blockerId, blockerAll, setSliderOpened, left = 0, top = 0 }, ref) => {
    const render = (src, index) => {
        return (
            <SwiperSlide className='!h-[50%] w-[100%] object-cover my-auto' key={index}>
                <img className='w-[100%] h-[100%]' src={URL.createObjectURL(src)} alt={`Slide ${index}`} />
            </SwiperSlide>
        );
    };

    console.log(renderMap)

    const [scrollPosition , setScrollPosition] = useState(0)

    const closeSliderFunction = useCallback( () => {
        setSliderOpened(false)
    } )

    useEffect( () => {
        const buttonText = MainButton.text
        const isVisible = MainButton.isVisible 
        MainButton.onClick(closeSliderFunction)
        MainButton.show();
        MainButton.setText("Закрыть")
        MainButton.onClick(setSliderOpened)
        return () => {
            MainButton.setText(buttonText)
            MainButton.offClick(closeSliderFunction)
            if (!isVisible){
                MainButton.hide()
            }
        }
    } , [] );


    useEffect( () => {
        if (blockerAll){
            overflowYValue = window.getComputedStyle(document.documentElement).overflowY;
            document.documentElement.style.overflowY = "hidden";
            setScrollPosition(0)
        }
        else{
            const firstElement = document.getElementById(blockerId)
            firstElement.style.overflowY = "hidden";
            const scrollTop = firstElement.scrollTop;
            setScrollPosition(scrollTop);
        }
        return () => {
            if (blockerAll){
                document.documentElement.style.overflowY = overflowYValue;
            }
            else{
                const firstElement = document.getElementById(blockerId)
                firstElement.style.overflowY = "hidden";
            }
        }
    } , [blockerAll, blockerId]) 


    console.log(scrollPosition)

    const [activeIndex, setActiveIndex] = useState(sliderIndex);

    const swiperRef = useRef(null);

    const handleSlideChange = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            setActiveIndex(swiperRef.current.swiper.activeIndex);
        }
    };

    const numberOfPhotos = renderMap.length


    console.log(left);

    return (
        <div ref={ref} className={`w-[100vw] h-[100vh] fixed z-[200000] flex-col bg-black flex justify-center items-center`} style={{
            left : left,
            top : top ? top : scrollPosition + "px"
        }}>
            <p className='font-sf-pro-display text-[16px] mt-[20px] text-white'>{activeIndex + 1}/{numberOfPhotos}</p>
            <Swiper className='w-[100%] h-[100%]' id={`main-${swiperId}`}
                    initialSlide={sliderIndex}
                    slidesPerView={1}
                    onSlideChange={handleSlideChange}
                    ref={swiperRef}
                    >
                {renderMap.map(render)}
            </Swiper>
        </div>
    );
});

export default PhotosSlider;
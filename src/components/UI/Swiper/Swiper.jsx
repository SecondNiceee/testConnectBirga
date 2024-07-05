import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import cl from './Swiper.module.css'
import 'swiper/css/bundle';
import photo from '../../../images/nonUsed/photo.png';
import leftArrow from '../../../images/Swiper/leftArrow.svg'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
const SwiperComponent = ({photos, index, setClose}) => {

    const sliderRef = useRef(null);
    const handlePrev = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slidePrev();
    }, []);
    const handleNext = useCallback(() => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slideNext();
    }, []);


  return (
    <div className={cl.main} >
        <div className={cl.blackArea} onClick={setClose} >

        </div>
      <Swiper
      style={{
        width : "100vw",
        lineHeight : 0
      }}
       ref={sliderRef}
       modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        initialSlide={index}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}

      >
        {photos.map((e, i) => {
          return (

        <SwiperSlide style={{
          lineHeight : 0
        }} key={i} >
            <div style={{
              lineHeight : 0
            }} className={cl.slideWrapper}>
                <img className={cl.sliderPhoto} src={URL.createObjectURL(e)} alt="" />
            </div>
        </SwiperSlide>
          )
        })}
        
        
        {/* <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide> */}
        ...
      </Swiper>
      <div className={cl.navigationBlock}>
        <img className={cl.nextArrow}onClick={handlePrev} src= {leftArrow} alt="" />
        <img className={cl.prevArrow} onClick={handleNext} src={leftArrow} alt="" />
      </div>
    </div>
  );
};

export default SwiperComponent;

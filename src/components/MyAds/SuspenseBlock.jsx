import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import BlockSpinner from '../UI/BlockSpinner/BlockSpinner';
import { useInView } from 'react-intersection-observer';
const Block = lazy( () => import("../../pages/MyAds/components/Block") )

const SuspenseBlock = ({i , e, setSecondPage, setSliderActive}) => {
    const { ref, inView } = useInView({
        threshold: 0, // Порог видимости (от 0 до 1)
      });
    const [isVisible, setVisible] = useState(false)
    useEffect( () => {
        if (inView){
            setVisible(true)
        }
    } , [inView] )
    const style = useMemo( () =>{
        if (e.photos.length > 0){
            return {minHeight : "314px" , position : "relative"}
        }
        else{
            return {minHeight : "178px", position : "relative"}
        }
    } , [e.photos] )
    return (
        <div className='First__block' style={!isVisible ? style : {}} >
            <div ref={ref} style={{
                width : "280px",
                height : "1100px",
                position : "absolute",
                top : "-900px",
                opacity : "0",
                zIndex : -1
            }} className="catch_block"></div>
            {isVisible &&  <Suspense fallback = {<BlockSpinner style = {e.photos.length > 0 ? {height : "313px"} : {height : "144px"}}   />}>
                        <Block e={e} i={i} setSecondPage={setSecondPage} setSliderAcitve={setSliderActive} />
                </Suspense>
                }
        </div>
    );
};

export default SuspenseBlock;
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
            return {minHeight : "314px"}
        }
        else{
            return {minHeight : "178px"}
        }
    } , [e.photos] )
    return (
        <div ref={ref} style={!isVisible ? style : {}} >
            {isVisible &&  <Suspense fallback = {<BlockSpinner />}>
                        <Block e={e} i={i} setSecondPage={setSecondPage} setSliderAcitve={setSliderActive} />
                </Suspense>
                }
        </div>
    );
};

export default SuspenseBlock;
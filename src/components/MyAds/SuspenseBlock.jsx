import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import BlockSpinner from '../UI/BlockSpinner/BlockSpinner';
import { useInView } from 'react-intersection-observer';
const Block = lazy( () => import("../../pages/MyAds/components/Block") )

const SuspenseBlock = ({i , e, setSecondPage ,  viewsNumber = 0, setViewsNumber = () => {}}) => {
    const { ref, inView } = useInView({
        threshold: 0, // Порог видимости (от 0 до 1)
      });
    const [isVisible, setVisible] = useState(false)
    useEffect( () => {
        if (inView){
            setVisible(true)
            setViewsNumber(viewsNumber + 1)
        }
    } , [inView] )
    const style = useMemo( () =>{
        if (e.photos.length > 0){
            return {minHeight : "calc(184px + 35vh)" , position : "relative"}
        }
        else{
            return {minHeight : "calc(178px)", position : "relative"}
        }
    } , [e.photos] )
    return (
        <div className='First__block' style={!isVisible ? style : {}} >
            <div ref={ref} style={{
                width : "1px",
                height : "2000px",
                position : "absolute",
                top : "-1800px",
                opacity : "0",
                left : "40px",
                zIndex : -1
            }} className="catch_block"></div>
            {isVisible &&  <Suspense fallback = {<BlockSpinner style = {e.photos.length > 0 ? {height : "313px"} : {height : "144px"}}   />}>
                        <Block e={e} i={i} setSecondPage={setSecondPage}/>
                </Suspense>
                }
        </div>
    );
};

export default SuspenseBlock;
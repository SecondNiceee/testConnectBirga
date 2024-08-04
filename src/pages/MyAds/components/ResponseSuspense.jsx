
import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import BlockSpinner from '../../../components/UI/BlockSpinner/BlockSpinner';
import { useInView } from 'react-intersection-observer';
// import ResponseBlock from '../../../components/MyAds/ResponseBlock';

const ResponseBlock = lazy( () => import("../../../components/MyAds/ResponseBlock") )
const ResponseSuspense = ({func , index, buttonText , task, isWatched, advertisement}) => {
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
        if (advertisement.photos.length > 0){
            return {minHeight : "315px"}
        }
        else{
            return {minHeight : "178px"}
        }
    } , [advertisement.photos] )

    return (
        <div style={!isVisible ? style : {position : "relative"}} className="First__block">
            {
                isVisible && <Suspense fallback = {<BlockSpinner style = {advertisement.photos.length > 0 ? {minHeight : "315px"} : {minHeight : "178px"}} />}>
                    <ResponseBlock func={func} index={index} buttonText={buttonText} task={task} isWatched={isWatched} {...advertisement} />
                </Suspense>
            }
            <div ref={ref} style={{
                width : "1px",
                height : "1100px",
                position : "absolute",
                top : "-900px",
                opacity : "0",
                zIndex : -1,
                left : "40px"
              
            }} className="catch_block"></div>
    </div>
       
    );
};

export default ResponseSuspense;
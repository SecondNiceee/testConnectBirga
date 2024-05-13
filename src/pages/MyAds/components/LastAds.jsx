import React, { useEffect, useMemo, useState , memo} from 'react';





import WhiteBlock from './WhiteBlock';

import LastTop from './LastTop';
import LastImages from './LastImages';
import LastSertificates from './LastSertificates';
let start;
let move;
const LastAds = ({aboutReaction , isClosed , setClosed , openAboutReactionFunc , openAboutReaction}) => {



    const [transform, setTransform] = useState(0)
    const [transition , setTransition] = useState('0.4s')
    function startHandler(e){   
        if (!isClosed && e.target.closest('.bottom__one') === null){
            setTransition('0s')
            start = e.touches[0].pageY;
        }
    }
    function moveHandler(e){
            if (!isClosed && e.target.closest('.bottom__one') === null && e.target.closest('.last-images') === null && e.target.closest('.last-sertificates') === null ){

                move = e.touches[0].pageY;
    
                if (move - start <= 0){
                    setTransform(0)
    
                }
                else{
    
                    setTransform(move - start)
                }
            }
    }
    function endHandler(e){
        if (!isClosed && e.target.closest('.bottom__one') === null  && e.target.closest('.last-images') === null && e.target.closest('.last-sertificates') === null){

            setTransition('0.3s')
            if (!openAboutReaction){

                if (move - start > 80){
                    setClosed(true)
                }
                else{
                    
                    setTransform(0)
                }
            }
            move = 0;
            start = 0;
        }
    }
    
    // useEffect( () => {
    

    //     window.removeEventListener('touchstart' , startHandler)
    //     window.removeEventListener('touchmove' , moveHandler)
    //     window.removeEventListener('touchend' , endHandler)
    //     window.addEventListener('touchstart' , startHandler )
    //     window.addEventListener('touchmove' , moveHandler)
    //     window.addEventListener('touchend', endHandler )
    //     return () => {
    //         window.removeEventListener('touchstart' , startHandler)
    //         window.removeEventListener('touchmove' , moveHandler)
    //         window.removeEventListener('touchend' , endHandler)
    //     }
    // }, [isClosed] )

    
    useEffect(  () => {
        
        if (isClosed){
            document.querySelector('.aboutOne').style.overflowY = 'scroll'
            setTransform('100%')
        }
        else{
            document.querySelector('.aboutOne').style.overflowY = 'hidden'
            setTransform(0)
        }
    } , [isClosed ]  )

    const style = useMemo( () => {
        
        if (isClosed) {
            return {  
                transform : 'translate3d(100% , 100% , 0)',
                transition : 'transform 0.4s'
            }
        }
        return {
            transform : 'translate3d(100% , ' + transform.toString() + 'px , 0)' ,
            transition :  'transform ' + transition 
        }
    }, [ isClosed , transform  ])
    return (


        <div className={isClosed ? "last-ads" : "last-ads open"} 
        style={style} 
        onTouchMove={moveHandler}
        onTouchEnd={endHandler}
        onTouchStart={startHandler}
        
        >

            <WhiteBlock />

            <LastTop  openAboutReactionFunc = {openAboutReactionFunc} />

            <LastImages />

            <LastSertificates />

            <textarea className="last-textarea" name="" id="" value={aboutReaction}/>

      </div>
    );
};

export default LastAds;
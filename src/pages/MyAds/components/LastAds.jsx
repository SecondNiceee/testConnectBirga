import React, { useEffect, useMemo, useState } from 'react';





import WhiteBlock from './WhiteBlock';

import LastTop from './LastTop';
import LastImages from './LastImages';
import LastSertificates from './LastSertificates';
const LastAds = ({aboutReaction , isClosed , setClosed , openAboutReactionFunc , openAboutReaction}) => {
    const [transform,setTransform] = useState(0)
    const [transition , setTransition] = useState('0.3s')
    

    
    useEffect( () => {
        let start;
        let move;
        function startHandler(e){   

            setTransition('0s')
            start = e.touches[0].pageY;
        }
        function moveHandler(e){
            move = e.touches[0].pageY;

            if (move - start <= 0){
                setTransform(0)

            }
            else{

                setTransform(move - start)
            }
        }
        function endHandler(e){
            
            setTransition('0.3s')
            if (openAboutReaction) {
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
        window.addEventListener('touchstart' , startHandler )
        window.addEventListener('touchmove' , moveHandler)
        window.addEventListener('touchend', endHandler )
        return () => {
            window.removeEventListener('touchstart' , startHandler)
            window.removeEventListener('touchmove' , moveHandler)
            window.removeEventListener('touchend' , endHandler)
        }
    }, [setClosed] )
    const style = useMemo( () => {
        if (isClosed) {

            return {
                transform : 'translateY(100%) translateX(-100%)' ,
                transition : transition
            }
        }
        return {
            transform : 'translateY(' + transform.toString() + 'px) translateX(-100%)' ,
            transition : transition
        }
    }, [transform, isClosed, transition])

    useEffect(  () => {
        if (isClosed){
        
            setTransform('100%')
        }
        else{
            // document.documentElement.style.marginTop = '150px'
            // window.scrollTo( {
            //     top : 150          
            //  } )
            // document.documentElement.style.overflowY = 'hidden'
            // document.documentElement.style.overflowX = 'hidden'
            setTransform(0)
        }
    } , [isClosed ]  )
    return (


        <div className="last-ads" 
        style={style}
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
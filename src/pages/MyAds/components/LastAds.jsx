import React, { useEffect, useMemo, useState , memo} from 'react';





import WhiteBlock from './WhiteBlock';

import LastTop from './LastTop';
import LastImages from './LastImages';
import LastSertificates from './LastSertificates';
const LastAds = ({aboutReaction , isClosed , setClosed , openAboutReactionFunc , openAboutReaction}) => {
    const [transform, setTransform] = useState(0)
    const [transition , setTransition] = useState('0.4s')
    
    useEffect( () => {
        
        let start;
        let move;
        function startHandler(e){   
            if (!isClosed){
                setTransition('0s')
                start = e.touches[0].pageY;
            }
        }
        function moveHandler(e){
            if (!isClosed){

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
            if (!isClosed){

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
        window.removeEventListener('touchstart' , startHandler)
        window.removeEventListener('touchmove' , moveHandler)
        window.removeEventListener('touchend' , endHandler)
        window.addEventListener('touchstart' , startHandler )
        window.addEventListener('touchmove' , moveHandler)
        window.addEventListener('touchend', endHandler )
        return () => {
            window.removeEventListener('touchstart' , startHandler)
            window.removeEventListener('touchmove' , moveHandler)
            window.removeEventListener('touchend' , endHandler)
        }
    }, [isClosed] )

    const style = useMemo( () => {
        
        if (isClosed) {
            return {  
                transform : 'translate3d(-100% , 100% , 0)',
                transition : 'transform ' + transition
            }
        }
        return {
            transform : 'translate3d(-100% , ' + transform.toString() + 'px , 0)' ,
            transition :  'transform ' + transition
        }
    }, [ isClosed ])

    useEffect(  () => {
       
        if (isClosed){
        
            setTransform('100%')
        }
        else{

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

export default memo(LastAds);
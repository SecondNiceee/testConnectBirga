import React, { useEffect, useMemo, useState , memo} from 'react';





import WhiteBlock from './WhiteBlock';

import LastTop from './LastTop';
import LastImages from './LastImages';
import LastSertificates from './LastSertificates';
let start;
let move;
const LastAds = ({aboutReaction , isOpen , setOpen , openAboutReactionFunc , openAboutReaction}) => {

    useEffect( () => {
        document.documentElement.style.overflow = 'clip';
        document.documentElement.style.marginTop = '150px'
        window.scrollTo(0 ,150)
        return () => {
            document.documentElement.style.overflow = 'auto';
            start = 0
            move = 0
        }
    } , [] )

    const [transform, setTransform] = useState(0)
    const [transition , setTransition] = useState('0.4s')
    function startHandler(e){   
        if (isOpen && e.target.closest('.bottom__one') === null){
            setTransition('0s')
            start = e.touches[0].pageY;
        }
    }
    function moveHandler(e){
            if (isOpen && e.target.closest('.bottom__one') === null && e.target.closest('.last-images') === null && e.target.closest('.last-sertificates') === null ){

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
        if (isOpen && e.target.closest('.bottom__one') === null  && e.target.closest('.last-images') === null && e.target.closest('.last-sertificates') === null){

            setTransition('0.3s')
            if (!openAboutReaction){

                if (move - start > 80){
                    setOpen(false)
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

    


    const style = useMemo( () => {
        
        if (!isOpen) {
            return {  
                transform : 'translate3d(0% , 0 , 0)',
                transition : 'transform 0.4s bottom 0.4s'
            }
        }
        return {
            transform : 'translate3d(0% , ' + transform.toString() + 'px , 0)' ,
            transition :  'transform' + transition + 'bottom 0.4s'
        }
    }, [ isOpen , transform  ])
    return (


        <div className={"last-ads"} 
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
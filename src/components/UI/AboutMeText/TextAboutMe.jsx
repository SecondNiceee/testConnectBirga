import React, { useEffect, useRef, useState } from 'react';
import './TextAboutMe.css'
const TextAboutMe = ( { aboutU , darkSide, className, textareaClassName, ...props } ) => {
    const [hideAboutMe, setHideAboutMe] = useState({
      isActive : false,
      show : false
    })
    const areaRef = useRef(null)
    const refTwo = useRef(null)




  useEffect( () => {
    refTwo.current.value = aboutU
    if (refTwo.current.scrollHeight > 140){
      console.log("я тут")
      if (!hideAboutMe.show){

        setHideAboutMe({...hideAboutMe, isActive : true})
        areaRef.current.style.height = "136px"
        let localAboutMe = aboutU;
        while (refTwo.current.scrollHeight > 140){
          
          let localAboutMeArr = localAboutMe.split(' ')
          localAboutMe = localAboutMeArr.slice(0 , localAboutMeArr.length - 1).join(' ')
          refTwo.current.value = localAboutMe
        
        }
        areaRef.current.value = localAboutMe + '...'
      }
      else{
        refTwo.current.value = aboutU
        areaRef.current.value = aboutU

      }
    }
    else{
      areaRef.current.style.borderRadius = "10px"
      areaRef.current.value = aboutU
    }
    areaRef.current.style.height = (refTwo.current.scrollHeight).toString() + 'px'
  } , [hideAboutMe.show] )

    return (
        <div {...props} className="ur__town">
          
          {darkSide 
          ? <div className="background" style={hideAboutMe 
            ? {display : 'block'}
            : {display : 'none'}
          }></div> 
          : "" }


          
<textarea
            ref={refTwo}

            readOnly={true}
            spellCheck={false}
            style={{
              height : "42.8px",
              width : "100%",
              overflowY : "scroll",
              position : 'absolute',
              opacity : '0',
              left : 0,
              top : 0
            }}
            className= {textareaClassName ? ["about__u-text" , textareaClassName].join(' ') : "about__u-text"}
          />

          <textarea
            ref={areaRef}

            readOnly={true}
            spellCheck={false}
            className={textareaClassName ? ["about__u-text" , textareaClassName].join(' ') : "about__u-text"}
          />

          

          <div style={hideAboutMe.isActive 
        ? {display : 'flex'}
        : {display : 'none'}} 
          className="also" 
          onClick={() => {  

                    setHideAboutMe({...hideAboutMe, show : !hideAboutMe.show})
          }}>
            <p>
              {hideAboutMe.show ? 'Скрыть' : 'Развернуть'}
            </p>
          </div>
        </div>
    );
};

export default TextAboutMe;
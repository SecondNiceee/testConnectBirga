import React, { memo, useEffect, useRef, useState } from 'react';
import './TextAboutMe.css'
const TextAboutMe = ( { aboutU , darkSide, className, textareaClassName, ...props } ) => {
    const [hideAboutMe, setHideAboutMe] = useState({
      isActive : false,
      show : false
    })
    const [empty , setEmpy] = useState(false)
    const areaRef = useRef(null)
    const refTwo = useRef(null)



  useEffect( () => {
    refTwo.current.value = aboutU
    if (refTwo.current.scrollHeight > 140){
      if (!hideAboutMe.show){

        setHideAboutMe((value) => ({...value, isActive : true}) )
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
        if (aboutU === ''){
          refTwo.current.value = "Пользователь ничего не написал о себе"
          areaRef.current.value = "Пользователь ничего не написал о себе"
          setEmpy(true)
        }
        else{
          areaRef.current.value = aboutU
        }

      }
    }
    else{
      areaRef.current.style.borderRadius = "10px"
      if (aboutU === ''){
        setEmpy(true)
          refTwo.current.value = "Пользователь ничего не написал о себе"
          areaRef.current.value = "Пользователь ничего не написал о себе"
      }
      else{
        areaRef.current.value = aboutU
      }
    }
    areaRef.current.style.height = (refTwo.current.scrollHeight).toString() + 'px'
  } , [hideAboutMe.show, aboutU ] )

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
            style={empty ? {opacity : 0.5} : {}}
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

export default memo(TextAboutMe);
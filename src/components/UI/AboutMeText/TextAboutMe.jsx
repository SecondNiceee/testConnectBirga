import React, { useEffect, useRef, useState } from 'react';
import './TextAboutMe.css'
const TextAboutMe = ( { aboutU , darkSide, ...props } ) => {
    const [hideAboutMe, setHideAboutMe] = useState(true)
    const areaRef = useRef(null)
    useEffect( () => {
        if (!darkSide){
          if (areaRef.current){
            if ((aboutU.split(/\r\n|\r|\n/).length) === 1){
              areaRef.current.style.height = '18.3px'
            }
            else{
              if (hideAboutMe){
                areaRef.current.style.height = '41px'
              }
              else{
                areaRef.current.style.height = 'auto'
                areaRef.current.style.height = areaRef.current.scrollHeight  + 'px'
              }
            }
          }
        } 
        else{
            if (areaRef.current){
              if ((aboutU.split(/\r\n|\r|\n/).length) === 1){
                areaRef.current.style.height = '18.3px'
              }
              else{
                if (hideAboutMe){
                  if (areaRef.current.scrollHeight <= 278){
                    areaRef.current.style.height = areaRef.current.scrollHeight  + 'px'
                  }
                  else{
                    areaRef.current.style.height = '278px'
                  }
                }
                else{
                  areaRef.current.style.height = 'auto'
                  areaRef.current.style.height = areaRef.current.scrollHeight  + 'px'
                }
              }
          }
        }
     } , [aboutU, hideAboutMe] )



    return (
        <div {...props} className="ur__town">
          {darkSide 
          ? <div className="background" style={hideAboutMe 
            ? {display : 'block'}
            : {display : 'none'}
          }></div> 
          : "" }

          <textarea
            ref={areaRef}

            readOnly={true}
            spellCheck={false}
            value={aboutU}
            className="about__u-text"
          />

          <div style={(aboutU.split(/\r\n|\r|\n/).length) > 2 
        ? {display : 'flex'}
        : {display : 'none'}} 
          className="also" 
          onClick={() => {  

            setHideAboutMe(!hideAboutMe)
          }}>
            <p>
              {hideAboutMe ? 'Читать далее' : 'Скрыть'}
            </p>
          </div>
        </div>
    );
};

export default TextAboutMe;
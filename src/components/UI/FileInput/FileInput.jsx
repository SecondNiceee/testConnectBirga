import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import cl from "./FileInput.module.css";
import file from "../../../images/icons/file.svg";
let counter = 0;
const FileInput = ({ className, files, setFiles , fileError, photosNames  }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    setImages(files.map((event) => URL.createObjectURL(event)));
  }, [files]);
  const myRef = useRef(null);
  useEffect(() => {
    if (myRef) {
      // alert(myRef.files)
    }
  }, [myRef.files]);

  var device = navigator.userAgent.toLowerCase();



  const photoStyle = useMemo( () => {
    if (fileError){
      return ({
        display : 'flex',
        border : '1px solid #FF6767'
      })
    }
    if (images.length === 0){
      return {
        display : 'flex'
      }
    }
    return {}
  }  , [fileError, images] )



//   function hideKeyboard(element) {
//     element.attr('readonly', 'readonly'); // Force keyboard to hide on input field.
//     element.attr('disabled', 'true'); // Force keyboard to hide on textarea field.
//     setTimeout(function() {
//         element.blur();  //actually close the keyboard
//         // Remove readonly attribute after keyboard is hidden.
//         element.removeAttr('readonly');
//         element.removeAttr('disabled');
//     }, 100);
// }
  
  const textRef = useRef(null)
  return (
    <>
    <input value={"привет"} ref={textRef} type="text" />
    <label

      htmlFor="file"
      style={photoStyle}
      className={className ? [cl.FileInput, className].join(" ") : cl.FileInput}
    >
      {images.map((e, i) => {
        return (
          <div key={i} className={cl.imageFeetContainer}>
            <div
              onClick={() => {
                setFiles(
                  [...files].filter((obj) => {
                    return files.indexOf(obj) !== images.indexOf(e);
                  })
                );
                

              }}
              className={[cl.removeIcon, "_icon-trash"].join(" ")}
            />

            <img className={cl.imageFeet} src={e} alt="" />
          </div>
        );
      })}

      <label
        style={images.length === 10 ? { display: "none" } : {}}
        className={images.length !== 0 ? cl.ActiveMainLabel : cl.MainLabel}
        htmlFor="file"
      >
        <input
          ref={myRef}
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              if (event.target.files.length > 10){
                window.Telegram.WebApp.showAlert('Максимум 10 файлов')
              }
              else{
                let newFiles = [];
                for (let i = 0; i < event.target.files.length; i++) {
                  let photo = event.target.files[i]
                  let blob = photo.slice(0 , photo.size , 'image/png')
                  let newFile = new File([blob], 'nick' + String(counter) + '.png', {type: 'image/png'});
                  counter += 1
                  newFiles.push(newFile);
                }
                setFiles([...files, ...newFiles]);

              }
            }
            myRef.current.blur()
            textRef.current.focus()
            textRef.current.blur()
            // hideKeyboard(myRef.current)
            
          }}
          type="file"
          multiple={device.includes("android") ? false : true}
          name="file"
          id="file"
          accept="image/*"
          className={cl.none}
        />

        <div className={cl.fileImageContainer}>
          <img className={cl.fileImage} src={file} alt="" />
        </div>
        <p>Добавить фото</p>
      </label>
      
    </label>
    {fileError ? 
      <p className={cl.fileError}>Добавьте хотя бы один пример работы</p>
      :
      <> </>
    }

    </>

  );
};

export default memo(FileInput);

import React, { useEffect, useMemo, useRef, useState } from "react";
import cl from "./FileInput.module.css";
import file from "../../../images/icons/file.svg";
import trash from "../../../images/icons/trash.svg";
const FileInput = ({ className, files, setFiles , fileError, photosNames, setRemovedFiles, setAddedFiles, addedFiles , removedFiles  }) => {
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

  

  return (
    <>
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
                console.log('Я удалил файл!!')
                setFiles(
                  [...files].filter((obj) => {
                    return files.indexOf(obj) !== images.indexOf(e);
                  })
                );
                
                if (photosNames){
                    if (files[i].name.includes('nick') ){
                      setAddedFiles([...removedFiles.filter(
                        file => file.name !== files[i].name
                      )])
                    }
                    else{
                       setRemovedFiles([...removedFiles , files[i].name])
                       setFiles(
                        [...files].filter((obj) => {
                          return files.indexOf(obj) !== images.indexOf(e);
                        })
                      );
                      
                    }
                    console.log('да, в этом случае')
                }

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
                  photo.name = 'nick' + String(i)
                  newFiles.push(photo);
                }
                setFiles([...files, ...newFiles]);
                // setAddedFiles(e => ([...e ,  ...newFiles]))
                setAddedFiles([...addedFiles , ...newFiles])
              }
            }
            
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

export default FileInput;

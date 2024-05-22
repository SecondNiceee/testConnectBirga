import React, { useEffect, useRef, useState } from "react";
import cl from "./FileInput.module.css";
import file from "../../../images/icons/file.svg";
import trash from "../../../images/icons/trash.svg";
const FileInput = ({ className, files, setFiles }) => {
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

  
  return (
    <label
      htmlFor="file"
      style={images.length === 0 ? { display: "flex" } : {}}
      className={className ? [cl.FileInput, className].join(" ") : cl.FileInput}
    >
      {images.map((e) => {
        return (
          <div className={cl.imageFeetContainer}>
            <div
              onClick={() => {
                setFiles(
                  [...files].filter((obj) => {
                    return files.indexOf(obj) !== images.indexOf(e);
                  })
                );
                setImages([...images].filter((m) => m != e));
              }}
              className={[cl.removeIcon, "_icon-trash"].join(" ")}
            />

            <img className={cl.imageFeet} src={e} alt="" />
          </div>
        );
      })}
      <label
        style={images.length === 5 ? { display: "none" } : {}}
        className={images.length !== 0 ? cl.ActiveMainLabel : cl.MainLabel}
        htmlFor="file"
      >
        <input
          ref={myRef}
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              let newFiles = [];
              for (let photo of event.target.files) {
                newFiles.push(photo);
              }
              setFiles([...files, ...newFiles]);
            }
          }}
          type="file"
          multiple={device.includes("android") ? false : true}
          // multiple = {false}
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
  );
};

export default FileInput;

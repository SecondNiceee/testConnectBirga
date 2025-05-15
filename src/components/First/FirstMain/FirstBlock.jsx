import React, {
  lazy,
  memo,
  Suspense,
  useEffect,
  useState,
} from "react";

import { useInView } from "react-intersection-observer";

import BlockSpinner from "../../UI/BlockSpinner/BlockSpinner";

const Block = lazy(() => import("../Block"));

const FirstBlock = ({
  className,
  taskName,
  time,
  end = false,
  category,
  isButton,
  photos,
  isMyAds,
  deleteFunction,
  myAdsFunc,
  isResponce,
  isWatched,
  index,
  id,
  setSlideActive,
  tonValue,
  task,
  agree = false,
  setViewsNumber = () =>{},
  setPhotoIndex,
  setPhotos
 }) => {
  const [badPhotos, setBadPhotos] = useState([])
  useEffect(() => {
    if (end){
      function resizeImage(file, maxWidth, maxHeight, quality) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              let width = img.width;
              let height = img.height;
  
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
  
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
  
              const canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
  
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, width, height);
  
              canvas.toBlob(
                (blob) => {
                  resolve(
                    new File([blob], file.name, {
                      type: "image/png",
                      lastModified: new Date().getTime(),
                    })
                  );
                },
                "image/png",
                quality
              );
            };
            img.src = event.target.result;
          };
          reader.readAsDataURL(file);
        });
      }
      let newPhotos = []
      for (let event of photos){
         resizeImage(event, 500 , 500, 0.8).then((value) => {
          newPhotos.push(value)
          if (newPhotos.length === photos.length){
              setBadPhotos(newPhotos)
          }
        })
      }
    }

  }, [photos , end] );


  const props = {
    className: className,
    taskName: taskName,
    time: time,
    end: end,
    isButton: isButton,
    photos: photos,
    isMyAds: isMyAds,
    deleteFunction: deleteFunction,
    myAdsFunc: myAdsFunc,
    isResponce: isResponce,
    isWatched: isWatched,
    index: index,
    id: id,
    setSlideActive: setSlideActive,
    tonValue: tonValue,
    task: task,
    agree: agree,
    category : category
  };

  const { ref, inView } = useInView({
    threshold: 0, // Порог видимости (от 0 до 1)
  });

  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    if (!isVisible){
      if (inView) {
        setVisible(true);
        setViewsNumber((value) => value + 1)
      }
    }
  }, [setVisible, inView, isVisible, setViewsNumber]);

  return (
    <div
      style={!isVisible ? { minHeight: "144px" , width : "100%" } : {}}
      className="First__block"
    >
      {isVisible && (
        <Suspense fallback={<BlockSpinner style = { photos.length > 0 ? {minHeight : "283px"} :{minHeight : "144px"}} />}>
          <Block setSliderOpened={setSlideActive} setPhotos={setPhotos} setPhotoIndex={setPhotoIndex} {...props} photos={ end ? badPhotos : photos} />
        </Suspense>
      )}
    <div ref={ref} style={{
                width : "1px",
                height : "2000px",
                position : "absolute",
                top : "-2000px",
                opacity : "0",
                zIndex : -1,
                left: "40px"
            }} className="catch_block"></div>
    </div>
  );
};

export default memo(FirstBlock);

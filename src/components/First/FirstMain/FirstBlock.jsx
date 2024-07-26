import React, {
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import MyButton from "../../UI/MyButton/MyButton";
import Pallete from "../../UI/Pallete/Pallete";
import ShareIcon from "../../UI/ShareIcon/ShareIcon";
import SmallDimond from "../../UI/SmallDimond/SmallDimond";
import FalseTie from "../../UI/FalseTie/FalseTie";
import { useDispatch, useSelector } from "react-redux";
import { addWatch } from "../../../store/watchedAds";
import options from "../../../constants/options";
import formatDate from "../../../functions/makeDate";
import { useInView } from "react-intersection-observer";
import MyLoader from "../../UI/MyLoader/MyLoader";
import { ThreeCircles } from "react-loader-spinner";
import BlockSpinner from "../../UI/BlockSpinner/BlockSpinner";

const Block = lazy(() => import("../Block"));

let counter = 0;
const FirstBlock = ({
  className,
  taskName,
  time,
  end = false,

  setDetailsActive,
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

  }, [photos]);


  const props = {
    className: className,
    taskName: taskName,
    time: time,
    end: end,
    setDetailsActive: setDetailsActive,
    isButton: isButton,
    photos: photos,
    isMyAds: isMyAds,
    deleteFunction: deleteFunction,
    myAdsFunc: myAdsFunc,
    isResponce: isResponce,
    isWatched: isWatched,
    index: index,
    id: id,
    setDetailsActive: setDetailsActive,
    setSlideActive: setSlideActive,
    tonValue: tonValue,
    task: task,
    agree: agree,
  };

  const { ref, inView } = useInView({
    threshold: 0, // Порог видимости (от 0 до 1)
  });

  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    if (inView) {
      setVisible(true);
    }
  }, [setVisible, inView]);

  return (
    <div
      ref={ref}
      style={!isVisible ? { minHeight: "144px" } : {}}
      className="wrapper"
    >
      {isVisible && (
        <Suspense fallback={<BlockSpinner />}>
          <Block {...props} photos={ end ? badPhotos : photos} />
        </Suspense>
      )}
    </div>
  );
};

export default memo(FirstBlock);

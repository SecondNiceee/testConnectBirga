import { memo, useCallback, useEffect } from "react";
import TaskDetailsContainer from "./TaskDetailsContainer";
import TimeAndWatches from "./TimeAndWatches";
import { useDispatch } from "react-redux";
import { addWatch } from "../../../store/information";
import MyLoader from "../../UI/MyLoader/MyLoader";
import {  useNavigate, useParams } from "react-router";
import menuController from "../../../functions/menuController";
import MainButton from "../../../constants/MainButton";
import useSlider from "../../../hooks/useSlider";
import CssTransitionSlider from "../../UI/PhotosSlider/CssTransitionSlider";
import useGetAdvertisement from "../../../hooks/api/useGetAdvertisement";
import useNavigateBack from "../../../hooks/useNavigateBack";

const FirstDetails = ({ end, className, showButton =true, ...props }) => {

  const disatch = useDispatch();

  const { id } = useParams();

  const {advertisementStatus, orderInformation} = useGetAdvertisement({id})

  const navigate = useNavigate();

  useEffect(() => {
    if (showButton){
      menuController.lowerMenu();
      MainButton.show();
      MainButton.setText("Откликнуться");
    }
  }, []);

  const goForward = useCallback( () => {
    navigate(`/makeresponse/${id}`)
  }, [id, navigate] )

  useEffect( () => {
    MainButton.onClick(goForward);
    return () => {
      MainButton.offClick(goForward)
    }
  }, [goForward] )

    const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  useNavigateBack({isSliderOpened, setSlideOpened});

  useEffect(() => {
    if (!end && orderInformation) {
      disatch(addWatch(orderInformation));
    }
  }, [disatch, end, orderInformation]);

  if (advertisementStatus === "pending" || advertisementStatus === "rejected") {
    return <MyLoader />;
  }
  return (
    <>
      <div
        {...props}
        className={
          className
            ? ["TaskDetails !pb-[100px]", className].join(" ")
            : "TaskDetails !pb-[100px]"
        }
      >
        <div onClick={goForward} className="fixed left-1/2 top-1/2 rounded p-2 border-black border-solid border-2 cursor-pointer">
          MAIN BUTTON
        </div>
        <TaskDetailsContainer
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSliderOpened={setSlideOpened}
          end={end}
          orderInformation={orderInformation}
        />
        {end ? (
          <></>
        ) : (
          <TimeAndWatches
            responses={
              orderInformation.responces
                ? orderInformation.responces.length
                : null
            }
            time={orderInformation.creationTime}
            watches={orderInformation.viewsNumber}
          />
        )}
      </div>
      <CssTransitionSlider
        blockerAll={true}
        blockerId={""}
        isSliderOpened={isSliderOpened}
        leftPosition={0}
        renderMap={photos}
        setSliderOpened={setSlideOpened}
        sliderIndex={photoIndex}
        swiperId={"1"}
        top={0}
      />
    </>
  );
};

export default memo(FirstDetails);

import { useCallback, useEffect, useMemo, useState } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllReactions from "./AllReactions";
import Block from "../../../components/First/Block";
import {
  clearResponsesByA,
  fetchResponseByAdvertisement,
} from "../../../store/responses";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import useSlider from "../../../hooks/useSlider";
import useGetAdvertisement from "../../../hooks/api/useGetAdvertisement";
import { useNavigate, useParams } from "react-router";
import CssTransitionSlider from "../../../components/UI/PhotosSlider/CssTransitionSlider";
import translation from "../../../functions/translate";
import { deleteAd, setAdvertisement } from "../../../store/information";
import useNavigateBack from "../../../hooks/useNavigateBack";
import { getAdvertisementById } from "../../../functions/api/getAdvertisemetById";

const showStatus = true;
const AboutOne = () => {
  const responces = useSelector((state) => state.responses.responsesByA);
  const startStatus = useSelector((state) => state.responses.startStatus);
  const dispatch = useDispatch();

  const [task, setOrderInformation] = useState(null);
  const {advId} = useParams()

  const advertisementFormStore = useSelector(state => state.information.advertisement);
  useEffect( () => {
    if (advertisementFormStore){
      setOrderInformation(advertisementFormStore);
    }
    else{
      getAdvertisementById(advId).then(adv => {setOrderInformation(advId)
        dispatch(setAdvertisement(adv))
      })
    }
  },[advertisementFormStore, setOrderInformation, dispatch] )

  useEffect(() => {
    if (task && startStatus === "completed") {
      dispatch(clearResponsesByA());
      dispatch(fetchResponseByAdvertisement([task.id, task, 1]));
    }
    // eslint-disable-next-line
  }, [task, startStatus]);

  const navigate = useNavigate();


  const deleteFunction = useCallback(
    (e) => {
      window.Telegram.WebApp.showPopup(
        {
          title: translation("Удалить?"),
          message: translation("Вы хотите удалить это задание?"),
          buttons: [
            { id: "save", type: "default", text: "Да" },
            { id: "delete", type: "destructive", text:"Нет" },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete" || buttonId === null) {
          }
          if (buttonId === "save") {
            dispatch(deleteAd(e.id));
            navigate(-1);
          }
        }
      );
    },
    [dispatch, navigate]
  );

  const [filterBy, setFilterBy] = useState("all");

  const filteredArray = useMemo(() => {
    if (responces !== null) {
      if (filterBy === "all") {
        return responces;
      }
      if (filterBy === "withCompletedTasks") {
        return [
          ...responces.filter(
            (e) => Number(e.user.completedAdvertisements) > 0
          ),
        ];
      }
      if (filterBy === "withCards") {
        return [...responces.filter((e) => e.user.cardsNumber > 0)];
      }
    } else {
      return [];
    }
  }, [responces, filterBy]);


  const getMore = useCallback(
    (page, setPage) => {
      dispatch(fetchResponseByAdvertisement([task.id, task, page]));
      setPage(page + 1);
    },
    [dispatch, task]
  );

  const putStatus = useSelector((state) => state.information.putTaskStatus);

  const {isSliderOpened, photoIndex, photos, setPhotoIndex, setPhotos,setSlideOpened} = useSlider()

  useNavigateBack({isSliderOpened, setSlideOpened})


  const openDetails = () => {
      navigate(`/changeAdvertisement/${task.id}`)
  }

  if (!task){
    return <MyLoader />
  }

  const openAboutReactionFunc = () => {

  }

  return (
    <>
      <div className="aboutOne p-4">
        {task && putStatus !== "pending" ? (
          <Block
            setPhotos={setPhotos}
            setSliderOpened={setSlideOpened}
            setPhotoIndex={setPhotoIndex}
            showStatus={showStatus}
            deleteFunction={deleteFunction}
            setDetailsActive={openDetails}
            isResponce={
              task.status !== "inProcess" && task.status !== "completed"
            }
            isButton={
              task.status !== "inProcess" && task.status !== "completed"
            }
            className={"FirstAdsBlock"}
            {...task}
          />
        ) : (
          <MyLoader
            style={{ transform: "translateX(-16px)", height: "250px" }}
          />
        )}

        <AllReactions
          setPhotos={setPhotos}
          setSliderOpened={setSlideOpened}
          setPhotoIndex={setPhotoIndex}
          getMore={getMore}
          filteredArray={filteredArray}
          setFilterBy={setFilterBy}
          openAboutReactionFunc={openAboutReactionFunc}

        />

      </div>
        <CssTransitionSlider blockerAll={true} blockerId={""} isSliderOpened={isSliderOpened} leftPosition={0} renderMap={photos} setSliderOpened={setSlideOpened} sliderIndex={photoIndex} swiperId={"1"} top={0} />
    </>
  );
};

export default memo(AboutOne);

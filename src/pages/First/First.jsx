import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

import BackButton from "../../constants/BackButton";
import "../MyAds/MyAds.css";
import MainButton from "../../constants/MainButton";
import AllTasks from "./AllTasks";
import { useDispatch, useSelector } from "react-redux";
import Responce from "./Responce";
import { CSSTransition } from "react-transition-group";
import { useFilteredArr } from "../../hooks/useFilteredArr";
import FirstChoiceCategory from "../AdCreatingOne/ui/components/ChoiceCategory/FirstChoiceCategory";
import AboutReaction from "../MyAds/components/AboutReaction";
import CardPage from "../CardPage/CardPage";
import axios from "axios";
import makeNewFile from "../../functions/newMakeFile";
import { clearTasks } from "../../store/information";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import translation from "../../functions/translate";
import en from "../../constants/language";
import makeNewUser from "../../functions/makeNewUser";
import { USERID } from "../../constants/tgStatic.config";
import FirstChoiceSubCategory from "../AdCreatingOne/ui/components/FirstChoiceSubCategory/FirstChoiceSubCategory";
import CssTransitionSlider from "../../components/UI/PhotosSlider/CssTransitionSlider";
import useMenuRejection from "./hooks/useMenuRejection";
import useBlockInputs from "../../hooks/useBlockInputs";
import useAddHistory from "../../hooks/MyAds/useAddHistory";
import useSlider from "../../hooks/useSlider";
import useFilteredArray from "./hooks/useFilteredArray";
import useIsMyResponse from "./hooks/useIsMyResponse";
import useForward from "./hooks/useForward";
import useBackButton from "./hooks/useBackButton";
import useMenuController from "./hooks/useMenuController";
import useButtonActiveAndColorController from "./hooks/useButtonActiveAndColorController";

let localStep;

const messageOne = translation("📣 Вы получили отклик на задачу «");
const messageTwo = translation("» от ");
const menu = document.documentElement.querySelector(".FirstMenu");
let resp = translation("Откликнуться?");

const textButton = translation("Вы действительно хотите откликнуться?");
const buttonText = translation("ОТКЛИКНУТЬСЯ");

const Yes = translation("Да");
const No = translation("Нет");

const First = ({ isPage = false }) => {
  const [pageValue, setPageValue] = useState(true);

  const firstRef = useRef(null);

  const [step, setStep] = useState(0);

  const categorys = useSelector((state) => state.categorys.category);

  const subCategorys = useSelector((state) => state.categorys.subCategory);

  const [categoryOpen, setCategoryOpen] = useState(false);

  const [subCategory, setSubCategory] = useState(false);

  localStep = step;

  const dispatch = useDispatch();

  useAddHistory();

  const [isDetailsActive, setDetailsActive] = useState({
    id: -1,
    isOpen: false,
  });

  const responseRef = useRef(null);

  useEffect(() => {
    if (isPage) {
      setTimeout(() => {
        setDetailsActive((value) => ({ ...value, isOpen: true }));
      }, 300);
    }
    // eslint-disable-next-line
  }, []);

  const [responce, setResponce] = useState({
    text: "",
    photos: [],
    name: "привет",
    isShablonModalActive: false,
    shablonIndex: 0,
    isShablon: false,
    shablonMaker: false,
  });

  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );

  const [filters, setFilters] = useState({
    category: { id: -1, category: "Все" },
    subCategory: { id: -1, subCategory: "Все" },
    price: 0,
  });

  const [filterBy, setFilterBy] = useState("");

  const filteredArr = useFilteredArr(ordersInformation, filterBy);

  useEffect(() => {
    window.Telegram.WebApp.disableVerticalSwipes();
  }, []);

  const secFilteredArray = useFilteredArray({ filteredArr, filters });

  const [pageAdvertisement, setPageAdvertisement] = useState(null);

  const detailsAdertisement = useMemo(() => {
    async function getAdvertisement() {
      try {
        let advertisement = await axios.get(
          process.env.REACT_APP_HOST + "/advertisement/findOne",
          {
            params: {
              id: window.Telegram.WebApp.initDataUnsafe.start_param,
            },
            headers: {
              "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            },
          }
        );
        let order = advertisement.data;
        let one = new Date(order.startTime);

        let two;
        if (order.endTime) {
          two = new Date(order.endTime);
        } else {
          two = "";
        }

        let files = await makeNewFile(order.folder, order.photos);

        let imTwo = await axios.get(
          process.env.REACT_APP_HOST + "/advertisement/findCount",
          {
            params: {
              userId: order.user.id,
            },
            headers: {
              "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            },
          }
        );

        const newUser = await makeNewUser(order);

        return {
          id: order.id,
          taskName: order.title,
          executionPlace: "Можно выполнить удаленно",
          time: { start: one, end: two },
          tonValue: order.price,
          taskDescription: order.description,
          photos: files,
          photosName: order.photos,
          customerName: order.user.fl,
          userPhoto: order.user.photo ? order.user.photo : "",
          rate: "5",
          isActive: true,
          creationTime: order.createdAt,
          viewsNumber: order.views,
          responces: order.responses,
          status: order.status,
          user: newUser,
          createNumber: imTwo.data,
          category: order.category.id,
        };
      } catch (e) {
        setPageValue(false);
        setDetailsActive({ isOpen: false, id: 1 });
      }
    }

    if (ordersInformation === null) {
      return "";
    } else {
      if (pageValue && isPage) {
        if (pageAdvertisement === null) {
          getAdvertisement().then((value) => setPageAdvertisement(value));
        }

        return pageAdvertisement;
      } else {
        return secFilteredArray[isDetailsActive.id];
      }
    }
  }, [
    isPage,
    pageAdvertisement,
    isDetailsActive.id,
    ordersInformation,
    secFilteredArray,
    pageValue,
  ]);

  const isMyResponse = useIsMyResponse({
    detailsAdertisement,
    isDetailsActive,
  });

  const [isProfile, setProfile] = useState(false);

  const [isCardOpen, setCardOpen] = useState({
    isOpen: false,
    card: {},
  });

  useEffect(() => {
    if (isDetailsActive.isOpen) {
      BackButton.show();
    }
  }, [isDetailsActive]);

  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  const forward = useForward({
    isMyResponse,
    isSliderOpened,
    setSlideOpened,
    setStep,
    step,
    isCatetegoryChoiceOpen : categoryOpen,
    isSubCategoryChoiceOpen : subCategory
  }); /// функция междлу подробнее и откликлм

  const back = useBackButton({
    isSliderOpened,
    responce,
    setProfile,
    setResponce,
    closeDetails,
    setPageValue,
    step,
    isCardOpen,
    isProfile,
    setCardOpen,
    setSlideOpened,
    setStep,
  });

  function closeDetails() {
    setDetailsActive((value) => ({ ...value, isOpen: false }));
  }

  useMenuController({isDetailsActive})

  useEffect( () => {
    MainButton.onClick(forward)
    BackButton.onClick(back)
    return () => {
      MainButton.offClick(forward);
      BackButton.offClick(back);
    }
  }, [forward, back] )

  useButtonActiveAndColorController({detailsAdertisement, isDetailsActive, isMyResponse, step});

  useEffect(() => {
    if (step === 0 || step === 1) {
      MainButton.setText(buttonText);
    }
  }, [step, isDetailsActive.isOpen]);

  useEffect(() => {
    if (responce.text.length  < 3 && localStep === 1) {
      MainButton.setParams({
        color: "#2f2f2f",
        text_color: "#606060",
      });
    } else {
      if (localStep === 1) {
        MainButton.setParams({
          color: "#2ea5ff",
          text_color: "#ffffff",
          is_active: true,
        });
      }
    }
  }, [responce.text, step]);

  const me = useSelector((state) => state.telegramUserInfo);



  useEffect(() => {
    dispatch(clearTasks());
  }, [dispatch]);

  const [putStatus, setPutStatus] = useState(false);

  const forwardFunction = useCallback(() => {
    async function post(par) {
      try {
        let im;
        setPutStatus(true);
        responseRef.current.style.overflowY = "hidden";
        for (let i = 0; i < 1; i++) {
          im = await axios.post(
            process.env.REACT_APP_HOST + "/response",
            par[0],
            {
              params: {
                advertisementId: par[1].advertisement.id,
                userId: par[1].user.id,
              },
              headers: {
                "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
              },
            }
          );
        }
        try {
          await axios.get(process.env.REACT_APP_HOST + "/user/sendMessage", {
            params: {
              chatId: par[1].advertisement.user.chatId,
              text:
                messageOne +
                par[1].advertisement.taskName.bold() +
                messageTwo +
                par[1].user.fl,
              buttonUrl:
                "https://connectbirga.ru/ResponsePage?advertisement=" +
                String(par[1].advertisement.id) +
                "&response=" +
                String(im.data.id),
              languageCode: en ? "en" : "ru",
            },
            headers: {
              "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            },
          });
        } catch (e) {
          console.warn(e);
        }
        setDetailsActive((value) => ({ ...value, isOpen: false }));
        setStep(0);
        setProfile(false);
        setCardOpen((value) => ({ ...value, isOpen: false }));
        setResponce({
          text: "",
          photos: [],
          name: "привет",
          isShablonModalActive: false,
          shablonIndex: 0,
          isShablon: false,
          shablonMaker: false,
        });
        menu.style.display = "flex";
        responseRef.current.style.overflowY = "scroll";
        setPutStatus(false);
        return par[1];
      } catch (e) {
        console.log(e);
        window.Telegram.WebApp.showAlert(e);
      }
    }
    async function postResponce(advertismetId, userId) {
      let myFormData = new FormData();
      myFormData.append("information", String(responce.text));
      myFormData.append("userId", String(userId));
      myFormData.append("advertismentId", String(advertismetId));
      responce.photos.forEach((e, i) => {
        myFormData.append(`photos`, e);
      });
      try {
        let gibrid = { ...responce };
        gibrid.isWatched = "";
        gibrid.advertisement = detailsAdertisement;
        gibrid.user = {
          id: me.id,
          fl: me.firstName,
          link: me.link,
          photo: me.photo ? me.photo : "",
          about: me.profile.about,
          stage: me.profile.stage,
        };
        await post([myFormData, gibrid]);
      } catch (e) {
        console.warn(e);
      }
    }

    if (!subCategory && !categoryOpen){
      alert("Йоу")
    if (!isSliderOpened){
      if (step !== 0 && !responce.shablonMaker) {
        if (responce.text.length < 3) {
          window.Telegram.WebApp.showAlert(translation("Ваш отклик пуст!"));
        } else {
          window.Telegram.WebApp.showPopup(
            {
              title: resp,
              message: textButton,
              buttons: [
                { id: "save", type: "default", text: Yes },
                { id: "delete", type: "destructive", text: No },
              ],
            },
            (buttonId) => {
              if (buttonId === "delete" || buttonId === null) {
              }
              if (buttonId === "save") {
                window.Telegram.WebApp.HapticFeedback.notificationOccurred(
                  "success"
                );
                postResponce(detailsAdertisement.id, USERID);
              }
            }
          );
        }
      }
    }
    else{
      setSlideOpened(false)
    }
  }
  }, [responce, step, setDetailsActive, setStep, me, detailsAdertisement, subCategory, categoryOpen]);

  useEffect(() => {
    MainButton.onClick(forwardFunction);
    return () => {
      MainButton.offClick(forwardFunction);
    };
  }, [responce, forwardFunction]);

  const firsStyle = useMemo(() => {
    if (step === 1) {
      return {
        transform: "translateX(-200vw)",
      };
    } else {
      if (isDetailsActive.isOpen)
        return {
          transform: "translateX(-100vw)",
        };
      else {
        return {};
      }
    }
  }, [step, isDetailsActive.isOpen]);

  useBlockInputs();

  useMenuRejection({
    setCardOpen,
    setCategoryOpen,
    setDetailsActive,
    setProfile,
    setResponce,
    setStep,
    setSubCategory,
  });

  return (
    <>
      <div style={firsStyle} className="first-container">
        <motion.div
          // style={style}
          ref={firstRef}
          id="First"
          className="First"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="first-wrapper">
            <AllTasks
              setFilters={setFilters}
              setSubCategory={setSubCategory}
              filters={filters}
              setCategoryOpen={setCategoryOpen}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              ordersInformation={secFilteredArray}
              setDetailsActive={setDetailsActive}
            />
          </div>

          <CSSTransition
            in={categoryOpen}
            timeout={0}
            mountOnEnter
            unmountOnExit
          >
            <FirstChoiceCategory
              style={{
                paddingBottom: "100px",
                top: firstRef.current
                  ? firstRef.current.scrollTop + "px"
                  : "0px",
              }}
              subCategorys={subCategorys}
              categorys={categorys}
              setCatagoryChoiceOpen={setCategoryOpen}
              taskInformation={filters}
              setTaskInformation={setFilters}
            />
          </CSSTransition>

          <CSSTransition
            in={subCategory}
            timeout={0}
            mountOnEnter
            unmountOnExit
          >
            <FirstChoiceSubCategory
              style={{
                paddingBottom: "100px",
                top: firstRef.current
                  ? firstRef.current.scrollTop + "px"
                  : "0px",
              }}
              setSubcategoryChoiceOpen={setSubCategory}
              subCategorysPar={subCategorys}
              taskInformation={filters}
              setTaskInformation={setFilters}
            />
          </CSSTransition>
        </motion.div>

        <CSSTransition
          classNames="left-right"
          in={isCardOpen.isOpen}
          timeout={400}
          mountOnEnter
          unmountOnExit
        >
          <CardPage
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSlideOpened={setSlideOpened}
            style={{ paddingBottom: "74px", left: "100vw" }}
            card={isCardOpen.card}
          />
        </CSSTransition>

        <CSSTransition
          in={isProfile}
          timeout={400}
          classNames="left-right"
          mountOnEnter
          unmountOnExit
        >
          <AboutReaction
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSlideOpened={setSlideOpened}
            isFirst={true}
            isMyAds={false}
            isTelesgramVisible={false}
            style={{
              paddingBottom: "74px",
              left: "100vw",
            }}
            setOneCard={setCardOpen}
            responce={detailsAdertisement}
          />
        </CSSTransition>

        <CSSTransition
          in={isDetailsActive.isOpen}
          timeout={400}
          // classNames="left-right"
        >
          <FirstDetails
            setPhotoIndex={setPhotoIndex}
            setPhotos={setPhotos}
            setSliderOpened={setSlideOpened}
            isDetailsActive={isDetailsActive.isOpen}
            breakRef={firstRef}
            setProfile={setProfile}
            // style={pageValue && isPage ? { transform: "translateX(0%)" } : {}}
            // className={}
            orderInformation={detailsAdertisement}
          />
        </CSSTransition>

        <CSSTransition
          in={step === 1 ? true : false}
          // in = {true}
          timeout={400}
          mountOnEnter
          unmountOnExit
        >
          <Responce
            setPhotoIndex={setPhotoIndex}
            setPhotos={setPhotos}
            setSliderOpened={setSlideOpened}
            ref={responseRef}
            putStatus={putStatus}
            responce={responce}
            setResponce={setResponce}
            orderInformation={
              pageValue && isPage
                ? pageAdvertisement
                : secFilteredArray[isDetailsActive.id]
                ? secFilteredArray[isDetailsActive.id]
                : "he"
            }
          />
        </CSSTransition>
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

export default First;

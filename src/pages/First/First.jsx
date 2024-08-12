import React, {
  lazy,
  Suspense,
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
import { changeMenuActive } from "../../store/menuSlice";
import Responce from "./Responce";
import { CSSTransition } from "react-transition-group";
import pagesHistory from "../../constants/pagesHistory";
import { clearResponses, fetchResponses } from "../../store/responses";
import { useFilteredArr } from "../../hooks/useFilteredArr";
import FirstChoiceCategory from "../AdCreatingOne/ChoiceCategory/FirstChoiceCategory";
import FirstChoiceSubCategory from "../AdCreatingOne/FirstChoiceSubCategory";
import AboutReaction from "../MyAds/components/AboutReaction";
import CardPage from "../CardPage/CardPage";
import axios from "axios";
import makeNewFile from "../../functions/newMakeFile";
import { addResponce, clearTasks } from "../../store/information";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";

let isDetailsActiveVar = false;
let pageValue = true;
let localResponce;
let localStep;

const menu = document.documentElement.querySelector(".FirstMenu")


const First = ({ isPage = false }) => {

  if (MainButton.isVisible){
    menu.style.paddingBottom = "3px"
  }
  else{
    menu.style.paddingBottom = "27px"
  }


  const [step, setStep] = useState(0);
  localStep = step;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      pagesHistory.push("/");
    };
  }, []);

  const [isDetailsActive, setDetailsActive] = useState({
    id: 0,
    isOpen: false,
  });

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

  const tonConstant = useSelector((state) => state.ton.value);

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
    // const data = JSON.stringify({ allow_vertical_swipe: false });

    // window
    //   .TelegramWebviewProxy
    //   .postEvent('web_app_setup_swipe_behavior', data);
  }, []);

  const secFilteredArray = useMemo(() => {
    let copy = [...filteredArr];
    if (filters.category.id !== -1) {
      if (filters.subCategory.id !== -1) {
        return copy.filter((e) => {
          return (
            e.category === filters.category.id &&
            e.subCategory === filters.subCategory.id &&
            e.tonValue * tonConstant >= filters.price
          );
        });
      } else {
        return copy.filter((e) => {
          return (
            e.category === filters.category.id &&
            e.tonValue * tonConstant >= filters.price
          );
        });
      }
    } else {
      return copy.filter((e) => {
        return e.tonValue * tonConstant >= filters.price;
      });
    }
  }, [filteredArr, filters, tonConstant]);

  const isMenuActive = useSelector((state) => state.menu.value);

  const mainRef = useRef(null);

  // const gotIt = useMemo( () => {
  //   if (secFilteredArray !== null && secFilteredArray.length > 0 && secFilteredArray[isDetailsActive.id]){

  //     if (secFilteredArray[isDetailsActive.id].responces){
  //       if (secFilteredArray[isDetailsActive.id].responces.find((e) =>
  //         Number(e.user.id) === 2144832745))

  //       {
  //         return true
  //       }
  //       else{

  //         return false
  //       }
  //     }
  //   }
  //   return false
  //   // eslint-disable-next-line
  // },[secFilteredArray, isDetailsActive.id,isDetailsActive.isOpen ] )

  const gotIt = false;

  useEffect(() => {
    if (isDetailsActive.isOpen) {
      BackButton.show();
    }
  }, [isDetailsActive]);

  isDetailsActiveVar = isDetailsActive.isOpen;

  const [isProfile, setProfile] = useState(false);

  const [isCardOpen, setCardOpen] = useState({
    isOpen: false,
    card: {},
  });

  useEffect(() => {
    function closeDetails() {
      setDetailsActive((value) => ({ ...value, isOpen: false }));
    }

    function forward() {
      if (gotIt) {
        window.Telegram.WebApp.showPopup({
          title: "Ошибка",
          message:
            "Вы уже откликнулись на это задание. Заказчик обязательно увидит ваш отклик.",
        });
      } else {
        if (step === 0) {
          // mainRef.current.classList.add('secondStep')
          setStep(1);
        }
      }
    }

    function back() {
      if (responce.isShablonModalActive) {
        setResponce((value) => ({ ...value, isShablonModalActive: false }));
      } else {
        if (responce.shablonMaker) {
          setResponce((value) => ({ ...value, shablonMaker: false }));
        } else {
          if (step === 1) {
            setStep(0);
            MainButton.setParams({
              is_active: true,
              color: "#2ea5ff",
              text_color: "#ffffff",
            });

            // mainRef.current.classList.remove('secondStep')
          } else {
            if (isCardOpen.isOpen) {
              setCardOpen((value) => ({ ...value, isOpen: false }));
            } else {
              if (isProfile) {
                setProfile(false);
              } else {
                if (step === 0) {
                  setResponce({
                    text: "",
                    photos: [],
                    name: "привет",
                    isShablonModalActive: false,
                    shablonIndex: 0,
                    isShablon: false,
                    shablonMaker: false,
                  });
                  closeDetails();

                  pageValue = false;
                }
              }
            }
          }
        }
      }
    }

    MainButton.onClick(forward);
    BackButton.onClick(back);
    if (isDetailsActiveVar) {
      menu.style.paddingBottom = "3px"
      MainButton.show();
      BackButton.show();
      if (gotIt) {
        MainButton.setParams({
          //неизвесетно
          color: "#2f2f2f",
          text_color: "#606060",
        });
      } else {
        if (localStep === 0) {
          MainButton.setParams({
            is_active: true,
            color: "#2ea5ff",
            text_color: "#ffffff",
          });
        }
      }
    } else {
      BackButton.hide();
      MainButton.hide();
      menu.style.paddingBottom = "27px"
      MainButton.setParams({
        is_active: true,
        color: "#2ea5ff",
        text_color: "#ffffff",
      });
    }
    return () => {
      MainButton.offClick(forward);
      BackButton.offClick(back);
    };
  }, [
    isDetailsActive.isOpen,
    step,
    gotIt,
    responce.isShablonModalActive,
    responce.shablonMaker,
    isProfile,
    isCardOpen.isOpen,
    setProfile,
    setCardOpen,
  ]);

  useEffect(() => {
    if (step === 0) {
      MainButton.setText("ОТКЛИКНУТЬСЯ");
    }
    if (step === 1) {
      MainButton.setText("ОТКЛИКНУТЬСЯ");
    }
  }, [step, isDetailsActive.isOpen]);

  const setMenuActive = useCallback(
    (set) => {
      dispatch(changeMenuActive(set));
    },
    [dispatch]
  );


  const closeMenu = useCallback(() => {
    if (isMenuActive) {
      setMenuActive(false);
    }
  }, [isMenuActive, setMenuActive]);

  localResponce = responce;

  useEffect(() => {
    if (localResponce.text.length < 3 && localStep === 1) {
      MainButton.setParams({
        is_active: false, //неизвесетно
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

  const [categoryOpen, setCategoryOpen] = useState(false);

  const [subCategory, setSubCategory] = useState(false);

  // useEffect( () => {
  //   firstRef.current.style.overflowY = "scroll"
  //   firstRef.current.style.height = "200vh"
  //   firstRef.current.style.paddingBottom = "100%"

  // }, [] )

  useEffect(() => {
    dispatch(clearTasks());
  }, []);

  useEffect(() => {
    let inputs = document.querySelectorAll("input");
    function addH() {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    }
    // Добавляем обработчик события на каждый элемент input, у которого type не равен file
    inputs.forEach(function (input) {
      if (input.type !== "file") {
        input.addEventListener("focus", addH);
      }
    });
    return () => {
      inputs.forEach(function (input) {
        if (input.type !== "file") {
          input.removeEventListener("focus", addH);
        }
      });
    };
  }, []);

  const forwardFunction = useCallback(() => {
    async function post(par) {
      try {
        let im;
        for (let i = 0; i < 1; i++) {
          im = await axios.post("https://back-birga.ywa.su/response", par[0], {
            params: {
              advertisementId: par[1].advertisement.id,
              userId: par[1].user.id,
            },
          });
        }

        await axios.get("https://back-birga.ywa.su/user/sendMessage", {
          params: {
            chatId: par[1].advertisement.user.chatId,
            text:
              "📣 Вы получили отклик на задачу «" +
              par[1].advertisement.taskName.bold() +
              "» от " +
              par[1].user.fl,
            buttonUrl:
              "https://birga.ywa.su/ResponsePage?advertisemet=" +
              String(par[1].advertisement.id) +
              "&response=" +
              String(im.data.id),
          },
        });

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
        gibrid.advertisement = secFilteredArray[isDetailsActive.id];
        gibrid.user = {
          id: me.id,
          fl: me.firstName,
          link: me.link,
          photo: me.photo,
          about: me.profile.about,
          stage: me.profile.stage,
        };
        await post([myFormData, gibrid]);
        dispatch(clearResponses());
        dispatch(fetchResponses([me, 1]));
        dispatch(addResponce([gibrid.advertisement.id, gibrid]));
      } catch (e) {
        console.warn(e);
      }
    }

    if (step !== 0 && !responce.shablonMaker) {
      window.Telegram.WebApp.showPopup(
        {
          title: "Откликнуться?",
          message: "Вы действительно хотите откликнуться?",
          buttons: [
            { id: "save", type: "default", text: "Да" },
            { id: "delete", type: "destructive", text: "Нет" },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete" || buttonId === null) {
            // setShablon({...shablon , isActive : false})
          }
          if (buttonId === "save") {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred(
              "success"
            );
            postResponce(
              ordersInformation[isDetailsActive.id].id,
              2144832745
            );
            // mainRef.current.classList.remove('secondStep')
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
          }
        }
      );
    }
  }, [
    responce,
    step,
    ordersInformation,
    isDetailsActive.id,
    setDetailsActive,
    dispatch,
    setStep,
    me,
    secFilteredArray,
  ]);

  const categorys = useSelector((state) => state.categorys.category);

  const subCategorys = useSelector((state) => state.categorys.subCategory);

  const firstRef = useRef(null);

  // useEffect( () => {

  //   document.documentElement.style.overflowY = 'scroll'
  //   document.documentElement.style.marginTop = "20px"
  //   document.documentElement.scrollTop = 20
  //   document.documentElement.style.overflowY = 'hidden'
  //   return () => {
  //     // window.Telegram.WebApp.offEvent("viewportChanged", hh)
  //     // firstRef.current.removeEventListner("scroll" , hh)
  //   }
  // } , [] )

  // 2144832745

  // 2144832745

  useEffect(() => {
    MainButton.onClick(forwardFunction);
    return () => {
      MainButton.offClick(forwardFunction);
    };
  }, [responce, forwardFunction]);

  const [pageAdvertisement, setPageAdvertisement] = useState(null);

  const detailsAdertisement = useMemo(() => {
    async function getAdvertisement() {
      try {
        let advertisement = await axios.get(
          "https://back-birga.ywa.su/advertisement/findOne",
          {
            params: {
              id: window.Telegram.WebApp.initDataUnsafe.start_param,
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
          "https://back-birga.ywa.su/advertisement/findCount",
          {
            params: {
              userId: order.user.id,
            },
          }
        );

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
          userPhoto: order.user.photo || "",
          rate: "5",
          isActive: true,
          creationTime: order.createdAt,
          viewsNumber: order.views,
          responces: order.responses,
          status: order.status,
          user: order.user,
          createNumber: imTwo.data,
          category: order.category.id,
        };
      } catch (e) {
        pageValue = false;
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
        /// НЕ попал сюда
        return secFilteredArray[isDetailsActive.id];
      }
    }
  }, [
    isPage,
    pageAdvertisement,
    isDetailsActive.id,
    ordersInformation,
    secFilteredArray,
  ]);

  const firsStyle = useMemo(() => {
    if (step === 1) {
      return {
        transform: "translateX(-100vw)",
      };
    } else {
      if (isDetailsActive.isOpen)
        return {
          transform: "translateX(0vw)",
        };
      else {
        return {};
      }
    }
  }, [step, isDetailsActive.isOpen]);

  useEffect( () => {
    
    const input = document.querySelectorAll('input[type="text"]');
    const textarea  = document.querySelectorAll('textarea');
    for (let smallInput of input){
      smallInput.addEventListener('focus', () => {
        menu.style.display = 'none'; // скрываем меню
      });
      smallInput.addEventListener('blur', () => {
        menu.style.display = 'flex'; // скрываем меню
      });
    }
    for (let smallTextarea of textarea){
      smallTextarea.addEventListener('focus', () => {
        menu.style.display = 'none'; // скрываем меню
      });
      smallTextarea.addEventListener('blur', () => {
        menu.style.display = 'flex'; // скрываем меню
      });
    }
  } , [] )

  const container = document.querySelector(".container")


  return (
    <div style={firsStyle} className="first-container">
      <div
        // style={style}
        ref={firstRef}
        className="First"
        onClick={closeMenu}
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
            setMenuActive={setMenuActive}
          />
        </div>

        <CSSTransition in={categoryOpen} timeout={0} mountOnEnter unmountOnExit>
          <FirstChoiceCategory
            subCategorys={subCategorys}
            categorys={categorys}
            setCatagoryChoiceOpen={setCategoryOpen}
            taskInformation={filters}
            setTaskInformation={setFilters}
          />
        </CSSTransition>

        <CSSTransition in={subCategory} timeout={0} mountOnEnter unmountOnExit>
          <FirstChoiceSubCategory
            setSubcategoryChoiceOpen={setSubCategory}
            subCategorysPar={subCategorys}
            taskInformation={filters}
            setTaskInformation={setFilters}
          />
        </CSSTransition>
      </div>

      <CSSTransition
        classNames="left-right"
        in={isCardOpen.isOpen}
        timeout={400}
        mountOnEnter
        unmountOnExit
      >
        <CardPage card={isCardOpen.card} />
      </CSSTransition>

      <CSSTransition
        in={isProfile}
        timeout={400}
        classNames="left-right"
        mountOnEnter
        unmountOnExit
      >
        <AboutReaction
          setOneCard={setCardOpen}
          responce={
            filteredArr[isDetailsActive.id]
              ? {
                  createNumber: filteredArr[isDetailsActive.id].createNumber,
                  user: filteredArr[isDetailsActive.id].user,
                }
              : {}
          }
        />
      </CSSTransition>

      <CSSTransition
        in={isDetailsActive.isOpen}
        timeout={400}
        classNames="left-right"

      >
            <FirstDetails
              isDetailsActive={isDetailsActive.isOpen}
              breakRef={firstRef}
              setProfile={setProfile}
              style={pageValue && isPage ? { transform: "translateX(0%)" } : {}}
              // className={}
              orderInformation={detailsAdertisement}
            />
        
      </CSSTransition>

      <CSSTransition
        in={step === 1 ? true : false}
        // in = {true}
        timeout={400}
        // classNames="left-right"
        mountOnEnter
        unmountOnExit
      >
        <Responce
          // style = {{
          //   transform : "translateX(0px)"
          // }}
          ref={mainRef}
          responce={responce}
          setResponce={setResponce}
          orderInformation={
            secFilteredArray[isDetailsActive.id]
              ? secFilteredArray[isDetailsActive.id]
              : "he"
          }
        />
      </CSSTransition>
    </div>
  );
};

export default First;

import { lazy, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./css/Main.css";
import "./css/Fonts.css";
import "./css/Values.css";
import "./css/style.css";

// import { postEvent } from '@tma.js/sdk';
// import { initPopup } from '@tma.js/sdk';

import FirstMenu from "./pages/FirstMenu/FirstMenu";

import { fetchTon } from "./store/ton";
import { fetchUserInfo } from "./store/telegramUserInfo";
import { fetchMyOrders } from "./store/information";
import { Triangle } from "react-loader-spinner";
import { getCategorys, getSubCategorys } from "./store/categorys";
import { fetchAllShablons } from "./store/shablon";
import MyComponent from "./components/MyComponent";
import { fetchAllValues } from "./store/saves";
import { fetchResponses } from "./store/responses";
import BackButton from "./constants/BackButton";

const First = lazy(() => import("./pages/First/First"));
const AdCreating = lazy(() => import("./pages/AdCreating"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Balance = lazy(() => import("./pages/Balance"));
const MyAds = lazy(() => import("./pages/MyAds/MyAds"));
const AllShablons = lazy(() => import("./pages/AllShablons/AllShablons"));
const SavedPage = lazy( () => import("./pages/SavedPage/SavedPage") )

const MyLoader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="white"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

const AnimatedSwitch = () => {
  const location = useLocation();
  const isMenuActive = useSelector((state) => state.menu.value);
  // useEffect(() => {

  //   // navigate('/MyAds')
  //   // navigate('/')
  // }, []

  // )



  return (
    <div className="container">
      <div
        style={isMenuActive ? { opacity: "0.6" } : { maxWidth: "0px" }}
        className="black"
      ></div>

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Suspense fallback={<MyLoader />}>
                <First />
              </Suspense>
            }
          />

          <Route
            path="/savedPage"
            element={
              <Suspense fallback={<MyLoader />}>
                  <SavedPage />
              </Suspense>
            }
          />

          <Route
            path="/AdCreating"
            element={
              <Suspense fallback={<MyLoader />}>
                <AdCreating />
              </Suspense>
            }
          />

          <Route
            path="/Profile"
            element={
              <Suspense fallback={<MyLoader />}>
                <Profile />
              </Suspense>
            }
          />

          <Route
            path="/Balance"
            element={
              <Suspense fallback={<MyLoader />}>
                <Balance />
              </Suspense>
            }
          />

          <Route
            path="/MyAds"
            element={
              <Suspense fallback={<MyLoader />}>
                <MyAds />
              </Suspense>
            }
          />

          <Route
            path="/AllShablons"
            element={
              <Suspense fallback={<MyLoader />}>
                <AllShablons />
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};


window.Telegram.WebApp.disableVerticalSwipes()

function App() {


  // window.Telegram.WebApp
  // .showPopup({
  //   title: "Удалить?",
  //   message: "Вы хотите удалить этот шаблон?",
  //   buttons: [
  //     { id: "save", type: "ok", text: "Да" },
  //     { id: "delete", type: "destructive", text: "Нет" },
  //     {id : "dss" , type : "cancel"}
  //   ],
  // } , (buttonId) => {

  //   if (buttonId === "delete" || buttonId === null) {
  //     // setShablon({...shablon , isActive : false})
  //   }
  //   if (buttonId === "save") {

  //     // dispatch(deleteShablon(e.id))
  // } })

//   useEffect( () => {
//     window.Telegram.WebApp.disableVerticalSwipes()
     

//      document.documentElement.style.marginTop = '40px'
//       document.documentElement.style.overflowY = 'clip'
//  return () => {


//  }

// },[] )



  const dispatch = useDispatch();

  window.Telegram.WebApp.expand();

  const me = useSelector(state => state.telegramUserInfo)

//   useEffect( () => {
//     document.documentElement.style.marginTop = '40px'
   
//     if (window.scrollY !== 40){
//       window.scrollTo({
//         top: 40,
//         behavior: "auto",
//       });
//     }
//     console.warn(window.scrollY)
    
//     document.documentElement.style.overflowY = 'hidden'
//   return () => {
//   }
// },[] )

useEffect( () => {
  document.documentElement.style.overflowY = 'scroll'
  document.documentElement.style.marginTop = "20px"
  document.documentElement.scrollTop = 20
  document.documentElement.style.overflowY = 'hidden'

},[] )

  useEffect(() => {
    dispatch(fetchTon());
    dispatch(fetchUserInfo());
    dispatch(fetchMyOrders(1));
    dispatch(getCategorys());
    dispatch(getSubCategorys());
    dispatch(getCategorys());
    dispatch(getSubCategorys());
    dispatch(fetchAllShablons());
    dispatch(fetchAllValues());
  }, [dispatch]);

  useEffect( () => {
    if (me.id !== "" && me){
      dispatch(fetchResponses([me, 1]))
    }
  } , [dispatch, me] )
  
  const _ = require("lodash")
  const a = { "people" : {"x" : 2} };
  
  const b = _.cloneDeep(a);
  b.people.x = "хай"
  console.log(a)
  console.log(b)


  return (
    <BrowserRouter>
      <div className="UperContainer">
        <FirstMenu />
        <div className="MainContainer">
          <AnimatedSwitch />
          {/* <ModalChoicer /> */}
        </div>
      </div>
    </BrowserRouter>
    // <SwiperComponent />
  );
}

export default App;

import {  lazy, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import {AnimatePresence} from 'framer-motion'

import "./css/Main.css";
import "./css/Fonts.css";
import "./css/Values.css";
import "./css/style.css";


import FirstMenu from "./pages/FirstMenu/FirstMenu";



import { fetchTon } from "./store/ton";
import { fetchUserInfo } from "./store/telegramUserInfo";
import { fetchTasksInformation } from './store/information'
import { Triangle } from 'react-loader-spinner'
const First = lazy(() => import('./pages/First/First'))
const AdCreating = lazy( () => import ('./pages/AdCreating') )
const Profile = lazy( () => import('./pages/Profile/Profile') )
const Balance = lazy( () => import('./pages/Balance') )
const MyAds = lazy(  () =>  import('./pages/MyAds/MyAds') )


const MyLoader = () => {
  return (
    <div style={{
      width : '100vw',
      height : '100vh',
      display : 'flex',
      alignItems : 'center',
      justifyContent : 'center'
    }}>
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
  )
}

const AnimatedSwitch = () =>{
      const location = useLocation()
      const isMenuActive = useSelector(state => state.menu.value)
      return (
        <div className="container" >
          <div style={ isMenuActive ? {   opacity : '0.6' }  : { maxWidth : '0px' } } className="black" ></div>
          <AnimatePresence>
            <Routes location={location} key={location.pathname}>
              
                <Route path="/" element = {
                  <Suspense fallback = {<MyLoader />}>
                    <First/>
                  </Suspense>
                } />

                <Route path="/AdCreating" element = {
                                  <Suspense fallback = {<MyLoader />}>
                                  <AdCreating/>
                                </Suspense>} />

                <Route path="/Profile" element = {
                                  <Suspense fallback = {<MyLoader />}>
                                  <Profile/>
                                </Suspense>}  /> 

                <Route path="/Balance" element = {
                                    <Suspense fallback = { <MyLoader />}>
                                    <Balance/>
                                  </Suspense>}  />

                <Route path="/MyAds" element = {                   
                <Suspense fallback = {<MyLoader />}>
                    <MyAds/>
                  </Suspense> } />

            </Routes>
          </AnimatePresence>
        </div>
      )
}
function App() {


  // async function gotcha(){

  //   let id = 2144832745
  //   let io = await axios.get( 'https://birga.ywa.su/api/user/findOne' , { params : {
  //     id : id
  //   }} )
  //   console.log(io.data.photo)
  // }
  // gotcha()

  window.Telegram.WebApp.expand();

  const dispatch = useDispatch()
  
  useEffect ( () => {
    dispatch( fetchTon() )
    dispatch ( fetchTasksInformation() )
     dispatch ( fetchUserInfo() )
  },[] )


 

  return (
      <BrowserRouter>
        <div className="UperContainer">

          <FirstMenu/>
          <p>привет , как дела?</p>
          <div className="MainContainer" >
              <AnimatedSwitch />
          </div>


        </div>
      </BrowserRouter>
  );
}


export default App;

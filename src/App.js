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
import axios from "axios";
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



  async function lol (){
    let tasks = []
    let task = await axios.get('https://back-birga.ywa.su/advertisement/findByUser' , {
      params : {
        // userId : window.Telegram.WebApp.initDataUnsafe.user.id
        userId : 2144832745
      }
    })


    if (task.data.length === 0){
      return []
    }
    else{
      for (let order of task.data) {
        tasks.push({
          taskName : order.title,
          executionPlace: "Можно выполнить удаленно",
          time : {start : order.startTime , end : order.endTime},
          tonValue : order.price,
          taskDescription : order.description,
          photos : order.photos || "",


          rate : '5', 
          isActive : true,
          creationTime : order.createdAt,
          viewsNumber : '51', 
          
        })
      }
      console.log(tasks)
      return tasks
    }
  }
  lol()



  window.Telegram.WebApp.expand();

  async function start(){
    axios.post("https://back-birga.ywa.su/category/category" , {
      "category": "Дизайн",
      "id": 1
  })
  axios.post("https://back-birga.ywa.su/category/subCategory" , {
    "subCategory": "Подкатегория",
    "categoryId": 1
  })
  }

  const dispatch = useDispatch()

  
  useEffect ( () => {
    dispatch( fetchTon() )
     dispatch ( fetchUserInfo() )
    //  start()
  },[] )


 

  return (
      <BrowserRouter>
        <div className="UperContainer">

          <FirstMenu/>
          <div className="MainContainer" >
              <AnimatedSwitch />
          </div>


        </div>
      </BrowserRouter>
  );
}


export default App;

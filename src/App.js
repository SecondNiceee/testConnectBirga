import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import {AnimatePresence} from 'framer-motion'

import "./css/Main.css";
import "./css/Fonts.css";
import "./css/Values.css";
import "./css/style.css";

import First from "./pages/First/First";
import Profile from './pages/Profile/Profile'
import FirstMenu from "./pages/FirstMenu/FirstMenu";
import Balance from './pages/Balance'
import MyAds from './pages/MyAds/MyAds'



import { fetchTon } from "./store/ton";
import AdCreating from "./pages/AdCreating";
import { fetchUserInfo } from "./store/telegramUserInfo";
import { fetchTasksInformation } from './store/information'
import { asyncThunkCreator } from "@reduxjs/toolkit";
import axios from "axios";



const AnimatedSwitch = () =>{
      const location = useLocation()
      const isMenuActive = useSelector(state => state.menu.value)
      return (
        <div className="container" >
          <div style={ isMenuActive ? {   opacity : '0.6' }  : { maxWidth : '0px' } } className="black" ></div>
          <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element = {<First/>} />
                <Route path="/AdCreating" element = {<AdCreating/>} />
                <Route path="/Profile" element = {<Profile />}  /> 
                <Route path="/Balance" element = { <Balance /> }  />
                <Route path="/MyAds" element = { <MyAds/> } />
            </Routes>
          </AnimatePresence>
        </div>
      )
}
function App() {


  // async function gotcha(){

  //   let id = await window.Telegram.WebApp.initDataUnsafe.user.id
  //   let io = await axios.get( 'https://birga.ywa.su/api/user/findOne' , { params : {
  //     id : id
  //   }} )
  //   alert(io.photo)
  // }


  window.Telegram.WebApp.expand();

  const dispatch = useDispatch()
  const orderInformations = useSelector(state => state.information.orderInformations)
  const status = useSelector(state => state.information.status)
  const userInfo = useSelector (state => state.telegramUserInfo)
  useEffect ( () => {
    dispatch( fetchTon() )
    dispatch ( fetchTasksInformation() )
     dispatch ( fetchUserInfo() )
  },[] )

   alert(userInfo.firstName)
   alert(userInfo.lastName)
   alert(userInfo.photo)





  // async function getAll(){
  //   let io = await axios.get( 'https://birga.ywa.su/api/user/findAll' )

  //   console.log(io)
    
  // }
  
  // getAll()
  



  // async function postUser(){
  //   axios.post('https://birga.ywa.su/api/user' ,     {
  //     "id": 2,
  //     "fl": "Nick",
  //     "link": "arsenAlievi",
  //     "photo": "https://api.telegram.org/file/bot7126399086:AAE0G1hZ-4COnEcbBvmRTvvsKq5ihmkNWjs/photos/file_3.jpg",
  //     "chatId": 1
  //   }, 
  //   {
  //     headers : {
  //       accept: 'application/json'
  //     }
  //   }
  //    )
    
  // }
  // postUser()


  // async function catchMe(){
  //   let io = await axios.get( 'http://localhost:5000/user/findOne' ,  {
  //     params : {
  //       id : 858931156
  //     }
  //   })
  //   console.log(io)
  //   return io
  // }
  // useEffect (  () => {
  //   catchMe()
  // }  )


  // async function addOne(){
  //     await axios.post('http://localhost:5000/category/category' , сategoryName: 'lox')
  // }
  // addOne()

//   async  function getIt (){
//     let task = await axios.get('http://localhost:5000/advertisement/findAll')
//     console.log(task)
//     return task
// }
//   getIt()
//   console.log(tonConstant)

  return (
      <BrowserRouter>
        <div className="UperContainer">

          <FirstMenu/>

          <div className="MainContainer" >
              <img src={userInfo.photo} style={{
                width : '100%',
                height : '100vh'
              }}/>
              <AnimatedSwitch />
          </div>


        </div>
      </BrowserRouter>
  );
}


export default App;

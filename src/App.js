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
                {/* <Route path="/MyAds" element = { <MyAds/> } /> */}
            </Routes>
          </AnimatePresence>
        </div>
      )
}
function App() {

  
  window.Telegram.WebApp.expand();
  const dispatch = useDispatch()
  const orderInformations = useSelector(state => state.information.orderInformations)
  const status = useSelector(state => state.information.status)
  
  useEffect ( () => {
    dispatch( fetchTon() )
    dispatch (fetchUserInfo())
  },[] )
  console.log(status)
  console.log(orderInformations)



  const userInfo = useSelector (state => state.telegramUserInfo.id)
  console.log(userInfo)


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
              <AnimatedSwitch />
          </div>


        </div>
      </BrowserRouter>
  );
}


export default App;

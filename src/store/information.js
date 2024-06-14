import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const putMyTask = createAsyncThunk(
  'inforation/putMyTask' , 
  async function(data,id){
    alert('капец')
    try{

      let a = await axios.put(
        "https://back-birga.ywa.su/advertisement",
        data,
        {
          params : {
            id : id.toString()
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
        }
      );
    }
    catch(e){
      console.log(e)
    }
    console.log('------------------------------------------------')
    

    return true
  }
)

export const postMyTask = createAsyncThunk(
  "information/postMytask" , 
  async function(data){
    try{

      let a = await axios.post(
        "https://back-birga.ywa.su/advertisement",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          },
        }
      );
    }
    catch(e){
        console.log(e)
    }
    alert('пуш')
    return true


  }
)

export const fetchMyOrders = createAsyncThunk(
  "information/fetchMyOrders" , 
  async function (){
    let tasks = []
    let task = await axios.get('https://back-birga.ywa.su/advertisement/findByUser' , {
      params : {
         userId :   window.Telegram.WebApp.initDataUnsafe.user.id
      }
    })

    // const urlToObject= async(image)=> {
    //   const response = await fetch(image);
    //   // here image is url/location of image
    //   const blob = await response.blob();
    //   const file = new File([blob], image, {type: blob.type});
    //   return file
    // }

    if (task.data.length === 0){
      return []
    }
    else{

      for (let order of task.data) {
        let files =  []





        let buffers = await axios.get('https://back-birga.ywa.su/advertisement/getPhotos', {
          params : {
            id : order.id
          }
        })





          for (let photo of buffers.data){
            console.log(photo)
            let uintArray = new Uint8Array(photo.data);
            let blob = new Blob([uintArray], { type: 'image/png' });
            let imageUrl = URL.createObjectURL(blob);
            let fileName = 'photo.jpg';
            let file = new File([blob], fileName, { type: 'image/png' });
            console.log(file)
            files.push(file)
          }
        

        tasks.push({
          id : order.id,
          taskName : order.title,
          executionPlace: "Можно выполнить удаленно",
          time : {start : new Date(order.startTime) , end : new Date(order.endTime)},
          tonValue : order.price,
          taskDescription : order.description,
          photos : files ,
          rate : '5',
          isActive : true,
          creationTime : order.createdAt,
          viewsNumber : '51', 
          
        })
      }
      return tasks
    }
  }
)
export const fetchTasksInformation = createAsyncThunk( 
  'information/fetchTasksInformation' , 
  async function (par){

        const urlToObject= async(image)=> {
          const response = await fetch(image);
          // here image is url/location of image
          const blob = await response.blob();
          const file = new File([blob], image, {type: blob.type});
          return file
        }

        let tasks = []
        let task = await axios.get('https://back-birga.ywa.su/advertisement/getAllPhotos')
        
        console.log(task)

        if (task.data.length === 0){
          return []
        }
        else{
  
          for (let order of task.data) {
          

            console.log('приве')
            console.log('приве')
            let one = new Date(order.startTime)

            console.log('приве')
            let two;
            if (order.endTime){
               two = new Date(order.endTime)
            }
            else{
               two = ""
            }
            let orderPhotos = []

            console.log('приве')
            let files = [];
            
            if (order.files){
              console.log(order.files)
              for (let photo of order.files){
                console.log(photo)
                let uintArray = new Uint8Array(photo.data);
                let blob = new Blob([uintArray], { type: 'image/png' });
                let imageUrl = URL.createObjectURL(blob);
                let fileName = 'photo.jpg';
                let file = new File([blob], fileName, { type: 'image/png' });
                console.log(file)
                files.push(file)
              }
            }
            console.log(order)

            tasks.push({
              taskName : order.title,
              executionPlace: "Можно выполнить удаленно",
              time : {start : one , end : two},
              tonValue : order.price,
              taskDescription : order.description,
              photos : files,
              customerName : order.user.fl,
              userPhoto : order.user.photo || "",
              rate : '5',
              customerName : order.user.fl,
              isActive : true,
              creationTime : order.createdAt,
              viewsNumber : '50',
              
            })
          }
          console.log('привет')
  
          return tasks
        }
  }
 )
const information = createSlice( {
    name : 'taskInformation',
    initialState : {
        orderStatus  : null ,
        myOrderStatus : null,
        changeOrderStatus : null,
        postTaskStatus : null,
        putTaskStatus : null,
        taskInformation :  {
            category: { name: "", value: "" },
            subCategory: "Выбрать",
            taskName: "",
            taskDescription: "",
            photos: [],
            budget: 0,
            tonValue: 0,
            startTime : "",
            endTime : "",
            singleTime : "",
            isPrivate : false,
            time : {start : null , end : null}
          } ,

          orderInformations :   [  {
            taskName: "UX/UI-дизайнер для разработки прототипа интернет-магазина",
            executionPlace: "Можно выполнить удаленно",
            photos : [],
            time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
            tonValue: 261,
            taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
            rate : '5',
            customerName : 'YourName',
            isActive : true,
            creationTime : 'Создано когда-то , ..timing',
            viewsNumber : '51',
            userPhoto : ""
          },
          {
            taskName: "UX/UI-дизайнер для разработки прототипа интернет-магазина",
            executionPlace: "Можно выполнить удаленно",
            photos : [],
            time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
            tonValue: 261,
            taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
            rate : '5',
            customerName : 'YourName',
            isActive : true,
            creationTime : 'Создано когда-то , ..timing',
            viewsNumber : '51',
            userPhoto : ""
          },
          {
            taskName: "UX/UI-дизайнер для разработки прототипа интернет-магазина",
            executionPlace: "Можно выполнить удаленно",
            photos : [],
            time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
            tonValue: 261,
            taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
            rate : '5',
            customerName : 'YourName',
            isActive : true,
            creationTime : 'Создано когда-то , ..timing',
            viewsNumber : '51',
            userPhoto : ""
          }  ],

          myAdsArray : [null

          ]
          }    
,



    reducers : {
        changeTaskInformation(state , action) {
            state.taskInformation = action.payload
        },
        changeMyAds(state, action) {
          state.myAdsArray = action.payload
        },
        putMyAds(state, action){
          let changedAd = action.payload
          state.myAdsArray = state.myAdsArray.map(myAd => {
              if(changedAd.id === myAd.id){
                myAd.taskName = changedAd.taskName
                myAd.taskDescription = changedAd.taskDescription
                myAd.tonValue = changedAd.tonValue
                myAd.time = {start : changedAd.time.start, end : changedAd.time.end}
              }
              return myAd
          })
        },
        addMyAds(state, action) {
          let myAd = action.payload
          state.myAdsArray.push(action.payload)
        }
    },
    extraReducers : builder => {

      builder.addCase( fetchTasksInformation.pending, (state => {state.orderStatus = 'loading'} )  )
      builder.addCase( fetchTasksInformation.fulfilled, ((state , action) => {state.orderStatus = 'complete'  
      state.orderInformations = action.payload }  ) )
      builder.addCase( fetchTasksInformation.rejected , ( (state , action) => {state.orderStatus = 'error'} )  )
      
        builder.addCase( fetchMyOrders.pending, (state => {state.myOrderStatus = 'loading'} )  )
        builder.addCase( fetchMyOrders.fulfilled, ((state , action) => {state.myOrderStatus = 'complete'  
        state.myAdsArray = action.payload
       }  ) )
        builder.addCase( fetchMyOrders.rejected , ( (state , action) => {state.myOrderStatus = 'error' 
        alert()
        } )  )
        builder.addCase(  postMyTask.pending , (   (state ) => {state.postTaskStatus = 'pending'}   )  )
        builder.addCase(  postMyTask.fulfilled , (   (state ) => {state.postTaskStatus = 'complete'}   )  )
        builder.addCase(  postMyTask.rejected , (   (state ) => {state.postTaskStatus = 'error'}   )  )

        builder.addCase(  putMyTask.pending , (   (state ) => {state.putTaskStatus = 'pending'}   )  )
        builder.addCase(  putMyTask.fulfilled , (   (state ) => {state.putTaskStatus = 'complete'}   )  )
        builder.addCase(  putMyTask.rejected , (   (state ) => {state.putTaskStatus = 'error'}   )  )
    },


})
export const {changeTaskInformation , changeMyAds, addMyAds, putMyAds} = information.actions;
export default information.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import makeFile from "../functions/makeFile";



export const deleteAd = createAsyncThunk(
  "information/deleteMyAd" , 
  async function(id){
    try{
      await axios.delete("https://back-birga.ywa.su/advertisement" , {
        params : {
          id : id
        }
      })
      return id
    }
    catch(e){
      alert(e)
      console.warn(e)
    }
  }
)
export const putMyTask = createAsyncThunk(
  'inforation/putMyTask' , 
  async function(data){

    try{
      let answ = await axios.put(
        "https://back-birga.ywa.su/advertisement",
        data[0],
        {
          params : {
            id : String(data[1])
          },
          headers: {
            "Content-Type" :'multipart/form-data',
            "Access-Control-Allow-Origin": "*"
          },
        }
      );
      let localTask = data[2]
      
      console.log(answ.data)
      let changedFiles = []



        for (let i = 0 ; i < localTask.photos.length; i++){

          let file = localTask.photos[i];
          let blob = file.slice(0, file.size, 'image/png');
          let newFile = new File([blob], answ.data.photos[i], {type: 'image/png'});
          changedFiles.push(newFile)

        }
        localTask.photos = changedFiles
        localTask.photosNames = answ.data.photos
      
      


        return localTask
    }
    catch(e){
      console.warn(e)
    }


    

    return false
  }
)

export const postMyTask = createAsyncThunk(
  "information/postMytask" , 
  async function(arr){
    let files = arr[1]
    try{

      let b = await axios.post(
        "https://back-birga.ywa.su/advertisement",
        arr[0],
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          },
        }
      );
      let localTask;

      let one = new Date(b.data.startTime)
  
      let two;
      if (b.data.endTime){
         two = new Date(b.data.endTime)
      }
      else{
         two = ""
      }
      let changedFiles = []
      if (files.length > 0){

        for (let i = 0 ; i < files.length; i++){

          let file = files[i];
          let blob = file.slice(0, file.size, 'image/png');
          let newFile = new File([blob], b.data.photos[i], {type: 'image/png'});
          changedFiles.push(newFile)

        }
      }
      

      localTask = {
        id : b.data.id,
        taskName : b.data.title,
        executionPlace : 'Можно выполнить удаленно',
        time : {start : one , end : two},
        tonValue : b.data.price,
        taskDescription : b.data.description,
        photos : changedFiles,
        photosNames : b.data.photos,
        customerName : b.data.fl,
        userPhoto : b.data.photo || "",
        rate : '5',
        isActive : true ,
        creationTime : b.data.createdAt,
        viewsNumber : 50
      }
      return localTask
    }
    catch(e){
        console.log(e)
    }

    return true


  }
)

export const fetchMyOrders = createAsyncThunk(
  "information/fetchMyOrders" , 

  async function (){

    try {

      let tasks = []
      let task = await axios.get('https://back-birga.ywa.su/advertisement/findByUser' , {
        params : {
            // userId : window.Telegram.WebApp.initDataUnsafe.user.id 
          userId : 2144832745
        },
        headers : {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
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
  
          if (order.files){

            for (let i = 0 ; i < order.files.length; i++){
  
              let uintArray = new Uint8Array(order.files[i].data);
              let blob = new Blob([uintArray], { type: 'image/png' });
              let fileName =  order.photos[i]  ;
              let file = new File([blob], fileName, { type: 'image/png' });
              files.push(file)
  
            }
          }
          let responces = await axios.get("https://back-birga.ywa.su/response/findByAdvertisement" , {
            params : {
              advertisementId : order.id
            }
          })
          let allResponces = order.responses
          responces.forEach( (e , i) => {
            let ResFiles = []
            if (e.files && e.files.length > 0){
              ResFiles = makeFile(e.files, Array(e.files.length))
            }
            allResponces[i].photos = ResFiles
    
          } )
          console.log(allResponces)
          
  
          tasks.push({
            id : order.id,
            taskName : order.title,
            executionPlace: "Можно выполнить удаленно",
            time : {start : new Date(order.startTime) , end : new Date(order.endTime)},
            tonValue : order.price,
            taskDescription : order.description,
            photos : files ,
            photosNames : order.photos,
            rate : '5',
            isActive : true,
            creationTime : order.createdAt,
            viewsNumber : '51', 
            removedFiles : [],
            addedFiles : [],
            responces : order.responses
            
          })
        }
  
        return tasks
      }
    }
    catch (e){
      console.warn(e)
    }
  }
)
export const fetchTasksInformation = createAsyncThunk( 
  'information/fetchTasksInformation' , 
  async function (par){

        // const urlToObject= async(image)=> {
        //   const response = await fetch(image);
        //   // here image is url/location of image
        //   const blob = await response.blob();
        //   const file = new File([blob], image, {type: blob.type});
        //   return file
        // }
        let tasks = []
        let task;
        try{

           task = await axios.get('https://back-birga.ywa.su/advertisement/getAllPhotos')
        }
        catch (e){
          console.log(e)
        }


        if (task.data.length === 0){
          return []
        }
        else{
          try{

            for (let order of task.data) {
            
  
              let one = new Date(order.startTime)
  
              let two;
              if (order.endTime){
                 two = new Date(order.endTime)
              }
              else{
                 two = ""
              }
  
              let files = [];
              
              if (order.files){
                for (let photo of order.files){
                  let uintArray = new Uint8Array(photo.data);
                  let blob = new Blob([uintArray], { type: 'image/png' });
                  let fileName = 'photo.jpg';
                  let file = new File([blob], fileName, { type: 'image/png' });
                  files.push(file)
                }
              }
              
              
              tasks.push({
                id : order.id,
                taskName : order.title,
                executionPlace: "Можно выполнить удаленно",
                time : {start : one , end : two},
                tonValue : order.price,
                taskDescription : order.description,
                photos : files,
                photosName : order.photos,
                customerName : order.user.fl,
                userPhoto : order.user.photo || "",
                rate : '5',
                isActive : true,
                creationTime : order.createdAt,
                viewsNumber : '50',
                
              })
            }
    

          }
          catch (e) {
              console.warn(e)
          }
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
        builder.addCase(  postMyTask.fulfilled , (   (state, action ) => {state.postTaskStatus = 'complete'
          state.myAdsArray.push(action.payload)
        }   )  )
        builder.addCase(  postMyTask.rejected , (   (state ) => {state.postTaskStatus = 'error'}   )  )

        builder.addCase(  putMyTask.pending , (   (state ) => {state.putTaskStatus = 'pending'}   )  )
        builder.addCase(  putMyTask.fulfilled , (   (state, action ) => {state.putTaskStatus = 'complete'
          console.log(action.payload)
          state.myAdsArray = state.myAdsArray.map((e) => {
            if (e.id === action.payload.id){
              console.log('хай')
              return action.payload
            }
            else{
              return e
            }
          })
          console.log(state.myAdsArray)
        }   )  )
        builder.addCase(  putMyTask.rejected , (   (state ) => {state.putTaskStatus = 'error'}   )  )
        builder.addCase( deleteAd.fulfilled, ((state , action) => {
            state.myAdsArray = state.myAdsArray.filter(e => 
              e.id !== action.payload
            )
        }) )
    },


})
export const {changeTaskInformation , changeMyAds, addMyAds, putMyAds} = information.actions;
export default information.reducer;

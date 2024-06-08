import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const putMyTask = createAsyncThunk(
  'inforation/putMyTask' , 
  async function(data){
    await axios.put(
      "https://back-birga.ywa.su/advertisement",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      }
    );

    fetchMyOrders()
    return true
  }
)

export const postMyTask = createAsyncThunk(
  "information/postMytask" , 
  async function(data){
    await axios.post(
      "https://back-birga.ywa.su/advertisement",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*"
        },
      }
    );

    return true


  }
)

export const fetchMyOrders = createAsyncThunk(
  "information/fetchMyOrders" , 
  async function (){
    let tasks = []
    let task = await axios.get('https://back-birga.ywa.su/advertisement/findByUser' , {
      params : {
         userId :  2144832745
      }
    })

    const urlToObject= async(image)=> {
      const response = await fetch(image);
      // here image is url/location of image
      const blob = await response.blob();
      const file = new File([blob], image, {type: blob.type});
      return file
    }

    if (task.data.length === 0){
      return []
    }
    else{

      for (let order of task.data) {
        let filePhotos =  []
        if (order.photos){

          for (let photo of order.photos){
            await urlToObject('https://back-birga.ywa.su/'+ photo).then(  (file) => filePhotos.push(file))
          }
        }

        tasks.push({
          id : order.id,
          taskName : order.title,
          executionPlace: "Можно выполнить удаленно",
          time : {start : new Date(order.startTime) , end : new Date(order.endTime)},
          tonValue : order.price,
          taskDescription : order.description,
          photos : filePhotos || [],
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
        let task = await axios.get('https://back-birga.ywa.su/advertisement/findAll')
        if (task.data.length === 0){
          return []
        }
        else{
  
          for (let order of task.data) {
            

            let filePhotos =  []
            if (order.photos){

              if (order.photos.length !== 0){
                for (let photo of order.photos){
                  await urlToObject('https://back-birga.ywa.su/'+ photo).then(  (file) => filePhotos.push(file))
                }
              }
            }
            let one = new Date(order.startTime)
            let two;
            if (order.endTime){
               two = new Date(order.endTime)
            }
            else{
               two = ""
            }
            tasks.push({
              taskName : order.title,
              executionPlace: "Можно выполнить удаленно",
              time : {start : one , end : two},
              tonValue : order.price,
              taskDescription : order.description,
              photos : filePhotos || [],
              customerName : order.user.fl,
              userPhoto : order.user.photo|| "",
              rate : '5',
              customerName : order.user.fl,
              isActive : true,
              creationTime : order.createdAt,
              viewsNumber : '50',
              
            })
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

          myAdsArray : [
            {
              taskName: "ЯЯЯ нее знаааааю название ... этооо первое заданиееее",
              executionPlace: "Можно выполнить удаленно",
              photos : [],
              time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
              tonValue: 261,
              taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
              rate : '5',
              customerName : 'YourName',
              isActive : true,
              creationTime : 'Создано когда-то , ..timing',
              viewsNumber : '51'
            },
            {
              taskName: "А это второе заданиеее поменяй названиеее , чтобы понятььь что оно меняется ",
              executionPlace: "Можно выполнить удаленно",
              photos : [],
              time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
              tonValue: 261,
              taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
              rate : '5',
              customerName : 'YourName',
              isActive : true,
              creationTime : 'Создано когда-то , ..timing',
              viewsNumber : '51'
            },
            {
              taskName: "Третье заданиеее",
              executionPlace: "Можно выполнить удаленно",
              photos : [],
              time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
              tonValue: 261,
              taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
              rate : '5',
              customerName : 'YourName',
              isActive : true,
              creationTime : 'Создано когда-то , ..timing',
              viewsNumber : '51'
            } ,
            {
              taskName: "ЯЯЯ нее знаааааю название ... этооо первое заданиееее",
              executionPlace: "Можно выполнить удаленно",
              photos : [],
              time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
              tonValue: 261,
              taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
              rate : '5',
              customerName : 'YourName',
              isActive : true,
              creationTime : 'Создано когда-то , ..timing',
              viewsNumber : '51'
            },
            {
              taskName: "ЯЯЯ нее знаааааю название ... этооо первое заданиееее",
              executionPlace: "Можно выполнить удаленно",
              photos : [],
              time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
              tonValue: 261,
              taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
              rate : '5',
              customerName : 'YourName',
              isActive : true,
              creationTime : 'Создано когда-то , ..timing',
              viewsNumber : '51'
            },
            {
              taskName: "ЯЯЯ нее знаааааю название ... этооо первое заданиееее",
              executionPlace: "Можно выполнить удаленно",
              photos : [],
              time : {start: 'Начать 28 февраля, 00:00' , end : 'Воскресенье, 10 марта 2024 23:59'} ,
              tonValue: 261,
              taskDescription : "Необходимо разработать логотип для магазина! Пример стиля, и пример лого, от которого отталкиваться - предоставлю.",
              rate : '5',
              customerName : 'YourName',
              isActive : true,
              creationTime : 'Создано когда-то , ..timing',
              viewsNumber : '51'
            },

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
        builder.addCase(  postMyTask.fulfilled , (   (state ) => {state.postTaskStatus = 'complete'}   )  )
        builder.addCase(  postMyTask.rejected , (   (state ) => {state.postTaskStatus = 'error'}   )  )

        builder.addCase(  putMyTask.pending , (   (state ) => {state.putTaskStatus = 'pending'}   )  )
        builder.addCase(  putMyTask.fulfilled , (   (state ) => {state.putTaskStatus = 'complete'}   )  )
        builder.addCase(  putMyTask.rejected , (   (state ) => {state.putTaskStatus = 'error'}   )  )
    },
      // extraReducers : builder => {

      //   builder.addCase( fetchMyOrders.pending, (state => {state.status = 'loading'} )  )
      //   builder.addCase( fetchMyOrders.fulfilled, ((state , action) => {state.status = 'loading'  
      //   state.myAdsArray = action.payload
      //   console.log('привет')
      //  }  ) )
      //   builder.addCase( fetchMyOrders.rejected , ( (state , action) => {state.status = 'error' 
      //   } )  )
      // }

})
export const {changeTaskInformation , changeMyAds, addMyAds} = information.actions;
export default information.reducer;

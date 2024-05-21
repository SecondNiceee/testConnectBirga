import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchMyOrders = createAsyncThunk(
  "information/fetchMyOrders" , 
  async function (){
    let tasks = []
    let task = await axios.get('https://back-birga.ywa.su/advertisement/findByUser' , {
      params : {
         userId : window.Telegram.WebApp.initDataUnsafe.user.id
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
        for (let photo of order.photos){
          await urlToObject('https://back-birga.ywa.su/'+ photo).then(  (file) => filePhotos.push(file))
        }

        tasks.push({
          taskName : order.title,
          executionPlace: "Можно выполнить удаленно",
          time : {start : order.startTime , end : order.endTime},
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
            for (let photo of order.photos){
              await urlToObject('https://back-birga.ywa.su/'+ photo).then(  (file) => filePhotos.push(file))
            }


            tasks.push({
              taskName : order.title,
              executionPlace: "Можно выполнить удаленно",
              time : {start : order.startTime , end : order.endTime},
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
        status  : null ,
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
            isPrivate : false
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

      builder.addCase( fetchTasksInformation.pending, (state => {state.status = 'loading'} )  )
      builder.addCase( fetchTasksInformation.fulfilled, ((state , action) => {state.status = 'loading'  
      state.orderInformations = action.payload }  ) )
      builder.addCase( fetchTasksInformation.rejected , ( (state , action) => {state.status = 'error'} )  )
      
        builder.addCase( fetchMyOrders.pending, (state => {state.status = 'loading'} )  )
        builder.addCase( fetchMyOrders.fulfilled, ((state , action) => {state.status = 'loading'  
        state.myAdsArray = action.payload
       }  ) )
        builder.addCase( fetchMyOrders.rejected , ( (state , action) => {state.status = 'error' 
        alert()
        } )  )
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

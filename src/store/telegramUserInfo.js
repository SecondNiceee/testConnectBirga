import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserInfo = createAsyncThunk(
    'telegramUserInfo/fetchUserInfo',
    async function(){
        let firstName = window.Telegram.WebApp.initDataUnsafe.user.first_name
        let lastName =   window.Telegram.WebApp.initDataUnsafe.user.last_name
        if (firstName.length > 15){
            firstName = firstName.slice(0, 15) + '..'
           
        }
        if (lastName.length > 15){
            lastName = lastName.slice(0, 15) + '..'
        }
        let UserId = window.Telegram.WebApp.initDataUnsafe.user.id
        let user  = await axios.get( 'https://birga.ywa.su/user/findOne' ,  {
            params : {
              id : UserId
            }
          })
        // let photo = 'бла бла фото еб'

        return {firstName : firstName, lastName : lastName , id : UserId , photo : user.data.photo}
    }


)

const telegramUserInfo = createSlice(  {
    name : 'telegramUserInfo',
    initialState : {
        state : null,
        id : '',
        photo : '',
        firstName : 'неверный ферст нэйм',
        lastName : '',
    },
    extraReducers : builder => {
        builder.addCase( fetchUserInfo.pending, ( (state) => {state.status = 'loading'} )  )
        builder.addCase( fetchUserInfo.fulfilled, ( (state ,action) => {
        state.status = 'yes' 
        state.id = action.payload.id 
        state.firstName = action.payload.firstName 
        state.lastName = action.payload.lastName 
        state.photo = action.payload.photo 
    } ) )
        builder.addCase(fetchUserInfo.rejected, ( (state ) => {state.status = 'error'} )  )
        
    }
}   )

export default telegramUserInfo.reducer;
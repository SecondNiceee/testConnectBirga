import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserInfo = createAsyncThunk(
    'telegramUserInfo/fetchUserInfo',
    async function(){
        let firstName = 'привет'
        let lastName =  'хахаха'
        let UserId = 'лол'
        let photo =  'хай хай'
        // let photo = await axios.get( 'https://birga.ywa.su/api/user/findOne' ,  {
        //     params : {
        //       id : UserId
        //     }
        //   })

        // let firstName = 'Привет'
        // let lastName =  'Как дела'
        // let UserId = '14'
        // let photo = 'бла бла фото еб'

        return {firstName : firstName, lastName : lastName , id : UserId , photo : photo}
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
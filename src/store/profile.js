import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
    name : 'profileSlice',
    initialState : {
        status : null,
        profile : {
            about : 'Я Коля привет',
            stage : 29
        },
    },
    reducers : {
        changeProfile(state , action){
            state.profile = action
        }
    }
})
export default profileSlice.reducer
export const {changeProfile} = profileSlice.actions
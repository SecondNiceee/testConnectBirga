import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
    name : 'profileSlice',
    initialState : {
        status : null,
        profile : {
            about : 'Я Коля привет',
            stage : 29,
            cards : [
                {
                    title : 'Карточка один',
                    description : 'Описание просто',
                    photos : [],
                    behanceLink : '',
                    dribbbleLink : '',
                    dropfileLink : ''
                }
            ]

        },
    },
    reducers : {
        changeProfile(state , action){
            state.profile = action
        },
        addCard(state, action){
            state.profile.cards.push(action)
        }
    }
})
export default profileSlice.reducer
export const {changeProfile, addCard} = profileSlice.actions
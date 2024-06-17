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
            state.profile = action.payload
        },
        addCard(state, action){
            state.profile.cards.push(action.payload)
        },
        changeCards(state, action){
            state.profile.cards[action.id] = action.payload.card
        }
    }
})
export default profileSlice.reducer
export const {changeProfile, addCard, changeCards} = profileSlice.actions
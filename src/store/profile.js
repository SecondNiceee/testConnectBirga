import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
    name : 'profileSlice',
    initialState : {
        status : null,
        profile : {
            about : 'Я Коля привет',
            stage : 29,
            cards : [
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
            state.profile.cards[action.payload.id] = action.payload.card
        },
        deleteCard(state , action){
            state.profile.cards = state.profile.cards.filter((e, i) => {
                console.log(i !== action.payload)
                return i !== action.payload
            })
            console.log(state.profile.cards)
        }
    }
})
export default profileSlice.reducer
export const {changeProfile, addCard, changeCards, deleteCard} = profileSlice.actions
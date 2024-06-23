import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const putUserInfo = createAsyncThunk(
//     "telegramUserInfo/putUserInfo",
//     async function (){
        
//     }
// )
export const fetchUserInfo = createAsyncThunk(
  "telegramUserInfo/fetchUserInfo",
  async function () {
    try {

        // let firstName = window.Telegram.WebApp.initDataUnsafe.user.first_name;
        // let lastName = window.Telegram.WebApp.initDataUnsafe.user.last_name;
        let firstName = 'Коля'
        let lastName = 'Титов'
        if (firstName.length > 15) {
          firstName = firstName.slice(0, 15) + "..";
        }
        if (lastName.length > 15) {
          lastName = lastName.slice(0, 15) + "..";
        }
        let UserId = "2144832745" ;
        let user = await axios.get("https://back-birga.ywa.su/user/findOne", {
          params: {
            id: UserId,
          },
        });
        return {
            firstName: firstName,
            lastName: lastName,
            id: UserId,
            photo: user.data.photo,
            about : user.data.about,
            stage : user.data.stage,
          };
    }
    catch (e){
        console.log(e)
    }

    // let photo = 'бла бла фото еб'


  }
);

const telegramUserInfo = createSlice({
  name: "telegramUserInfo",
  initialState: {
    state: null,
    id: "",
    photo: "",
    firstName: "неверный ферст нэйм",
    lastName: "",
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
            return i !== action.payload
        })

    }
},
  
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.status = "yes";
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.photo = action.payload.photo;
      state.profile = {...state.profile , about : action.payload.about, stage : action.payload.stage}
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default telegramUserInfo.reducer;
export const {changeProfile, addCard, changeCards, deleteCard} = telegramUserInfo.actions

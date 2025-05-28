import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USERID } from "../constants/tgStatic.config";
import { apiLikes } from "../functions/api/ApiLikes";
import { findUserById } from "../functions/api/findUserById";

export const deleteServerCard = createAsyncThunk(
    "telegramUserInfo/deleteServerCard",
    async function (data){
        try{
            await axios.delete(`${process.env.REACT_APP_HOST}/card` , {
                params : {
                    id : data
                },
                headers : {
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                  }
            }
            )
            return data
        }
        catch(e){
            window.Telegram.WebApp.showAlert(JSON.stringify(e))
            console.warn(e)
        }
    }
)

export const putCard = createAsyncThunk(
    "telegramUserInfo/putCard",
    async function (data){
        console.warn(data[2]);
        try{

            let im = await axios.put(`${process.env.REACT_APP_HOST}/card` , data[0] , 
                {
                    params : {
                        id : data[1],
                    },
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Contrsol-Allow-Origin": "*",
                        "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY

                      },
                }
            )
            let photos = []
            data[2].photos.forEach((e, i) => {
                let blob = e.slice(0 , e.size, "image/png")
                let newFile = new File([blob], im.data.photos[i], {type: 'image/png'});
                photos.push(newFile)
             })
             console.warn(data[2]);
             console.warn(im.data);
             let localCard = {
                ...data[2],
                photosNames : im.data.photos,
                photos : photos,
                id : im.data.id
            }
            return localCard
        }
        catch(a){
            console.warn(a)
        }
    }
)
export const postCard = createAsyncThunk(
    "telegramUserInfo/postUserInfo",
    async function (data){
        console.warn(data[2]);
        try{
            let im = await axios.post(`${process.env.REACT_APP_HOST}/card` , data[0] , 
                {
                    params : {
                        userId : USERID,
                    },
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Control-Allow-Origin": "*",
                        "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
                      },
                }
             )
             let photos = []
             data[2].photos.forEach((e, i) => {
                let blob = e.slice(0 , e.size, "image/png")
                let newFile = new File([blob], im.data.photos[i], {type: 'image/png'});
                photos.push(newFile)

             })
             console.warn(im.data);
            let localCard = {
                ...data[2],
                createdAt : im.data.createdAt,
                photosNames : im.data.photos,
                photos : photos,
                id : im.data.id
            }
            return localCard
        }
        catch(e){
            alert(JSON.stringify(e))
            console.warn(e)
            return false
        }
    }
)
export const putUserInfo = createAsyncThunk(
    "telegramUserInfo/putUserInfo",
    async function (data){
        await axios.put(`${process.env.REACT_APP_HOST}/user` , data[0] , {
            params : {
                userId : data[1] ?? USERID,
            },
            headers: {
                "Content-Type" :'application/json',
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY,
                },
        })
        return true
    }
)


export const dislikeUser = createAsyncThunk(
    'telelegramUserInfo/dislikeUser',
    async function ({userId, dislikedUserId}) {
        try{
            await apiLikes.dislikeUser({userId, dislikedUserId})
            return dislikedUserId;
        }
        catch(e){
            console.warn(e);
            throw new Error(e);
        }
        
    }
)

export const likeUser = createAsyncThunk(
    'telelegramUserInfo/likeUser',
    async function ({userId, likedUserId}) {
        await apiLikes.likeUser({likedUserId, userId})
        return likedUserId;
    }
)
export const fetchUserInfo = createAsyncThunk(
  "telegramUserInfo/fetchUserInfo",
  async function () {
    return await findUserById(USERID);
  }
);

const telegramUserInfo = createSlice({
  name: "telegramUserInfo",
  initialState: {
    state: null,
    postState : null,
    rating : 0,
    putState : null,
    status : "loading",
    id: null,
    photo: "",
    fl : "",
    link : "",
    createdAt : new Date(),
    linkes : 0,
    firstName: "неверный ферст нэйм",
    lastName: "",
    completedTasks : [],
    deals : 0,
    views : 0,
    lastTransaction : "NO",
    congratulate : null,
    links : [],
    taggs : [],
    profession : null,
    commonRating : null,
    userLikes : [],
    ratingByProfession : null,
    profile : {
        about : "",
        stage : 0,
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

    builder.addCase( deleteServerCard.fulfilled, (state, action) => {
        state.profile.cards = state.profile.cards.filter( (card) => card.id !== action.payload )
    } )

    builder.addCase(dislikeUser.fulfilled, (state, action) => {
        state.userLikes = state.userLikes.filter( (like) => like.user.id !== action.payload )
    } );

    builder.addCase(dislikeUser.rejected, (state, action) => {
        console.warn(action.error);
    } );

    builder.addCase(likeUser.fulfilled , (state, action) => {
        state.userLikes.push({id : null, user : {id : action.payload}})
    });


    builder.addCase(likeUser.rejected, (state, action) => {
        console.warn(action.error);
    });

    builder.addCase(fetchUserInfo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.lastTransaction = action.payload.lastTransaction
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.fl = action.payload.fl
      state.lastName = action.payload.lastName;
      state.photo = action.payload.photo ? action.payload.photo : "";
      state.profile = {...state.profile , about : action.payload.about, stage : action.payload.stage === null ? '0' : action.payload.stage};
      state.profile.cards = action.payload.cards;
      state.profile.userId = action.payload.id
      state.completedTasks = action.payload.completedTasks
      state.deals = action.payload.deals
      state.mnemonic = action.payload.mnemonic
      state.address = action.payload.address
      state.createdAt = action.payload.createdAt
      state.profile.cards.sort((a, b) => a.id - b.id)
      state.congradulations = action.payload.address
      state.congratulate = action.payload.congratulate
      state.state = "yes";
      state.link = action.payload.link;
      state.userLikes = action.payload.userLikes;
      state.profession = action.payload.profession;
      state.links = action.payload.links;
      state.taggs = action.payload.taggs;
      state.rating = action.payload.rating;
      
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.status = "error";
    });

    builder.addCase(postCard.fulfilled , (state , action) => {
        state.postState = "complete"
        if (action.payload){
            state.profile.cards.push(action.payload)

        }
    });
    builder.addCase(postCard.pending , (state , action) => {
        state.postState = "pending"
    })
    builder.addCase(putCard.pending , (state , action) => {
        state.putState = "pending"
    })
    builder.addCase(putCard.fulfilled , (state , action) => {
         state.putState = "complete"
        state.profile.cards = state.profile.cards.map( (e) => {
            if (e.id === action.payload.id){
                return action.payload
            }
            else{
                return e
            }
        }
        )
    })
  },
});

export default telegramUserInfo.reducer;
export const {changeProfile, addCard, changeCards, deleteCard} = telegramUserInfo.actions

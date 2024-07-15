import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import makeNewFile from "../functions/newMakeFile";
export const fetchResponses = createAsyncThunk(
    "fetchResponses",
    async function (par){
        try{

        
        let im = await axios.get('https://back-birga.ywa.su/response/findByUser' , {
            params : {
                "userId" : 2144832745
            }
        })
        let localResponses = im.data

        let me = par
        

        for (let i = 0; i < localResponses.length; i++){
            let one = new Date(localResponses[i].advertisement.startTime)
  
            let two;
            if (localResponses[i].advertisement.endTime){
               two = new Date(localResponses[i].advertisement.endTime)
            }
            else{
               two = ""
            }

            let files = await makeNewFile(localResponses[i].advertisement.folder, localResponses[i].advertisement.photos);
            
            
            
            localResponses[i].advertisement = {
              id : localResponses[i].advertisement.id,
              taskName : localResponses[i].advertisement.title,
              executionPlace: "Можно выполнить удаленно",
              time : {start : one , end : two},
              tonValue : localResponses[i].advertisement.price,
              taskDescription : localResponses[i].advertisement.description,
              photos : files,
              photosName : localResponses[i].advertisement.photos,
              customerName : me.firstName,
              userPhoto : me.photo || "",
              rate : '5',
              isActive : true,
              creationTime : localResponses[i].advertisement.createdAt,
              viewsNumber : '50',
              
            }


            let photos = [];
    
            if (localResponses[i].photos) {
              photos = await makeNewFile(localResponses[i].folder, localResponses[i].photos);
            }
    
            localResponses[i].photos = photos;
    
            try {
             console.log(me)
              localResponses[i].user = {
                "id" : me.id,
                "fl" : me.firstName,
                "link" : me.link,
                "photo" : me.photo,
                "about" : me.profile.about,
                "stage" : me.profile.stage,
                
              }
              alert(localResponses[i])
              console.log(localResponses[i])
            } catch (e) {
              alert(e);
            }


        }
        return localResponses
    }
    catch(e){
        alert(e)
        console.log(e)
    }
    }
)

const responses = createSlice({
    name : 'responses',
    initialState : {
        status : null,
        responses : []
    },
    extraReducers : builder => {
        builder.addCase(fetchResponses.fulfilled , ((state , action) => {
            state.responses = action.payload
            state.status = "complete"
        }))
    }
})

export default responses.reducer
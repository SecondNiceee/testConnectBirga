import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAllShablons = createAsyncThunk(
  "shablon/fetchAllShablons",
  async function(id){
    try{
        let im = await axios.get("https://back-birga.ywa.su/template/findByUser" , 
            {
                params : {
                    userId : "2144832745"
                    // userId : window.Telegram.WebApp.initDataUnsafe.user.id 
                }
            }
        )
        let localShablons = []
        let servShablons = im.data
        servShablons.forEach((e,i) => 
            {
                localShablons.push({
                    id : e.id,
                    name : e.name,
                    text : e.text,
                    photos : e.files, // photos - это файлы
                    photosNames : e.photos // photosNames - это фотки
                })
            }
        ) 
        console.log(localShablons)
        
        return localShablons
        

    }
    catch(e){
        console.warn(e)
    }
  }
    
)
const shablon = createSlice({
  name: "shablon",
  initialState: {
    status: null,
    shablonsArr: [
      { name: "Шаблон 1", description: "Это шаблон один хахахах", photos: [] },
      { name: "Шаблон 2222", description: "Это шаблон два хахахах", photos: [] },
    ],
  },
  reducers : {
    
  },
  extraReducers : (builder) => {
    builder.addCase(fetchAllShablons.fulfilled , (state , action) => {
        state.shablonsArr = action.payload
    })
  }
});
export default shablon.reducer;

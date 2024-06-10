import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategorys = createAsyncThunk(
    'category/getCategorys' , 
    async function(){
        
    }
) 
const categorys = createSlice(
    {
        name : 'categorys',
        initialState : {
            category : [],
            subCategory : []
        }
    }
)
export default categorys.reducer
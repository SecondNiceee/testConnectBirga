import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
export const getCategorys = createAsyncThunk(
    'category/getCategorys' , 
    async function(){
        let categorys = await axios.get('https://back-birga.ywa.su/category/category' )
        return categorys.data
    }
) 
export const getSubCategorys = createAsyncThunk(
    'categorys/getSubCategorys',
    async function(){
        let subCategorys = await axios.get('https://back-birga.ywa.su/category/subCategory')
        console.log(subCategorys)
        return subCategorys.data
    }
)
const categorys = createSlice(
    {
        name : 'categorys',
        initialState : {
            categoryStatus : null,
            subCategoryStatus : null,
            category : [],
            subCategory : []
        },
        extraReducers : builder => {
            builder.addCase(getCategorys.pending, (state) => {state.categoryStatus = 'pending'})
            builder.addCase(getCategorys.fulfilled, (state, action) => {state.categoryStatus = 'complete' 
                state.category = action.payload
            })
            builder.addCase(getCategorys.rejected, (state) => {state.categoryStatus = 'error'} )


            builder.addCase(getSubCategorys.pending, (state) => {state.subCategoryStatus = 'pending'})
            builder.addCase(getSubCategorys.fulfilled, (state, action) => {state.subCategoryStatus = 'complete'
                state.subCategory = action.payload
            })
            builder.addCase(getSubCategorys.rejected, (state) => {state.subCategoryStatus = 'error'})
        }
        
    }
    
)
export default categorys.reducer
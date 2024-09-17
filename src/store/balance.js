import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TonClient } from "ton";
import { Address } from "ton-core";


export const getBalance = createAsyncThunk(
    "getBalance",
    async function ({userAddress}) {
        alert(userAddress)
        const client = new TonClient({
            endpoint: "https://toncenter.com/api/v2/jsonRPC",
            apiKey : process.env.REACT_APP_API_KEY_TWO
          });
        
        const balance = await client.getBalance(Address.parse(userAddress)) 
        return Number(balance) / 10**9
    }
)
const balance = createSlice(
    {
        name : "balance",
        initialState : {
            value : 0
        },
        reducers : {

        },
        extraReducers : (build => {
            build.addCase(getBalance.fulfilled , (state, action) => {
                state.value = action.payload
            })
        })
    }
)
export default balance.reducer
import { createSlice } from "@reduxjs/toolkit";

// const initialState = 'testing'

const fliterSlice = createSlice({
    name: 'fliter',
    initialState:{value: ''},
    reducers:{
        setFliter: (state, action)=>{
            state.value = action.payload
        }
    }
})

export const {setFliter} = fliterSlice.actions
export default fliterSlice.reducer
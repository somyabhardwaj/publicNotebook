import {configureStore} from '@reduxjs/toolkit'
import noteSliceReducer from '../reducers/noteSlice'
import { thunk } from 'redux-thunk';
const store = configureStore({

    reducer:{
        notes:noteSliceReducer 
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),

}) 

export default store;
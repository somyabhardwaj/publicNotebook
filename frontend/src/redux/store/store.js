import {configureStore} from '@reduxjs/toolkit'
import noteSliceReducer from '../reducers/noteSlice'
import { thunk } from 'redux-thunk';
import userSliceReducer from '../reducers/userSlice';

const store = configureStore({

    reducer:{
        notes:noteSliceReducer ,
        user:userSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),

}) 

export default store;
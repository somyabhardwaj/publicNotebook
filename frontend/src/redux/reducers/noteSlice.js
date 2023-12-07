import { createSlice } from "@reduxjs/toolkit";
import fetchNotes from "../api/notesApi";



const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    id:null,
    updateNote:{},
    token : ""
      },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setId:(state, action) => {
      state.id = action.payload;
      // console.log({id: state.id})
    },
    editNote:(state, action) => {
      state.updateNote = action.payload;
      console.log( state.updateNote)
    },
  },
  token:(state, action) => {
    state.token = action.payloadr
  },
  extraReducers: (builder) => {
    
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
    });
  
  },
});

export const { setNotes, setId, editNote, token } = noteSlice.actions;
export default noteSlice.reducer;

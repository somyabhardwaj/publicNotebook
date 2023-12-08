import { createSlice } from "@reduxjs/toolkit";
import fetchNotes from "../api/notesApi";



const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    id: null,
    updateNote: {},
    token: "",
    error: null,
    status: 'idel'
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
      // console.log({id: state.id})
    },
    editNote: (state, action) => {
      state.updateNote = action.payload;
      // console.log( state.updateNote)
    },
  },
  token: (state, action) => {
    state.token = action.payload
  },
  extraReducers: (builder) => {

    builder.addCase(fetchNotes.pending, (state, action) => {
      state.status = 'loading';
    })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'rejected';
      })

  },
});

export const { setNotes, setId, editNote, token } = noteSlice.actions;
export default noteSlice.reducer;

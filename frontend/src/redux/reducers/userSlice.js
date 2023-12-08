import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignIn } from "../api/userApi";

const loadAuthToken = () => {
  try {
    return localStorage.getItem("authToken");
  } catch (error) {
    // Handle errors here, e.g., log the error or fallback to default value
    console.error("Error loading authToken from localStorage:", error);
    return null;
  }
};

const saveAuthToken = (authToken) => {
  try {
    localStorage.setItem("authToken", authToken);
  } catch (error) {
    // Handle errors here, e.g., log the error or fallback to default behavior
    console.error("Error saving authToken to localStorage:", error);
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: false,
    Lstatus: false,
    authToken: loadAuthToken(), // Load authToken from localStorage on initialization
    data: null,
    message: ""
  },
  reducers: {
    // Your other reducers can go here if needed.
    logout: (state) => {
      state.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.authToken = action.payload.data.authToken;
        state.Lstatus = action.payload.data.success;

        // Save the authToken to localStorage on successful login
        saveAuthToken(action.payload.data.authToken);
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.status = action.payload.success;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

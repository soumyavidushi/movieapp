import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import todoReducer from "./todoSlice";
import paginationReducer from "./paginationSlice";
import userSlice from "./User/userSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
        pagination: paginationReducer,
        user: userSlice.reducer
    }
});

export default store;
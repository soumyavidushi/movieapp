import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        value: '',
        todoList: ["task 1", "task 2", "task 3"]
    },
    reducers: {
        setValue: (state, action) => {
            console.log(action);
            state.value = action.payload;
        },
        addTask: (state, action) => {
            state.todoList.push(state.value);
            state.value = '';
        },
        removeTask: (state, action) => {
            state.todoList = state.todoList.filter((item, index) => index !== action.payload);
        },
        updateTask: (state, action) => {
            state.todoList[action.payload.index] = action.payload.value;
        }
    }
});

export default todoSlice.reducer;
export const { setValue, addTask, removeTask, updateTask } = todoSlice.actions;
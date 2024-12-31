import {createSlice} from '@reduxjs/toolkit';

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        pageNo: 1
    },
    reducers: {
        handleNext: (state, action) => {
            state.pageNo += 1;
        },
        handlePrev: (state, action) => {
            if(state.pageNo === 1) {
                return;
            }
            state.pageNo -= 1;
        }
    }
});

export default paginationSlice.reducer;
export const { handleNext, handlePrev } = paginationSlice.actions;
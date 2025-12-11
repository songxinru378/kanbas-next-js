import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  assignments: [] as any[],
};

const assignmentsSlice = createSlice({
    name:"assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

       

        deleteAssignment: (state, {payload: assignmentId}) => {
            state.assignments = state.assignments.filter(
                (a:any) => a._id !== assignmentId
            ) as any;
        },

        updateAssignment: (state, { payload: assignment}) => {
            state.assignments = state.assignments.map((a: any) => 
            a._id === assignment._id ? assignment : a
        ) as any;
        },

        editAssignment: (state, {payload: assignmentId}) => {
            state.assignments = state.assignments.map((a: any) => 
                a._id === assignmentId ? {...a, editing:true} : a
            ) as any;
        }
    }

});

export const {
    setAssignments,
    deleteAssignment,
    updateAssignment,
    editAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
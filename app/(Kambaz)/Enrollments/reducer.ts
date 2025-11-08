import { createSlice } from "@reduxjs/toolkit";
import {enrollments} from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enrollCourse: (state, { payload:enrollment }) => {
            const exist = state.enrollments.some(
                (e: any) => e.user === enrollment.user && e.course === enrollment.course
            );
            if (exist) {
                return;
            }

            const newEnrollment: any = {
                _id: uuidv4(),
                user: enrollment.user,
                course: enrollment.course,
            };

            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },

        unenrollCourse: (state, {payload: enrollment}) => {
            state.enrollments = state.enrollments.filter(
                (e: any) =>
                    !(e.user === enrollment.user && e.course === enrollment.course)
            ) as any;
        },

    },
});

export const { enrollCourse, unenrollCourse} = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
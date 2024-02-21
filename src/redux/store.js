import { configureStore } from "@reduxjs/toolkit";
import selectedDriverReducer from "./selectedDriverSlice";

export default configureStore({
    reducer: {
        selectedDriver: selectedDriverReducer
    }
})
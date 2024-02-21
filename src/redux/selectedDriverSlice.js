import { createSlice, createAction } from '@reduxjs/toolkit';

export const selectDriver = createAction(
    'selectedDriver/selectDriver'
);

export const selectedDriverSlice = createSlice({
    name: 'selectedDriver',
    initialState: {
        selectedDriverName: '',
        selectedVehicle: '',
    },
    reducers: {
        selectDriver(state, action) {
            return {
                ...state,
                selectedDriverName: action.payload.name,
                selectedVehicle: action.payload.vehicle,
            };
        },
    },
});

export default selectedDriverSlice.reducer;
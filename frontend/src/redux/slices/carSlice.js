import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carsService} from '../../services/carsService'

const initialState = {
    cars: [],
    selectedCar: null
}

const getAll = createAsyncThunk(
    'carsSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carsService.getAll()
            return data

        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const carSlice = createSlice({
    name: 'carSlice',
    initialState: initialState,
    reducers: {
        setSelectedCar: (state, action) => {
            state.selectedCar = action.payload
        }
    },
    extraReducers: {
        [getAll.fulfilled]:(state, action) => {
            state.cars = action.payload
        },
    }
})

const {reducer:carReducer, actions:{setSelectedCar}} = carSlice;

const carActions = {
    setSelectedCar,
    getAll
}

export {
    carReducer,
    carActions
}

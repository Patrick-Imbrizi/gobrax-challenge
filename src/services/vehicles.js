import api from "./api";


export const getVehicles = async () => {
    try {
        const response = await api.get('/vehicles')
        return response;
    } catch (error) {
        return error;
    }
}

export const getVehicleById = async (id) => {
    try {
        const response = await api.get(`/vehicles/${id}`)
        return response;
    } catch (error) {
        return error;
    }
}

export const addVehicle = async (data) => {
    try {
        const response = await api.post(`/vehicles`, data)
        return response;
    } catch (error) {
        return error;
    }
}

export const editVehicle = async (vehicle) => {
    try {
        const response = await api.put(`/vehicles/${vehicle.id}`, vehicle)
        return response;
    } catch (error) {
        return error
    }
}

export const deleteVehicle = async (id) => {
    try {
        const response = await api.delete(`/vehicles/${id}`)
        return response;
    } catch (error) {
        return error;
    }
}
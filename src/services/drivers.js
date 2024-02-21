import api from "./api";


export const getDrivers = async () => {
    try {
        const response = await api.get('/drivers')
        return response;
    } catch (error) {
        return error;
    }
}

export const addDriver = async (data) => {
    try {
        const response = await api.post(`/drivers`, data)
        return response;
    } catch (error) {
        return error;
    }
}

export const editDriver = async (driver) => {
    try {
        const response = await api.put(`/drivers/${driver.id}`, driver)
        return response;
    } catch (error) {
        return error
    }
}

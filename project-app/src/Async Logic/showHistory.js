import axios from "axios";

export const getHistory = async (token) => {
    try {
        const response = await axios.get('http://localhost:9000/api/v1/question/gethistory', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log("Error fetching history:", error)
    }
}
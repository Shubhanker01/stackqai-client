import axios from 'axios'

export const fetchConversations = async (token) => {
    try {
        const response = await axios.get('http://localhost:9000/api/v1/conversation/get', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data.conversations
    } catch (error) {
        console.log(error)
    }
}
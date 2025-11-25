import axios from "axios"

export const saveChat = async (question, answer, token) => {
    try {
        const response = await axios.post('http://localhost:9000/api/v1/question/savechat', {
            question: question,
            answer: answer
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        )
        return response.data
    } catch (error) {
        console.log("Error saving chat:", error)
    }
}
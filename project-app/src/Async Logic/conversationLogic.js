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

// create a new conversation
export const createConversation = async (conversationObj, token) => {
    try {
        console.log(conversationObj)
        const response = await axios.post('http://localhost:9000/api/v1/conversation/create', {
            conversation_name: conversationObj.conversation_name,
            question: conversationObj.question,
            answer: conversationObj.answer
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data.conversation
    } catch (error) {
        console.log(error)
    }
}

// fetch a single conversation by id
export const fetchConversationById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:9000/api/v1/conversation/get/${id}`)
        return response.data.messages
    } catch (error) {
        console.log(error)
    }
}

// add message to a conversation
export const addMessageToConversation = async (id, messageObj, token) => {
    try {
        const response = await axios.post(`http://localhost:9000/api/v1/conversation/add/${id}`, {
            question: messageObj.question,
            answer: messageObj.answer
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        )
        return response.data.messages
    } catch (error) {
        console.log(error)
    }
}
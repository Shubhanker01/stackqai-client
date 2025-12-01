// creating a zustand store for managing conversation state
import { create } from 'zustand'

export const useConversationStore = create((set) => {
    return {
        // creating a global state called conversations
        conversations: [],
        // set conversations to update the state
        setConversations: (conversations) => set({
            conversations: conversations
        }),
        // add new conversation to the state
        addConversation: (conversations) => set((state) => {
            return {
                conversations: [...state.conversations, conversations]
            }
        }),
        // update conversation messages by id
        updateConversationMessage: (id, newMessage) => set((state) => {
            return {
                conversations: state.conversations.map((conversation) => {
                    if (conversation._id === id) {
                        return { ...conversation, messages: [...conversation.messages, newMessage] }
                    }
                    return conversation
                })
            }

        })

    }
})
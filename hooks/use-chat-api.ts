import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sendChatMessage, type ChatResponse } from "@/lib/api"

export interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  status?: "sending" | "sent" | "delivered" | "read" | "error"
  category?: string
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (query: string): Promise<ChatResponse> => {
      return await sendChatMessage(query)
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch any chat-related queries if needed
      queryClient.invalidateQueries({ queryKey: ["chat"] })
    },
    onError: (error) => {
      console.error("Failed to send message:", error)
    },
  })
}

// Hook for managing chat state with React Query
export const useChatMessages = () => {
  const queryClient = useQueryClient()

  const addMessage = (message: ChatMessage) => {
    queryClient.setQueryData(["chatMessages"], (oldMessages: ChatMessage[] = []) => {
      return [...oldMessages, message]
    })
  }

  const updateMessage = (messageId: string, updates: Partial<ChatMessage>) => {
    queryClient.setQueryData(["chatMessages"], (oldMessages: ChatMessage[] = []) => {
      return oldMessages.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg))
    })
  }

  const getMessages = (): ChatMessage[] => {
    return queryClient.getQueryData(["chatMessages"]) || []
  }

  return {
    addMessage,
    updateMessage,
    getMessages,
  }
}

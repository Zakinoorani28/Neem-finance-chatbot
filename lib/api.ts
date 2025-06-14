// API Types
export interface ChatQuery {
  query: string
}

export interface ChatResponse {
  message: string
  status: number
}

export interface ApiError {
  error: string
  message?: string
}

// Use Next.js API route instead of direct ngrok call
const API_BASE_URL = "/api"

// API Functions
export const sendChatMessage = async (query: string): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        error: "Network error",
        message: `HTTP ${response.status}`,
      }))

      throw new Error(errorData.message || errorData.error || "Failed to get AI response")
    }

    const data: ChatResponse = await response.json()
    return data
  } catch (error) {
    console.error("API Error:", error)

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network connection failed. Please check your internet connection.")
    }

    throw error instanceof Error ? error : new Error("Failed to get AI response")
  }
}

// Test API connection
export const testApiConnection = async (): Promise<boolean> => {
  try {
    const response = await sendChatMessage("test connection")
    return response.status === 200
  } catch (error) {
    console.error("API connection test failed:", error)
    return false
  }
}

// Health check endpoint
export const checkApiHealth = async (): Promise<{ status: string; timestamp: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      return {
        status: "healthy",
        timestamp: Date.now(),
      }
    } else {
      throw new Error("Health check failed")
    }
  } catch (error) {
    return {
      status: "unhealthy",
      timestamp: Date.now(),
    }
  }
}

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Menu,
  ArrowLeft,
  AlertCircle,
  Wifi,
  WifiOff,
  RefreshCw,
} from "lucide-react"
import { ChatSidebar } from "@/components/chat-sidebar"
import { useSendMessage, useChatMessages, type ChatMessage } from "@/hooks/use-chat-api"
import { checkApiHealth } from "@/lib/api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

type Role = "customer" | "finance" | "tech"
type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error"

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "ai",
      content:
        "Hello! I'm Neem AI Assistant. I can help you with onboarding, API integration, billing questions, and general support. How can I assist you today?",
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [currentRole, setCurrentRole] = useState<Role>("customer")
  const [selectedCategory, setSelectedCategory] = useState<string>("general")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // React Query hooks
  const sendMessageMutation = useSendMessage()
  const { addMessage, updateMessage } = useChatMessages()

  // Test API connection on component mount and periodically
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setConnectionStatus("connecting")
        const health = await checkApiHealth()

        if (health.status === "healthy") {
          setConnectionStatus("connected")
        } else {
          setConnectionStatus("disconnected")
        }
      } catch (error) {
        console.error("Connection check failed:", error)
        setConnectionStatus("error")
      }
    }

    // Initial check
    checkConnection()

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000)

    return () => clearInterval(interval)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectCategory = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes("api") || lowerMessage.includes("integration") || lowerMessage.includes("code")) {
      return "api"
    }
    if (
      lowerMessage.includes("bill") ||
      lowerMessage.includes("payment") ||
      lowerMessage.includes("charge") ||
      lowerMessage.includes("invoice")
    ) {
      return "billing"
    }
    if (
      lowerMessage.includes("onboard") ||
      lowerMessage.includes("setup") ||
      lowerMessage.includes("getting started") ||
      lowerMessage.includes("partner")
    ) {
      return "onboarding"
    }
    return "general"
  }

  const handleRetryConnection = async () => {
    setConnectionStatus("connecting")
    try {
      const health = await checkApiHealth()
      if (health.status === "healthy") {
        setConnectionStatus("connected")
      } else {
        setConnectionStatus("disconnected")
      }
    } catch (error) {
      setConnectionStatus("error")
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || sendMessageMutation.isPending) return

    const userMessageId = Date.now().toString()
    const userMessage: ChatMessage = {
      id: userMessageId,
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
      status: "sending",
    }

    const detectedCategory = detectCategory(inputValue.trim())
    setSelectedCategory(detectedCategory)

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Update message status to sent
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === userMessageId ? { ...msg, status: "sent" } : msg)))
    }, 500)

    // Update message status to delivered
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === userMessageId ? { ...msg, status: "delivered" } : msg)))
    }, 1000)

    try {
      // Send message to API
      const response = await sendMessageMutation.mutateAsync(userMessage.content)

      // Update user message status to read
      setMessages((prev) => prev.map((msg) => (msg.id === userMessageId ? { ...msg, status: "read" } : msg)))

      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: response.message,
        timestamp: new Date(),
        category: detectedCategory,
      }

      setMessages((prev) => [...prev, aiMessage])

      // Update connection status on successful response
      if (connectionStatus !== "connected") {
        setConnectionStatus("connected")
      }
    } catch (error) {
      console.error("Failed to send message:", error)

      // Update user message status to error
      setMessages((prev) => prev.map((msg) => (msg.id === userMessageId ? { ...msg, status: "error" } : msg)))

      // Update connection status
      setConnectionStatus("error")

      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: "ai",
        content: `Sorry, I'm having trouble connecting to the server right now. ${error instanceof Error ? error.message : "Please try again in a moment."}`,
        timestamp: new Date(),
        category: "error",
      }

      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const renderMessageStatus = (status?: string) => {
    switch (status) {
      case "sending":
        return <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      case "sent":
        return <Check className="w-4 h-4 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-400" />
      case "read":
        return <CheckCheck className="w-4 h-4 text-blue-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const formatMessage = (content: string) => {
    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return content.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline break-all"
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-50 border-green-200 text-green-800"
      case "connecting":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "disconnected":
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi className="h-4 w-4 text-green-600" />
      case "connecting":
        return <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />
      case "disconnected":
      case "error":
        return <WifiOff className="h-4 w-4 text-red-600" />
      default:
        return <WifiOff className="h-4 w-4 text-gray-600" />
    }
  }

  const getConnectionStatusMessage = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected to Neem AI API"
      case "connecting":
        return "Connecting to Neem AI API..."
      case "disconnected":
        return "Disconnected from Neem AI API"
      case "error":
        return "Unable to connect to Neem AI API"
      default:
        return "Checking connection..."
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* API Connection Status */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Alert className={`rounded-none border-x-0 border-t-0 ${getConnectionStatusColor()}`}>
          {getConnectionStatusIcon()}
          <AlertDescription className="flex items-center justify-between">
            <span className="text-sm">{getConnectionStatusMessage()}</span>
            {(connectionStatus === "disconnected" || connectionStatus === "error") && (
              <Button variant="ghost" size="sm" onClick={handleRetryConnection} className="h-6 px-2 text-xs">
                <RefreshCw className="w-3 h-3 mr-1" />
                Retry
              </Button>
            )}
          </AlertDescription>
        </Alert>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative z-50 h-full transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        w-80 flex-shrink-0
      `}
      >
        <ChatSidebar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#efeae2] min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-[#075e54] text-white p-4 flex items-center space-x-3 mt-12 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:bg-white/10 p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>

          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold">NA</span>
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold truncate">Neem AI Assistant</h2>
              <p className="text-xs text-green-200 truncate">
                {connectionStatus === "connected" ? "Online" : "Connecting..."}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div
          className="flex-1 overflow-y-auto p-4 mt-12 lg:mt-12"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <div className="w-full max-w-none">
            <div className="space-y-2">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex w-full ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                    max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%] xl:max-w-[45%]
                    ${
                      message.type === "user"
                        ? "bg-[#dcf8c6] rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-sm"
                        : message.category === "error"
                          ? "bg-red-50 border border-red-200 rounded-tl-sm rounded-tr-lg rounded-bl-lg rounded-br-lg"
                          : "bg-white rounded-tl-sm rounded-tr-lg rounded-bl-lg rounded-br-lg"
                    } 
                    px-3 py-2 shadow-sm break-words
                  `}
                  >
                    <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap word-wrap break-word">
                      {formatMessage(message.content)}
                    </div>
                    <div className="flex items-center justify-end mt-1 space-x-1">
                      <span className="text-xs text-gray-500 flex-shrink-0">{formatTime(message.timestamp)}</span>
                      {message.type === "user" && (
                        <div className="flex-shrink-0">{renderMessageStatus(message.status)}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {sendMessageMutation.isPending && (
                <div className="flex justify-start w-full">
                  <div className="bg-white rounded-tl-sm rounded-tr-lg rounded-bl-lg rounded-br-lg px-3 py-2 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-[#f0f0f0] p-4 border-t flex-shrink-0">
          <div className="w-full">
            <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-sm">
              <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent flex-shrink-0">
                <Paperclip className="w-5 h-5 text-gray-500" />
              </Button>

              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  connectionStatus === "connected"
                    ? "Type a message..."
                    : connectionStatus === "connecting"
                      ? "Connecting to AI..."
                      : "Connection failed - Click retry above"
                }
                disabled={connectionStatus !== "connected" || sendMessageMutation.isPending}
                className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm min-w-0"
              />

              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || sendMessageMutation.isPending || connectionStatus !== "connected"}
                size="sm"
                className="p-0 h-auto bg-[#25d366] hover:bg-[#20c55a] rounded-full w-8 h-8 flex-shrink-0 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

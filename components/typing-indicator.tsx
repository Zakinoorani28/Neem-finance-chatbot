"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-2 max-w-xs md:max-w-md lg:max-w-lg">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>

        <div className="bg-white border shadow-sm rounded-2xl px-4 py-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

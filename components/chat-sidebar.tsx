"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, X } from "lucide-react"

type Role = "customer" | "finance" | "tech"

interface ChatSidebarProps {
  selectedCategory: string
  onCategorySelect: (category: string) => void
  currentRole: Role
  onRoleChange: (role: Role) => void
  onClose?: () => void
}

const categories = [
  { id: "all", label: "All" },
  { id: "billing", label: "Billing" },
  { id: "api", label: "API" },
  { id: "general", label: "General" },
]

const roles = [
  { id: "customer", label: "Customer" },
  { id: "finance", label: "Finance" },
  { id: "tech", label: "Tech" },
]

export function ChatSidebar({
  selectedCategory,
  onCategorySelect,
  currentRole,
  onRoleChange,
  onClose,
}: ChatSidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      {/* Mobile Close Button */}
      {onClose && (
        <div className="lg:hidden p-4 border-b border-gray-200 flex justify-end flex-shrink-0">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Customer Profile Section */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage src="/placeholder.svg?height=48&width=48" />
            <AvatarFallback className="bg-blue-500 text-white text-lg font-semibold">CN</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-gray-900 truncate">Customer Name</h2>
            <p className="text-sm text-gray-500 truncate">Finance Team</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategorySelect(category.id)}
              className={`text-xs flex-shrink-0 ${
                selectedCategory === category.id
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              {category.label}
            </Button>
          ))}
          <Badge variant="destructive" className="text-xs flex-shrink-0">
            Escalated
          </Badge>
        </div>
      </div>

      {/* Switch Role Section */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="font-semibold text-gray-900 mb-3">Switch Role</h3>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <Button
              key={role.id}
              variant={currentRole === role.id ? "default" : "outline"}
              size="sm"
              onClick={() => onRoleChange(role.id as Role)}
              className={`text-xs flex-shrink-0 ${
                currentRole === role.id
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              {role.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-50">
          <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">Logout</span>
        </Button>
      </div>
    </div>
  )
}

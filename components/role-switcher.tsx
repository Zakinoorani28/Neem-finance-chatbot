"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, User, DollarSign, Code } from "lucide-react"

type Role = "customer" | "finance" | "tech"

interface RoleSwitcherProps {
  currentRole: Role
  onRoleChange: (role: Role) => void
}

const roles = {
  customer: {
    label: "Customer",
    icon: User,
    color: "bg-blue-100 text-blue-700",
    description: "Business-friendly responses",
  },
  finance: {
    label: "Finance Team",
    icon: DollarSign,
    color: "bg-green-100 text-green-700",
    description: "Numbers-focused, formal tone",
  },
  tech: {
    label: "Tech Support",
    icon: Code,
    color: "bg-purple-100 text-purple-700",
    description: "API/logs/technical details",
  },
}

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  const CurrentIcon = roles[currentRole].icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <div className={`p-1 rounded ${roles[currentRole].color}`}>
            <CurrentIcon className="w-3 h-3" />
          </div>
          <span className="hidden sm:inline">{roles[currentRole].label}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {Object.entries(roles).map(([key, role]) => {
          const Icon = role.icon
          const isSelected = currentRole === key

          return (
            <DropdownMenuItem
              key={key}
              onClick={() => onRoleChange(key as Role)}
              className={`flex items-center space-x-3 p-3 ${isSelected ? "bg-blue-50" : ""}`}
            >
              <div className={`p-2 rounded ${role.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{role.label}</span>
                  {isSelected && (
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500">{role.description}</p>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

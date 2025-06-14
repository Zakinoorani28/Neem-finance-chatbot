"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard } from "lucide-react"

interface SubscriptionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium" | "enterprise">("premium")

  const handleUpgrade = () => {
    // Mock Stripe integration
    alert(`Upgrading to ${selectedPlan} plan! This would integrate with Stripe in production.`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Choose Your Plan</DialogTitle>
          <DialogDescription className="text-center">
            Upgrade to unlock the full power of Neem Finance AI
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {/* Free Plan */}
          <Card
            className={`cursor-pointer transition-all duration-200 ${
              selectedPlan === "free" ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedPlan("free")}
          >
            <CardHeader className="text-center">
              <CardTitle>Free</CardTitle>
              <div className="text-3xl font-bold">$0</div>
              <CardDescription>Get started for free</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">10 chats per day</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Basic AI responses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Email support</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card
            className={`cursor-pointer transition-all duration-200 relative ${
              selectedPlan === "premium" ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedPlan("premium")}
          >
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
            <CardHeader className="text-center">
              <CardTitle className="text-blue-600">Premium</CardTitle>
              <div className="text-3xl font-bold text-blue-600">$49</div>
              <CardDescription>per month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Unlimited chats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Smart routing & triage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Priority support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">File uploads</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card
            className={`cursor-pointer transition-all duration-200 ${
              selectedPlan === "enterprise" ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedPlan("enterprise")}
          >
            <CardHeader className="text-center">
              <CardTitle>Enterprise</CardTitle>
              <div className="text-3xl font-bold">Custom</div>
              <CardDescription>For large teams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Everything in Premium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Custom integrations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Dedicated support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">SLA guarantees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">White-label option</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {selectedPlan === "enterprise" ? (
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              Contact Sales
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              onClick={handleUpgrade}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {selectedPlan === "free" ? "Continue Free" : "Upgrade to Premium"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

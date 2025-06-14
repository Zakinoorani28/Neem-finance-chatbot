"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Zap, Users, ArrowRight, Check, Star, Bot } from "lucide-react"
import Link from "next/link"
import { SubscriptionModal } from "@/components/subscription-modal"

export default function LandingPage() {
  const [showSubscription, setShowSubscription] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Neem Finance AI
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
              Reviews
            </Link>
            <Button variant="outline" onClick={() => setShowSubscription(true)}>
              Sign In
            </Button>
            <Link href="/chat">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Try Demo
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-bounce mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-pulse">
            Your 24/7 Finance Support Bot
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Powered by <span className="font-semibold text-blue-600">Gemini AI</span> for intelligent triage, smart
            replies, and seamless escalation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4"
              >
                Try the Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => setShowSubscription(true)} className="text-lg px-8 py-4">
              Subscribe Now
            </Button>
            <Button size="lg" variant="ghost" className="text-lg px-8 py-4">
              For Teams
            </Button>
          </div>

          {/* Demo Chat Preview */}
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 text-white">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Neem Finance Assistant</h3>
                  <p className="text-sm opacity-90">Online • Powered by Gemini</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm">Hi! I need help with my API integration</p>
              </div>
              <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs ml-auto">
                <p className="text-sm">
                  I'd be happy to help! I've detected this is an API issue. Let me route you to our technical team and
                  provide some quick solutions...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Intelligent Finance Support</h2>
            <p className="text-xl text-gray-600">Three powerful features that transform your customer support</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Auto-Triage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Gemini AI automatically categorizes and prioritizes support requests, routing them to the right team
                  instantly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Smart Replies</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Context-aware responses that understand finance terminology, API documentation, and billing inquiries.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Smart Escalation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Seamlessly escalate complex issues to human agents with full context and conversation history
                  preserved.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Scale your support with flexible pricing</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <Card className="relative hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-4xl font-bold text-gray-900">$0</div>
                <CardDescription>Perfect for trying out</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>10 chats per day</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Basic AI responses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Email support</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline" onClick={() => setShowSubscription(true)}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Premium Tier */}
            <Card className="relative hover:shadow-lg transition-shadow duration-300 border-2 border-blue-500">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="text-4xl font-bold text-blue-600">$49</div>
                <CardDescription>per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Unlimited chats</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Smart routing & triage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Analytics dashboard</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setShowSubscription(true)}>
                  Start Premium
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Tier */}
            <Card className="relative hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900">Custom</div>
                <CardDescription>For large teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Everything in Premium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Custom integrations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Dedicated support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>SLA guarantees</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Trusted by finance teams worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Neem Finance AI has transformed our support workflow. Response times dropped by 80% and customer
                  satisfaction is at an all-time high."
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Head of Finance, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The AI understands our complex billing queries better than most humans. It's like having a finance
                  expert available 24/7."
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Michael Rodriguez</p>
                    <p className="text-sm text-gray-500">CFO, StartupXYZ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Integration was seamless and the ROI was immediate. Our team can now focus on strategic work instead
                  of repetitive support tickets."
                </p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>EL</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Emily Liu</p>
                    <p className="text-sm text-gray-500">Operations Director, FinanceFlow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Neem Finance AI</span>
              </div>
              <p className="text-gray-400">Intelligent finance support powered by Gemini AI</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="hover:text-white transition-colors">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Neem Finance AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <SubscriptionModal open={showSubscription} onOpenChange={setShowSubscription} />
    </div>
  )
}

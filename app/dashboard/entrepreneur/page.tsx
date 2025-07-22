"use client"

import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar"
import { LoadingBar } from "@/components/loading-bar"
import { Search, MessageCircle, User, Star, Building, TrendingUp, Users, DollarSign, Target } from "lucide-react"
import Link from "next/link"

interface Investor {
  id: string
  firstName: string
  lastName: string
  email: string
  profile?: {
    photo: string
    company: string
    description: string
    field: string
    experience: string
    previousDeals: number
    rating: number
    isActive: boolean
    terms: string
  }
}

export default function EntrepreneurDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [investors, setInvestors] = useState<Investor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    if (user.role !== "entrepreneur") {
      router.push("/")
      return
    }

    // Load real demo investors data
    const loadInvestors = async () => {
      try {
        const demoInvestors = [
          {
            id: "1",
            firstName: "laiba rafique",
            lastName: "Rafique",
            email: "investor@gmail.com",
            profile: {
              photo: "/investor.jpg?height=100&width=100",
              company: "laiba Ventures",
              description: "Experienced investor focusing on early-stage startups with innovative solutions.",
              field: "Technology, Healthcare",
              experience: "15 years in venture capital",
              previousDeals: 12,
              rating: 4.8,
              isActive: true,
              terms: "Minimum investment: $50K, Expected ROI: 15-25%, Investment period: 3-5 years",
            },
          },
          {
            id: "4",
            firstName: "Manhail",
            lastName: "yousf",
            email: "mano.investor@gmail.com",
            profile: {
              photo: "/enter.jpg?height=100&width=100",
              company: "mano Capital",
              description: "Angel investor with a focus on disruptive financial technologies.",
              field: "Fintech, E-commerce",
              experience: "10 years in angel investing",
              previousDeals: 8,
              rating: 4.7,
              isActive: true,
              terms: "Minimum investment: $25K, Expected ROI: 20-30%, Investment period: 2-4 years",
            },
          },
          {
            id: "8",
            firstName: "Ali",
            lastName: "Abbas",
            email: "abbass@techventures.com",
            profile: {
              photo: "/ali.jpg?height=100&width=100",
              company: "Tech Ventures",
              description: "Former tech executive turned investor, specializing in AI and machine learning startups.",
              field: "AI, Machine Learning, SaaS",
              experience: "12 years in tech, 5 years investing",
              previousDeals: 15,
              rating: 4.9,
              isActive: true,
              terms: "Minimum investment: $100K, Expected ROI: 25-35%, Investment period: 3-7 years",
            },
          },
          {
            id: "9",
            firstName: "andreww",
            lastName: "Lee",
            email: "andrewlee@greenventures.com",
            profile: {
              photo: "/ad.jpg?height=100&width=100",
              company: "Green Ventures",
              description: "Impact investor focused on sustainable and environmentally conscious startups.",
              field: "CleanTech, Sustainability, GreenTech",
              experience: "8 years in impact investing",
              previousDeals: 10,
              rating: 4.6,
              isActive: true,
              terms: "Minimum investment: $75K, Expected ROI: 15-20%, Investment period: 4-6 years",
            },
          },
        ]
        setInvestors(demoInvestors)
      } catch (error) {
        console.error("Error loading investors:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInvestors()
  }, [user, router])

  const filteredInvestors = investors.filter(
    (investor) =>
      investor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.profile?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.profile?.field?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.profile?.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!user || user.role !== "entrepreneur") {
    return <LoadingBar />
  }

  return (
    <div className="min-h-screen dashboard-bg">
      <LoadingBar />
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-muted-foreground text-lg">Connect with investors and grow your business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card-purple text-white hover-glow animate-slide-in-left">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Available Investors</CardTitle>
              <Users className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investors.length}</div>
              <p className="text-xs opacity-80">+5 new this week</p>
            </CardContent>
          </Card>

          <Card
            className="gradient-card-cyan text-white hover-glow animate-slide-in-left"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Active Conversations</CardTitle>
              <MessageCircle className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs opacity-80">2 pending responses</p>
            </CardContent>
          </Card>

          <Card
            className="gradient-card-blue text-white hover-glow animate-slide-in-left"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Funding Target</CardTitle>
              <Target className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$500K</div>
              <p className="text-xs opacity-80">Series A round</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">127</div>
              <p className="text-xs text-muted-foreground">+23% this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion Notice */}
        {!user.isProfileComplete && (
          <Card className="mb-8 border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 glass-card">
            <CardHeader>
              <CardTitle className="text-yellow-400">Complete Your Profile</CardTitle>
              <CardDescription className="text-yellow-300/80">
                Complete your entrepreneur profile to start connecting with investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="btn-gradient">
                <Link href="/profile/setup">Complete Profile</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Search Section */}
        <Card className="mb-8 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-purple-400" />
              <span>Find Investors</span>
            </CardTitle>
            <CardDescription>Search for investors by name, company, investment field, or experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search investors, companies, or investment fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-purple-500/20 focus:border-purple-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Collaboration Requests Section */}
        <Card className="mb-8 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-cyan-400" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Recent investment inquiries and collaboration requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-purple-500/20 rounded-lg bg-background/30 hover-glow">
                <div className="flex items-center space-x-4">
                  <Avatar className="border-2 border-purple-400/20">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-cyan-400 text-white">
                      JS
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-muted-foreground">Interested in your AI platform</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/20">
                    Pending
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-400/20 text-purple-400 hover:bg-purple-400/10 bg-transparent"
                  >
                    View Request
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-cyan-500/20 rounded-lg bg-background/30 hover-glow">
                <div className="flex items-center space-x-4">
                  <Avatar className="border-2 border-cyan-400/20">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-400 text-white">
                      MC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Mike Chen</p>
                    <p className="text-sm text-muted-foreground">Wants to discuss funding options</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/20">
                    Active
                  </Badge>
                  <Button size="sm" className="btn-gradient">
                    Continue Chat
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investors List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-cyan-400" />
            <span>Available Investors</span>
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="glass-card skeleton">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted/20 rounded-full" />
                      <div className="space-y-2">
                        <div className="h-4 bg-muted/20 rounded w-24" />
                        <div className="h-3 bg-muted/20 rounded w-32" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted/20 rounded" />
                      <div className="h-3 bg-muted/20 rounded w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredInvestors.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No investors found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search terms" : "Check back later for new investors"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvestors.map((investor, index) => (
                <Card
                  key={investor.id}
                  className="glass-card hover-glow hover-scale animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-purple-400/20">
                          <AvatarImage src={investor.profile?.photo || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-400 to-cyan-400 text-white">
                            {investor.firstName[0]}
                            {investor.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {investor.firstName} {investor.lastName}
                          </CardTitle>
                          <CardDescription className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {investor.profile?.company || "Investment Firm"}
                          </CardDescription>
                        </div>
                      </div>
                      {investor.profile?.isActive && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/20">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1 status-online"></div>
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {investor.profile?.description || "Experienced investor looking for promising startups"}
                    </p>

                    {investor.profile?.field && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Focus Areas:</span>
                        <Badge variant="outline" className="border-cyan-400/20 text-cyan-400">
                          {investor.profile.field.split(",")[0]}
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                        <span className="text-sm">{investor.profile?.previousDeals || 0} deals</span>
                      </div>
                      {investor.profile?.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{investor.profile.rating}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button asChild size="sm" className="flex-1 btn-gradient">
                        <Link href={`/profile/investor/${investor.id}`}>View Profile</Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                      >
                        <Link href={`/chat/${investor.id}`}>
                          <MessageCircle className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

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
import { Search, MessageCircle, User, Star, Building, TrendingUp, Users, DollarSign, Briefcase } from "lucide-react"
import Link from "next/link"

interface Entrepreneur {
  id: string
  firstName: string
  lastName: string
  email: string
  profile?: {
    photo: string
    company: string
    bio: string
    startupDescription: string
    fundingNeed: string
    rating: number
    isActive: boolean
  }
}

export default function InvestorDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    if (user.role !== "investor") {
      router.push("/")
      return
    }

    // Load real demo entrepreneurs data
    const loadEntrepreneurs = async () => {
      try {
        const demoEntrepreneurs = [
          {
            id: "2",
            firstName: "laiba",
            lastName: "rafique",
            email: "entrepreneur@gmail.com",
            profile: {
              photo: "/investor.jpg?height=100&width=100",
              company: "TechStart Inc",
              bio: "Passionate entrepreneur building the next generation of AI solutions",
              startupDescription: "AI-powered customer service platform that reduces response time by 80%",
              fundingNeed: "$500,000",
              rating: 4.6,
              isActive: true,
            },
          },
          {
            id: "5",
            firstName: "manahil",
            lastName: "yousf",
            email: "mano.entrepreneur@example.com",
            profile: {
              photo: "/enter.jpg?height=100&width=100",
              company: "EcoSolutions",
              bio: "Environmental engineer turned entrepreneur, dedicated to sustainable solutions",
              startupDescription: "Sustainable packaging solutions for e-commerce businesses",
              fundingNeed: "$750,000",
              rating: 4.9,
              isActive: true,
            },
          },
          {
            id: "6",
            firstName: "Sharjeel",
            lastName: "Hussain",
            email: "sharjeeel@fintech.com",
            profile: {
              photo: "/ali.jpg?height=100&width=100",
              company: "FinTech Innovations",
              bio: "Former Goldman Sachs analyst building the future of digital payments",
              startupDescription: "Blockchain-based payment platform for emerging markets",
              fundingNeed: "$1,200,000",
              rating: 4.7,
              isActive: true,
            },
          },
          {
            id: "7",
            firstName: "andrew",
            lastName: "tate",
            email: "andrew@healthtech.com",
            profile: {
              photo: "/ad.jpg?height=100&width=100",
              company: "HealthTech Solutions",
              bio: "Medical doctor and tech entrepreneur focused on healthcare innovation",
              startupDescription: "Telemedicine platform connecting patients with specialists globally",
              fundingNeed: "$900,000",
              rating: 4.8,
              isActive: true,
            },
          },
        ]
        setEntrepreneurs(demoEntrepreneurs)
      } catch (error) {
        console.error("Error loading entrepreneurs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadEntrepreneurs()
  }, [user, router])

  const filteredEntrepreneurs = entrepreneurs.filter(
    (entrepreneur) =>
      entrepreneur.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrepreneur.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrepreneur.profile?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrepreneur.profile?.startupDescription?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!user || user.role !== "investor") {
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
          <p className="text-muted-foreground text-lg">Discover promising entrepreneurs and investment opportunities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card-purple text-white hover-glow animate-slide-in-left">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Entrepreneurs</CardTitle>
              <Users className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{entrepreneurs.length}</div>
              <p className="text-xs opacity-80">+12% from last month</p>
            </CardContent>
          </Card>

          <Card
            className="gradient-card-cyan text-white hover-glow animate-slide-in-left"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Active Deals</CardTitle>
              <Briefcase className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs opacity-80">3 pending review</p>
            </CardContent>
          </Card>

          <Card
            className="gradient-card-blue text-white hover-glow animate-slide-in-left"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs opacity-80">+18% this quarter</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">87%</div>
              <p className="text-xs text-muted-foreground">Above industry avg</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion Notice */}
        {!user.isProfileComplete && (
          <Card className="mb-8 border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 glass-card">
            <CardHeader>
              <CardTitle className="text-yellow-400">Complete Your Profile</CardTitle>
              <CardDescription className="text-yellow-300/80">
                Complete your investor profile to start connecting with entrepreneurs
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
              <span>Find Entrepreneurs</span>
            </CardTitle>
            <CardDescription>Search for entrepreneurs by name, company, or business description</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search entrepreneurs, companies, or business ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-purple-500/20 focus:border-purple-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Entrepreneurs List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center space-x-2">
            <Building className="h-6 w-6 text-cyan-400" />
            <span>Available Entrepreneurs</span>
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
          ) : filteredEntrepreneurs.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No entrepreneurs found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search terms" : "Check back later for new entrepreneurs"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntrepreneurs.map((entrepreneur, index) => (
                <Card
                  key={entrepreneur.id}
                  className="glass-card hover-glow hover-scale animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-purple-400/20">
                          <AvatarImage src={entrepreneur.profile?.photo || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-400 to-cyan-400 text-white">
                            {entrepreneur.firstName[0]}
                            {entrepreneur.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {entrepreneur.firstName} {entrepreneur.lastName}
                          </CardTitle>
                          <CardDescription className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {entrepreneur.profile?.company || "Startup"}
                          </CardDescription>
                        </div>
                      </div>
                      {entrepreneur.profile?.isActive && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/20">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1 status-online"></div>
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {entrepreneur.profile?.startupDescription ||
                        entrepreneur.profile?.bio ||
                        "Innovative startup looking for investment opportunities"}
                    </p>

                    {entrepreneur.profile?.fundingNeed && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Funding Need:</span>
                        <Badge variant="outline" className="border-cyan-400/20 text-cyan-400">
                          {entrepreneur.profile.fundingNeed}
                        </Badge>
                      </div>
                    )}

                    {entrepreneur.profile?.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{entrepreneur.profile.rating}</span>
                        <span className="text-sm text-muted-foreground">/5</span>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button asChild size="sm" className="flex-1 btn-gradient">
                        <Link href={`/profile/entrepreneur/${entrepreneur.id}`}>View Profile</Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                      >
                        <Link href={`/chat/${entrepreneur.id}`}>
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

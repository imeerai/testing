"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  role: "investor" | "entrepreneur" | "admin"
  firstName: string
  lastName: string
  contact: string
  isProfileComplete: boolean
  profile?: any
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: any) => Promise<boolean>
  updateProfile: (profileData: any) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("currentUser")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Demo users for testing
      const demoUsers = [
        {
          id: "1",
          email: "investor@gmail.com",
          password: "investor",
          role: "investor" as const,
          firstName: "Laiba",
          lastName: "Rafique",
          contact: "+92-318-222-1234",
          isProfileComplete: true,
          profile: {
            photo: "/placeholder.svg?height=100&width=100",
            company: "Rafique Ventures",
            addressTemporary: "123 Business St, LHR",
            addressPermanent: "456 Home Ave, LHR",
            phone: "+92-318-222-1234",
            experience: "15 years in venture capital",
            field: "Technology, Healthcare",
            description: "Experienced investor focusing on early-stage startups with innovative solutions.",
            title: "Senior Partner at Rafique Ventures",
            terms: "Minimum investment: $50K, Expected ROI: 15-25%, Investment period: 3-5 years",
            previousDeals: 12,
            rating: 4.8,
            isActive: true,
          },
        },
        {
          id: "2",
          email: "entrepreneur@gmail.com",
          password: "entrepreneur",
          role: "entrepreneur" as const,
          firstName: "Alia",
          lastName: "Jafar",
          contact: "+92-318-222-1234",
          isProfileComplete: true,
          profile: {
            photo: "/placeholder.svg?height=100&width=100",
            company: "TechStart Inc",
            bio: "Passionate entrepreneur building the next generation of AI solutions",
            startupDescription: "AI-powered customer service platform that reduces response time by 80%",
            fundingNeed: "$500,000",
            pitchDeck: "Available upon request",
            previousFunding: "$100,000 seed round",
            rating: 4.6,
            isActive: true,
          },
        },
        {
          id: "3",
          email: "admin@gmail.com",
          password: "Admin123",
          role: "admin" as const,
          firstName: "Admin",
          lastName: "User",
          contact: "+92-318-222-1234",
          isProfileComplete: true,
        },
      ]

      const foundUser = demoUsers.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const userWithoutPassword = { ...foundUser }
        delete (userWithoutPassword as any).password

        setUser(userWithoutPassword)
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

        toast({
          title: "Login Successful",
          description: `Welcome back, ${foundUser.firstName}!`,
        })

        // Redirect based on role
        setTimeout(() => {
          if (foundUser.role === "admin") {
            router.push("/admin")
          } else if (foundUser.role === "investor") {
            router.push("/dashboard/investor")
          } else {
            router.push("/dashboard/entrepreneur")
          }
        }, 1000)

        return true
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please check demo credentials.",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Simulate registration
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        isProfileComplete: false,
      }

      const userWithoutPassword = { ...newUser }
      delete userWithoutPassword.password

      setUser(userWithoutPassword)
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

      toast({
        title: "Registration Successful",
        description: "Welcome to Business Nexus!",
      })

      // Redirect to appropriate dashboard
      setTimeout(() => {
        if (userData.role === "investor") {
          router.push("/dashboard/investor")
        } else {
          router.push("/dashboard/entrepreneur")
        }
      }, 1000)

      return true
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (profileData: any): Promise<boolean> => {
    try {
      if (user) {
        const updatedUser = {
          ...user,
          profile: { ...profileData, isActive: true },
          isProfileComplete: true,
        }

        setUser(updatedUser)
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))

        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully!",
        })

        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "An error occurred while updating your profile",
        variant: "destructive",
      })
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
    router.push("/")
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

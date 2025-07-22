"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/auth-context"
import { LogOut, User, Menu, X, Home } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogoClick = () => {
    if (user) {
      // If user is logged in, refresh the dashboard
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push(`/dashboard/${user.role}`)
      }
      router.refresh()
    } else {
      // If not logged in, go to home
      router.push("/")
    }
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={handleLogoClick}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:from-purple-500 hover:to-cyan-500 transition-all duration-300"
          >
            Business Nexus
          </button>

          {/* Desktop Navigation - Only show if not logged in */}
          {!user && (
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-foreground hover:text-purple-400 transition-colors font-medium">
                Home
              </Link>
              <Link href="/docs" className="text-foreground hover:text-purple-400 transition-colors font-medium">
                Docs
              </Link>
              <Link href="/about" className="text-foreground hover:text-purple-400 transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-purple-400 transition-colors font-medium">
                Contact
              </Link>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-purple-500/10">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-card">
                  <DropdownMenuItem asChild>
                    <button onClick={handleLogoClick} className="flex items-center w-full">
                      <Home className="h-4 w-4 mr-2" />
                      Dashboard
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/setup" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-400 hover:text-red-300">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="ghost" size="sm" className="hover:bg-purple-500/10">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="btn-gradient">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            {!user && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {!user && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-foreground hover:text-purple-400 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/docs"
                className="text-foreground hover:text-purple-400 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-purple-400 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-purple-400 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
